// The flyer's markup, from the strings (strings.<lang>.json) and the dinner's
// data (src/_data/dinner2026.js). `presenting`: "hidden" (Gold and Silver
// only), "proposed" (a column marked for the officers' sign-off) or "open".
import { readFileSync } from "node:fs";

const here = import.meta.dir;
const ICONS = JSON.parse(readFileSync(`${here}/../../design-drafts/_parts/icons.json`, "utf8"));
const icon = (n: string) =>
  `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-4px;margin-right:8px">${ICONS[n]}</svg>`;

// `width`: 1365 for the PNG, 1583 for Letter (2048 x 8.5 / 11), so the PDF fills the page.
export function flyer(t: any, d: any, presenting: "hidden" | "proposed" | "open", width = 1365) {
  const lang = t.lang;
  const tiers = d.tiers.filter((x: any) => x.open || (x.id === "presenting" && presenting !== "hidden"));
  const cell = (v: any, i: number) => {
    const alt = tiers[i].id === "silver" ? ' class="alt"' : "";
    if (v === true) return `<td${alt}><span class="yes">✓</span></td>`;
    if (!v) return `<td${alt}><span class="no">✕</span></td>`;
    return `<td${alt}>${v}</td>`;
  };
  const rows = d.benefits
    .filter((b: any) => tiers.some((x: any) => b[x.id]))
    .map((b: any) => `<tr><th scope="row">${b[lang]}</th>${tiers.map((x: any, i: number) => cell(b[x.id], i)).join("")}</tr>`)
    .join("\n");
  const head = tiers.map((x: any) =>
    `<th class="${x.id}"><small>${x.name[lang]}</small><b>${x.label[lang]}</b>${x.id === "presenting" && presenting === "proposed" ? `<em>${t.proposed}</em>` : ""}</th>`).join("");
  // Rows share the room between the table head (845 + 170) and the why box,
  // which ends 26px above the footer band (top 1768).
  const rowCount = rows.split("<tr>").length - 1;
  const rowH = Math.min(96, Math.floor((1768 - 26 - 172 - 26 - 845 - 170) / rowCount));
  const tableBottom = 845 + 170 + rowCount * rowH;
  const lockup = lang === "en"
    ? `<img src="../../../../src/public/uploads/2018/10/logo-ffpf.webp" alt="Freedom From Poverty Foundation" style="height:80px">`
    : `<img src="../../../../src/public/uploads/2018/10/cropped-logo-ffpf-icon-192x192.webp" alt=""><span class="name">${t.orgName}</span>`;
  const qr = readFileSync(`${here}/qr-${lang}.svg`, "utf8").replace(/^<\?xml[^>]*>|<!DOCTYPE[^>]*>/g, "");

  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><title>FFPF 27th Annual Dinner, sponsors (${lang})</title>
<link rel="stylesheet" href="../flyer.css"><link rel="stylesheet" href="../flyer-2.css">
<style>@page { size: ${width}px 2048px; margin: 0; }</style></head>
<body><div class="page" style="--pw:${width}px">
<img class="photo" src="../photo.jpg" alt="">
<div class="badge"><b>${t.ticketBadge[0]}</b><span>${t.ticketBadge[1]}</span></div>
<div class="intro">
  <div class="lockup">${lockup}</div>
  <p class="tagline">${t.tagline}</p>
  <h1>${t.title1}<em>${t.title2}</em></h1>
  <p class="pill">${t.pill.join("<i>•</i>")}</p>
  <p class="lead">${t.lead}</p>
  <div class="facts">
    <div><small>${t.factDate}</small><b>${t.date}</b><span>${d.time[lang]}</span></div>
    <div><small>${t.factVenue}</small><b>${d.venue}</b><span>${d.city[lang]}</span></div>
    <div><small>${t.factGuests}</small><b>${d.guests}</b><span>${t.guestsNote}</span></div>
  </div>
</div>
<div class="band-title">${t.bandTitle}</div>
<table style="--row:${rowH}px"><thead><tr><th></th>${head}</tr></thead><tbody>
${rows}
</tbody></table>
<div class="why" style="top:${tableBottom + 26}px"><h2>${t.why}</h2><ul>${t.whyItems.map((w: string) => `<li>${w}</li>`).join("")}</ul></div>
<div class="band" style="bottom:44px">
  <div class="qr">${qr}</div>
  <div class="join"><small>${t.join}</small><b>${t.by}</b><span>${t.url}</span></div>
  <div class="contacts">${d.contacts.map((c: any) => `<p>${c.name}<span>${c.phone}</span></p>`).join("")}</div>
  <div class="together"><b>${t.together}</b><p>${icon("facebook")}${t.social[0]}<br>${icon("instagram")}${t.social[1]}</p></div>
</div>
<div class="legal">La Fondation de la Libération de la Pauvreté Inc. · CRA 892570938RR0001</div>
</div></body></html>`;
}
