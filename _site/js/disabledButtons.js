import { showNotification } from "./notification.js";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".disabledButton").forEach(btn => {
        btn.addEventListener("click", () => {
            showNotification("⚠️ Non disponibile", "default");
        });
    });
});
