# ORBIT — Agent Instructions

> **Purpose:** This is the canonical, living instruction set for any AI agent or human contributor working in this repository. Read it before changing code. Keep it accurate as the product and architecture evolve.
>
> **Last reviewed:** 2026-11-05

## 1. Source of truth and decision order

Use this order when instructions appear to conflict:

1. The repository owner's latest explicit direction for the current task.
2. Applicable safety, privacy, legal, and platform constraints.
3. This file, which defines the durable project-wide expectations.
4. The relevant specialist document linked below.
5. Existing implementation and historical decisions.

Do not silently override a deliberate product decision. If a requested change would break the GitHub Pages hosting contract, weaken security, misrepresent a feature, or conflict with an explicit requirement, explain the trade-off and propose a compatible approach.

Inspect the current repository before making assumptions. This file is guidance, not proof that a feature is implemented; verify implementation in source and tests.

## 2. Product identity and intent

**Product:** ORBIT  
**Tagline:** Everything in your orbit.  
**Repository:** https://github.com/luckiattack25/orbit  
**Live site:** https://luckiattack25.github.io/orbit/

ORBIT is a personal-first digital environment that brings projects, utilities, services, and useful resources into one coherent workspace. It should feel like a polished environment someone returns to use, not a marketing page, generic SaaS dashboard, portfolio, social network, or AI assistant.

### Product principles

- Personal-first. A future multi-user model may be explored, but do not introduce accounts, collaboration, or multi-tenant assumptions without an explicit product decision.
- Useful on its own. Core local features must work without accounts, API keys, external services, or a remote computer.
- No AI product features. Do not add an AI assistant or AI-generated feature as an assumed part of ORBIT.
- Real functionality over visual promises. A control must work, have a clearly explained unavailable state, or be visibly marked as planned.
- Be honest. Never invent activity, data, connection health, account status, or successful integrations.
- Keep the experience calm, deliberate, responsive, and cohesive. Avoid feature bloat and decorative complexity that makes the workspace harder to use.

### Current feature truth

| Area | Current state |
| --- | --- |
| Overview / dashboard | Implemented |
| Projects | Create, edit, search, delete, and persist locally |
| Utilities | Local scratchpad, JSON format/minify/validation, text counts and transformations |
| Connections | Honest planned/not-connected status view; no live integrations |
| Remote PC | Future placeholder; no remote access or control |
| YouTube | Future placeholder; no connected account, API, or video interface |
| Business | Future placeholder |
| Appearance | Dark, light, and system themes |
| Accounts / cloud sync | Not implemented |
| Backend / database | Not implemented |
| Multi-user support | Not implemented |

Update this table when implementation changes. A planned area must not be described as completed merely because its screen exists.

## 3. Visual and interaction direction

### Visual identity

- The foundation is dark and predominantly monochrome: black, near-black, white, graphite, gray, and silver.
- Pink and blue are intentional accent colors. Use restrained glow, lighting, or gradients to add depth to selected details; do not turn every element into a neon accent.
- Preserve dark, light, and system theme support. Check contrast and interaction states in every theme.
- Aim for a carefully composed, premium, modern interface with strong hierarchy, clear spacing, precise alignment, and purposeful details.
- Do not imitate Apple's screens or copy proprietary UI. Translate sound design principles into ORBIT's own identity.
- Avoid generic dashboard templates, excessive rounded cards, gratuitous gradients, noisy decoration, arbitrary iconography, and inconsistent component styling.
- Keep branding coherent. The current geometric mark at assets/orbit-mark.svg is temporary; do not present it as the final owner-approved logo.

### Interaction quality

- Every visible control must have a real action or a clear disabled/planned explanation.
- Give immediate, perceivable feedback for actions, including loading, success, empty, error, selected, and unavailable states where relevant.
- Maintain predictable navigation, keyboard behavior, focus, and browser history.
- Prefer small, intentional transitions over motion for its own sake.
- Do not sacrifice clarity, accessibility, or performance for visual effects.

## 4. Motion standard — Nathan Gitter / Fluid Interfaces

