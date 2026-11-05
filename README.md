# ORBIT

**Everything in your orbit.**

ORBIT is a personal, local-first digital environment for projects, utilities, and future service integrations.

The initial foundation is intentionally independent of external accounts and services. Projects, notes, and preferences stay in this browser unless the user clears site data. No account, API key, remote computer, or connected service is assumed.

## Run locally

Requirements: Node.js 20+.

```bash
npm run dev
```

Then open http://localhost:4173.

Run the built-in checks:

```bash
npm test
npm run check
```

The app is a static site with no runtime dependencies. It can be deployed to Vercel or GitHub Pages without a backend or build step.

## Current foundation

- Dashboard and application navigation
- Local project creation, editing, searching, and deletion
- Utilities: private scratchpad, JSON formatter, and text tools
- Honest connection status and future integration areas
- Remote PC, YouTube, and Business placeholders
- Dark, light, and system themes
- Responsive desktop, tablet, and mobile layouts

## Data and privacy

Application data is stored in the current browser using versioned local-storage keys. It is not synchronized between browsers or devices. Clearing browser site data removes the local workspace. Do not use this initial version to store passwords, secrets, or sensitive personal information.

## Project notes

- Product and architecture: [docs/design/overview.md](docs/design/overview.md)
- Implementation plan: [docs/plans/foundation.md](docs/plans/foundation.md)
- Engineering guidance reviewed: [docs/engineering-guidance.md](docs/engineering-guidance.md)

## Branding

The original orbital logo was not present because the repository was empty at initialization. The current mark is a temporary geometric replacement; it is centralized in `assets/orbit-mark.svg` and can be swapped when the original artwork is supplied.

## Version

0.1.0 — initial foundation.
