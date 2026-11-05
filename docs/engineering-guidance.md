# Engineering guidance reviewed

This document records guidance reviewed from the supplied public repositories. These are references, not installed agent plugins or application dependencies. The canonical instructions for future contributors live in the root [AGENTS.md](../AGENTS.md).

- [Superpowers](https://github.com/obra/superpowers): brainstorming, writing plans, test-driven development, and verification-before-completion. Applied as scoped planning and evidence-based verification.
- [Matt Pocock skills](https://github.com/mattpocock/skills): codebase design and deep modules. Applied by keeping persistence and pure utility functions behind small interfaces.
- [Addy Osmani agent skills](https://github.com/addyosmani/agent-skills): frontend UI engineering, security and hardening, and testing. Applied through semantic controls, input bounds, safe text rendering, and verification.
- [Vercel agent skills](https://github.com/vercel-labs/agent-skills): relevant web-design principles were considered. React-specific practices were not applicable to the selected native-module stack.
- [Apple Design skill by Dick Wu](https://github.com/dickwu/apple-design-skill): accessibility, layout, typography, color, and cross-platform translation. Applied as general interface principles, not native Apple UI imitation.
- [Impeccable](https://github.com/pbakaus/impeccable): new-work direction and craft-floor guidance. Applied to responsive composition, meaningful states, restrained effects, and visual review.
- [Hallmark](https://github.com/Nutlope/hallmark): quality floor and distinct visual direction. Applied selectively; its skill runtime and linter were not installed.
- [Cloudflare Security Audit Skill](https://github.com/cloudflare/security-audit-skill): threat-boundary and source-first defensive review principles. No full security audit is claimed.
- [Microsoft Playwright](https://github.com/microsoft/playwright): browser automation concepts. Browser smoke checks should be run when a suitable browser runner is available; do not claim they were run otherwise.
- [Anthropic Knowledge Work Plugins](https://github.com/anthropics/knowledge-work-plugins): repository structure was inspected; role-specific workflows were not relevant to this app foundation.
- [Nathan Gitter's Fluid Interfaces](https://github.com/nathangitter/fluid-interfaces): primary practical reference for fluid, gesture-aware interaction, including continuity, velocity, and spring-based settling. This is used alongside Apple's WWDC18 *Designing Fluid Interfaces* and WWDC23 *Animate with springs*; see [motion language](design/motion.md).

No skill collection or external agent plugin was installed. No additional application dependencies are required.