**Keep using Nathan Gitter's Fluid Interfaces work as ORBIT's primary practical reference for fluid interaction.** It is grounded in Apple's WWDC18 talk *Designing Fluid Interfaces* and Apple's WWDC23 *Animate with springs*.

Primary references:
- Nathan Gitter, Fluid Interfaces: https://github.com/nathangitter/fluid-interfaces
- Apple WWDC18, Designing Fluid Interfaces: https://developer.apple.com/videos/play/wwdc2018/803/
- Apple WWDC23, Animate with springs: https://developer.apple.com/videos/play/wwdc2023/10158/
- Emil Kowalski, Apple Design skill for web interfaces: https://github.com/emilkowalski/skills/tree/main/skills/apple-design
- ORBIT's implementation notes: docs/design/motion.md

Treat this as an interaction model, not a single magic easing curve.

### Required motion behavior

1. **Direct manipulation feels attached.** When a user drags, swipes, pans, or moves an interactive surface, the object should respond continuously to the gesture rather than lagging behind or playing a pre-recorded animation.
2. **Preserve continuity.** When a target changes during motion, continue from the current position and velocity. Do not snap to a new starting point or unnecessarily restart from rest.
3. **Respect release velocity.** When a gesture ends, its momentum should influence the settle where that makes sense. Deceleration and spring settling should feel connected to the user's movement.
4. **Use soft boundaries intentionally.** For draggable surfaces, consider restrained resistance near edges and a clear return to a valid resting position. Do not let content escape the usable space or make bounds feel arbitrary.
5. **Use springs for gesture-driven motion.** Draggable panels, flickable lists, swipe-to-dismiss surfaces, and pointer-following objects need a spring/physics model that can preserve position and velocity. CSS keyframes or a fixed transition cannot provide that continuity on their own.
6. **Tune restraint first.** Use a critically damped or near-critically damped settle as the default. Add overshoot or bounce only when it communicates momentum and improves the interaction; never add bounce just to make an interface look lively.
7. **Keep simple transitions simple.** CSS easing is appropriate for non-gesture state changes such as hover, pressed states, and short page entrances. The current CSS easing tokens are not a physical spring simulation; do not describe them as one.
8. **Motion must remain optional.** Respect prefers-reduced-motion. Remove ambient loops and nonessential movement for users who request reduced motion, while keeping the interface understandable and functional.
9. **Protect performance.** Prefer transform and opacity. Avoid animating layout-heavy properties or adding perpetual motion to large parts of the interface.

When a spring is implemented, reason about responsiveness and damping separately. A higher damping ratio settles without overshoot; a lower ratio allows more bounce. Select values by testing the actual interaction rather than copying a number without context. Preserve the user's input velocity when retargeting.

Do not infer that every interface needs springs. The goal is responsiveness and continuity, not maximum movement.

## 5. Architecture and repository map

The current application is a static site built with semantic HTML, CSS, SVG, and native JavaScript modules.

| Path | Responsibility |
| --- | --- |
| index.html | Static application shell, semantic navigation, dialogs, metadata, CSP, and module entry |
| styles.css | Design tokens, themes, layout, components, responsive rules, and motion |
| src/main.js | App navigation, views, event handling, project workflows, utility UI, and theme behavior |
| src/storage.js | Small versioned browser-local persistence adapter and ID creation |
| src/utils.js | Pure formatting, escaping, and text-analysis helpers |
| assets/ | Static visual assets, including the temporary orbital mark |
| tests/ | Node built-in test-runner tests |
| scripts/dev-server.mjs | Minimal local-only preview server |
| .github/workflows/quality.yml | Automated syntax and test checks |
| docs/design/overview.md | Product and design overview |
| docs/design/motion.md | Detailed motion principles and implementation notes |
| docs/engineering-guidance.md | Summary of supplied engineering skill references |
| docs/plans/ | Scoped implementation plans |
| SECURITY.md | Current security boundaries and future integration requirements |
| AGENTS.md | Canonical contributor and AI-agent instructions |

