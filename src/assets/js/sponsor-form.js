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
      done.querySelector("[data-pay-link]").href = link;
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

  button.dataset.label = button.textContent;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    error.hidden = true;
    if (!form.checkValidity()) return fail(msg("required"));
    var fileError = checkFiles();
    if (fileError) return fail(fileError);

    var tier = form.querySelector("input[name=tier]:checked").value;
    // A filled hidden field or a two-second form is a bot: thank it and stop.
    if (form.elements.company_fax.value || Date.now() - shownAt < 2000) return finish(tier);

    var data = new FormData(form);
    data.delete("company_fax");
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
  });
})();
