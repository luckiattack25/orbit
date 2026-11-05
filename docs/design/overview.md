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

## Approaches considered
1. Next.js full-stack: capable, but adds framework and deployment complexity before a backend exists.
2. React/Vite: useful when component complexity or routing justifies it, but not necessary for this small static foundation.
3. Native static modules: selected for fast startup, zero runtime dependencies, straightforward hosting, and an easy future migration seam.

## Data model
Projects contain id, name, description, status, createdAt, updatedAt. Preferences contain theme and compact display choices. Scratchpad is a single locally stored text document. No secrets are stored.

## Design contract
Operate mode. The primary task is to enter ORBIT, scan the workspace, and quickly reach a tool or project. Use a persistent desktop sidebar, compact mobile navigation, strong typography, semantic color tokens, thin borders, and restrained ambient pink/blue light. Every interactive state must be visible and keyboard accessible. The app must work at narrow widths and with reduced motion.
