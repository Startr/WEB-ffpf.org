# AGENTS.md: ffpf.org
Rules for agents and Sage.is team members working on FFPF's site and campaigns.
Alexander sits on FFPF's board, and Sage.is team members are increasingly involved (Alexander, 2026-10-20).

## Whose call it is
Agents and team members draft; FFPF decides: the board, or the president Dr. S. Dwivedi ("Dr. D") or V.P. Vinod Dargan, each with a second board member agreeing.
Alexander signs off alone on design and technical work, which git can always undo; copy, legal and the like need the president's or V.P.'s backing, or the full board. Alexander may be the second board member, except on the Startr and Sage.is dealings below.
Record who decided, who agreed and when on the card, as "(Dr. D with Alexander, 2026-10-20)".

Paid work, donated services or gift-in-kind receipts between Startr or Sage.is and FFPF go to the board first: a director has an interest. Donated services cannot be receipted, so never promise a team member a tax receipt for their time. Out-of-pocket expenses FFPF agreed to repay are the exception: FFPF can receipt the repayment when the team member gives it back.

The site does not yet credit a sponsor or vendor; add Startr or Sage.is only on a board decision.

## Read first
`README.md`, `CONVENTION.instructions.md`, `TODO.md` (cards name each step's owner) and, for campaigns, `docs/PROJECT_PLAN_TEAM_CANADA_2026.md`.
Ignore the pytest and Django parts of `docs/DEVELOPMENT_WORKFLOW.md`.

## The repo is public
`Startr/WEB-ffpf.org` is public, so every tracked file is published.
Publish a patient's name, photo or story only where FFPF holds signed consent (a guardian's for a minor); the forms are on file and available on request (Alexander, 2026-10-21). Keep patient details out of drafts, decks, notes and the board.
Keep donor details out; CanadaHelps holds them.
Sponsor sign-ups and ticket requests live only in FFPF's PocketBase (`pb.ffpf.org`, source `pb/`) and in the `ffpf` account on next.startr.cloud (folder `Gala 2026/`), where sponsor assets (logos, stage files) are collected; only `scripts/sponsors-pull.mjs` writes sponsor data into the repo: the public name, tier, website and logo of approved sponsors who agreed to be shown.
Name volunteers only as the site already does, never with travel dates or contact details; officers on `/about-us/` may be named.
Patient media and large files go on the shared drive; the pre-commit hook blocks files over 20 MB.

## The site

Eleventy 3 builds `src/` into `dist/`: `bun install`, `bun run start`, `bun run build`.
Netlify site `ffpf` serves `dist/` behind Cloudflare; the live site matches `master` (2026-10-20), so a push to `master` publishes.

Decap CMS at `/admin` commits straight to `master`, so pull before editing; `develop` has not moved since 2025-06-28.
English sits at the root, French under `/fr/`.
`/drafts/` holds design drafts for internal review: unlisted (noindex meta and `src/_headers`), generated from `docs/design-drafts/` by `node docs/design-drafts/build.mjs`; never link to it, and keep it to content already public.
Keep the `/wp-content/` URLs from the WordPress import: old links and `og:image` use them. `src/src/`, a 2024 copy of the old WordPress site, is out of the build.
`/donate` reaches CanadaHelps through a Cloudflare 302 on `/donate/`; `src/donate/index.html` (a meta refresh) shadows `src/_redirects`. Matomo on `visitas.startr.cloud` (site 7) counts visits.

## Names and numbers
Legal name: La Fondation de la Libération de la Pauvreté Inc.
English name: Freedom From Poverty Foundation, not yet registered in Quebec (the DBA card).
CRA registration: 892570938RR0001; the footer in `src/_includes/layouts/base.njk` carries it and the legal name. French WordPress-layout pages skip that layout, so their own footers repeat both; change all of them together.
Contact details live in `src/contact/index.html` and the footer; change both together.
Publish a fundraising figure, impact number or date only once its owner confirms it; the $100,000 goal is unconfirmed.

## Styling
startr.style inline props in `style` attributes, mobile-first; no new classes or colours (the brand red is `--primary` on `<body>`).
No new third-party script, font or tracker without Alexander's yes.
Pages with `theme: true` load `/assets/theme/ffpf.css` (tokens and the paper shadows) and take prop strings from `src/_data/ui.js`, as `/sponsors/` does; the restyle (`docs/plans/2026-10-20-restyle.md`) extends both.

## Speaking for FFPF
Draft emails, posts and decks in `communication/`; nothing goes out until its named owner approves.
Agents never send, post or publish as FFPF, and never sign in to its CanadaHelps, Netlify, Google or social accounts.
French copy needs a fluent reviewer; machine translation is a draft.

## How to work
Add the card to `TODO.md` first, then plan, document, execute, verify.
Label steps [WE] (an agent in session), [MANUALLY] (Alexander or a team member) or [EXTERNAL] (a named FFPF person); keep [SITE], [CSS], [MIXED].
Git writes are [MANUALLY].
Questions for FFPF go on the "Questions for Board/Stakeholders" card; questions for Alexander close your handoff, heaviest first.

## Footguns
startr.style loads unpinned from the CDN, so an upstream release can change the site.
A `--w-xl: 100vw` inside `<main>` (which has a margin) scrolls the page sideways; let blocks take the column's width.
Netlify's `_redirects` loses to a real file at the same path unless the rule ends in `!`.
`bun.lockb` is stale against `package.json` (2026-10-25), so `bun install --frozen-lockfile` fails; `npm ci` installs from `package-lock.json` without touching tracked files.
The dinner's deadline is in two places: `src/_data/dinner2026.js` and the create rule in `pb/pb_migrations/001_sponsors.js`; change both together.

## Before handoff
Run `bun run build`, open changed pages at 390px and 1280px in English and French, check the footer line and `/donate`, and read `git diff --cached` for personal details.
