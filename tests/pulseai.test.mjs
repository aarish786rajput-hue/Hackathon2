import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { checkEmergency, verifyFirebaseToken, checkRateLimit, createServerHandler } from "../server/index.mjs";

test("1. emergency screening: identifies English chest pain", () => {
  const result = checkEmergency("Doctor, I have severe chest pain and dizziness");
  assert.equal(result.isEmergency, true);
  assert.equal(result.matchedKeyword, "chest pain");
});

test("2. emergency screening: identifies Hindi breathing difficulty", () => {
  const result = checkEmergency("मरीज को बहुत तेज़ सांस लेने में तकलीफ हो रही है");
  assert.equal(result.isEmergency, true);
  assert.equal(result.matchedKeyword, "सांस लेने में तकलीफ");
});

test("3. emergency screening: identifies Hinglish red flags", () => {
  const result = checkEmergency("Patient achanak behosh ho gaya hai");
  assert.equal(result.isEmergency, true);
  assert.equal(result.matchedKeyword, "behosh");
});

test("4. emergency screening: routine queries pass without trigger", () => {
  const result = checkEmergency("Can I take paracetamol for mild fever?");
  assert.equal(result.isEmergency, false);
});

test("5. auth verification: rejects missing or empty token", async () => {
  const result = await verifyFirebaseToken("");
  assert.equal(result.valid, false);
  assert.match(result.error, /Missing/i);
});

test("6. auth verification: rejects non-string token", async () => {
  const result = await verifyFirebaseToken(null);
  assert.equal(result.valid, false);
});

test("7. rate limiting: permits requests within quota", () => {
  const ip = "test-ip-1";
  const allowed = checkRateLimit(ip, 5);
  assert.equal(allowed, true);
});

test("8. rate limiting: blocks requests exceeding quota", () => {
  const ip = "test-ip-blocked";
  for (let i = 0; i < 5; i++) {
    checkRateLimit(ip, 5);
  }
  const blocked = checkRateLimit(ip, 5);
  assert.equal(blocked, false);
});

test("9. server handling: health check returns 200 with metadata", async () => {
  const handler = createServerHandler();
  const server = http.createServer(handler);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;

  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/health`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.status, "ok");
    assert.equal(data.service, "PulseAI-Backend-Server");
  } finally {
    server.close();
  }
});

test("10. server handling: rejects malformed JSON on /api/chat", async () => {
  const handler = createServerHandler();
  const server = http.createServer(handler);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;

  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "INVALID_JSON_PAYLOAD{{"
    });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.match(data.error, /Malformed/i);
  } finally {
    server.close();
  }
});

test("11. server handling: returns 401 unauthorized when Bearer token is missing", async () => {
  const handler = createServerHandler();
  const server = http.createServer(handler);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;

  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "What is healthy fasting blood sugar?" })
    });
    assert.equal(res.status, 401);
    const data = await res.json();
    assert.match(data.error, /Unauthorized/i);
  } finally {
    server.close();
  }
});
