# TODO - FFPF.org Development Tasks

## High Priority

- [ ] [MIXED] **Officer review** (Alexander, 2026-10-20): the review's fixes went live with `6ef10aa` (2026-10-21) without a PR, so Dr. D or Vinod confirm them after the fact; sign-off through DocuSeal (`seal.startr.cloud`), links in Alexander's own email
  - [x] [WE] Layout (Alexander signs off): phone nav, sideways scroll, header and footer contrast, contact map, skip link, keyboard submenus, gala popup without JavaScript; checked at 390px and 1280px on a local build (2026-10-20)
  - [x] [WE] For officers: French "Donner" links, CRA number, French legal footer, "Frome", the president's name; `/src/` out of the build (2026-10-20)
  - [x] [WE] Patient pages restored: every patient shown has signed consent, a guardian's for minors, on file and available on request (Alexander, 2026-10-21)
  - [ ] [EXTERNAL] Ask the officers whether their own phone and email stay on the 2018–2019 dinner pages
  - [ ] [MANUALLY] Decide `/teamcanada2026/`: redirect to `/mission/` with a confirmed 2026 entry (recommended), or strip its placeholders
  - [ ] [MANUALLY] DocuSeal API token in the vault's Agents collection; DocuSeal mail relayed through Resend, never from the cluster's IP
  - [ ] [WE] Sign-off form (officer first, Alexander second), links without DocuSeal's own email; a test send to Alexander proves DocuSeal mail works
  - [ ] [EXTERNAL] Dr. D or Vinod signs, then Alexander as the second board member (Stakeholder: Dr. D / Vinod)
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
