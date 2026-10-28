/// <reference path="../pb_data/types.d.ts" />

// POST /api/ffpf/tickets: ticket requests from the gala's Google Form, sent by
// apps-script/tickets.gs. Body: one row, or {rows: [...]} (at most 200), each
// {response_id, submitted_at, name, email, phone, count, answers}. Upserts by
// response_id and never touches the staff fields (status, paid, table,
// staff_notes), so a backfill can run again safely.
// No throws and no module-level variables (PB 0.36, see sponsors.pb.js).
routerAdd("POST", "/api/ffpf/tickets", function (e) {
  var token = String($os.getenv("TICKETS_INGEST_TOKEN") || "");
  var got = String(e.request.header.get("X-FFPF-Token") || "");
  if (!token || !$security.equal(got, token)) {
    return e.json(401, { ok: false });
  }

  var body = e.requestInfo().body || {};
  var rows = body.rows || [body];
  if (rows.length > 200) {
    return e.json(400, { ok: false, message: "At most 200 rows per request." });
  }

  // PocketBase stores JSON with its keys sorted, so compare in that order.
  var canon = function (v) {
    if (!v || typeof v !== "object" || Array.isArray(v)) return v;
    var o = {};
    Object.keys(v).sort().forEach(function (k) { o[k] = canon(v[k]); });
    return o;
  };
  var collection = e.app.findCollectionByNameOrId("tickets");
  var counts = { created: 0, updated: 0, unchanged: 0, failed: 0 };
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i] || {};
    var id = String(row.response_id || "").trim();
    if (!id) { counts.failed++; continue; }

    var record = null;
    try {
      record = e.app.findFirstRecordByData("tickets", "response_id", id);
    } catch (_) {
      record = null;
    }
    var answers = JSON.stringify(canon(row.answers || {}));
    if (record && JSON.stringify(canon(JSON.parse(String(record.get("answers") || "{}")))) === answers) {
      counts.unchanged++;
      continue;
    }
    var isNew = !record;
    if (isNew) {
      record = new Record(collection);
      record.set("response_id", id);
      record.set("status", "new");
    }
    record.set("submitted_at", String(row.submitted_at || ""));
    record.set("name", String(row.name || "").substring(0, 200));
    record.set("email", String(row.email || "").trim().toLowerCase().substring(0, 200));
    record.set("phone", String(row.phone || "").substring(0, 50));
    record.set("count", Number(row.count) || 0);
    record.set("answers", JSON.parse(answers));
    try {
      e.app.save(record);
      counts[isNew ? "created" : "updated"]++;
    } catch (err) {
      console.log("[tickets] save failed for one row: " + err);
      counts.failed++;
    }
  }
  console.log("[tickets] " + JSON.stringify(counts));
  return e.json(200, { ok: true, counts: counts });
});
