// Writes the public sponsor list for ffpf.org (officer item 13) from FFPF's
// PocketBase: approved sponsors who agreed to be shown, with their public
// name, tier and website only, into src/_data/sponsors2026.json, and the
// Presenting and Gold logos into src/public/uploads/2026/sponsors/ (a folder
// this script owns). Contact details never leave PocketBase.
//
//   PB_EMAIL=ffpf-sync@startr.cloud PB_PASSWORD=bw:ffpf-pb-sync \
//     sage-secret run -- node scripts/sponsors-pull.mjs
//
// Node 18+, no dependencies. Then build, look, and commit.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

const root = new URL("../src/", import.meta.url).pathname;
const pb = (process.env.PB_URL || "https://pb.ffpf.org").replace(/\/$/, "");
const dir = "public/uploads/2026/sponsors";
const RANK = { presenting: 0, gold: 1, silver: 2 };
const WITH_LOGO = new Set(["presenting", "gold"]);
const IMAGE = /\.(png|jpe?g|svg|webp)$/i;

async function api(path, init = {}) {
  const res = await fetch(pb + path, init);
  if (!res.ok) throw new Error(`${init.method || "GET"} ${path}: ${res.status}`);
  return res;
}

const { token } = await (await api("/api/collections/_superusers/auth-with-password", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ identity: process.env.PB_EMAIL, password: process.env.PB_PASSWORD }),
})).json();
const auth = { headers: { Authorization: token } };
const filter = encodeURIComponent('status = "approved" && consent_display = true');
const { items } = await (await api(`/api/collections/sponsors/records?perPage=200&filter=${filter}`, auth)).json();
const { token: fileToken } = await (await api("/api/files/token", { method: "POST", ...auth })).json();

mkdirSync(root + dir, { recursive: true });
const keep = new Set();
const sponsors = [];
for (const s of items.sort((a, b) => RANK[a.tier] - RANK[b.tier] || a.announce_as.localeCompare(b.announce_as))) {
  const slug = s.announce_as.toLowerCase().normalize("NFKD").replace(/[^\w]+/g, "-").replace(/^-|-$/g, "") || s.id;
  const entry = { name: s.announce_as, tier: s.tier, website: s.website || "", logo: "" };
  if (WITH_LOGO.has(s.tier) && IMAGE.test(s.logo || "")) {
    const file = `${slug}${s.logo.match(IMAGE)[0].toLowerCase()}`;
    const bytes = await (await api(`/api/files/sponsors/${s.id}/${s.logo}?token=${fileToken}`)).arrayBuffer();
    writeFileSync(`${root}${dir}/${file}`, Buffer.from(bytes));
    keep.add(file);
    entry.logo = `/${dir}/${file}`;
  } else if (WITH_LOGO.has(s.tier)) {
    console.log(`no usable logo yet: ${s.announce_as} (${s.logo || "none"}); shown by name`);
  }
  sponsors.push(entry);
}
for (const file of readdirSync(root + dir)) if (!keep.has(file)) rmSync(`${root}${dir}/${file}`);
writeFileSync(root + "_data/sponsors2026.json", JSON.stringify(sponsors, null, 2) + "\n");
console.log(`sponsors2026.json: ${sponsors.length} sponsors, ${keep.size} logos`);
