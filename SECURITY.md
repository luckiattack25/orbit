# Security notes

ORBIT 0.1.0 is a static, single-browser personal workspace hosted on GitHub Pages.

- No authentication or remote data API exists.
- Projects, scratchpad content, and preferences are stored in browser local storage.
- Do not store passwords, API keys, or sensitive personal information in this version.
- Browser extensions or anyone with access to the browser profile may be able to read local storage.
- No remote PC control or external service connection is implemented.
- User-provided project and utility text is escaped or rendered as text.
- GitHub Pages does not provide per-response custom HTTP security headers for this project-site setup. The HTML includes a restrictive Content Security Policy as defense in depth; meta-delivered CSP does not support every HTTP-header directive.
- This static-site policy is not a substitute for server-side security controls. Future integrations that require secrets, authentication, or privileged operations need a trusted backend.

This is not a full security audit. A future integration must receive its own threat model, server-side secret handling, authentication/authorization design, and tests before release.
