/// <reference path="../pb_data/types.d.ts" />

// The sponsor follow-up dashboard (Alexander, 2026-11-10): people who said
// they would sponsor the 2026 dinner, and an append-only log of every
// follow-up (WhatsApp opened, stage or notes changed, a sign-up matched).
// The dashboard runs on Alexander's Mac and pushes here as ffpf-sync. Every
// API rule is closed: only superusers read or write. The live server got the
// same collections through the admin API on 2026-11-10; this keeps a fresh
// deploy in step. Everything stays inside the callbacks, as in 003.
migrate((app) => {
  const sponsors = app.findCollectionByNameOrId("sponsors");
  const pledges = new Collection({
    name: "followup_pledges",
    type: "base",
    fields: [
      { name: "local_id", type: "number", required: true, min: 1, onlyInt: true },
      { name: "contact_name", type: "text", required: true, min: 1, max: 200 },
      { name: "greet", type: "text", max: 100 },
      { name: "phone", type: "text", max: 50 },
      { name: "tier", type: "select", required: true, maxSelect: 1, values: ["presenting", "gold", "silver"] },
      { name: "on_behalf_of", type: "text", max: 200 },
      { name: "lang", type: "select", maxSelect: 1, values: ["en", "fr"] },
      { name: "stage", type: "select", maxSelect: 1, values: ["to_contact", "messaged", "replied", "helping", "declined"] },
      { name: "signup", type: "relation", collectionId: sponsors.id, maxSelect: 1, cascadeDelete: false },
      { name: "match_how", type: "text", max: 50 },
      { name: "notes", type: "text", max: 5000 },
      { name: "source", type: "text", max: 100 },
      { name: "owner", type: "text", max: 50 }, // who follows it up: alexander, vinod, drd or izzy
      { name: "deleted", type: "bool" },
      { name: "created", type: "autodate", onCreate: true, onUpdate: false },
      { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
    ],
    indexes: ["CREATE UNIQUE INDEX idx_followup_pledges_local ON followup_pledges (local_id)"],
  });
  pledges.createRule = null;
  pledges.listRule = null;
  pledges.viewRule = null;
  pledges.updateRule = null;
  pledges.deleteRule = null;
  app.save(pledges);

  const events = new Collection({
    name: "followup_events",
    type: "base",
    fields: [
      { name: "local_id", type: "number", required: true, min: 1, onlyInt: true },
      { name: "at", type: "date", required: true },
      { name: "kind", type: "text", required: true, max: 50 },
      { name: "pledge", type: "relation", collectionId: pledges.id, maxSelect: 1, cascadeDelete: false },
      { name: "signup", type: "relation", collectionId: sponsors.id, maxSelect: 1, cascadeDelete: false },
      { name: "field", type: "text", max: 50 },
      { name: "old", type: "text", max: 10000 },
      { name: "new", type: "text", max: 10000 },
      { name: "via", type: "text", max: 50 },
      { name: "created", type: "autodate", onCreate: true, onUpdate: false },
    ],
    indexes: ["CREATE UNIQUE INDEX idx_followup_events_local ON followup_events (local_id)"],
  });
  events.createRule = null;
  events.listRule = null;
  events.viewRule = null;
  events.updateRule = null;
  events.deleteRule = null;
  return app.save(events);
}, (app) => {
  app.delete(app.findCollectionByNameOrId("followup_events"));
  return app.delete(app.findCollectionByNameOrId("followup_pledges"));
});
