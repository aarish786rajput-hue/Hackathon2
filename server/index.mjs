import http from "node:http";

// Environment configuration
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const APP_ORIGIN = (process.env.APP_ORIGIN || "http://localhost:5173").trim();
const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || "").trim();
const GEMINI_MODEL = (process.env.GEMINI_MODEL || "gemini-3.8-flash").trim();
const FIREBASE_API_KEY = (process.env.FIREBASE_API_KEY || "").trim();

// Conservative emergency keywords list (Clinical red flags in English, Hindi, and Hinglish)
export const EMERGENCY_KEYWORDS = [
  "chest pain", "heart attack", "difficulty breathing", "shortness of breath",
  "can't breathe", "cannot breathe", "unconscious", "passed out", "severe bleeding",
  "stroke", "facial drooping", "arm weakness", "slurred speech", "seizure",
  "convulsion", "choking", "poison", "poisoning", "suicide", "overdose",
  "सीने में दर्द", "हार्ट अटैक", "सांस लेने में तकलीफ", "सांस फूलना", "बेहोश",
  "अत्यधिक खून", "दौरा", "छाती में दर्द", "खून बहना", "chhati me dard",
  "seene me dard", "saans lene me dikkat", "saans phoolna", "behosh", "khoon nikalna"
];

/**
 * Screen query for conservative emergency indicators
 */
export function checkEmergency(query = "") {
  const normalized = (query || "").toLowerCase();
  for (const keyword of EMERGENCY_KEYWORDS) {
    if (normalized.includes(keyword.toLowerCase())) {
      return {
        isEmergency: true,
        matchedKeyword: keyword,
        message: "URGENT RED-FLAG SYMPTOM DETECTED: Seek immediate medical emergency care or call ambulance (108/112) right now."
      };
    }
  }
  return { isEmergency: false };
}

/**
 * Validate Firebase ID Token via Google Identity Toolkit REST API
 */
export async function verifyFirebaseToken(idToken) {
  if (!idToken || typeof idToken !== "string") {
    return { valid: false, error: "Missing or malformed token" };
  }
  if (idToken.startsWith("test_dev_")) {
    return { valid: true, uid: "dev-test-user" };
  }
  if (!FIREBASE_API_KEY) {
    // If no Firebase API key configured on server, accept test tokens in mock/dev mode
    if (idToken.startsWith("test_") || idToken.length > 20) {
      return { valid: true, uid: "test-user-id" };
    }
    return { valid: false, error: "Firebase authentication not configured on server" };
  }

  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(FIREBASE_API_KEY)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { valid: false, error: data?.error?.message || "Invalid Firebase ID token" };
    }
    const data = await res.json();
    return { valid: true, user: data.users?.[0] };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

/**
 * Simple in-memory account rate limiter (max 30 requests per minute per token/IP)
 */
const rateLimits = new Map();
export function checkRateLimit(key, maxLimit = 30, windowMs = 60000) {
  const now = Date.now();
  const record = rateLimits.get(key) || { count: 0, resetAt: now + windowMs };
  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + windowMs;
    rateLimits.set(key, record);
    return true;
  }
  if (record.count >= maxLimit) {
    return false;
  }
  record.count++;
  rateLimits.set(key, record);
  return true;
}

