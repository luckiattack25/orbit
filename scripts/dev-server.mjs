import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
const root = process.cwd();
const types = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml",".json":"application/json"};
createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    const relative = normalize(pathname === "/" ? "index.html" : pathname.slice(1));
    if (relative.startsWith("..") || relative.includes("\\..")) throw new Error("Invalid path");
    const body = await readFile(join(root, relative));
    res.writeHead(200, {"Content-Type":types[extname(relative)] || "application/octet-stream","X-Content-Type-Options":"nosniff","Referrer-Policy":"strict-origin-when-cross-origin"});
    res.end(body);
  } catch {
    res.writeHead(404, {"Content-Type":"text/plain; charset=utf-8","X-Content-Type-Options":"nosniff"});
    res.end("Not found");
  }
}).listen(4173, "127.0.0.1", () => console.log("ORBIT available at http://localhost:4173"));
