# TODO - FFPF.org Development Tasks

## High Priority

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
- [ ] [SITE] **Sponsor page and sign-ups for the 27th Annual Dinner** (Alexander, 2026-10-22): a landing page with the Gold and Silver tiers and a sign-up form (name, organisation, contact, tier, logo); approved sponsors feed the "Website recognition" the flyer promises
  - [x] [EXTERNAL] Vinod approved it as items 13 and 14 (2026-10-23); deadline 7 Nov in Alexander's reply
  - [x] [MANUALLY] Store: FFPF's own PocketBase at `pb.ffpf.org` takes the sign-ups; sponsor assets (logos, stage files) and the sponsor and ticket lists are collected into next.startr.cloud, account `ffpf`, folder `Gala 2026/`; Square for payment (Alexander, 2026-10-25/26)
  - [x] [WE] `pb/` (migrations, hooks; image pinned by digest), tested locally: guards, deadline, protected files, CORS (2026-10-25)
  - [x] [WE] `/sponsors/` and `/fr/commanditaires/` from `src/_data/dinner2026.js`; upload tested against a local PocketBase; linked from `/2026/` and Get Involved (2026-10-25)
  - [ ] [MANUALLY] DNS `pb` in the ffpf.org zone (proxied); Nextcloud user `ffpf` with app password `nextcloud-ffpf-app-password` in Agents
  - [ ] [WE] Deploy `ffpf-pb` (OPS-Sage `deploy/ffpf-pb.yaml`), then the page goes live with the push
  - [ ] [WE] `ffpf-sync` worker into Nextcloud `Gala 2026/`; read-only share links for the officers
  - [ ] [MIXED] Square: Dr. D passes the single seat to Alexander (asked 2026-10-25, Resend `01a17235…`; Dr. D's answer 2026-10-27)
    - [ ] [MANUALLY] Dr. D sets the login email to Alexander's; Alexander changes the password and moves 2FA to his phone the same day; the login stays in Alexander's own vault, never in Agents
    - [ ] [MANUALLY] Alexander checks Account & Settings: owner identity, FFPF bank account, receipts' sender name and address
    - [ ] [MANUALLY] Payment links in the Square dashboard: Gold $1,000, Silver $500, Presenting $5,000 (held off the page); CAD, tax off, "Sponsor: organisation" as the note field
    - [ ] [WE] Links into `dinner2026.js`, each one opened once from a build; then the page goes live with the push
    - [ ] Later, only with webhooks: developer app `ffpf-sponsors`, token and signature key as `square-ffpf` in Agents, used through `sage-secret run`
  - [ ] [MANUALLY] Ticket form: Alexander installs `pb/apps-script/tickets.gs` and runs the backfill, only after Vinod approves item 8 of sign-off #2
  - [x] [WE] Flyers in English and French (`docs/flyers/dinner-2026/`, `bun docs/flyers/dinner-2026/build.ts`): PNG and Letter PDF, QR codes decode to the pages (2026-10-25)
  - [x] [WE] Sign-off #2 (wording approved by Alexander, 2026-10-26): DocuSeal template 14, phone format (5 pages, 0.5 MB), items 1–11; French reviewer proposed: Isabelle Plante; "Why sponsor" proposed as "India and Canada"; the unsent v1 (template 13, submission 30) archived, not deleted
  - [ ] [MANUALLY] Alexander picks the officer (Vinod or Dr. D); then [WE] create the submission, links only
  - [ ] [MANUALLY] Alexander's yes to send the link, only once `/sponsors/` is verified live
  - [ ] [EXTERNAL] Vinod signs sign-off #2, then Alexander (Stakeholder: Vinod)
  - [ ] [WE] Flyers on `/sponsors/` (block built, off until files exist): `PUBLISH=en bun docs/flyers/dinner-2026/build.ts` after items 1, 3, 4; `fr` after item 2 and the fluent review
  - [ ] [WE] Recognition: `scripts/sponsors-pull.mjs` as sponsors are approved; the last run after 7 Nov
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

## Completed

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
