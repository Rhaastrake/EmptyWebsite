let currentNotification = null; // tiene traccia della notifica attiva

export function showNotification(notificationContent, duration) {
  // se c'è già una notifica, rimuovila subito
  if (currentNotification) {
    currentNotification.remove();
    currentNotification = null;
  }

  if (duration === "default") {
    duration = 5000;
  }

  const box = document.createElement("div");
  box.textContent = notificationContent;

  // Stile fisso
  box.style.position = "fixed";
  box.style.top = "12vh";
  box.style.left = "50%";
  box.style.transform = "translateX(-50%)";
  box.style.width = "600px";
  box.style.maxWidth = "90%";
  box.style.height = "100px";
  box.style.display = "flex";
  box.style.alignItems = "center";
  box.style.justifyContent = "center";
  box.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
  box.style.color = "white";
  box.style.fontSize = "1.5rem";
  box.style.borderRadius = "12px";
  box.style.backdropFilter = "blur(8px)";
  box.style.transition = "opacity 0.6s ease";
  box.style.opacity = "1";
  box.style.zIndex = "9999";

  document.body.appendChild(box);
  currentNotification = box; // aggiorna la variabile globale

  setTimeout(() => {
    box.style.opacity = "0";
    setTimeout(() => {
      box.remove();
      currentNotification = null; // resetta quando scompare
    }, 600);
  }, duration);
}
