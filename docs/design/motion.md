# ORBIT motion language

ORBIT uses the motion principles described in Apple's WWDC18 talk *Designing Fluid Interfaces* and WWDC23 *Animate with springs*, plus practical web guidance from Nathan Gitter's Fluid Interfaces recreation and Emil Kowalski's Apple Design skill.

## Motion principles
- Feedback begins on pointer-down, not after a delayed transition.
- Most interface changes use a smooth, critically damped feel. Overshoot is not the default.
- Motion is short, calm, and tied to a change in state.
- Spatially related content enters with a small vertical settle and restrained stagger.
- Ambient motion is limited to the dashboard orbital illustration: slow ring rotation, gentle planet drift, and low-amplitude star breathing.
- Motion does not carry meaning by itself; state and labels remain understandable without animation.
- All motion is removed when the user requests reduced motion.

## CSS timing
- `--ease-fluid: cubic-bezier(.22, 1, .36, 1)` for entering and settling interface content.
- `--ease-settle: cubic-bezier(.2, .8, .2, 1)` for short interactive feedback.
- CSS easing is used for these simple, non-gesture-driven transitions. It is not represented as a full physical spring simulation.

## When to use a real spring
If ORBIT later adds draggable panels, flickable lists, swipe-to-dismiss sheets, or pointer-following elements, use a spring implementation that preserves current position and release velocity. Do not use CSS keyframes for direct manipulation. Start with damping ratio 1.0; add bounce only when the user's gesture carries momentum.

## Accessibility and performance
- The `prefers-reduced-motion: reduce` media query disables ambient and entrance animation and all transitions.
- Animate opacity and transforms rather than layout properties.
- Ambient loops run only on a small decorative illustration.
- No animation library is needed for the current foundation.

## References
- Apple, WWDC18: Designing Fluid Interfaces — https://developer.apple.com/videos/play/wwdc2018/803/
- Apple, WWDC23: Animate with springs — https://developer.apple.com/videos/play/wwdc2023/10158/
- Nathan Gitter: Fluid Interfaces — https://github.com/nathangitter/fluid-interfaces
- Emil Kowalski: Apple Design skill for web interfaces — https://github.com/emilkowalski/skills/tree/main/skills/apple-design
