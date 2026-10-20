# ffpf.org mockups: handoff

Started 2026-10-20 by Sage.is AI for Alexander. Tony refines them.

## What this is
Six mockups of the new look, in the format of Tony's Trellis drafts:
- home, about-us, mission (Past Camps), get-involved, the French home, an article.

Each one shows the real page at desktop width or inside a 390px phone, with its markup underneath. Nothing on the live site has changed.

The look, revised the same day after Alexander's note: "paper is the subtle shadows, like in startr.style; stacks of paper".
- startr.style 1.5.0, as in Trellis, with FFPF's logo red, logo grey and logos.
- **Paper.** White sheets with a hairline edge and a soft layered shadow (`--paper`). A sheet lifts on hover and focus (`--paper-lift`). The top item on a page is a stack, with two sheets peeking out underneath (`--paper-stack`). Grey "desk" panels hold groups of sheets, as in the startr.style docs. These are three tokens in `_kit/ffpf.css`, built from kit colours only.
- **From Tony's drafts:**
  - a red gradient icon tile with a glow beside a tight, heavy title;
  - monospace uppercase eyebrows, and section labels with a hairline rule ("Our values · 4");
  - stat tiles, and white paper chips for secondary buttons;
  - the gradient wash with a faint icon on the stacked sheet only;
  - the glass header from tablet width up;
  - the rise and fade motion, which the kit turns off for reduced motion.
- Nunito Sans, served from the repo. Eyebrows use the kit's `--font-mono`.
- No classes, no hex in pages, no third-party loads.

Each viewer opens with Tony-style design notes, then links to every other draft. Inside a preview, a link to a drafted page opens that draft; links to pages without a draft do nothing.

## View and rebuild
```bash
cd WEB-ffpf.org
node docs/design-drafts/build.mjs       # pages/ + _parts/ -> src/drafts/
bun run start                           # Eleventy dev server; the drafts are at /drafts/
```
The site publishes them at `https://ffpf.org/drafts/` once they're on `master`; a Deploy Preview shows them too. They are unlisted for review: nothing links to them, every page carries `noindex, nofollow`, and `src/_headers` sends `X-Robots-Tag` for `/drafts/*`. Anyone with the link can open them, so they hold only content that is already public.

On the tailnet, the dev server on Alexander's Mac answers at `http://alexanders-mac-studio.tailff36cd.ts.net:8095/drafts/`.
Where things live:
- `pages/*.html` holds the page bodies.
  - Line 1 names the title, language, nav section, the page's site `path` (used for links between drafts) and its `order`.
  - Line 2, `<!-- notes: … -->`, holds the design notes the viewer shows.
  - `_parts/intro.txt` holds the index intro.
- `_parts/` holds the head, header and footer, plus `ui.json`, the shared prop strings that become `src/_includes/ui.njk` in the build.
- `icons.json` holds Lucide icons (ISC).
- `src/drafts/_kit/` holds the pinned kit (`style.upstream.css`, with its sha256 in the `.sha256` file), a derived copy that loads the local fonts, and `ffpf.css`, the theme tokens.
- Everything else in `src/drafts/` is generated: edit `docs/design-drafts/`, never the output.

The markup keeps the site's final paths, so it can move into the templates as is. Only the kit link points at `/drafts/_kit/` until the build copies the kit to `/assets/`.

## Rules (same as Trellis)
- Inline props in `style` attributes; reuse a `ui.json` string before writing a new one.
- Phone first: base values for phones, a tier only where the layout changes.
- Colours come from tokens (`--primary`, `--primary-deep`, `--primary-tint`, `--text-muted`, `--border`).
- New colours or faces need Alexander's yes.
- Hover is never the only state: pair it with `-focus` and `-on`.
- Write `--anim` with `--i` and a fallback.
- Lint props against the kit before handing off (command in `WEB-startr.style.core/docs/design-ingest.md`, "Commands cheat-sheet"). On 2026-10-20 the only unknown name is `--i`, which is expected.
- Content: only text already public on ffpf.org; no patient names or stories. The article body is placeholder text, and the French text needs a fluent reviewer.

## Questions for Alexander, heaviest first
1. **Paper as the base.** Do the sheets, stacks and desks read as "stacks of paper"?
   - Should the shadows be deeper or lighter? They are three tokens in `_kit/ffpf.css`.
   - The deep red (`--primary-deep`, 6.3:1 with white) carries buttons and eyebrows, and the logo red marks rules, icons and the tile. Keep?
2. **French chrome.** The French mockup reuses the English header and footer. Should French pages get their own header and footer strings now, or after the officer review?
3. **Google Translate.** The box is left out of the mockups. Should it be dropped from the site too? Dropping it puts the tablet nav on one row.
4. **Home extras.** The YouTube videos and the parallax donate image are not mocked. Keep the videos as a section of cards below "What we do"? Drop the parallax?
5. **Footer.** Deep red, three columns from tablet width, the legal line at the bottom. Keep?
6. **Watermark strength.** It is at `--op:.14`, on the stacked sheet only. Lighter or stronger?

## For Tony
- Iterate on a branch such as `feature/design-drafts` and open a PR.
- Change `ui.json` before changing a page, so every page follows.
- Show variants as extra pages (for example `pages/home-b.html`) instead of editing the approved one.
