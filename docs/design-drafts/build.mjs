// Builds the ffpf drafts from pages/*.html + _parts/ into src/drafts/, which the
// site publishes at /drafts/ (unlisted: noindex meta here, X-Robots-Tag in
// src/_headers): <page>/page.html (the preview), <page>/ffpf-<page>.html (viewer:
// notes, links between drafts, Desktop / Mobile, markup) and index.html.
// Node 18+, no deps. Run: node docs/design-drafts/build.mjs
import { readFileSync as read, writeFileSync as write, mkdirSync, readdirSync } from "node:fs";
import { viewer, index } from "./_parts/viewer.mjs";

const dir = new URL(".", import.meta.url).pathname;
const out = new URL("../../src/drafts/", import.meta.url).pathname; // _kit/ lives there too
const BASE = "/drafts";
const part = (n) => read(dir + "_parts/" + n, "utf8");
const ui = JSON.parse(part("ui.json"));
const icons = JSON.parse(part("icons.json"));
const svg = (n, style) => {
  if (!(n in icons)) throw new Error(`no icon "${n}"`);
  const size = style ? 'width="100%" height="100%"' : 'width="24" height="24"';
  return `<svg viewBox="0 0 24 24" ${size} fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${style ? ` style="${style}"` : ""}>${icons[n]}</svg>`;
};
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
// The markup keeps the site's final paths; the published drafts load the kit
// from /drafts/_kit/ until the build copies it to /assets/, and stay out of search.
const preview = (s) => s
  .replaceAll("/assets/startr.style/1.5.0/style.css", `${BASE}/_kit/style.css`)
  .replaceAll("/assets/theme/ffpf.css", `${BASE}/_kit/ffpf.css`)
  .replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<meta name="robots" content="noindex, nofollow">');

// Each page: line 1 is <!-- title: … | lang: … | section: … | path: … -->,
// then an optional <!-- notes: … --> with the design notes for the viewer.
// `order` sets the drafts' sequence, in the site's own order.
const drafts = readdirSync(dir + "pages").filter((f) => f.endsWith(".html")).sort().map((file) => {
  const [first, ...rest] = read(dir + "pages/" + file, "utf8").split("\n");
  const meta = Object.fromEntries([...first.matchAll(/(\w+): ([^|]+?)\s*(?=\||-->)/g)].map((m) => [m[1], m[2]]));
  let body = rest.join("\n");
  const notes = (body.match(/^<!-- notes:\s*([\s\S]*?)\s*-->/) || [])[1] || "";
  body = body.replace(/^<!-- notes:[\s\S]*?-->\n?/, "");
  return { name: file.replace(/\.html$/, ""), file, meta, notes, body };
}).sort((a, b) => Number(a.meta.order || 99) - Number(b.meta.order || 99));

// In the preview, a link to a drafted page opens that draft; other site links are inert.
const routes = Object.fromEntries(drafts.map((d) => [d.meta.path, `${BASE}/${d.name}/ffpf-${d.name}.html`]));
const linkDrafts = (s) => s.replace(/href="(\/[^"#]*)(#[^"]*)?"/g, (all, path) =>
  /^\/(drafts|wp-content|public|assets)\//.test(path) ? all
    : routes[path] ? `href="${routes[path]}" target="_top"`
    : `href="#" title="Not drafted: ${path}"`);

for (const d of drafts) {
  const html = (part("head.html") + part("header.html") + d.body + part("footer.html"))
    .replace(/\{\{ui\.(\w+)\}\}/g, (_, k) => {
      if (!(k in ui)) throw new Error(`${d.file}: no ui.${k}`);
      return ui[k];
    })
    .replace(/\{\{icon:([\w-]+)\}\}/g, (_, n) => svg(n))
    .replace(/\{\{mark:([\w-]+)\}\}/g, (_, n) => svg(n, ui.watermark))
    .replace(/\{\{cur:(\w+)\}\}/g, (_, s) => (s === d.meta.section ? ' aria-current="page"' : ""))
    .replaceAll("{{title}}", d.meta.title)
    .replaceAll("{{lang}}", d.meta.lang || "en");
  mkdirSync(out + d.name, { recursive: true });
  write(`${out}${d.name}/page.html`, linkDrafts(preview(html)));
  write(`${out}${d.name}/ffpf-${d.name}.html`, preview(viewer(d, drafts, esc(html), ui)));
}
write(out + "index.html", preview(index(drafts, read(dir + "_parts/intro.txt", "utf8").trim(), ui)));
console.log(`built ${drafts.length} drafts`);
