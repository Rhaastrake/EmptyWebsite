document.addEventListener("DOMContentLoaded", () => {
  function normalizePhoneNumber(input) {
    let value = input.value.replace(/[^0-9+]/g, "");

    if (value.startsWith("+")) {
      value = "+" + value.slice(1).replace(/\+/g, "");
      if (value.length > 4) {
        value = value.slice(0, 3) + " " + value.slice(3);
      }
    } else {
      value = value.replace(/\+/g, "");
    }

    input.value = value;
  }

  document.querySelectorAll('input[type="tel"]').forEach(el => normalizePhoneNumber(el));


  document.addEventListener("input", e => {
    if (e.target.matches('input[type="tel"]')) {
      normalizePhoneNumber(e.target);
    }
  });
});
