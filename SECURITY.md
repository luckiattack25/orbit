# Security notes

ORBIT 0.1.0 is a static, single-browser personal workspace.

- No authentication or remote data API exists.
- Projects, scratchpad content, and preferences are stored in browser local storage.
- Do not store passwords, API keys, or sensitive personal information in this version.
- Browser extensions or anyone with access to the browser profile may be able to read local storage.
- No remote PC control or external service connection is implemented.
- User-provided project and utility text is rendered as text or escaped before insertion into the interface.
- Vercel deployments receive a restrictive Content Security Policy and baseline browser security headers through `vercel.json`. Other static hosts may require equivalent host-level configuration.

This is not a full security audit. A future integration must receive its own threat model, server-side secret handling, authentication/authorization design, and tests before release.
