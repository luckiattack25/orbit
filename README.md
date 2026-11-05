# ORBIT

**Everything in your orbit.**

ORBIT is a personal, local-first digital environment for projects, utilities, and future service integrations. It is a static website hosted on **GitHub Pages**.

## Live site

https://luckiattack25.github.io/orbit/

## Hosting

GitHub Pages publishes the repository root from the `main` branch. The site uses plain HTML, CSS, SVG, and native JavaScript modules. It requires no Node.js runtime, server, build step, database, or environment variables when hosted.

The `.nojekyll` file tells GitHub Pages to publish the static files directly without Jekyll processing. All app assets use relative paths so the site works under the `/orbit/` project-site path.

## Local development

Requirements: Node.js 20+ (local preview only).

```bash
npm run dev
npm test
npm run check
```

Open http://localhost:4173 after starting the local preview server.

## Current foundation

- Dashboard and application navigation
- Local project creation, editing, searching, and deletion
- Scratchpad, JSON formatter/validator, and text tools
- Honest connection status and future integration areas
- Remote PC, YouTube, and Business placeholders
- Dark, light, and system themes
- Responsive desktop, tablet, and mobile layouts

## Data and privacy

Projects, scratchpad content, and preferences are stored in the current browser using versioned local-storage keys. Data does not sync between browsers or devices. Clearing browser site data removes the local workspace. Do not store passwords, API keys, or sensitive information in this version.

## Project notes

- Product and architecture: [docs/design/overview.md](docs/design/overview.md)
- Implementation plan: [docs/plans/foundation.md](docs/plans/foundation.md)
- Engineering guidance: [docs/engineering-guidance.md](docs/engineering-guidance.md)
- Security limitations: [SECURITY.md](SECURITY.md)

## Branding

The original orbital logo was not present in the repository when the foundation was created. The current mark is a temporary geometric replacement in `assets/orbit-mark.svg`.

## Version

0.1.0 — initial foundation.
