// The 27th Annual Dinner, Saturday 14 November 2026: the one source for
// /sponsors/, /fr/commanditaires/ and the flyers (docs/flyers/dinner-2026/).
// Public facts only. The officers approved the venue name, "India and
// Montreal" and the sponsor page on 2026-10-23 (DocuSeal submission 29).
// The deadline also lives in pb/pb_migrations/001_sponsors.js (create rule).
const dinner = {
  date: "2026-11-14",
  time: { en: "6:00 pm", fr: "18 h" },
  venue: "Le Châteaubriand",
  city: { en: "Montreal, QC", fr: "Montréal (QC)" },
  guests: "300+",
  ticket: 150,
  deadline: { en: "7 November", fr: "7 novembre" },
  closesAt: "2026-11-08T04:59:59Z", // 7 Nov 23:59 in Montreal (EST)
  pb: "https://pb.ffpf.org",
  ticketForm: "https://forms.gle/G2iZExNBZcAuQGTM7",
  // `open: false` keeps a tier off the page and out of PocketBase's TIERS_OPEN.
  // `square` is the tier's Square payment link, shown after sign-up.
  tiers: [
    { id: "presenting", price: 5000, open: false, square: "",
      name: { en: "Presenting", fr: "Présentateur" }, label: { en: "$5,000", fr: "5 000 $" } },
    { id: "gold", price: 1000, open: true, square: "",
      name: { en: "Gold", fr: "Or" }, label: { en: "$1,000", fr: "1 000 $" } },
    { id: "silver", price: 500, open: true, square: "",
      name: { en: "Silver", fr: "Argent" }, label: { en: "$500", fr: "500 $" } },
  ],
  // The flyer's table. true / false, or a count. Presenting is a proposal
  // for the officers (sign-off #2) until its tier opens.
  benefits: [
    { en: "Logo display", fr: "Affichage du logo",
      presenting: true, gold: true, silver: false },
    { en: "Promotional video or slides on stage", fr: "Vidéo promotionnelle ou diapositives sur scène",
      presenting: 6, gold: 4, silver: 2 },
    { en: "Meet people and hand out business cards or brochures", fr: "Rencontrer les invités et distribuer cartes ou brochures",
      presenting: true, gold: true, silver: true },
    { en: "Sponsor name announced during the event", fr: "Nom du commanditaire annoncé pendant la soirée",
      presenting: 6, gold: 4, silver: 2 },
    { en: "Website recognition", fr: "Reconnaissance sur notre site web",
      presenting: true, gold: true, silver: true },
    { en: "Free tickets included", fr: "Billets gratuits inclus",
      presenting: 4, gold: 2, silver: false },
    { en: "Named as the presenting sponsor", fr: "Nommé commanditaire présentateur",
      presenting: true, gold: false, silver: false },
  ],
  // As on the flyer.
  contacts: [
    { name: "Kumaresan", phone: "514-433-5833" },
    { name: "Dr. Shivendra Dwivedi", phone: "514-946-1756" },
  ],
};

// Decided at build time; the form's script decides again in the browser.
dinner.closed = Date.now() > Date.parse(dinner.closesAt);

// The flyer a language shows on its sponsor page: only once its files are in
// src/assets/flyers/, which happens only through
// `PUBLISH=en bun docs/flyers/dinner-2026/build.ts` after the officers approve
// (English: sign-off #2 items 1, 3, 4; French: also item 2 and a fluent review).
const fs = require("node:fs");
const path = require("node:path");
dinner.flyers = {};
for (const lang of ["en", "fr"]) {
  const base = `dinner-2026-sponsors-${lang}`;
  const dir = path.join(__dirname, "..", "assets", "flyers");
  dinner.flyers[lang] = fs.existsSync(path.join(dir, `${base}.png`))
    ? { png: `/assets/flyers/${base}.png`, pdf: `/assets/flyers/${base}-letter.pdf`, preview: `/assets/flyers/${base}-preview.webp` }
    : null;
}
module.exports = dinner;
