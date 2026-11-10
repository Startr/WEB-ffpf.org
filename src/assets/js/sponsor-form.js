// The sponsor sign-up form on /sponsors/ and /fr/commanditaires/: checks the
// files, sends the form to FFPF's PocketBase with upload progress, then shows
// the thank-you and the tier's Square link. Strings come from data-msg-* on
// the form, so one script serves both languages. Spam guards as on sage.is's
// hardware form: a hidden field and a two-second minimum.
(function () {
  var form = document.querySelector("[data-sponsor-form]");
  if (!form) return;
  var box = form.parentNode;
  var closed = box.querySelector("[data-closed]");
  var done = box.querySelector("[data-done]");
  var error = form.querySelector("[data-error]");
  var progress = form.querySelector("[data-progress]");
  var button = form.querySelector("button[type=submit]");
  var shownAt = Date.now();
  var MB = 1024 * 1024;
  // A direct video link, as in pb/pb_hooks/sponsors.pb.js.
  var YOUTUBE = /^https?:\/\/((www\.|m\.)?youtube\.com\/(watch\?(.*&)?v=|shorts\/|live\/)|youtu\.be\/)[\w-]/i;

  if (Date.now() > Date.parse(form.dataset.closes)) {
    form.hidden = true;
    closed.hidden = false;
    return;
  }

  function msg(name, vars) {
    var text = form.dataset["msg" + name.charAt(0).toUpperCase() + name.slice(1)] || "";
    Object.keys(vars || {}).forEach(function (k) { text = text.replace("{" + k + "}", vars[k]); });
    return text;
  }
  function fail(text) {
    error.textContent = text;
    error.hidden = false;
    progress.hidden = true;
    button.disabled = false;
    button.textContent = button.dataset.label;
  }
  function finish(tier) {
    var link = form.dataset["square" + tier.charAt(0).toUpperCase() + tier.slice(1)];
    form.hidden = true;
    if (link) {
      var pay = done.querySelector("[data-pay-link]");
      pay.href = link;
      // A link on this site is the pay page, which waits for Square.
      if (link.charAt(0) === "/") pay.textContent = msg("details");
      done.querySelector("[data-pay]").hidden = false;
      done.querySelector("[data-pay-later]").hidden = true;
    }
    done.hidden = false;
    done.focus();
    if (window._paq) window._paq.push(["trackEvent", "Sponsors", "Sign-up", tier]);
  }
  // Type, size and count, per file input; returns an error or "".
  function checkFiles() {
    var total = 0;
    var inputs = form.querySelectorAll("input[type=file]");
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var types = input.dataset.types.split(" ");
      var max = Number(input.dataset.maxMb);
      if (input.dataset.maxFiles && input.files.length > Number(input.dataset.maxFiles)) {
        return msg("count", { max: input.dataset.maxFiles });
      }
      for (var j = 0; j < input.files.length; j++) {
        var file = input.files[j];
        var ext = file.name.split(".").pop().toLowerCase();
        if (types.indexOf(ext) === -1) return msg("type", { name: file.name });
        if (file.size > max * MB) return msg("size", { name: file.name, max: max });
        total += file.size;
      }
    }
    return total > 95 * MB ? msg("total") : "";
  }
  // Each PNG and JPG against its input's data-min-width, data-min-height and
  // data-max-side, one at a time; SVG has no pixels to count. A file outside
  // them still goes (Alexander, 2026-11-07): it gets a line for FFPF's notes.
  // Calls back with an error for a file that is not an image, or "", and the
  // lines.
  function checkPixels(callback) {
    var flags = [];
    var queue = [];
    var inputs = form.querySelectorAll("input[data-min-width]");
    for (var i = 0; i < inputs.length; i++) {
      for (var j = 0; j < inputs[i].files.length; j++) {
        var file = inputs[i].files[j];
        if (/\.(png|jpe?g)$/i.test(file.name)) queue.push({ file: file, input: inputs[i] });
      }
    }
    (function next() {
      var item = queue.shift();
      if (!item) return callback("", flags);
      var url = URL.createObjectURL(item.file);
      var image = new Image();
      image.onerror = function () {
        URL.revokeObjectURL(url);
        callback(msg("type", { name: item.file.name }), flags);
      };
      image.onload = function () {
        URL.revokeObjectURL(url);
        var wide = image.naturalWidth >= Number(item.input.dataset.minWidth);
        var tall = image.naturalHeight >= Number(item.input.dataset.minHeight || 0);
        var longest = Math.max(image.naturalWidth, image.naturalHeight);
        var fits = !item.input.dataset.maxSide || longest <= Number(item.input.dataset.maxSide);
        if (!(wide && tall && fits)) {
          flags.push("Size check (" + item.input.name + "): " + item.file.name + " is " +
            image.naturalWidth + " x " + image.naturalHeight + " px; ask for a better file.");
        }
        next();
      };
      image.src = url;
    })();
  }

  button.dataset.label = button.textContent;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    error.hidden = true;
    if (!form.checkValidity()) return fail(msg("required"));
    var video = form.elements.video_url.value.trim();
    if (video && !YOUTUBE.test(video)) return fail(msg("youtube"));
    var fileError = checkFiles();
    if (fileError) return fail(fileError);

    var tier = form.querySelector("input[name=tier]:checked").value;
    // A filled hidden field or a two-second form is a bot: thank it and stop.
    if (form.elements.company_fax.value || Date.now() - shownAt < 2000) return finish(tier);

    checkPixels(function (pixelError, flags) {
      if (pixelError) return fail(pixelError);
      send(tier, flags);
    });
  });

  function send(tier, flags) {
    var data = new FormData(form);
    data.delete("company_fax");
    // The size lines go first in the notes, unless they would push the
    // sponsor's own words past the field's 2000 characters.
    var notes = form.elements.notes.value;
    var flagged = flags.join("\n") + (notes ? "\n\n" + notes : "");
    if (flags.length && flagged.length <= 2000) data.set("notes", flagged);
    ["logo", "stage_media"].forEach(function (name) {
      var files = form.elements[name].files;
      data.delete(name);
      for (var i = 0; i < files.length; i++) data.append(name, files[i]);
    });

    button.disabled = true;
    button.textContent = msg("sending");
    progress.hidden = false;
    progress.value = 0;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", form.dataset.pb + "/api/collections/sponsors/records");
    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) progress.value = Math.round((e.loaded / e.total) * 100);
    };
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) return finish(tier);
      console.log("sponsor sign-up refused: " + xhr.status + " " + xhr.responseText);
      fail(msg("error"));
    };
    xhr.onerror = function () { fail(msg("error")); };
    xhr.send(data);
  }
})();
