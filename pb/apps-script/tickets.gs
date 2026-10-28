/**
 * Copies the gala's ticket requests (Google Form forms.gle/G2iZExNBZcAuQGTM7)
 * into FFPF's PocketBase, POST https://pb.ffpf.org/api/ffpf/tickets
 * (pb/pb_hooks/tickets.pb.js). The form keeps working as before.
 *
 * Install, once, as an editor of the form:
 *   1. Form, three-dot menu, Apps Script; paste this file in place of Code.gs.
 *   2. Project Settings, Script Properties: TICKETS_INGEST_TOKEN = the vault
 *      item ffpf-pb-tickets-token (never paste it anywhere else).
 *   3. Triggers, Add Trigger: onFormSubmit, From form, On form submit.
 *   4. Run backfill once; it sends every past response. Running it again
 *      changes nothing (the server matches each response by its id).
 */
var PB_URL = "https://pb.ffpf.org/api/ffpf/tickets";

/** Each new response, as it arrives (installable trigger). */
function onFormSubmit(e) {
  send_([row_(e.response)]);
}

/** Every response so far, 100 per request. */
function backfill() {
  var responses = FormApp.getActiveForm().getResponses();
  for (var i = 0; i < responses.length; i += 100) {
    send_(responses.slice(i, i + 100).map(row_));
  }
  Logger.log("sent " + responses.length + " responses");
}

/** One response as {response_id, submitted_at, name, email, phone, count, answers}. */
function row_(response) {
  var answers = {};
  var row = { response_id: response.getId(), submitted_at: response.getTimestamp().toISOString(),
              name: "", email: response.getRespondentEmail() || "", phone: "", count: 0 };
  response.getItemResponses().forEach(function (item) {
    var title = item.getItem().getTitle();
    var value = item.getResponse();
    var text = Array.isArray(value) ? value.join(", ") : String(value);
    answers[title] = text;
    if (/courriel|e-?mail/i.test(title)) row.email = row.email || text;
    else if (/t[ée]l[ée]phone|phone|cell/i.test(title)) row.phone = text;
    else if (/nom|name/i.test(title) && !row.name) row.name = text;
    if (/billet|ticket|combien|how many|nombre|number|personnes|guests|invit/i.test(title)) {
      var n = parseInt(text, 10);
      if (!isNaN(n)) row.count = n;
    }
  });
  row.answers = answers;
  return row;
}

function send_(rows) {
  var token = PropertiesService.getScriptProperties().getProperty("TICKETS_INGEST_TOKEN");
  if (!token) throw new Error("Set the TICKETS_INGEST_TOKEN script property first.");
  var res = UrlFetchApp.fetch(PB_URL, {
    method: "post", contentType: "application/json", muteHttpExceptions: true,
    headers: { "X-FFPF-Token": token }, payload: JSON.stringify({ rows: rows }),
  });
  if (res.getResponseCode() !== 200) {
    throw new Error("PocketBase answered " + res.getResponseCode() + ": " + res.getContentText().slice(0, 200));
  }
  Logger.log(res.getContentText());
}
