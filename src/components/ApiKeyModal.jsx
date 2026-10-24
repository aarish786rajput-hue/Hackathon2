import React, { useState } from "react";
import { Key, X, CheckCircle2, Eye, EyeOff, ShieldCheck, RefreshCw, AlertCircle } from "lucide-react";
import { getStoredApiKey, setStoredApiKey } from "../services/geminiService";

export default function ApiKeyModal({ isOpen, onClose, lang = "en" }) {
  const [apiKey, setApiKey] = useState(() => getStoredApiKey());
  const [showKey, setShowKey] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [testingStatus, setTestingStatus] = useState(null); // 'testing' | 'success' | 'error' | null
  const [testResult, setTestResult] = useState("");
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // Whenever modal transitions to open, synchronize with latest stored key & reset test status
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setApiKey(getStoredApiKey());
      setStatusMsg("");
      setTestingStatus(null);
      setTestResult("");
    }
  }

  if (!isOpen) return null;

  // Detect key origin
  const localKey = typeof localStorage !== "undefined" ? (localStorage.getItem("pulseai_gemini_api_key") || "").trim() : "";
  const envKey = (typeof import.meta !== "undefined" && import.meta.env ? (import.meta.env.VITE_GEMINI_API_KEY || "") : "").trim();
  const activeKey = apiKey.trim() || getStoredApiKey();

  let sourceLabel = "";
  if (localKey && activeKey === localKey) {
    sourceLabel = lang === "hi" 
      ? "ब्राउज़र मेमोरी (localStorage) में स्थायी सुरक्षित" 
      : lang === "hinglish"
        ? "Browser LocalStorage me permanently saved hai"
        : "Permanently saved in browser storage (localStorage)";
  } else if (envKey && activeKey === envKey) {
    sourceLabel = lang === "hi" 
      ? "सिस्टम पर्यावरण (.env.local) से लोड किया गया" 
      : lang === "hinglish"
        ? "System environment (.env.local) se auto-loaded"
        : "Loaded automatically from system environment (.env.local)";
  } else if (activeKey) {
    sourceLabel = lang === "hi" ? "कस्टम कॉन्फ़िगर की गई कुंजी" : "Custom configured key";
  } else {
    sourceLabel = lang === "hi" 
      ? "इन-बिल्ट क्लिनिकल ट्राइएज इंजन सक्रिय" 
      : "In-built clinical triage engine active";
  }

  const handleSave = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setStoredApiKey(apiKey);
    setStatusMsg(
      lang === "hi"
        ? "Gemini API कुंजी स्थायी रूप से सहेज ली गई है!"
        : lang === "hinglish"
          ? "Gemini API Key permanently save ho gayi hai!"
          : "Gemini API Key saved permanently!"
    );
    setTimeout(() => {
      setStatusMsg("");
      onClose();
    }, 1400);
  };

  const handleClear = () => {
    setApiKey("");
    setStoredApiKey("");
    setStatusMsg(
      lang === "hi"
        ? "हटाया गया! इन-बिल्ट क्लिनिकल इंजन सक्रिय है।"
        : lang === "hinglish"
          ? "Key clear ho gayi! In-built offline engine active hai."
          : "Cleared! Built-in offline clinical engine is active."
    );
    setTimeout(() => {
      setStatusMsg("");
      onClose();
    }, 1200);
  };

  const handleTestConnection = async () => {
    const keyToTest = apiKey.trim() || getStoredApiKey();
    if (!keyToTest) {
      setTestingStatus("error");
      setTestResult(
        lang === "hi"
          ? "कृपया पहले Gemini API कुंजी दर्ज करें।"
          : lang === "hinglish"
            ? "Pehle Gemini API Key enter karein ya .env.local check karein."
            : "Please enter a Gemini API Key first."
      );
      return;
    }

    setTestingStatus("testing");
    setTestResult(lang === "hi" ? "Gemini AI से कनेक्ट किया जा रहा है..." : "Connecting to Gemini AI...");

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(keyToTest)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Respond with: OK" }] }],
          generationConfig: { maxOutputTokens: 5, temperature: 0.1 }
        })
      });

      if (res.ok) {
        setTestingStatus("success");
        setTestResult(
          lang === "hi"
            ? "सफलतापूर्वक कनेक्ट हुआ! Gemini AI मॉडल पूरी तरह सक्रिय और तैयार है।"
            : lang === "hinglish"
              ? "Connection Successful! Gemini 1.5 Flash live prescription & chat ke liye ready hai."
              : "Connection Successful! Gemini 1.5 Flash is ready for live prescription and chat."
        );
      } else {
        const errorData = await res.json().catch(() => ({}));
        const errMsg = errorData?.error?.message || `HTTP ${res.status}`;
        setTestingStatus("error");
        setTestResult(
          lang === "hi"
            ? `Google API त्रुटि: ${errMsg}. कृपया अपनी कुंजी जांचें या इन-बिल्ट इंजन का उपयोग करें।`
            : `Google API Error: ${errMsg}. You can still use the built-in clinical engine.`
        );
      }
    } catch {
      setTestingStatus("error");
      setTestResult(
        lang === "hi"
          ? "नेटवर्क त्रुटि: इंटरनेट कनेक्शन जांचें। इन-बिल्ट क्लिनिकल इंजन सक्रिय रहेगा।"
          : "Network error: check internet. The offline clinical engine will continue working."
      );
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1200 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: "540px", 
          borderRadius: "18px",
          boxShadow: "0 24px 60px -12px rgba(0, 0, 0, 0.45)",
          border: "1px solid var(--border-color)",
          background: "var(--bg-card)",
          animation: "scaleIn 0.2s ease"
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: "18px 24px",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "var(--primary-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary)"
            }}>
              <Key size={19} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0, color: "var(--text-highlight)" }}>
                {lang === "hi" ? "Gemini AI इंजन कॉन्फ़िगरेशन" : "Gemini AI Engine Configuration"}
              </h2>
              <p style={{ margin: "2px 0 0 0", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                {lang === "hi" ? "स्थायी कुंजी प्रबंधन और लाइव मॉडल स्थिति" : "Permanent Key Management & Live Model Status"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="btn btn-secondary" 
            style={{ padding: "6px 8px", borderRadius: "8px" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>
          
          {/* Active Key Status Card */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "11px 14px",
            background: activeKey ? "rgba(16, 185, 129, 0.09)" : "rgba(245, 158, 11, 0.09)",
            border: `1px solid ${activeKey ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
            borderRadius: "12px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span style={{ fontSize: "1.1rem" }}>{activeKey ? "🟢" : "🟠"}</span>
              <div>
                <div style={{ fontSize: "0.84rem", fontWeight: 800, color: "var(--text-highlight)" }}>
                  {activeKey
                    ? (lang === "hi" ? "Gemini AI इंजन: सक्रिय और तैयार" : "Gemini AI Engine: Active & Ready")
                    : (lang === "hi" ? "ऑफलाइन क्लिनिकल इंजन सक्रिय" : "Built-in Clinical Engine Active")}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "1px" }}>
                  {sourceLabel}
                </div>
              </div>
            </div>
            {activeKey && (
              <span style={{
                fontSize: "0.68rem",
                fontWeight: 800,
                color: "#10b981",
                background: "rgba(16, 185, 129, 0.16)",
                padding: "3px 8px",
                borderRadius: "6px"
              }}>
                ACTIVE
              </span>
            )}
          </div>

          {/* End-User / Visitor Notice */}
          <div style={{
            background: "linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(16, 185, 129, 0.07))",
            border: "1px solid rgba(14, 165, 233, 0.22)",
            borderRadius: "12px",
            padding: "12px 14px",
            fontSize: "0.8rem",
            lineHeight: "1.5"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", fontWeight: 800, color: "var(--text-highlight)", marginBottom: "4px" }}>
              <ShieldCheck size={16} color="#0284c7" />
              <span>
                {lang === "hi"
                  ? "क्या आम विज़िटर्स / यूज़र्स को भी API Key डालनी होगी?"
                  : lang === "hinglish"
                    ? "Kya Website Visitors ya Patients ko bhi Key dalni hogi?"
                    : "Do End Users or Patients need to enter an API key?"}
              </span>
            </div>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.78rem" }}>
              {lang === "hi"
                ? "बिल्कुल नहीं! प्रोडक्शन में विज़िटर्स के लिए Gemini AI बैकग्राउंड में सिस्टम से अपने आप काम करता है। किसी भी मरीज़ को कभी भी API key डालने की आवश्यकता नहीं है। यह सेक्शन केवल आपके एडमिन/डेवलपर ओवरराइड के लिए है।"
                : lang === "hinglish"
                  ? "Bilkul nahi! Visitors ke liye Gemini AI background me system se automatically kaam karta hai. Kisi bhi patient ko API key paste karne ki zaroorat nahi hai. Ye section sirf aapke admin override ke liye hai."
                  : "No, never! For all visitors and patients, Gemini AI works automatically in the background via the system environment. This key modal is only for developer/admin overrides."}
            </p>
          </div>

          {/* Input Field with Show/Hide Eye Button */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>
                {lang === "hi" ? "Gemini API Key (स्थायी रूप से सहेजें)" : "Gemini API Key (Saved Permanently)"}
              </label>
              <button
                type="button"
                onClick={() => setShowKey(prev => !prev)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--primary)",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{showKey ? (lang === "hi" ? "छिपाएं" : "Hide") : (lang === "hi" ? "देखें" : "Show Key")}</span>
              </button>
            </div>

            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setTestingStatus(null);
                  setTestResult("");
                }}
                placeholder="AIzaSy... (Paste once to save permanently)"
                style={{
                  width: "100%",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.84rem",
                  padding: "10px 40px 10px 12px",
                  borderRadius: "10px",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-elevated)",
                  color: "var(--text-highlight)"
                }}
              />
              <button
                type="button"
                onClick={() => setShowKey(prev => !prev)}
                style={{
                  position: "absolute",
                  right: "10px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center"
                }}
                title={showKey ? "Hide key" : "Show key"}
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "5px", display: "block" }}>
              {lang === "hi"
                ? "यह कुंजी आपके ब्राउज़र की लोकल स्टोरेज में हमेशा के लिए सुरक्षित रहती है।"
                : "Saved permanently in your browser's secure localStorage across all reloads."}
            </span>
          </div>

          {/* Test Connection Button & Result */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testingStatus === "testing"}
              style={{
                alignSelf: "flex-start",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                padding: "6px 12px",
                fontSize: "0.76rem",
                fontWeight: 700,
                color: "var(--text-highlight)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <RefreshCw size={13} className={testingStatus === "testing" ? "spin-icon" : ""} />
              <span>
                {testingStatus === "testing"
                  ? (lang === "hi" ? "जांच हो रही है..." : "Testing...")
                  : (lang === "hi" ? "कनेक्शन की जांच करें (Test Key)" : "Test Key Connection")}
              </span>
            </button>

            {testResult && (
              <div style={{
                padding: "8px 12px",
                borderRadius: "9px",
                fontSize: "0.76rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: testingStatus === "success" ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                border: `1px solid ${testingStatus === "success" ? "rgba(16, 185, 129, 0.35)" : "rgba(239, 68, 68, 0.35)"}`,
                color: testingStatus === "success" ? "#10b981" : "#ef4444"
              }}>
                {testingStatus === "success" ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                <span>{testResult}</span>
              </div>
            )}
          </div>

          {/* Status Message */}
          {statusMsg && (
            <div style={{
              color: "#10b981",
              fontSize: "0.84rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(16, 185, 129, 0.1)",
              padding: "8px 12px",
              borderRadius: "8px"
            }}>
              <CheckCircle2 size={16} />
              <span>{statusMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "6px",
            borderTop: "1px solid var(--border-color)",
            paddingTop: "14px"
          }}>
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-secondary"
              style={{ fontSize: "0.8rem", padding: "8px 12px" }}
            >
              {lang === "hi" ? "कुंजी हटाएं (Reset)" : "Clear / Reset"}
            </button>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
                style={{ fontSize: "0.82rem", padding: "8px 14px" }}
              >
                {lang === "hi" ? "रद्द करें" : "Cancel"}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  fontSize: "0.82rem",
                  padding: "8px 16px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <CheckCircle2 size={15} />
                <span>{lang === "hi" ? "हमेशा के लिए सहेजें" : "Save Permanently"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
