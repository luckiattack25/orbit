import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const read = path => readFile(new URL(path, import.meta.url), "utf8");

test("GitHub Pages entry uses relative local assets", async () => {
  const html = await read("../index.html");
  assert.match(html, /href="\.\/styles\.css"/);
  assert.match(html, /src="\.\/src\/main\.js"/);
  assert.match(html, /href="\.\/assets\/orbit-mark\.svg"/);
});
test("Pages marker exists and Vercel config is absent", async () => {
  await access(new URL("../.nojekyll", import.meta.url));
  await assert.rejects(access(new URL("../vercel.json", import.meta.url)));
});
test("application includes project deletion and URL history", async () => {
  const app = await read("../src/main.js");
  assert.match(app, /data-delete-project/);
  assert.match(app, /history\.pushState/);
  assert.match(app, /popstate/);
});
test("static app has no remote API or external runtime dependency", async () => {
  const html = await read("../index.html");
  const app = await read("../src/main.js");
  assert.doesNotMatch(html, /https?:\/\//);
  assert.doesNotMatch(app, /fetch\s*\(|XMLHttpRequest/);
});

test("motion respects reduced-motion preferences", async () => {
  const css = await read("../styles.css");
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /animation:\s*none\s*!important/);
  assert.match(css, /@keyframes planet-float/);
  assert.match(css, /@keyframes orbit-turn/);
});

test("agent instructions are discoverable and preserve the Nathan Gitter motion standard", async () => {
  const instructions = await read("../AGENTS.md");
  const readme = await read("../README.md");
  const motion = await read("../docs/design/motion.md");
  assert.match(readme, /\[AGENTS\.md\]\(AGENTS\.md\)/);
  assert.match(instructions, /Nathan Gitter/);
  assert.match(instructions, /MUST inspect the actual skills, load their instructions into their own working context/i);
  assert.match(instructions, /Apply, do not just acknowledge/i);
  assert.match(instructions, /final report must briefly state the skill procedures it actually applied/i);
  assert.match(instructions, /preserve.*position and velocity/i);
  assert.match(motion, /Fluid Interfaces/);
  assert.match(motion, /prefers-reduced-motion/);
});