Keep responsibilities clear. Put reusable persistence behavior in the storage adapter and pure transformations in utility modules. Avoid growing one module into an unmaintainable collection of unrelated responsibilities; split by coherent feature when the size and coupling justify it.

Do not add a framework, bundler, UI library, animation package, or runtime dependency just because it is familiar. First establish that the feature truly needs it and that it is compatible with static hosting.

## 6. Hosting and runtime contract

GitHub Pages is the production host. The repository root is published from the main branch as the project site at /orbit/.

- Production must remain deployable as static files.
- Use relative paths for scripts, styles, icons, and assets (for example, ./src/main.js). Root-absolute paths can break under the /orbit/ project prefix.
- Do not add server routes, server actions, server-side environment variables, or a requirement for a Node process in production.
- Node.js is used for local development and the test runner only.
- Keep .nojekyll; it tells Pages to publish the static files without Jekyll processing.
- Keep the page functional on the deployed project path, not just at localhost /.
- Verify the GitHub Pages deployment workflow before claiming a change is live.

GitHub Pages cannot host a private backend or keep server secrets. Browser-side code is public and inspectable. Do not put API keys, service-account credentials, passwords, signing secrets, or other secrets in HTML, JavaScript, CSS, public repository files, or browser storage.

A future companion service running on a user's own computer or a separately hosted backend is a distinct component, not a capability provided by GitHub Pages. Design it as a separate, explicitly configured and secured integration. Before implementing one, define authentication and authorization, explicit device pairing/consent, network reachability, HTTPS, origin/CORS policy, least privilege, safe failure behavior, and secret storage. Remote access must never be enabled by pretending a placeholder is connected or by exposing an unrestricted control endpoint.

## 7. Data, privacy, and security

- Current persistence is per-browser local storage through src/storage.js, using the versioned orbit:v1: key prefix.
- Data does not sync to another browser or device. Clearing site data can remove it. State this accurately in UI and docs.
- Do not store secrets or sensitive personal information in the current local-first version.
- Validate and normalize persisted data at read boundaries; browser storage is not automatically trustworthy.
- Escape untrusted values before inserting them into HTML. Prefer textContent for plain text. Never interpolate untrusted input into executable code, selectors, URLs, or markup without appropriate validation and escaping.
- Keep input sizes bounded and validate values before changing state.
- Preserve the restrictive Content Security Policy in index.html; change it only for a necessary, understood feature and document the reason.
- GitHub Pages does not provide custom per-response HTTP security headers in this setup. Do not claim that the HTML meta CSP replaces all response headers.
- Treat security reviews as scoped unless a complete audit was actually performed. Do not label the application secure or audited without evidence.
- Any future authentication, synchronization, third-party integration, or remote-computer feature requires its own threat model, authorization model, secure secret handling, and tests.

See SECURITY.md for the current boundary and docs/design/overview.md for architecture context.

## 8. Accessibility, responsive behavior, and quality

Accessibility is part of implementation, not a final decoration pass.

- Use semantic HTML and native controls when they fit.
- Every input needs a programmatic label. Every icon-only control needs an accessible name.
- Preserve logical heading order, keyboard access, visible focus, and sensible focus management for dialogs and navigation.
- Use ARIA only when native semantics are insufficient; keep attributes such as aria-expanded synchronized with the actual UI state.
- Maintain readable contrast and do not use color as the only way to communicate a state.
- Support narrow mobile layouts, touch input, and zoom without horizontal overflow.
- Respect reduced-motion preferences in both CSS and JavaScript-driven motion.
- Avoid unnecessary event listeners, layout thrashing, and large dependencies.
- Include empty, error, success, and unavailable states when a feature needs them.

## 9. Implementation workflow

For each meaningful task:

