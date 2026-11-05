# ORBIT product and design overview

## Intent
ORBIT is a personal digital environment that gathers useful tools, projects, and resources in one place. It must be useful before external services are connected.

## Goals
- Fast, responsive personal workspace.
- Local-first projects, notes, and preferences.
- Honest integration states and clear future areas.
- Distinctive monochrome foundation with restrained pink and blue accents.
- Dark, light, and system themes.

## Non-goals
- Social network, portfolio, generic SaaS, or AI assistant.
- Authentication, cloud sync, database, or remote-control implementation.
- Fake integration status or fabricated activity.

## Architecture
A static application built from semantic HTML, CSS custom properties, and native JavaScript modules. Feature state is persisted through a small versioned local-storage adapter. The UI shell and feature views are separated from storage and formatting utilities.

## Hosting contract
GitHub Pages publishes the repository root from the `main` branch. This is a project site at `/orbit/`, so app entry points, scripts, stylesheets, and image assets use relative URLs. No server routes, server-side environment variables, Node runtime, or backend APIs are required. The `.nojekyll` marker disables Jekyll processing for static assets.

## Approaches considered
1. Next.js full-stack: not selected because GitHub Pages cannot run its server-side features.
2. React/Vite: could be used only with a static export/build configured for the project base path; unnecessary for the current feature set.
3. Native static modules: selected for zero runtime dependencies, straightforward GitHub Pages publishing, and an easy future migration seam.

## Data model
Projects contain id, name, description, status, createdAt, updatedAt. Preferences contain theme. Scratchpad is a single locally stored text document. No secrets are stored.

## Design contract
Operate mode. The primary task is to enter ORBIT, scan the workspace, and quickly reach a tool or project. Use a persistent desktop sidebar, compact mobile navigation, strong typography, semantic color tokens, thin borders, and restrained ambient pink/blue light. Every interactive state must be visible and keyboard accessible. The app must work at narrow widths and with reduced motion.
