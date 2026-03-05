export function normalizePhoneNumber(input) {
  if (!input) return; // safety check

  const format = () => {
    let value = input.value.replace(/[^0-9+]/g, "");

    if (value.startsWith("+")) {
      value = "+" + value.slice(1).replace(/\+/g, "");
      if (value.length > 4) value = value.slice(0, 3) + " " + value.slice(3);
    } else {
      value = value.replace(/\+/g, "");
    }

    input.value = value;
  };

  // Normalize immediately
  format();
}

// Wait for DOM ready
document.addEventListener("DOMContentLoaded", () => {
  // Apply to all existing tel inputs
  document.querySelectorAll('input[type="tel"]').forEach(el => normalizePhoneNumber(el));
});

// Listen for dynamic input events
document.addEventListener("input", e => {
  if (e.target.matches('input[type="tel"]')) normalizePhoneNumber(e.target);
});