1. **Read first.** Inspect this file, the relevant specialist docs, the current source, tests, and GitHub workflow. Do not rely on old chat context when the repository can answer the question.
2. **Define the outcome.** Identify the user-visible behavior, affected modules, constraints, and acceptance checks. For larger changes, write a small plan before editing.
3. **Keep scope cohesive.** Make the smallest complete change that solves the requested problem. Reuse existing tokens and patterns. Avoid unrelated refactors.
4. **Test behavior.** Add or update regression tests for new logic and bugs. Prefer test-first development when practical. Do not add tests that merely restate implementation details without protecting behavior.
5. **Run the checks.** Use npm test and npm run check. Use npm run dev for local visual review when a browser is available.
6. **Review the result.** Inspect the diff for regressions, dead controls, broken relative paths, unsafe rendering, theme inconsistencies, responsive issues, and missing reduced-motion behavior.
7. **Verify deployment.** Check the GitHub Actions quality workflow and Pages deployment workflow when applicable. A successful local test is not proof of a successful deployment.
8. **Report evidence.** State exactly what changed and which checks passed. Clearly disclose anything not run, not visually inspected, or not deployed. Never claim a browser review, test, audit, or deployment that did not happen.

Do not install dependencies without a concrete need. If a new dependency is justified, explain why, check its maintenance and licensing, assess its size/security impact, and preserve the static production contract.

## 10. Mandatory AI skill loading and application

**This section is a requirement, not optional inspiration.** The owner supplied these skill repositories because ORBIT's AI contributors are expected to inspect the actual skills, load their instructions into their own working context, and apply the procedures to how they plan, design, code, test, review, and report. Merely listing a repository, reading its title, or saying a skill was considered does not satisfy this requirement.

### Required onboarding procedure

On the first session working in this repository, and again whenever the current agent environment does not retain the prior skill context:

1. **Inspect every supplied skill repository below.** Open the repository and inspect its current structure. Do not assume a README is the skill itself.
2. **Find and read the actual skill instructions.** Look for files named SKILL.md, skill.md, or the equivalent documented entry point. Read the top-level skill instructions and the task-relevant skill files, references, and checklists. Follow links within a skill when they are part of its procedure.
3. **Load skills into the agent, not the website.** Use the AI platform's supported skill loader, skill directory, plugin, or workspace mechanism to activate the relevant instructions for the agent session. If the environment cannot install skills, read their complete relevant instructions and carry those rules in the active working context. Do not add agent skills as ORBIT runtime dependencies or bundle them into the deployed website.
4. **Apply, do not just acknowledge.** Use each relevant skill's workflow, questions, constraints, and verification criteria in the work itself. Translate the guidance to ORBIT's static HTML/CSS/native-JavaScript architecture; do not blindly copy a skill's framework assumptions.
5. **Resolve conflicts deliberately.** Follow the source-of-truth order in Section 1. ORBIT's product requirements, GitHub Pages constraints, user direction, and safety/security requirements take precedence over incompatible generic skill advice. Explain any material incompatibility; do not silently ignore a relevant skill.
6. **Be honest about access.** If a repository, skill file, or installer cannot be reached, state exactly what was unavailable. Do not claim a skill was loaded, installed, or applied unless its instructions were actually inspected and used.

### Per-task skill selection

Before implementing a task, identify which loaded skills apply. At minimum, consider the categories below:

- **Planning and implementation process:** use Superpowers brainstorming, writing-plans, test-driven-development, and verification-before-completion procedures where relevant.
- **Architecture and code organization:** use Matt Pocock's codebase-design/deep-module guidance when changing module boundaries, data flow, or core logic.
- **Frontend implementation:** use Addy Osmani's frontend UI engineering guidance for interface work; use Vercel's applicable web-design/engineering skills where they fit the native web stack.
- **Design and interaction:** use Dick Wu's Apple Design skill and Impeccable's relevant design skills for layout, typography, hierarchy, accessibility, responsiveness, and craft; use Hallmark's quality-floor guidance where applicable.
- **Motion and gestures:** use Nathan Gitter's Fluid Interfaces work as the primary practical motion reference, together with the dedicated standard in Section 4 and docs/design/motion.md.
- **Security:** use Cloudflare's Security Audit skill for security-sensitive changes, integrations, data handling, browser-to-device connections, and threat-boundary reviews.
- **Browser verification:** use Playwright skills and tests when a browser runner is available and useful. If unavailable, perform the strongest available checks and explicitly state that browser automation was not run.
- **Specialized workflows:** inspect Anthropic Knowledge Work Plugins for a role-specific workflow when the task genuinely calls for one; do not install unrelated workflows merely to increase the skill count.

