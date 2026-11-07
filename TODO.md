# TODO - FFPF.org Development Tasks

> **Convention**: sections below map to kanban columns. Inline source-code
> tags use the same vocabulary, so items stay cross-referenced between this
> file and the code. [TodoScope](https://github.com/Startr/TodoScope)
> generates `KANBAN.canvas` from this file and the inline tags; do not
> hand-edit it.
>
> | Column      | Section here                  | Inline tag |
> |-------------|-------------------------------|------------|
> | In Progress | `## High Priority`            | `FIXME:`   |
> | TODO        | `## Medium Priority`          | `TODO:`    |
> | Backlog     | `## Backlog`                  |            |
> | Bugs        | `## Bugs`                     | `BUG:`     |
> | Done        | `- [x]` items, `## Completed` | —          |
>
> Track each `DEPRECATED:` tag as a TODO item for removal at the stated
> version. Step owners: [MANUALLY] by hand, [WE] from the CLI, [EXTERNAL]
> the officers or another outside party. Long card text lives in
> `docs/board-dossiers.md`; shipped detail in `docs/completed-todos.md`.

## High Priority

### 27th Annual Dinner, 14 November 2026

- [ ] [SITE] **Sponsor page and sign-ups for the 27th Annual Dinner** (Alexander, 2026-10-22): a landing page with the Gold and Silver tiers and a sign-up form (name, organisation, contact, tier, logo); approved sponsors feed the "Website recognition" the flyer promises
  - [x] [EXTERNAL] Vinod approved it as items 13 and 14 (2026-10-23); deadline 7 Nov in Alexander's reply
  - [x] [MANUALLY] Store: FFPF's own PocketBase at `pb.ffpf.org` takes the sign-ups; sponsor assets (logos, stage files) and the sponsor and ticket lists are collected into next.startr.cloud, account `ffpf`, folder `Gala 2026/`; Square for payment (Alexander, 2026-10-25/26)
  - [x] [WE] `pb/` (migrations, hooks; image pinned by digest), tested locally: guards, deadline, protected files, CORS (2026-10-25)
  - [x] [WE] `/sponsors/` and `/fr/commanditaires/` from `src/_data/dinner2026.js`; upload tested against a local PocketBase; linked from `/2026/` and Get Involved (2026-10-25)
  - [x] [MANUALLY] Cloudflare token limited to the ffpf.org zone in the stub `cloudflare-ffpf-dns` (Agents-edit; scope in its notes), so agents manage FFPF DNS (Alexander, 2026-11-01); token active and reaches the zone (checked 2026-11-01)
  - [x] [WE] DNS `pb` in the ffpf.org zone (proxied), set by `cr-deploy ensure` with that token (2026-11-01)
  - [x] [WE] Nextcloud agent accounts `ffpf` and `lamarr` on next.startr.cloud, group `agent` only; app passwords `nextcloud-ffpf-app-password` and `nextcloud-lamarr-app-password` in Agents-edit, CalDAV 207 by name; calendar "FFPF" (admin's) shared to `ffpf` with edit (2026-10-28)
  - [x] [WE] Deploy `ffpf-pb` (OPS-Sage `deploy/ffpf-pb.yaml`): version 1 on openco2, `/api/health` 200 through Cloudflare, CORS allows ffpf.org, public reads refused (2026-11-01, on Alexander's command)
    - [x] [WE] Found 2026-11-01: `/sponsors/` already answers 200 and its form posts to `pb.ffpf.org`, which had no DNS record until this deploy
    - [x] [MANUALLY] The captain's token had expired: password in the stub `caprover-captain-01` (Agents-edit); logged in through it, all three nodes ready (2026-11-01)
    - [x] [WE] Two test sign-ups through the live form, one with a logo and a stage file; both rows stay with status `test`, which `ffpf-sync` skips; delete them by hand if wanted (2026-11-01)
  - [x] [WE] `ffpf-sync` worker into Nextcloud `Gala 2026/`: running every 5 minutes; first clean pass 2026-11-01 14:09Z, 0 sponsors, test rows skipped
  - [ ] [WE] Read-only share links for the officers on `Gala 2026/`
  - [ ] [WE] Recognition: `scripts/sponsors-pull.mjs` as sponsors are approved; the last run after 7 Nov
- [ ] [MIXED] **Pay pages**, so everything can go live before Square is ready (Alexander, 2026-11-01): `/sponsors/pay/<tier>/` and `/fr/commanditaires/paiement/<tier>/`; setting a tier's `square` turns its page into a redirect
  - [x] [WE] Pages built for open tiers in English and French, thank-you step points at them; redirect tested locally with a fake link; checked at 390px and desktop (2026-11-01, uncommitted)
  - [ ] [EXTERNAL] Dr. D or Vinod backs the stub copy, and a fluent reviewer checks the French (live before backing, Alexander, 2026-11-01)
  - [x] [WE] Committed and pushed as `4b984cc` on Alexander's "get this live" (2026-11-01); checked on the live site: the thank-you step links to the pay page, which answers with `noindex`
  - [x] [WE] The thank-you button reads "See payment details" while a tier has no Square link, and "Pay by card now" once it does (Alexander, 2026-11-01; `8afbc3a`)
- [ ] [MIXED] **Upload rules** (Alexander, 2026-11-01): still images PNG, JPEG or SVG only, at a set resolution; video as a direct YouTube link or a small uploaded file; say plainly that video plays without sound
  - [x] [WE] Form, copy in both languages, PocketBase migration and hook; 18 server cases pass on a throwaway local PocketBase, and the browser checks pass in both languages, with no overflow at 390px (2026-11-01, uncommitted)
  - [x] [MANUALLY] Sizes (Alexander, 2026-11-01): stage images sit either side of the presentation, so square is recommended, from 1080 × 1080 to 2160 × 2160; logos at least 1000 px wide; uploaded video up to 20 MB (`uploads` in `src/_data/dinner2026.js`)
  - [ ] [EXTERNAL] Dr. D or Vinod backs the live hints after the push, and a fluent reviewer checks the French (Alexander, 2026-11-01: live first, then the text to Dr. D)
  - [x] [WE] Live in the form with `4b984cc` (2026-11-01); browser checks passed on the live build
  - [x] [MANUALLY] Alexander deployed `ffpf-pb` version 2 from a terminal, so PocketBase enforces the file types and YouTube links too (2026-11-01). Backup `ffpf-pb-20261101T140040Z` was taken first
- [ ] [MIXED] **Sign-off #3** (Alexander, 2026-11-01): Dr. D agreed by phone; this records it, with Alexander as second board member. `OPS-Sage/tools/signoff/forms/ffpf-2026-11/`, 3 phone pages, items 1–4: Square handover, card payments, payment wording, file rules
  - [x] [MANUALLY] Alexander approved the wording (2026-11-01)
  - [x] [WE] DocuSeal template 15, fields checked in the builder; submission 31 created, links only, nothing sent (2026-11-01)
  - [x] [WE] Link emailed to Dr. D on Alexander's yes, through Resend as "Alexander Somma via Sage.is AI", cc and reply-to `asomma@sage.is` (message `01a1980b-1600-794a-98bc-c2e152f18662`, 2026-11-01)
  - [ ] [MANUALLY] Alexander sends the same link by WhatsApp, if not done
  - [ ] [EXTERNAL] Dr. D signs, then Alexander
- [ ] [MIXED] **Square**: Dr. D passes the single seat to Alexander (asked 2026-10-25, Resend `01a17235…`; Dr. D's answer 2026-10-27)
  - [x] [MANUALLY] Alexander signed in with Dr. D's code (2026-11-01): this Mac is trusted for 90 days, Alexander's personal Bitwarden generates the two-step codes, and an encrypted two-step key is the fallback
  - [x] [EXTERNAL] Alexander holds the password and the authenticator from Dr. D (2026-10-28)
  - [ ] [MANUALLY] Two-step login with Dr. D on hand, moved to 2026-11-01 at 13:40 Azores, 09:40 Montreal, on Dr. D's callback (daily backlog and FFPF calendar)
    - [ ] Dr. D relays the code; Alexander then changes the password and moves 2FA to his own phone in the same sitting
    - [ ] The login goes in the stub `square-ffpf` in Agents-edit (Alexander, 2026-11-01, replacing "own vault only"); agents never sign in with it
  - [ ] [MANUALLY] Alexander checks Account & Settings: owner identity, receipts' sender address
    - [x] [MANUALLY] The linked bank account is FFPF's (Alexander, 2026-11-01)
    - [x] [WE] Receipts show the name "Freedom From Poverty Foundation" and the FFPF logo (2026-11-01)
  - [x] [WE] Payment links in the Square dashboard, through Alexander's signed-in Chrome (2026-11-01): Gold $1,000 `https://square.link/u/3yotYwyz`, Silver $500 `https://square.link/u/erasNzfA`; "Take a payment", CAD, tipping off, "Sponsor: organisation" required
    - [x] [WE] Researched 2026-11-01: no API key needed. Dashboard links are reusable, while API links are single-use. Use the "Collect a payment" type, because Canadian donation links stop at $999
    - [x] [WE] Both rendered in a headless browser with no sign-in: CAD, no tax line. The account shows "No sales taxes exist" and "Not collecting" for domestic non-physical sales, with a Canada-wide tax enrollment active (2026-11-01)
    - [x] [MANUALLY] Open each live link and confirm it shows CAD and no tax: sales taxes come from the account's settings, with no per-link control, and sign-off #3 item 2 says no tax is added (Alexander: "links look good", 2026-11-01)
    - [x] [EXTERNAL] Dr. D confirmed, and the links go live before sign-off #3 is signed (Dr. D with Alexander, 2026-11-01)
    - [ ] [MANUALLY] Presenting $5,000, once sign-off #2 item 5 is approved
  - [ ] [MANUALLY] Delete the unused stub `square-ffpf-links` (Agents-edit): the links go straight into the site
  - [x] [WE] Committed and pushed `src/_data/dinner2026.js` on Alexander's go (`613666f`, 2026-11-01)
  - [x] _Live: all four pay pages reach the right Square checkout and Presenting's pay page answers 404; no real payment has run yet (2026-11-01). Archived → docs/completed-todos.md._
  - [ ] Later, only with webhooks: developer app `ffpf-sponsors`, token and signature key in the `square-ffpf` stub (fields `application-id`, `access-token`, `signature-key`), used through `sage-secret run`
- [ ] [MIXED] **Stage showings tripled** (Alexander, 2026-11-01): Gold 12 (was 4), Silver 6 (was 2), the Presenting proposal 18 (was 6); announcements stay 4 and 2, and stage files stay at 4 per sponsor
  - [x] [WE] Table and upload hint live on `/sponsors/` and `/fr/commanditaires/` (`c16edb7`, 2026-11-01)
  - [x] [WE] Sign-off #2 redrafted, not yet on DocuSeal: new proofs, item 5, and a new item 12 saying the numbers changed and the new ones are right, as Alexander asked (measured clean, 5 pages)
  - [x] [MANUALLY] Alexander approved that wording (2026-11-01); [WE] DocuSeal template 17 replaces 16, fields checked in the builder; submission 33 created, links only, nothing sent. Template 16 and submission 32 show the old numbers, so they stay unsent
  - [ ] [EXTERNAL] Dr. D approves item 12 of sign-off #2 (Stakeholder: Dr. D)
- [ ] [MIXED] **Sign-off #2: dinner flyers, sponsors and tickets** (Alexander, 2026-10-26): `OPS-Sage/tools/signoff/forms/ffpf-2026-11b/`, now DocuSeal template 17, submission 33; Dr. D signs as officer, then Alexander
  - [x] [WE] Flyers in English and French (`docs/flyers/dinner-2026/`, `bun docs/flyers/dinner-2026/build.ts`): PNG and Letter PDF, QR codes decode to the pages (2026-10-25)
  - [x] [WE] Sign-off #2 (wording approved by Alexander, 2026-10-26): DocuSeal template 14, phone format (5 pages, 0.5 MB), items 1–11; French reviewer proposed: Isabelle Plante; "Why sponsor" proposed as "India and Canada"; the unsent v1 (template 13, submission 30) archived, not deleted
  - [x] [MANUALLY] Officer for sign-off #2: Dr. D, after sign-off #3 (Alexander, 2026-11-01); `/sponsors/` verified live
  - [x] [WE] Updated after a review against the live site and sign-off #3: `OPS-Sage/tools/signoff/forms/ffpf-2026-11b/`, 5 phone pages, 19 verified changes, both proofs rebuilt with "video or images" (2026-11-01)
    - Alexander's answers (2026-11-01): hosting is donated, with no charge to FFPF and no board approval needed, because the work would not happen otherwise and no one else has offered (AGENTS.md updated); any tax receipt for its costs is the board's call later; a sponsor goes public once an officer and a board member approve it; the flyer and table say "video or images"
  - [x] [MANUALLY] Alexander approved the update (2026-11-01); [WE] DocuSeal template 16 replaces 14, fields checked in the builder; submission 32 created, links only, nothing sent
  - [ ] [MANUALLY] Alexander approves the message that carries the link; then [WE] it goes out
  - [ ] [EXTERNAL] Dr. D signs sign-off #2, then Alexander (Stakeholder: Dr. D)
  - [ ] [WE] Once approved: "video or images" in `src/_data/dinner2026.js`, which changes the live sponsor table; a fluent review of the French line
  - [ ] [WE] Flyers on `/sponsors/` (block built, off until files exist): `PUBLISH=en bun docs/flyers/dinner-2026/build.ts` after items 1, 3, 4; `fr` after item 2 and the fluent review
  - [ ] [MANUALLY] Ticket form: Alexander installs `pb/apps-script/tickets.gs` and runs the backfill, only after item 8 of sign-off #2 is approved
- [ ] Donor Appreciation Dinner — 2026 Camp Thank-You Presentation
  - [ ] [EXTERNAL] Content & Media To Confirm (Stakeholder: Vinod / Dr. D)
  - [ ] Adding logo to
  - [ ] Obtain the patient's video testimony — confirm availability, length, quality
  - [ ] Confirm patient's name and permission to use his story publicly (record both outside git)
  - [ ] Obtain Archana 2-minute documentary preview — final cut ready?
  - [ ] Collect confirmed impact numbers from 2026 Jamkhed camps (surgeries, patients screened, procedures, follow-up plans)
  - [ ] Confirm list of volunteers who want individual name recognition at dinner
  - [ ] Confirm November 2026 benefit dinner date for closing slide
- [ ] [MIXED] Dinner Logistics & Materials (Stakeholder: Vinod)
  - [ ] Prepare camp sponsorship one-pagers or table cards ($12K/camp ask)
  - [ ] Test A/V setup for Archana documentary preview playback
  - [ ] Finalize presentation with confirmed content and review with Vinod

### Site and organisation

- [ ] [MIXED] **Officer review** (Alexander, 2026-10-20): the review's fixes went live with `6ef10aa` (2026-10-21) without a PR, so Dr. D or Vinod confirm them after the fact; sign-off through DocuSeal (`seal.startr.cloud`), links in Alexander's own email
  - [x] [WE] Layout (Alexander signs off): phone nav, sideways scroll, header and footer contrast, contact map, skip link, keyboard submenus, gala popup without JavaScript; checked at 390px and 1280px on a local build (2026-10-20)
  - [x] [WE] For officers: French "Donner" links, CRA number, French legal footer, "Frome", the president's name; `/src/` out of the build (2026-10-20)
  - [x] [WE] Patient pages restored: every patient shown has signed consent, a guardian's for minors, on file and available on request (Alexander, 2026-10-21)
  - [x] [EXTERNAL] Officers' ticket contacts on the 2018–2019 dinner pages: Remove (Vinod, 2026-10-23); removed from the four dinner articles, `/fr/feed/` and the same block on `/fr/simpliquer/` (2026-10-25); Dr. D's FFPF number stays, as on `/contact/`
  - [ ] [MANUALLY] Decide `/teamcanada2026/`: redirect to `/mission/` with a confirmed 2026 entry (recommended), or strip its placeholders
  - [ ] [MANUALLY] DocuSeal API token in the vault's Agents collection; DocuSeal mail relayed through Resend, never from the cluster's IP
  - [ ] [WE] Sign-off form (officer first, Alexander second), links without DocuSeal's own email; a test send to Alexander proves DocuSeal mail works
    - [x] [WE] Template 11 "FFPF officer confirmation 2026-10" (folder FFPF), 22 fields placed by API; test submission 28 to Alexander in both roles (2026-10-21)
    - [x] [WE] 2026-10-22: checked test submission 28 (`GET /api/submissions/28`): both links opened (Officer 2026-10-22 02:16 UTC, Second board member 2026-10-21 14:39 UTC), neither signed
    - [ ] [MANUALLY] Alexander signs step 2 of test 28 (step 1 signed 2026-10-24); whether DocuSeal holds step 2 until step 1 is still unproven, since step 2 was opened first
  - [x] [WE] Template 12 "FFPF officer confirmation 2026-10: fixes and dinner flyer" (2 pages, 34 fields: site fixes 1–8, flyer and sponsor items 9–14); submission 29 created, links only, nothing emailed (2026-10-22)
  - [x] [WE] Sent Vinod his private link on Alexander's word, through Resend as "Alexander Somma via Sage.is AI", cc and reply-to `asomma@sage.is` (message `01a164d5-977d-77f4-811a-cf3f6c3ba5c0`, 2026-10-22)
  - [x] [EXTERNAL] Vinod signed as Officer (2026-10-23 17:34 UTC) and Alexander as second board member (2026-10-25 06:44 UTC): items 1–7 approved, 8 Remove, 9 Le Châteaubriand, 10–14 approved, note on 14 "As discussed" (Vinod with Alexander, 2026-10-23)
- [ ] [EXTERNAL] **Credit Startr and Sage.is on the site** (Stakeholder: Board; planned, Alexander, 2026-10-20): the board decides, not Alexander's sign-off, because Alexander has an interest
- [ ] [MANUALLY] **Public-repo exposure** (found 2026-10-20): `Startr/WEB-ffpf.org` is public, and git history keeps every committed version unless it is rewritten
  - [ ] `communication/team_members.md` lists volunteers with arrival dates
  - [ ] `communication/donor-dinner-thankyou-2026.md` holds a placeholder for the patient's name: fill it outside git
  - [ ] [MANUALLY] Pick one: trim `team_members.md` to what the site shows and stay public, or make the repo private (Netlify and the CMS's GitHub backend work with a private repo; CMS editors then need repo access)
  - [ ] [MANUALLY] Decide whether the old versions in history need a rewrite
- [ ] [SITE] **Fix site-wide metadata** (found 2026-10-20)
  - [x] `src/_data/metadata.js`: the title reads "Freedom Frome Poverty Foundation" (fixed on `feature/officer-review`)
  - [ ] `src/_data/metadata.js`: the author is an `example.com` placeholder
  - [x] `src/_includes/layouts/base/head.html`: each page now sets its own absolute canonical and og:url (on `feature/officer-review`)
- [ ] **Questions for Board/Stakeholders**
  - [ ] Verify fundraising goal amount ($100,000?)
  - [ ] Request photos/bios for: Dr. Jane Doe placeholder, John Smith placeholder
  - [ ] Get photos of the 2026 location/hospital if available
  - [ ] Request "Aarav" story details and photo confirmation
  - [ ] Get confirmed list of 2026 volunteers
- [ ] [EXTERNAL] DBA Registration Verification (Stakeholder: Dr. D) #critical
  - [ ] "Freedom From Poverty Foundation" needs to be added as the english Name in Quebec
  - [ ] Initiate registration with Registraire des Entreprises du Québec
  - [ ] Update CanadaHelps and social media profiles (Alexander D. Somma)

## Medium Priority

- [ ] [EXTERNAL] CanadaHelps Portal (Stakeholder: Dr. D)
  - [ ] Upload logo files (PNG, SVG, JPG formats)
  - [ ] Create donation designations: Greatest Needs, Surgery Camps 2026, Montreal Food Aid 2026
  - [ ] Draft receipt thank-you message templates
  - [x] Test donation flow (small test transaction)
  - [ ] Configure recurring donation option

- [ ] [EXTERNAL] Social Media Campaign Phase 1 (Stakeholder: Board)
  - [ ] Create "Meet the Team" content (3-4 posts/week)
  - [ ] Develop teaser videos about camp location and need
  - [ ] Schedule posts across Facebook/Instagram
  - [ ] Track engagement and adjust strategy

- [ ] [EXTERNAL] Email Campaign Setup (Stakeholder: Dr. D)
  - [ ] Draft camp announcement email to existing subscribers
  - [ ] Create email templates for campaign phases
  - [ ] Set up newsletter modal email capture
  - [ ] Test double opt-in process

- [ ] [SITE] French Translation Correction (Alexander D. Somma)
  - [ ] Audit all French pages (/fr/ directories)
  - [ ] Correct organization name to "La Fondation de la Libération de la Pauvreté Inc."
  - [ ] Review key term translations for accuracy
  - [ ] Update donation page in French

- [ ] [WE] **TodoScope alignment** (Alexander, 2026-11-02): this file now follows the TodoScope convention; what remains
  - [x] `.todoscope-exclude.csv`: build output, vendored and legacy code, media folders (Alexander, 2026-11-02)
  - [x] Convention header, a `## Bugs` column, and the 27th Annual Dinner split into one card per effort (2026-11-02)
  - [x] Register pass: no open line over 350 characters; originals in `docs/board-dossiers.md` and `docs/completed-todos.md` (2026-11-02)
  - [ ] [MANUALLY] Scan the repo in TodoScope and check the columns, cards and checklists
  - [ ] [WE] Move inline source tags to `TODO:`, `FIXME:` and `BUG:`, working from the scanner's list
  - [ ] [WE] Review `.todoscope-exclude.csv` after the first scan
  - [ ] [WE] Regenerate `KANBAN.canvas` from TodoScope (last committed 2026-08-17); never edit it by hand
  - [ ] [MANUALLY] Finish or drop the cut-off line "Adding logo to" on the dinner presentation card

## Backlog

### [CSS] startr.style Improvements

- [ ] **The new look** (Alexander, 2026-10-20): ffpf on startr.style 1.5.0 like Trellis, with Tony's header wash, glass, glow and motion, plus Startr Swap; FFPF red, grey and logos kept; branch `feature/restyle`, stacked on the officer review
  - [x] [WE] Drafts in Tony's draft format, on paper (2026-10-20): source in `docs/design-drafts/`, published unlisted at `/drafts/` (noindex); home, about-us, mission, get-involved, French home, article
  - [ ] [MANUALLY] Alexander picks; Tony refines on a branch and opens a PR
  - [ ] [WE] Copy the kit, fonts and Swap 1.1 into `src/assets/` with sha256 pins and a `kit:check` gate; theme tokens in `src/assets/theme/ffpf.css`
  - [ ] [WE] Components in `src/_includes/ui.njk`; retire the `<style>` blocks, classes, WOW.js, animate.css and Font Awesome
  - [ ] [WE] Before/after sheet; [EXTERNAL] Dr. D or Vinod sign "the new look", with a second board member

- [ ] **Add CSS Optimization to Build Pipeline**:
  - [ ] Improve performance with critical CSS and minification
  - [ ] Integrate cssnano for autoprefixing and minification
  - [ ] Add critical CSS extraction for above-the-fold content
  - [ ] Update netlify.toml for build optimization
  - [ ] Test load times and performance improvements

## Bugs

_No known bugs. Flag defects in source with `BUG:` tags, or add a card here._

## Completed

> Completed cards move to `docs/completed-todos.md` from time to time.

- [x] [SITE] **Agent rules** (Alexander, 2026-10-20): `AGENTS.md`, loaded by `CLAUDE.md`: who approves what, the public-repo rules, names and numbers, and how agents and Sage.is team members work here

- [x] [MIXED] Professional Contact Details (Alexander D. Somma)
  - [x] Update Contact Us page with: Freedom From Poverty Foundation, 1333 Stravinski Avenue, Brossard, QC J4X 2C5
  - [x] Add business hours and primary contact email/phone
  - [x] Update footer contact info on all pages
  - [x] Verify consistency across all pages

- [x] [SITE] Legal Footer Implementation (Alexander D. Somma)
  - [x] Verify CRA Registration # with CRA public registry: 892570938RR0001
  - [x] Add footer to all pages: "La Fondation de la Libération de la Pauvreté Inc. | CRA Registration #: 892570938RR0001"
  - [x] Test footer visibility on homepage and key pages
  - [x] Commit changes

- [x] [SITE] Functional Call-to-Action Buttons
  - [x] Link "Sponsor A Surgical Camp" → ffpf.org/donate with support note
  - [x] Link "Sponsor A Dental Camp" → ffpf.org/donate with support note
  - [x] Test all donation button links end-to-end
  - [x] Verify CanadaHelps integration

- [x] [SITE] Create Communication Folder and Drafts
  - [x] Create communication/ folder in root
  - [x] Add email campaign draft files
  - [x] Add social media content drafts
  - [x] Organize drafts by task and stakeholder
  - [x] Update external tasks to reference drafts

- [x] [SITE] Draft Donor Dinner Presentation (Alexander D. Somma)
  - [x] Create `communication/donor-dinner-thankyou-2026.md`
  - [x] Structure 10-slide arc: patient story → thank-you → numbers → Archana preview → volunteers → ask → November bridge
  - [x] Write detailed speaker notes with timing cues (15 min total)
  - [x] Add suggested visuals table

- [x] Admin Links Collection (August 2025)
  - [x] Create Linktree-style admin collection for 2025 page links
  - [x] Design admin collection schema for links management
  - [x] Update admin config.yml with new "links" collection
  - [x] Create data structure for links with title, URL, icon, and order
  - [x] Install js-yaml dependency for YAML parsing
  - [x] Test data loading and admin interface
  - [x] Document staff process for managing links

- [x] Team Canada 2026 — Completed Subtasks
  - [x] Confirm start/end dates and timezones: Feb 1 7am IST start
  - [x] Verify actual number of days/hours for the countdown check
