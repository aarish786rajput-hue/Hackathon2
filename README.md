# Hackathon2 — PulseAI: Intelligent Personal Health Copilot

> A privacy-first, multimodal health copilot built with **React 19**, **Google Gemini 3.8 Flash**, and **Firebase** to make medical reports, drug safety, and health guidance accessible, multilingual, and safe.

---

### 🌟 Key Features
- 🤖 **AI Health Copilot:** Conversational triage and personalized wellness support powered by Gemini 3.8 Flash.
- 📄 **Multimodal Report Explainer:** Extracts and explains complex lab panels (CBC, Glycemic, Lipid) in plain everyday language.
- 💊 **Drug-Drug Interaction Checker:** Highlights counter-indications and warnings for common multi-drug regimens.
- 🚨 **Emergency Screening Engine:** Heuristic triage detecting critical red-flag symptoms (chest pain, stroke signs, dyspnea) before model queries.
- 🌐 **True Multilingual Support:** Native assistance across Hindi, Hinglish, Punjabi, Bengali, Marathi, Tamil, Telugu, and English.
- 🔒 **Privacy-First Architecture:** Server-only API key handling, verified Firebase authentication, in-memory session protection, and `no-store` headers.

---

### 🛠️ Tech Stack
- **Frontend:** React 19, Vite, Lucide Icons, Modern CSS Design System
- **Backend:** Node.js HTTP Proxy Server, Rate Limiting, Red-flag Triaging
- **AI Engine:** Google Gemini (Gemini 3.8 Flash)
- **Cloud & Auth:** Firebase Authentication & Cloud Firestore
- **Tooling:** Oxlint, Node Built-in Test Runner

---

### 🚀 Getting Started
See [SETUP.md](SETUP.md) for full installation, configuration, and security guidelines.

```bash
# 1. Install dependencies
npm install

# 2. Start Backend API Server
npm run server

# 3. In another terminal, start Frontend
npm run dev

# 4. Run tests and checks
npm test
npm run lint
npm run build
```
