# Engineering guidance reviewed

This document records the skill repositories and guidance supplied for ORBIT. It is a source index and review record, not proof that each skill has already been loaded into every future AI session. **Every AI contributor must inspect the actual skill files, load relevant instructions into its own working context, and apply the applicable procedures.** See the mandatory onboarding and per-task requirements in the root [AGENTS.md](../AGENTS.md).

- [Superpowers](https://github.com/obra/superpowers): inspect and load brainstorming, writing-plans, test-driven-development, and verification-before-completion skills.
- [Matt Pocock skills](https://github.com/mattpocock/skills): inspect codebase-design and relevant deep-module/architecture skills before structural changes.
- [Addy Osmani agent skills](https://github.com/addyosmani/agent-skills): inspect and load relevant frontend UI engineering, testing, and security/hardening skills.
- [Vercel agent skills](https://github.com/vercel-labs/agent-skills): inspect the catalog and use relevant web-design/engineering skills. React-specific practices do not override the current native-module stack.
- [Apple Design skill by Dick Wu](https://github.com/dickwu/apple-design-skill): inspect and load the skill's accessibility, layout, typography, color, and platform-aware interface guidance for design work. Use as design principles, not native Apple UI imitation.
- [Impeccable](https://github.com/pbakaus/impeccable): inspect the skill catalog and load relevant design direction, new-work, and craft-floor skills.
- [Hallmark](https://github.com/Nutlope/hallmark): inspect its skill instructions and apply relevant quality-floor and visual-distinction procedures; do not assume its linter/runtime is installed.
- [Cloudflare Security Audit Skill](https://github.com/cloudflare/security-audit-skill): inspect and apply its source-first security review and threat-boundary procedures for security-relevant work.
- [Microsoft Playwright](https://github.com/microsoft/playwright): inspect available agent/testing guidance and use browser automation when a suitable runner is available. State when it is unavailable.
- [Anthropic Knowledge Work Plugins](https://github.com/anthropics/knowledge-work-plugins): inspect role-specific workflows and load only those that directly apply to the task.
- [Nathan Gitter's Fluid Interfaces](https://github.com/nathangitter/fluid-interfaces): read and apply the implementation examples and principles for fluid gesture-driven interaction. This is ORBIT's primary practical motion reference, alongside Apple's WWDC18 *Designing Fluid Interfaces* and WWDC23 *Animate with springs*; see [motion language](design/motion.md).

These skill sources are agent-side guidance. They are not automatically installed into an AI environment and must not be added as dependencies to the ORBIT website. The AI contributor is responsible for loading and applying them using the supported mechanisms of its own environment. If a source or specific skill cannot be accessed, disclose that limitation and do not claim it was used.

No skill collection or external agent plugin is an ORBIT runtime dependency. No additional application dependencies are required.
