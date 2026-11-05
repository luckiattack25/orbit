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
