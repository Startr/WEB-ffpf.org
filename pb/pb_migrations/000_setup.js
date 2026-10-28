/// <reference path="../pb_data/types.d.ts" />

// App settings and the two superusers. The superusers come from env set on
// the CapRover app (OPS-Sage deploy/ffpf-pb.yaml, values in the vault), so no
// shell into the container is needed. Unset variables are skipped.
migrate((app) => {
  const settings = app.settings();
  settings.meta.appName = "FFPF";
  settings.meta.appURL = "https://pb.ffpf.org";
  // Cloudflare sits in front; rate limits count the visitor, not Cloudflare.
  settings.trustedProxy.headers = ["CF-Connecting-IP"];
  settings.rateLimits.enabled = true;
  settings.rateLimits.rules = [
    { label: "sponsors:create", maxRequests: 10, duration: 60 },
    { label: "POST /api/ffpf/tickets", maxRequests: 30, duration: 60 },
    { label: "/api/", maxRequests: 300, duration: 10 },
  ];
  app.save(settings);

  const superusers = app.findCollectionByNameOrId("_superusers");
  for (const prefix of ["PB_ADMIN", "PB_SYNC"]) {
    const email = $os.getenv(prefix + "_EMAIL");
    const password = $os.getenv(prefix + "_PASSWORD");
    if (!email || !password) continue;
    let record;
    try {
      record = app.findAuthRecordByEmail("_superusers", email);
    } catch (_) {
      record = new Record(superusers);
      record.set("email", email);
    }
    record.set("password", password);
    app.save(record);
  }
}, (app) => {
  // Settings and superusers stay on rollback.
});
