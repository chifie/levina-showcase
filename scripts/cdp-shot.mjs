// Desktop screenshot helper for scripts/capture-screenshots.sh.
// Usage: node scripts/cdp-shot.mjs <cdp-url> <page-url> <out-file> [wait-ms]
// Forces prefers-color-scheme: light before navigating, waits, then screenshots.
const CDP = process.argv[2];
const URL = process.argv[3];
const OUT = process.argv[4];
const WAIT = Number(process.argv[5] || 10000);

const targets = await (await fetch(`${CDP}/json`)).json();
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

// Emulate light color scheme before the page's theme script runs.
await send("Emulation.setEmulatedMedia", {
  media: "",
  features: [{ name: "prefers-color-scheme", value: "light" }],
});
await send("Page.enable");
await send("Page.navigate", { url: URL });
await new Promise((r) => setTimeout(r, WAIT));
const { data } = await send("Page.captureScreenshot", { format: "png" });
const fs = await import("node:fs");
fs.writeFileSync(OUT, Buffer.from(data, "base64"));
console.log(`wrote ${OUT}`);
ws.close();
process.exit(0);
