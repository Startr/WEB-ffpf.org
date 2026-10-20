// The viewer around each mockup, after Tony's Trellis drafts: a header with the
// design notes, links between the drafts, the real page in an iframe at desktop
// width or in a 390px phone, and its markup underneath.
export const DATE = "2026-10-20";

export function shell(title, inner, ui) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="/assets/startr.style/1.5.0/style.css">
<link rel="stylesheet" href="/assets/theme/ffpf.css">
</head>
<body style="--bg:var(--background); --p:1.5rem 1.25rem 3rem; --maxw:84rem; --m:0 auto">
${inner}
</body>
</html>
`;
}

const href = (d) => `../${d.name}/ffpf-${d.name}.html`;

function draftNav(d, drafts, ui) {
  const i = drafts.indexOf(d);
  const prev = drafts[(i - 1 + drafts.length) % drafts.length];
  const next = drafts[(i + 1) % drafts.length];
  const all = drafts.map((x) =>
    `<a href="${href(x)}" style="${ui.navLink}"${x === d ? ' aria-current="page"' : ""}>${x.meta.title}</a>`).join("");
  return `<nav aria-label="Drafts" style="--d:flex; --fw:wrap; --ai:center; --g:.4rem; --mb:1.25rem">
  <a href="../index.html" style="${ui.chip}">All drafts</a>
  <a href="${href(prev)}" rel="prev" style="${ui.chip}">← ${prev.meta.title}</a>
  <a href="${href(next)}" rel="next" style="${ui.chip}">${next.meta.title} →</a>
  <span style="--d:flex; --fw:wrap; --g:.15rem">${all}</span>
</nav>`;
}

export function viewer(d, drafts, code, ui) {
  const btn = (mode, label) =>
    `<button type="button" data-mode="${mode}" aria-pressed="false" style="${ui.chip}; --bg-on:var(--primary-deep); --c-on:var(--button-text)">${label}</button>`;
  const frame = "--d:block; --bg:var(--background); --boxs:var(--paper-lift)";
  return shell(`${d.meta.title}: ffpf draft`, `
<p style="${ui.eyebrow}">FFPF · ${d.name.toUpperCase()} · PAPER · ${DATE}</p>
<h1 style="${ui.title}; --mb:.75rem">${d.meta.title}</h1>
<p style="${ui.lead}; --maxw:48rem; --mb:1.25rem">${d.notes}</p>
${draftNav(d, drafts, ui)}
<div role="group" aria-label="Width" style="--d:flex; --g:.5rem; --mb:1rem">${btn("desk", "Desktop")}${btn("mob", "Mobile")}</div>
<div data-view="desk"><iframe src="page.html" title="${d.meta.title} at desktop width" style="${frame}; --w:100%; --h:900px; --radius:.6rem"></iframe></div>
<div data-view="mob" style="--d:flex; --jc:center">
  <iframe src="page.html" title="${d.meta.title} on a phone" style="${frame}; --w:390px; --h:844px; --b:10px solid var(--text-main); --radius:2.5rem"></iframe>
</div>
<details style="--mt:1.5rem">
  <summary>The markup, with the site's paths</summary>
  <pre style="--of:auto; --p:1rem; --size:.8rem; --bg:var(--background); --radius:.5rem"><code>${code}</code></pre>
</details>
<script>
// Toggles hidden and aria-pressed only. Without JavaScript both views show.
const views = document.querySelectorAll("[data-view]");
const btns = document.querySelectorAll("[data-mode]");
function show(m) {
  views.forEach((v) => { v.hidden = v.dataset.view !== m; });
  btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === m)));
}
btns.forEach((b) => b.addEventListener("click", () => show(b.dataset.mode)));
show("desk");
// The desktop frame grows to its page's height (geometry only). It starts
// short: inside an iframe, scrollHeight never reports less than the frame.
const f = document.querySelector('[data-view="desk"] iframe');
const fit = () => f.style.setProperty("--h", f.contentDocument.documentElement.scrollHeight + "px");
const settle = () => { fit(); setTimeout(fit, 900); };
f.addEventListener("load", settle);
if (f.contentDocument && f.contentDocument.readyState === "complete") settle();
</script>`, ui);
}

export function index(drafts, intro, ui) {
  const cards = drafts.map((d, i) => `<li style="--i:${i}; ${ui.rise}"><a href="${href(d).slice(3)}" style="${ui.card}">
    <p style="${ui.eyebrow}">${d.name}</p><h2 style="--size:1.15rem; --weight:800; --m:0 0 .35rem">${d.meta.title}</h2>
    <p style="${ui.muted}; --m:0; --size:.9rem">${d.notes.split(". ")[0]}.</p></a></li>`).join("");
  return shell("ffpf drafts", `
<p style="${ui.eyebrow}">FFPF · DRAFTS · PAPER · ${DATE}</p>
<h1 style="${ui.title}; --mb:.75rem">The new look: drafts</h1>
<p style="${ui.lead}; --maxw:48rem; --mb:1.5rem">${intro}</p>
<ul style="--list:none; --p:0; --m:0; ${ui.grid}">${cards}</ul>`, ui);
}
