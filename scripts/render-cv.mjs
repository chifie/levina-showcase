// Renders scripts/cv/levina-chifie-cv.html to public/levina-chifie-cv.pdf
// with headless Chrome print-to-PDF (A4). Self-contained: it spawns and
// cleans up its own Chrome instance.
//
// Usage: node scripts/render-cv.mjs
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import { spawn } from "node:child_process";

const PORT = process.env.CDP_PORT || "9222";
const CDP = `http://127.0.0.1:${PORT}`;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "scripts", "cv", "levina-chifie-cv.html");
const outPath = path.join(root, "public", "levina-chifie-cv.pdf");

const profile = fs.mkdtempSync(path.join(os.tmpdir(), "cv-chrome-"));
const chrome = spawn(
  "google-chrome",
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    "--window-size=1280,900",
    "about:blank",
  ],
  { stdio: "ignore" },
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Wait for the CDP endpoint to come up.
let targets = null;
for (let i = 0; i < 30; i++) {
  try {
    targets = await (await fetch(`${CDP}/json`)).json();
    if (targets.length) break;
  } catch {
    // not up yet
  }
  await sleep(500);
}
if (!targets || !targets.length) throw new Error("Chrome CDP never came up");

const page = targets.find((t) => t.type === "page");
if (!page) throw new Error("no page target");

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const msgId = ++id;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
};
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});

await send("Emulation.setEmulatedMedia", {
  media: "",
  features: [{ name: "prefers-color-scheme", value: "light" }],
});
await send("Page.enable");
await send("Page.navigate", { url: `file://${htmlPath}` });
await sleep(1500);

const { data } = await send("Page.printToPDF", {
  printBackground: true,
  preferCSSPageSize: true,
  format: "A4",
  margin: { top: "0", bottom: "0", left: "0", right: "0" },
});
fs.writeFileSync(outPath, Buffer.from(data, "base64"));
console.log(`wrote ${outPath}`);

ws.close();
chrome.kill();
process.exit(0);
