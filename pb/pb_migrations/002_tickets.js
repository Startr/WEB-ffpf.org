/// <reference path="../pb_data/types.d.ts" />

// Ticket requests copied from the gala's Google Form (forms.gle/G2iZExNBZcAuQGTM7)
// by apps-script/tickets.gs through POST /api/ffpf/tickets. Every API rule is
// closed: only that route and superusers write.
migrate((app) => {
  const collection = new Collection({
    name: "tickets",
    type: "base",
    fields: [
      { name: "response_id", type: "text", required: true, min: 1, max: 200 },
      { name: "submitted_at", type: "date" },
      { name: "name", type: "text", max: 200 },
      { name: "email", type: "text", max: 200 },
      { name: "phone", type: "text", max: 50 },
      { name: "count", type: "number", min: 0 },
      { name: "answers", type: "json", maxSize: 20000 },
      { name: "status", type: "select", maxSelect: 1, values: ["new", "confirmed", "cancelled", "test"] },
      { name: "paid", type: "bool" },
      { name: "table", type: "text", max: 50 },
      { name: "staff_notes", type: "text", max: 5000 },
      { name: "nc_synced_at", type: "date" },
      { name: "created", type: "autodate", onCreate: true, onUpdate: false },
      { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
    ],
    indexes: ["CREATE UNIQUE INDEX idx_tickets_response ON tickets (response_id)"],
  });
  collection.createRule = null;
  collection.listRule = null;
  collection.viewRule = null;
  collection.updateRule = null;
  collection.deleteRule = null;
  return app.save(collection);
}, (app) => {
  return app.delete(app.findCollectionByNameOrId("tickets"));
});
