# TODO - FFPF.org Development Tasks

## High Priority

### Team Canada 2026 — Landing Page Finalization (Alexander D. Somma)
- [x] Create landing page at /teamcanada2026
- [x] Implement active countdown timer (Pre/During/Post states)
- [x] Optimize for mobile
- [ ] Add volunteer profiles with photos
- [ ] Add past camp impact stories (verify Aarav story details)
- [ ] Implement fundraising progress tracker widget
- [ ] Having countdown work in _hyperscript
- [ ] Update Team Members Table with status columns (Added to Page, Interviewed, Photographed, Bio Written)
- [ ] Plan integration into /teamcanada2026 page (profiles section)
- [ ] **Questions for Board/Stakeholders:**
  - [ ] Verify fundraising goal amount ($100,000?)
  - [ ] Request photos/bios for: Dr. Jane Doe placeholder, John Smith placeholder
  - [ ] Get photos of the 2026 location/hospital if available
  - [ ] Request "Aarav" story details and photo confirmation
  - [ ] Get confirmed list of 2026 volunteers

### [EXTERNAL] DBA Registration Verification (Stakeholder: Dr. D) #critical
- "Freedom From Poverty Foundation" needs to be added as the english Name in Quebec
- [ ] Initiate registration with Registraire des Entreprises du Québec

### [MIXED] Professional Contact Details (Alexander D. Somma)
- [x] Update Contact Us page with: Freedom From Poverty Foundation, 1333 Stravinski Avenue, Brossard, QC J4X 2C5
- [x] Add business hours and primary contact email/phone
- [x] Update footer contact info on all pages
- [x] Verify consistency across all pages
- [ ] Update CanadaHelps and social media profiles

### Donor Appreciation Dinner — 2026 Camp Thank-You Presentation
#### [EXTERNAL] Content & Media To Confirm (Stakeholder: Vinod / Dr. D)
- [ ] Obtain video/testimony of patient with swollen face — confirm availability, length, quality
- [ ] Confirm patient's name and permission to use his story publicly
- [ ] Obtain Archana 2-minute documentary preview — final cut ready?
- [ ] Collect confirmed impact numbers from 2026 Jamkhed camps (surgeries, patients screened, procedures, follow-up plans)
- [ ] Confirm list of volunteers who want individual name recognition at dinner
- [ ] Confirm November 2026 benefit dinner date for closing slide

#### [MIXED] Dinner Logistics & Materials (Stakeholder: Vinod)
- [ ] Prepare camp sponsorship one-pagers or table cards ($12K/camp ask)
- [ ] Test A/V setup for Archana documentary preview playback
- [ ] Finalize presentation with confirmed content and review with Vinod

## Medium Priority

### [EXTERNAL] CanadaHelps Portal Configuration (Stakeholder: Dr. D)
- [ ] Upload logo files (PNG, SVG, JPG formats)
- [ ] Create donation designations: Greatest Needs, Surgery Camps 2026, Montreal Food Aid 2026
- [ ] Draft receipt thank-you message templates
- [ ] Test donation flow (small test transaction)
- [ ] Configure recurring donation option

### [EXTERNAL] Social Media Campaign Phase 1 (Stakeholder: Board)
- [ ] Create "Meet the Team" content (3-4 posts/week)
- [ ] Develop teaser videos about camp location and need
- [ ] Schedule posts across Facebook/Instagram
- [ ] Track engagement and adjust strategy

### [EXTERNAL] Email Campaign Setup (Stakeholder: Dr. D)
- [ ] Draft camp announcement email to existing subscribers
- [ ] Create email templates for campaign phases
- [ ] Set up newsletter modal email capture
- [ ] Test double opt-in process

### [SITE] French Translation Correction (Alexander D. Somma)
- [ ] Audit all French pages (/fr/ directories)
- [ ] Correct organization name to "La Fondation de la Libération de la Pauvreté Inc."
- [ ] Review key term translations for accuracy
- [ ] Update donation page in French

