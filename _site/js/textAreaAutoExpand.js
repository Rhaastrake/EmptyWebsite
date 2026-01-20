// Funzione per applicare auto-expand a una singola textarea
function enableAutoExpand(textArea) {
  textArea.addEventListener("input", () => {
    textArea.style.height = "auto"; // reset altezza
    textArea.style.height = textArea.scrollHeight + "px"; // altezza contenuto
  });

  // Espande subito se c'è già del contenuto
  if (textArea.value) {
    textArea.style.height = textArea.scrollHeight + "px";
  }
}

// Inizializza tutte le textarea già presenti
document.addEventListener("DOMContentLoaded", () => {
  const textAreas = document.querySelectorAll(".auto-expand");
  textAreas.forEach(enableAutoExpand);
});

// Event delegation per textarea aggiunte dinamicamente
document.addEventListener("input", (e) => {
  if (e.target.matches(".auto-expand")) {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }
});
