import { showNotification } from "./notification.js";



//
// Imposta un eventListener su tutti gli elementi con classe disabledButton e fa apparire una notifica
//
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".disabledButton").forEach(btn => {
        btn.addEventListener("click", () => {
            showNotification("⚠️ Non disponibile", "default");
        });
    });
});
