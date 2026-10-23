# Local validation

- 11 automated tests pass using Node's built-in test runner: `node --test tests/*.test.mjs`.
- All 43 JavaScript/JSX files pass Babel parsing, with relative imports checked for existing targets.
- Backend and service-worker scripts pass `node --check`.
- No credential values were copied from the original `.env.local`; example configuration files contain empty values.
- A full dependency installation, Vite build, linter run and browser walkthrough could not be completed: the supplied `node_modules` is incomplete, and repeated registry download attempts timed out or failed. No compiled release is included. Run the setup and build commands before deployment.
- Cloud authentication, live Gemini extraction, provider model availability and deployed Firestore rules are not tested. Cloud calls in the automated tests are mocked.

Do not interpret syntax checks or unit tests as a successful frontend build or clinical validation.
