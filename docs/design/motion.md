# ORBIT motion language

ORBIT uses Nathan Gitter's [Fluid Interfaces recreation](https://github.com/nathangitter/fluid-interfaces) as its primary practical reference for fluid interaction. The underlying principles come from Apple's WWDC18 talk [Designing Fluid Interfaces](https://developer.apple.com/videos/play/wwdc2018/803/) and WWDC23 [Animate with springs](https://developer.apple.com/videos/play/wwdc2023/10158/). The [Apple Design skill for web interfaces](https://github.com/emilkowalski/skills/tree/main/skills/apple-design) is an additional practical reference.

The goal is not to copy Apple's visual interface or use one magic curve everywhere. The goal is to make interaction feel responsive, continuous, spatially consistent, and controlled.

## Motion principles

- Feedback begins with the user's action, not after a delayed decorative transition.
- Direct manipulation stays attached to the pointer, touch, or gesture.
- When a target changes during movement, preserve the current position and velocity rather than restarting the animation.
- On release, let gesture velocity influence momentum and the final settle where appropriate.
- Draggable surfaces can use restrained resistance at boundaries and a clear resting position.
- A critically damped or near-critically damped spring is the default. Use visible bounce only when it communicates momentum and improves the interaction.
- Motion is short, calm, and tied to a change in state. Avoid gratuitous bouncing or movement without purpose.
- Spatially related content may enter with a small vertical settle and restrained stagger.
- Ambient motion is limited to the dashboard orbital illustration: slow ring rotation, gentle planet drift, and low-amplitude star breathing.
- Motion does not carry meaning by itself; state and labels remain understandable without animation.
- All nonessential motion is removed when the user requests reduced motion.

## Spring model and CSS easing

For gesture-driven interactions, think in terms of responsiveness and damping. Damping ratio 1.0 is critically damped and settles without overshoot; lower damping can introduce bounce. Preserve release velocity and continuity when the target changes.

Use a real spring/physics model for draggable panels, flickable lists, swipe-to-dismiss sheets, or pointer-following elements. Do not use CSS keyframes for direct manipulation because fixed keyframes cannot preserve live gesture velocity.

For simple state changes that are not driven by a gesture, CSS easing is appropriate:

- --ease-fluid: cubic-bezier(.22, 1, .36, 1) for entering and settling interface content.
- --ease-settle: cubic-bezier(.2, .8, .2, 1) for short interactive feedback.

These CSS curves are simple easing functions, not physical spring simulations. Do not label them as springs or treat their control points as a replacement for response, damping, and velocity continuity.

## Accessibility and performance

- The prefers-reduced-motion: reduce media query disables ambient and entrance animation and all transitions.
- Keep the interface functional and understandable when motion is removed.
- Animate opacity and transforms rather than layout properties.
- Ambient loops run only on a small decorative illustration.
- Avoid unnecessary animation libraries. Add a spring utility only when a real interaction needs it and the implementation can be tested.

## References

- Nathan Gitter: Fluid Interfaces — https://github.com/nathangitter/fluid-interfaces
- Apple, WWDC18: Designing Fluid Interfaces — https://developer.apple.com/videos/play/wwdc2018/803/
- Apple, WWDC23: Animate with springs — https://developer.apple.com/videos/play/wwdc2023/10158/
- Emil Kowalski: Apple Design skill for web interfaces — https://github.com/emilkowalski/skills/tree/main/skills/apple-design
