// Renders the dinner sponsor flyer, English and French, to out/: the HTML, a
// PNG at the original's 1365 x 2048 (for sharing) and a Letter PDF that fills
// the page (for print). Run from the repo root: `bun docs/flyers/dinner-2026/build.ts`
// (PRESENTING=proposed for the sign-off proof, =open once the officers sign).
// PUBLISH=en (or en,fr) also copies that flyer into src/assets/flyers/, which
// puts it on the sponsor page: only after the officers approve it.
// Chrome through WEB-startr.style.core's CDP helper, as the sign-off PDFs.
// The QR codes: bunx qrcode@1.5.4 -t svg -e M -q 1 -o qr-en.svg https://ffpf.org/sponsors/
import { createRequire } from "node:module";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { launch } from "../../../../WEB-startr.style.core/scripts/cdp.ts";
import { flyer } from "./template.ts";

const here = import.meta.dir;
const dinner = createRequire(import.meta.url)("../../../src/_data/dinner2026.js");
const mode = (process.env.PRESENTING || "hidden") as "hidden" | "proposed" | "open";
const suffix = mode === "hidden" ? "" : `-${mode}`;
const publish = (process.env.PUBLISH || "").split(",").filter(Boolean);
if (publish.length && mode === "proposed") throw new Error("PUBLISH refuses the proposed proof");
const site = `${here}/../../../src/assets/flyers`;

const chrome = await launch();
const page = await chrome.newPage("about:blank");
await page.init();
await page.setViewport(1365, 2048, false);
for (const lang of ["en", "fr"]) {
  const t = JSON.parse(readFileSync(`${here}/strings.${lang}.json`, "utf8"));
  const name = `flyer-${lang}${suffix}`;
  const html = `${here}/out/${name}.html`;
  writeFileSync(html, flyer(t, dinner, mode));
  await page.goto("file://" + html);
  await page.eval("document.fonts.ready.then(() => true)");
  await Bun.sleep(300);
  const fit = await page.eval(`({ overflow: [...document.querySelectorAll('.page *')].filter(e =>
      e.getBoundingClientRect().right > 1366 || e.getBoundingClientRect().bottom > 2049).map(e => e.className || e.tagName).slice(0, 5),
    fonts: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight) })`);
  const png = await page.send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 1365, height: 2048, scale: 1 } });
  writeFileSync(`${here}/out/${name}.png`, Buffer.from(png.data, "base64"));
  const pub = publish.includes(lang) ? `${site}/dinner-2026-sponsors-${lang}` : "";
  if (pub) {
    mkdirSync(site, { recursive: true });
    copyFileSync(`${here}/out/${name}.png`, `${pub}.png`);
    const small = await page.send("Page.captureScreenshot", { format: "webp", quality: 80,
      clip: { x: 0, y: 0, width: 1365, height: 2048, scale: 0.5 } });
    writeFileSync(`${pub}-preview.webp`, Buffer.from(small.data, "base64"));
  }
  // Letter, edge to edge: the same design on a 1583 x 2048 canvas (8.5 x 11),
  // whose @page size Chrome scales once onto the sheet. No `scale` or margins
  // here, or Chrome shrinks it a second time.
  const letter = `${here}/out/${name}-letter.html`;
  writeFileSync(letter, flyer(t, dinner, mode, 1583));
  await page.setViewport(1583, 2048, false);
  await page.goto("file://" + letter);
  await page.eval("document.fonts.ready.then(() => true)");
  await Bun.sleep(300);
  const pdf = await page.send("Page.printToPDF", { paperWidth: 8.5, paperHeight: 11, printBackground: true,
    marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, preferCSSPageSize: false });
  writeFileSync(`${here}/out/${name}-letter.pdf`, Buffer.from(pdf.data, "base64"));
  if (pub) copyFileSync(`${here}/out/${name}-letter.pdf`, `${pub}-letter.pdf`);
  await page.setViewport(1365, 2048, false);
  console.log(name, JSON.stringify(fit), pub ? "published" : "");
}
await chrome.close();
