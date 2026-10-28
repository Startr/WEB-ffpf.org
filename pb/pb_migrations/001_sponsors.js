/// <reference path="../pb_data/types.d.ts" />

// Sponsor sign-ups for the 27th Annual Dinner (ffpf.org/sponsors). Anyone may
// create until 7 Nov 2026 23:59 Montreal time; only superusers read. The staff
// fields cannot be set by the public form.
migrate((app) => {
  const IMAGES = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];
  const MB = 1024 * 1024;
  const collection = new Collection({
    name: "sponsors",
    type: "base",
    fields: [
      { name: "tier", type: "select", required: true, maxSelect: 1, values: ["gold", "silver", "presenting"] },
      { name: "organisation", type: "text", required: true, min: 1, max: 200 },
      { name: "announce_as", type: "text", max: 200 },
      { name: "contact_name", type: "text", required: true, min: 1, max: 200 },
      { name: "email", type: "email", required: true },
      { name: "phone", type: "text", max: 50 },
      { name: "website", type: "url" },
      { name: "logo", type: "file", maxSelect: 1, maxSize: 10 * MB, protected: true,
        mimeTypes: [...IMAGES, "application/pdf"] },
      // 4 x 20 MB + the logo stays under Cloudflare's 100 MB request limit;
      // bigger videos come in as a link.
      { name: "stage_media", type: "file", maxSelect: 4, maxSize: 20 * MB, protected: true,
        mimeTypes: [...IMAGES, "application/pdf", "video/mp4", "video/quicktime",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "application/vnd.ms-powerpoint"] },
      { name: "video_url", type: "url" },
      { name: "guest_names", type: "text", max: 500 },
      { name: "notes", type: "text", max: 2000 },
      { name: "consent_display", type: "bool", required: true }, // required bool = must be true
      { name: "lang", type: "select", maxSelect: 1, values: ["en", "fr"] },
      { name: "company_fax", type: "text", max: 200 }, // honeypot: the form never sends it
      { name: "status", type: "select", maxSelect: 1, values: ["new", "approved", "declined", "test"] },
      { name: "paid", type: "bool" },
      { name: "payment_ref", type: "text", max: 200 },
      { name: "staff_notes", type: "text", max: 5000 },
      { name: "nc_synced_at", type: "date" },
      { name: "created", type: "autodate", onCreate: true, onUpdate: false },
      { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
    ],
    indexes: ["CREATE INDEX idx_sponsors_email ON sponsors (email)"],
  });

  const staff = ["status", "paid", "payment_ref", "staff_notes", "nc_synced_at"];
  collection.createRule = ['@now <= "2026-11-08 04:59:59.000Z"']
    .concat(staff.map((f) => `@request.body.${f}:isset = false`))
    .join(" && ");
  collection.listRule = null;
  collection.viewRule = null;
  collection.updateRule = null;
  collection.deleteRule = null;

  return app.save(collection);
}, (app) => {
  return app.delete(app.findCollectionByNameOrId("sponsors"));
});
