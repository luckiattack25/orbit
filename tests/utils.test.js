import test from "node:test";
import assert from "node:assert/strict";
import { escapeHTML, analyzeText, formatJSON, formatBytes } from "../src/utils.js";
test("escapes HTML special characters",()=>assert.equal(escapeHTML('<img src="x"> &'),"&lt;img src=&quot;x&quot;&gt; &amp;"));
test("counts words, characters, and lines",()=>assert.deepEqual(analyzeText("one two\nthree"),{characters:13,words:3,lines:2}));
test("formats valid JSON",()=>assert.equal(formatJSON('{"a":1}'),'{\n  "a": 1\n}'));
test("rejects invalid JSON",()=>assert.throws(()=>formatJSON("{bad")));
test("formats byte sizes",()=>assert.equal(formatBytes(2048),"2.0 KB"));
