/// <reference path="../pb_data/types.d.ts" />

// Upload rules (Alexander, 2026-11-01): still images are PNG, JPEG or SVG; a
// video is a small MP4 or MOV, or a direct YouTube link (pb_hooks/sponsors.pb.js).
// Minimum pixels are checked in the browser only.
migrate((app) => {
  const IMAGES = ["image/png", "image/jpeg", "image/svg+xml"];
  const collection = app.findCollectionByNameOrId("sponsors");
  collection.fields.getByName("logo").mimeTypes = IMAGES;
  collection.fields.getByName("stage_media").mimeTypes = [...IMAGES, "video/mp4", "video/quicktime"];
  return app.save(collection);
}, (app) => {
  const IMAGES = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];
  const collection = app.findCollectionByNameOrId("sponsors");
  collection.fields.getByName("logo").mimeTypes = [...IMAGES, "application/pdf"];
  collection.fields.getByName("stage_media").mimeTypes = [...IMAGES, "application/pdf", "video/mp4", "video/quicktime",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-powerpoint"];
  return app.save(collection);
});
