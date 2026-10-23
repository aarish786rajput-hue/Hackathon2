# PulseAI: restored and hardened prototype

This copy restores source from Git commit f9c022d and leaves the original Downloads folder untouched. It remains a prototype. Demo patient profiles, generated sample reports, doctors and devices are not real medical records or verified services. Health data is kept in memory and disappears on reload. Offline emergency ID therefore only contains sample profile data after a reload; it is not a durable medical record.

## Run

Use Node 22.12 or newer and npm:

1. `npm ci`
2. Copy `.env.example` to `.env.local` and provide your Firebase web project settings.
3. Copy `.env.server.example` to `.env.server`. Set a NEW Gemini key, a currently supported model available to your account, and the matching Firebase web API key. Never use a `VITE_` prefix for the Gemini key.
4. Enable Firebase Email/Password authentication. Provision test accounts in Firebase Console. This version does not issue ABHA IDs or provide ABHA login.
5. In one terminal run `npm run server`; in another run `npm run dev`.
6. Open the exact origin configured in `APP_ORIGIN` (default `http://localhost:5173`), open account access and sign in. AI requests need a valid Firebase ID token. Sample viewing does not require authentication.
7. `npm test`, `npm run lint`, `npm run build`.

The Vite development proxy sends `/api` to port 3001. For deployment, terminate HTTPS at a reverse proxy, route `/api` to the loopback backend, serve `dist/`, and set `APP_ORIGIN` to the exact deployed origin. Bind the backend privately. Add infrastructure rate limits and request-size/time limits. No deployment has been performed.

## Cloud actions still required

- Rotate/revoke the previously exposed Gemini key in Google Cloud; changing local code cannot revoke an existing key or remove it from old deployments.
- Configure provider privacy/retention settings appropriate for health documents before using any real data.
- Cloud appointment and medical-record syncing is disabled. `firestore.rules` is a deny-all template; review the effect on existing apps before deploying rules to a shared Firebase project. These rules have NOT been deployed.
- Authentication enables AI access only. Demo profiles are not associated with the authenticated account. Real patient storage and clinician roles require a separately designed, authorized record system.

## Changes and limits

- All report/photo medical fallbacks and fixed personal readings were removed from the AI service. Failures return an explicit unavailable state. The chat does not analyze attached photos; use Reports for supported document extraction.
- Conservative emergency screening executes before model access on client and server. It is a heuristic with incomplete language/phrase coverage, not a validated triage system. No dosing or treatment protocol is supplied by the offline fallback.
- Server-only Gemini key; verified Firebase sessions, exact origin check, request validation, limits, timeouts and no-store responses. Server does not accept a client-selected model or arbitrary provider URL.
- Report fields require source excerpts, reference intervals and explicit statuses. This validates structure and internal consistency, not clinical accuracy or whether an AI excerpt truly matches the image. Users must compare the original document. No automatic import into vitals.
- Reports and chat sessions are scoped per sample patient. All browser health storage now uses an in-memory adapter. Old `pulseai_` browser entries are removed on startup; sign-out clears the session.
- Drug checks remain a seven-pair demonstration. No-match messages explicitly state incomplete coverage. The underlying content is not independently clinically validated.
- External Google page translation and fonts are removed; bundled translations remain. Service worker caches only same-origin static paths and excludes `/api`, query URLs and third parties. Its cache is versioned to retire the original broad cache.
- Tests cover mixed emergency symptoms, malformed reports, unauthorized requests, provider failures, successful extraction and account rate limits using mocked cloud responses. Live credentials, model quality and cloud configuration are not verified by those tests.

Before patient use: independently review clinical content, build and evaluate a clinically governed safety layer, validate language accessibility, complete privacy/security review, and implement account-scoped records and consent policies. This copy does not claim clinical validation or regulatory compliance.
