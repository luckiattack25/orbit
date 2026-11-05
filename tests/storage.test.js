import test from "node:test";
import assert from "node:assert/strict";
import { readStore, writeStore, removeStore, createId } from "../src/storage.js";

const values = new Map();
globalThis.localStorage = {
  getItem(key) { return values.has(key) ? values.get(key) : null; },
  setItem(key, value) { values.set(key, String(value)); },
  removeItem(key) { values.delete(key); }
};

test("reads fallback when no value exists", () => {
  assert.deepEqual(readStore("missing", []), []);
});
test("writes and reads JSON values", () => {
  assert.equal(writeStore("sample", { ready: true }), true);
  assert.deepEqual(readStore("sample", null), { ready: true });
});
test("removes a stored value", () => {
  writeStore("remove-me", 1);
  assert.equal(removeStore("remove-me"), true);
  assert.equal(readStore("remove-me", "fallback"), "fallback");
});
test("creates non-empty identifiers", () => {
  assert.equal(typeof createId(), "string");
  assert.ok(createId().length > 4);
});
