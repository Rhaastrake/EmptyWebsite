import { showNotification } from "./notification.js";

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ==============================
     ANIMAZIONE CAMBIO SEZIONE
  ============================== */
  const openFormBtn = document.getElementById("openFormBtn");
  const formSectionContent = document.querySelector(".form-section-content");
  const formSectionForm = document.querySelector(".form-section-form");

  openFormBtn.addEventListener("click", () => {
    formSectionContent.classList.remove("animate__fadeInRight");
    formSectionContent.classList.add("animate__fadeOutLeft");

    setTimeout(() => {
      formSectionContent.classList.add("d-none");
      formSectionForm.classList.remove("d-none");
      formSectionForm.classList.add("animate__fadeInRight");
    }, 300);
  });

  /* ==============================
     PERCORSI DOMANDE
  ============================== */
  const questionTree = {
    newpc: [
      {
        id: "q1",
        text: "Che tipologia di PC desideri?",
        options: ["PC da gaming", "PC da ufficio e produttività"],
        next: "q2",
      },
      {
        id: "q2",
        text: "Valuteresti dei componenti usati?",
        options: [
          "No, preferisco nuovi",
          "Si, vanno bene anche usati",
          "Si, voglio solo componenti usati",
        ],
        next: "q3",
      },
      {
        id: "q3",
        text: "Hai già uno schermo?",
        options: ["Si, ne ho già uno", "No, ho bisogno di uno"],
        next: "q4",
      },
      {
        id: "q4",
        text: "Puoi indicarmi il tuo budget?",
        options: ["€ 500-800", "€ 800-1200", "Oltre €1200"],
        next: "end",
      },
    ],
    assistance: [
      {
        id: "a1",
        text: "Che tipo di problema hai?",
        options: ["Hardware", "Software"],
        next: "end",
      },
    ],
  };

  /* ==============================
     VARIABILI GLOBALI
  ============================== */
  const formContainer = document.getElementById("main-form");
  let answers = {};
  let currentPath = [];

  /* ==============================
     ANIMAZIONE
  ============================== */
  function animateForm(container) {
    container.classList.remove("animate__fadeInRight");
    void container.offsetWidth;
    container.classList.add("animate__fadeInRight");
  }

  /* ==============================
     MOSTRA DOMANDA / STEP SUCCESSIVO
  ============================== */
  function showNode(currentId) {
    formContainer.innerHTML = "";
    if (currentId === "end") {
      showDetailsInput(); // direttamente ai dettagli
      return;
    }

    const q = currentPath.find((i) => i.id === currentId);
    if (!q) return;

    const h2 = document.createElement("h2");
    h2.textContent = q.text;
    h2.classList.add("neon-blue");
    formContainer.appendChild(h2);

    const ul = document.createElement("ul");
    ul.style.fontSize = "1.2rem";

    q.options.forEach((opt) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.className = "form-section-form-btn";
      p.textContent = opt;
      p.addEventListener("click", () => {
        answers[q.text] = opt;
        showNode(q.next);
      });
      li.appendChild(p);
      ul.appendChild(li);
    });

    formContainer.appendChild(ul);
    animateForm(formContainer);
  }

  /* ==============================
     STEP 2 — DETTAGLI TESTUALI
  ============================== */
  function showDetailsInput() {
    formContainer.innerHTML = "";

    // Se il percorso è "assistance" mostriamo la textarea
    if (answers.percorso === "assistance") {
      formContainer.innerHTML = `
    <h2 class="neon-blue">Vuoi aggiungere qualche dettaglio?</h2>
    <div class="mb-3">
      <textarea 
        name="details"
        id="details"
        class="form-control form-section-form-btn"
        placeholder="Descrivi il problema (opzionale)"
        rows="5"
        style="
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 0.25rem;
          padding: 1rem 0.75rem 0.25rem;
          height: 200px;
          resize: none;
        "
      ></textarea>
    </div>
    <button id="nextToContacts" class="btn openFormBtn mt-3">Avanti</button>
  `;

      const textarea = formContainer.querySelector("textarea");
      textarea.style.caretColor = "white"; // cursore bianco

      // colore placeholder bianco
      textarea.style.setProperty("::placeholder", "white"); // NON FUNZIONA in JS
      // soluzione corretta via CSS dinamico:
      const style = document.createElement("style");
      style.textContent = `#details::placeholder { color: white; opacity: 1; }`;
      document.head.appendChild(style);

      document
        .getElementById("nextToContacts")
        .addEventListener("click", () => {
          if (textarea.value.trim() !== "") {
            answers["Dettagli aggiuntivi"] = textarea.value.trim();
          }
          showFinalInputs();
        });
    } else {
      // Per altri percorsi si passa direttamente ai contatti
      showFinalInputs();
    }

    animateForm(formContainer);
  }

  /* ==============================
     STEP 3 — DATI FINALI
  ============================== */
  function showFinalInputs() {
    const formType =
      answers.percorso === "assistance"
        ? "assistanceForm"
        : answers.percorso === "newpc"
        ? "newPCForm"
        : "bugReportForm";

    formContainer.innerHTML = `
      <h2 class="neon-blue">Ultimo passaggio: lasciaci i tuoi contatti</h2>
      <form id="finalForm" class="mt-3 floating-form">
        <input type="hidden" name="formType" value="${formType}">

        <div class="form-floating mb-3">
          <input required name="fullName" id="fullName" class="form-control form-section-form-btn" placeholder=" " style="background-color: rgba(255, 255, 255, 0.1); color: white;">
          <label for="fullName" style="color: white;">Nome e cognome</label>
        </div>

        <div class="form-floating mb-3">
          <input required name="phoneNumber" id="phoneNumber" class="form-control form-section-form-btn" placeholder=" " style="background-color: rgba(255, 255, 255, 0.1); color: white;">
          <label for="phoneNumber" style="color: white;">Telefono</label>
        </div>

        <div class="form-floating mb-3">
          <input required name="location" id="location" class="form-control form-section-form-btn" placeholder=" " style="background-color: rgba(255, 255, 255, 0.1); color: white;">
          <label for="location" style="color: white;">Città</label>
        </div>

        <button type="submit" class="btn openFormBtn">Invia richiesta</button>
      </form>
    `;

    const finalForm = document.getElementById("finalForm");
    finalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(finalForm);
      formData.append("answers", JSON.stringify(answers));

      fetch("php/sendForm.php", { method: "POST", body: formData })
        .then((res) => res.text())
        .then((data) => {
          showNotification(data, "default");

          formContainer.innerHTML = `
          <h2 class="neon-blue">Grazie per averci contattati</h2>
          <p>Cercheremo di rispondere entro qualche ora</p>
          `;
        })
        .catch((error) => {
          showNotification(error, "default");
        });
    });

    animateForm(formContainer);
  }

  /* ==============================
     SCELTA PERCORSO INIZIALE
  ============================== */
  formContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".form-section-form-btn[data-choice]");
    if (!btn) return;
    answers = { percorso: btn.dataset.choice };
    currentPath = questionTree[btn.dataset.choice];
    showNode(currentPath[0].id);
  });

  document.querySelectorAll(".disabled-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      showNotification("Il tasto è momentaneamente disabilitato!", 5000);
    });
  });
});
