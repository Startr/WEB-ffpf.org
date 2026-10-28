// Prop strings for pages on the new look, copied from the drafts
// (docs/design-drafts/_parts/ui.json, 2026-10-20). The restyle replaces this
// with src/_includes/ui.njk (docs/plans/2026-10-20-restyle.md, Phase 4).
// Pages that use it set `theme: true`, which loads /assets/theme/ffpf.css.
module.exports = {
  section: "--maxw:72rem; --m:0 auto 3rem; --p:0 1rem",
  pageHead: "--d:flex; --ai:center; --g:.9rem; --m:0 0 .75rem",
  title: "--m:0; --size:2.1rem; --size-md:3rem; --weight:800; --ls:-.035em; --lh:1.05; --c:var(--text-main)",
  eyebrow: "--ff:var(--font-mono); --size:.7rem; --tt:uppercase; --ls:.12em; --c:var(--primary-deep); --m:0 0 .5rem",
  lead: "--size:1.05rem; --size-md:1.15rem; --c:var(--text-bright); --maxw:40rem; --m:0",
  pill: "--d:inline-flex; --ai:center; --g:.45rem; --p:.65rem 1.3rem; --radius:999px; --bgi:linear-gradient(135deg, var(--primary-deep), var(--button-hover)); --c:var(--button-text); --weight:700; --ws:nowrap; --t-hover:translateY(-1px); --tn:transform var(--dur-1) var(--ease-out); --oe-focus:2px solid var(--primary); --oo:2px; text-decoration:none",
  glow: "--glow:5; --glow-c:var(--primary)",
  chip: "--d:inline-flex; --ai:center; --g:.45rem; --p:.6rem 1.2rem; --radius:999px; --bg:var(--background); --c:var(--text-main); --weight:600; --ws:nowrap; --boxs:var(--paper); --boxs-hover:var(--paper-lift); --boxs-focus:var(--paper-lift); --oe-focus:2px solid var(--primary); --oo:2px; text-decoration:none",
  tag: "--d:inline-flex; --ai:center; --g:.35rem; --p:.2rem .6rem; --radius:999px; --bg:color-mix(in srgb, var(--text-main) 6%, transparent); --size:.78rem",
  sheet: "--p:1.25rem; --radius:.5rem; --bg:var(--background); --boxs:var(--paper)",
  stack: "--p:1.5rem; --p-md:2.25rem; --radius:.5rem; --bg:var(--background); --boxs:var(--paper-stack); --mb:2.5rem",
  desk: "--p:1rem; --p-md:1.5rem; --radius:.6rem; --tone:4; --tone-of:var(--text-main); --bg:var(--toned, var(--background))",
  wash: "--pos:relative; --of:hidden; --bgi:linear-gradient(135deg, var(--primary-tint), var(--background) 65%)",
  tile: "--d:grid; --ai:center; --ji:center; --fx:none; --w:2.9rem; --h:2.9rem; --w-md:3.6rem; --h-md:3.6rem; --radius:.8rem; --bgi:linear-gradient(135deg, var(--primary), var(--primary-deep)); --c:var(--button-text); --glow:4; --glow-c:var(--primary)",
  rule: "--d:flex; --ai:center; --g:.75rem; --ff:var(--font-mono); --size:.72rem; --tt:uppercase; --ls:.12em; --c:var(--primary-deep); --m:0 0 1rem",
  entry: "--bl:3px solid var(--primary); --radius:.5rem; --p:1rem 1.25rem; --bg:var(--background); --boxs:var(--paper)",
  card: "--d:block; --h:100%; --p:1.25rem; --radius:.5rem; --bg:var(--background); --c:var(--text-main); --boxs:var(--paper); --boxs-hover:var(--paper-lift); --boxs-focus:var(--paper-lift); --t-hover:translateY(-2px); --tn:transform var(--dur-1) var(--ease-out); --oe-focus:2px solid var(--primary); text-decoration:none",
};