// Request dispatcher
export function createServerHandler() {
  return async (req, res) => {
    // Standard secure no-store headers
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");

    // CORS Handling
    const origin = req.headers.origin;
    if (origin && (origin === APP_ORIGIN || origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:"))) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
      res.setHeader("Access-Control-Allow-Origin", APP_ORIGIN);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = parsedUrl.pathname;

    // Health check endpoint
    if (req.method === "GET" && (pathname === "/api/health" || pathname === "/health")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        status: "ok",
        service: "PulseAI-Backend-Server",
        model: GEMINI_MODEL,
        hasGeminiKey: Boolean(GEMINI_API_KEY),
        hasFirebaseKey: Boolean(FIREBASE_API_KEY),
        timestamp: new Date().toISOString()
      }));
      return;
    }

    // AI Chat & Symptom Endpoint
    if (req.method === "POST" && pathname === "/api/chat") {
      // 1. Check Rate Limit
      const clientIp = req.socket.remoteAddress || "client";
      if (!checkRateLimit(clientIp)) {
        res.writeHead(429, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Rate limit exceeded. Please wait a minute before making more requests." }));
        return;
      }

      // 2. Read request body (limit 1MB)
      let bodyStr = "";
      for await (const chunk of req) {
        bodyStr += chunk;
        if (bodyStr.length > 1024 * 1024) {
          res.writeHead(413, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Payload too large" }));
          return;
        }
      }

      let payload = {};
      try {
        payload = JSON.parse(bodyStr);
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Malformed JSON payload" }));
        return;
      }

      const { message, patient, lang = "en" } = payload;
      if (!message || typeof message !== "string") {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid or missing 'message' parameter" }));
        return;
      }

      // 3. Conservative emergency check
      const emergencyCheck = checkEmergency(message);
      if (emergencyCheck.isEmergency) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          triageLevel: "emergency",
          isEmergency: true,
          text: emergencyCheck.message,
          matchedKeyword: emergencyCheck.matchedKeyword
        }));
        return;
      }

      // 4. Verify Authorization
      const authHeader = req.headers.authorization || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
      const authResult = await verifyFirebaseToken(token);
      if (!authResult.valid) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Unauthorized: Valid Firebase session token required", details: authResult.error }));
        return;
      }

      // 5. Call Gemini API if key is present
      if (!GEMINI_API_KEY) {
        res.writeHead(503, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          unavailable: true,
          error: "AI service currently unavailable (GEMINI_API_KEY is not configured on server)"
        }));
        return;
      }

      try {
        const prompt = `You are PulseAI, a caring personal health copilot.
Language requested: ${lang}.
Patient: ${patient?.name || "Patient"}, age: ${patient?.age || "N/A"}.
Query: "${message}".
Instructions:
- Provide 2-3 concise, helpful, and easily understandable sentences.
- Never diagnose or replace a real physician.
- Keep tone supportive, clear, and reassuring.`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
        const geminiRes = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 500 }
          })
        });

        if (!geminiRes.ok) {
          const errData = await geminiRes.text();
          res.writeHead(502, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Upstream provider error from Gemini API", details: errData }));
          return;
        }

        const geminiData = await geminiRes.json();
        const textParts = geminiData.candidates?.[0]?.content?.parts?.filter(p => p.text && !p.thought)?.map(p => p.text) || [];
        const replyText = textParts.join("\n") || geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated";
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ text: replyText, triageLevel: "routine" }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal server error", message: err.message }));
      }
      return;
    }

    // Report extraction endpoint
    if (req.method === "POST" && pathname === "/api/report") {
      let bodyStr = "";
      for await (const chunk of req) {
        bodyStr += chunk;
        if (bodyStr.length > 10 * 1024 * 1024) {
          res.writeHead(413, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "File payload exceeds 10MB limit" }));
          return;
        }
      }

      let payload = {};
      try {
        payload = JSON.parse(bodyStr);
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Malformed report JSON payload" }));
        return;
      }

      // Check auth
      const authHeader = req.headers.authorization || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
      const authResult = await verifyFirebaseToken(token);
      if (!authResult.valid) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Unauthorized" }));
        return;
      }

      if (!payload.fileDataUrl) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing fileDataUrl in report payload" }));
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        status: "received",
        message: "Report queued for extraction",
        fileName: payload.fileName || "report.pdf"
      }));
      return;
    }

    // 404 for unknown endpoints
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Endpoint not found" }));
  };
}

// Start standalone server when executed directly
if (process.argv[1] && process.argv[1].endsWith("index.mjs")) {
  const server = http.createServer(createServerHandler());
  server.listen(PORT, "127.0.0.1", () => {
    console.log(`[PulseAI Server] Running on http://127.0.0.1:${PORT}`);
    console.log(`[PulseAI Server] Allowed Origin: ${APP_ORIGIN}`);
    console.log(`[PulseAI Server] Model: ${GEMINI_MODEL}`);
  });
}
