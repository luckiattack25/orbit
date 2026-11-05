const PREFIX = "orbit:v1:";
export function readStore(key, fallback) {
  try {
    const value = localStorage.getItem(PREFIX + key);
    return value === null ? fallback : JSON.parse(value);
  } catch { return fallback; }
}
export function writeStore(key, value) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); return true; }
  catch { return false; }
}
export function removeStore(key) {
  try { localStorage.removeItem(PREFIX + key); return true; }
  catch { return false; }
}
export function createId() {
  return globalThis.crypto?.randomUUID?.() || "p-" + Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}
export const STORAGE_PREFIX = PREFIX;