## Backlog

### [CSS] startr.style Improvements
- [ ] **Host startr.style Locally**: Download and host CSS framework locally to eliminate external dependency
  - [ ] Download https://startr.style/style.css and save as src/_includes/assets/startr.css
  - [ ] Update head.html to link local file instead of external
  - [ ] Add Eleventy passthrough for CSS in eleventy.config.js
  - [ ] Test site functionality and commit changes

- [ ] **Audit and Minify CSS**: Reduce bundle size by removing unused utilities
  - [ ] Review startr.css for unused utilities (shadows, transforms, etc.)
  - [ ] Implement PostCSS build script for minification
  - [ ] Add build:css script to package.json
  - [ ] Test minified CSS and verify no breakage

- [ ] **Refactor Inline Styles to Classes**: Reduce repetition and improve maintainability
  - [ ] Extract common inline styles into custom CSS classes
  - [ ] Create src/_includes/assets/custom.css with reusable classes
  - [ ] Replace inline styles in layouts/pages with classes
  - [ ] Test responsive design and accessibility

- [ ] **Implement SCSS for Theming**: Enable better customization and organization
  - [ ] Add SCSS support to Eleventy via plugin
  - [ ] Create theme.scss with variables and mixins
  - [ ] Compile SCSS to CSS during build
  - [ ] Integrate with existing startr.style overrides

- [ ] **Component-Based Styling Overhaul**: Create reusable styled components
  - [ ] Identify reusable components (buttons, cards, modals)
  - [ ] Create dedicated CSS classes for components
  - [ ] Move modal styles from inline to global CSS
  - [ ] Use Eleventy shortcodes for styled components

- [ ] **Add CSS Optimization to Build Pipeline**: Improve performance with critical CSS and minification
  - [ ] Integrate cssnano for autoprefixing and minification
  - [ ] Add critical CSS extraction for above-the-fold content
  - [ ] Update netlify.toml for build optimization
  - [ ] Test load times and performance improvements

## Completed

### [SITE] Legal Footer Implementation (Alexander D. Somma)
- [x] Verify CRA Registration # with CRA public registry: 892570938RR0001
- [x] Add footer to all pages: "La Fondation de la Libération de la Pauvreté Inc. | CRA Registration #: 892570938RR0001"
- [x] Test footer visibility on homepage and key pages
- [x] Commit changes

### [SITE] Functional Call-to-Action Buttons
- [x] Link "Sponsor A Surgical Camp" → ffpf.org/donate with support note
- [x] Link "Sponsor A Dental Camp" → ffpf.org/donate with support note
- [x] Test all donation button links end-to-end
- [x] Verify CanadaHelps integration

### [SITE] Create Communication Folder and Drafts
- [x] Create communication/ folder in root
- [x] Add email campaign draft files
- [x] Add social media content drafts
- [x] Organize drafts by task and stakeholder
- [x] Update external tasks to reference drafts

### [SITE] Draft Donor Dinner Presentation (Alexander D. Somma)
- [x] Create `communication/donor-dinner-thankyou-2026.md`
- [x] Structure 10-slide arc: patient story → thank-you → numbers → Archana preview → volunteers → ask → November bridge
- [x] Write detailed speaker notes with timing cues (15 min total)
- [x] Add suggested visuals table

### Admin Links Collection (August 2025)
- [x] Create Linktree-style admin collection for 2025 page links
- [x] Design admin collection schema for links management
- [x] Update admin config.yml with new "links" collection
- [x] Create data structure for links with title, URL, icon, and order
- [x] Install js-yaml dependency for YAML parsing
- [x] Test data loading and admin interface
- [x] Document staff process for managing links

### Team Canada 2026 — Completed Subtasks
- [x] Confirm start/end dates and timezones: Feb 1 7am IST start
- [x] Verify actual number of days/hours for the countdown check
