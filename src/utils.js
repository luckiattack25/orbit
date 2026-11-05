export function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
export function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  return (bytes / 1024).toFixed(1) + " KB";
}
export function analyzeText(value = "") {
  const text = String(value);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return {characters:text.length, words, lines:text ? text.split(/\r\n|\r|\n/).length : 0};
}
export function formatJSON(value) {
  const parsed = JSON.parse(value);
  return JSON.stringify(parsed, null, 2);
}
