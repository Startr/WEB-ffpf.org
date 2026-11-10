/// <reference path="../pb_data/types.d.ts" />

// Sign-ups stay open to 12 Nov 2026 23:59 Montreal time, not 7 Nov (Dr. D with
// Alexander, 2026-11-07). The live rule was moved through the admin API the
// same day; this keeps a fresh deploy in step. Also in src/_data/dinner2026.js.
// The dates sit inside the callbacks, as in 003: no module-level variables.
migrate((app) => {
  const collection = app.findCollectionByNameOrId("sponsors");
  collection.createRule = collection.createRule.replace(
    '@now <= "2026-11-08 04:59:59.000Z"', '@now <= "2026-11-13 04:59:59.000Z"');
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("sponsors");
  collection.createRule = collection.createRule.replace(
    '@now <= "2026-11-13 04:59:59.000Z"', '@now <= "2026-11-08 04:59:59.000Z"');
  return app.save(collection);
});