### Supplied skill repositories — inspect their actual skill files

| Source | Required inspection / application |
| --- | --- |
| [Superpowers](https://github.com/obra/superpowers) | Inspect the skill catalog and read brainstorming, writing-plans, test-driven-development, and verification-before-completion skills. Apply the relevant workflow stages. |
| [Matt Pocock skills](https://github.com/mattpocock/skills) | Inspect the catalog and read codebase-design and relevant architecture/deep-module skills before structural changes. |
| [Addy Osmani agent skills](https://github.com/addyosmani/agent-skills) | Inspect and load the applicable frontend UI engineering, testing, and security/hardening skills. |
| [Vercel agent skills](https://github.com/vercel-labs/agent-skills) | Inspect the available skills; use relevant web-design and engineering guidance. React-specific skills are not applicable unless the project architecture intentionally changes. |
| [Apple Design skill by Dick Wu](https://github.com/dickwu/apple-design-skill) | Read the skill entry point and relevant accessibility, layout, typography, color, and platform guidance for visual/interface tasks. |
| [Impeccable](https://github.com/pbakaus/impeccable) | Inspect its skill catalog and load relevant design direction, new-work, and craft-floor skills for UI changes. |
| [Hallmark](https://github.com/Nutlope/hallmark) | Inspect its instructions and apply relevant quality-floor and visual-distinction guidance; do not assume its linter/runtime is installed. |
| [Cloudflare Security Audit Skill](https://github.com/cloudflare/security-audit-skill) | Read and apply its source-first security review and threat-boundary procedures to security-relevant tasks. |
| [Microsoft Playwright](https://github.com/microsoft/playwright) | Inspect the available agent/testing guidance and use the browser-testing workflow if the environment supports it. |
| [Anthropic Knowledge Work Plugins](https://github.com/anthropics/knowledge-work-plugins) | Inspect available role-specific plugin/skill workflows and load only those that directly support the current task. |
| [Nathan Gitter — Fluid Interfaces](https://github.com/nathangitter/fluid-interfaces) | Read and apply the implementation examples and motion principles for gesture-driven or fluid interaction work. This remains ORBIT's primary practical motion reference. |

The docs/engineering-guidance.md file records the reviewed sources and how they relate to ORBIT. Update it when the owner supplies additional skills, a skill is replaced, or a source materially changes.

### Required completion standard

For meaningful work, the AI contributor's final report must briefly state the skill procedures it actually applied (for example, planning/TDD, Apple Design review, Nathan Gitter motion principles, or security review). Mention any relevant skill it could not load and why. Do not claim that every listed skill was used on every task; select what genuinely applies, but always inspect the catalog on onboarding and apply the appropriate skill procedures.

No skill collection is an ORBIT website dependency. Loading skills changes the agent's working methods and review process; it does not add code or external services to the deployed product.

## 11. Keeping this guide current

This document is meant to evolve with ORBIT. When a meaningful decision changes, update the relevant source of truth in the same change:

- Product scope, intended users, navigation, or feature status: update this file and docs/design/overview.md.
- Hosting, runtime, dependencies, storage, or module boundaries: update this file, README.md, and affected tests/docs.
- Animation behavior or visual interaction rules: update this file and docs/design/motion.md.
- Security or privacy boundaries: update this file and SECURITY.md.
- Engineering references or adopted skills: update this file and docs/engineering-guidance.md.
- New features: add tests and update the current feature-truth table and README as appropriate.

Keep detailed implementation explanations in the specialist documents and link them here instead of duplicating large specifications. Remove or revise obsolete guidance when a decision changes. Do not add a log entry for every commit; update the review date and durable instructions when the actual project contract changes.

**A future agent should be able to clone this repository, load the actual applicable skills into its own working context, read this file and the linked documents, inspect the code, and understand both what ORBIT is meant to become and how changes are expected to be made.**
