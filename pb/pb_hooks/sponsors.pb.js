/// <reference path="../pb_data/types.d.ts" />

// Sponsor sign-ups from ffpf.org/sponsors: spam guards, open tiers, defaults.
// Everything lives inside the callback: PB 0.36 drops a hooks file that
// declares variables at module level (WEB-DB-sage-pb gate_unlock.pb.js).
onRecordCreateRequest(function (e) {
  // Honeypot: the real form never sends company_fax.
  var fax = e.record.get("company_fax");
  if (fax && String(fax).trim().length > 0) {
    throw new BadRequestError("Invalid submission.");
  }

  // Only the tiers the officers have opened. TIERS_OPEN is set on the
  // CapRover app; Presenting opens after sign-off #2.
  var open = String($os.getenv("TIERS_OPEN") || "gold,silver").split(",")
    .map(function (t) { return t.trim(); });
  if (open.indexOf(String(e.record.get("tier"))) === -1) {
    throw new BadRequestError("This sponsorship level is not open.");
  }

  var email = String(e.record.get("email") || "").trim().toLowerCase();
  e.record.set("email", email);

  // At most three sign-ups per email per hour. A failed lookup never blocks
  // a real sponsor. Stored dates use a space, not "T", and compare as text.
  var recent = [];
  try {
    var since = new Date(Date.now() - 3600 * 1000).toISOString().replace("T", " ");
    recent = e.app.findRecordsByFilter("sponsors", "email = {:email} && created >= {:since}",
      "-created", 10, 0, { email: email, since: since });
  } catch (err) {
    console.log("[sponsors] rate-limit check failed, allowing: " + err);
  }
  if (recent && recent.length >= 3) {
    throw new BadRequestError("Too many recent sign-ups. Please try again later.");
  }

  if (!String(e.record.get("announce_as") || "").trim()) {
    e.record.set("announce_as", e.record.get("organisation"));
  }
  e.record.set("status", "new");
  e.record.set("paid", false);
  e.next();
}, "sponsors");
