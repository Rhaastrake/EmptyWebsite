document.addEventListener("DOMContentLoaded", () => {
  function normalizePhoneNumber(input) {
    let value = input.value.replace(/[^0-9+]/g, "");

    if (value.startsWith("+")) {
      // Mantiene +, rimuove eventuali altri + e aggiunge spazio dopo le prime 2 cifre
      value = "+" + value.slice(1).replace(/\+/g, "");
      if (value.length > 3) {
        value = value.slice(0, 3) + " " + value.slice(3);
      }
    } else {
      // Rimuove tutti i +
      value = value.replace(/\+/g, "");
    }

    input.value = value;
  }

  // Applica agli input già presenti
  document.querySelectorAll('input[type="tel"]').forEach(el => normalizePhoneNumber(el));

  // Event delegation per input aggiunti dinamicamente
  document.addEventListener("input", e => {
    if (e.target.matches('input[type="tel"]')) {
      normalizePhoneNumber(e.target);
    }
  });
});
