document.addEventListener("DOMContentLoaded", () => {
  const serviceButtons = document.querySelectorAll(".serviceButton");

  const serviceTitle = document.querySelector(".serviceTitle");
  const serviceDescription = document.querySelector(".serviceDescription");
  const serviceCostDisclaimer = document.querySelector(
    ".serviceCostDisclaimer",
  );
  const serviceStartButton = document.querySelector(".serviceStartButton");
  const selectedServiceOverview = document.querySelector(
    ".selectedServiceOverview",
  );
  const selectedServiceForm = document.querySelector(".selectedServiceForm");



  //
  // Descrizioni e form messi a mano per ogni servizio presente nell'html
  //
const servicesData = [
  {
    title: `Assistenza hardware/software`,
    description: `Offro supporto tecnico completo per PC e sistemi operativi di tutte le categorie, sia desktop che laptop.<br><br>
Posso aiutarti a identificare problemi hardware o software, ottimizzare le prestazioni del tuo computer e proporre possibili miglioramenti.<br><br>
Il servizio include consigli pratici, interventi mirati e spiegazioni chiare, lasciando a te la decisione finale su come procedere.`,
    formHTML: `
<form method="post" class="needs-validation" novalidate>
  <input type="hidden" name="formType" value="assistance">

  <div class="mb-3">
    <select class="form-select" name="pcType" id="pcType" required>
      <option value="" selected disabled>Si tratta di un PC fisso o portatile? *</option>
      <option value="desktop">Fisso</option>
      <option value="laptop">Portatile</option>
    </select>
  </div>

  <input type="hidden" name="serviceSpecification" value="assistance">
  <div class="mb-3">
    <select class="form-select" name="serviceSpecification" id="serviceSpecification" required>
      <option value="" selected disabled>Di cosa si tratta? *</option>
      <option value="noBoot">Il PC non si accende</option>
      <option value="software">Aiuto con uno o più programmi</option>
      <option value="cleaning">Pulizia</option>
      <option value="hardware">Cambio componenti</option>
    </select>
  </div>

  <div class="form-floating mb-3">
    <textarea class="form-control auto-expand" id="details" name="details" placeholder="Aggiungi eventuali dettagli" style="height:100px; resize:none;"></textarea>
    <label for="details">Aggiungi eventuali dettagli</label>
  </div>

  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="name" name="name" placeholder="Nome e cognome *" required>
    <label for="name">Nome e cognome *</label>
  </div>

  <div class="form-floating mb-3">
    <input type="tel" class="form-control" id="phoneNumber" name="phoneNumber" placeholder="Numero di telefono *" required>
    <label for="phoneNumber">Numero di telefono *</label>
  </div>

  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="city" name="city" placeholder="Dove abiti? *" required>
    <label for="city">Dove abiti? *</label>
  </div>

  <div class="form-check form-switch mb-3">
    <input class="form-check-input" type="checkbox" id="privacyCheck" required>
    <label class="form-check-label" for="privacyCheck">
      Ho letto e accetto l'<a data-bs-toggle="modal" data-bs-target="#privacyInfoModal"><u style="cursor: pointer;">informativa sulla privacy</u></a>
    </label>
  </div>

  <button class="modernButton" type="submit">Invia richiesta</button>
</form>
`,
  },
  {
    title: `Acquisto e/o assemblaggio`,
    description: `Ti fornisco consulenza completa nella scelta dei componenti e nell'assemblaggio del tuo PC personalizzato.<br><br>
Analizziamo insieme le tue esigenze, valutiamo le opzioni disponibili e realizziamo un sistema su misura, con attenzione alla qualità, compatibilità e durata dei componenti.<br><br>
Posso anche guidarti nella ricerca delle migliori offerte sul mercato e rispondere a tutte le tue domande tecniche in modo chiaro.`,
    formHTML: `
<form method="post" class="needs-validation" novalidate>
  <input type="hidden" name="formType" value="purchaseGuide">

  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="nome" name="nome" placeholder="Nome" required>
    <label for="nome">Nome</label>
  </div>

  <div class="form-floating mb-3">
    <textarea class="form-control auto-expand" id="componenti" name="componenti" placeholder="Componenti desiderati" style="height:100px; resize:none;" required></textarea>
    <label for="componenti">Componenti desiderati *</label>
  </div>

  <div class="form-check form-switch mb-3">
    <input class="form-check-input" type="checkbox" id="privacyCheck" required>
    <label class="form-check-label" for="privacyCheck">
      Ho letto e accetto l'<a data-bs-toggle="modal" data-bs-target="#privacyInfoModal"><u style="cursor: pointer;">informativa sulla privacy</u> *</a>
    </label>
  </div>

  <button class="modernButton" type="submit">Invia richiesta</button>
</form>
`,
  },
  {
    title: `Server discord`,
    description: `Configuro e gestisco server Discord su misura, con stanze organizzate per categorie, automazioni personalizzate e moderazione delle attività.<br><br>
Posso aiutarti a creare una comunità organizzata, sicura e funzionale, adattando il server alle tue necessità specifiche.<br><br>
Tutte le configurazioni e le modifiche vengono discusse direttamente con te, garantendo che ogni funzionalità risponda alle tue esigenze.`,
    formHTML: `
<form method="post" class="needs-validation" novalidate>
  <input type="hidden" name="formType" value="discord">

  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="nomeServer" name="server" placeholder="Nome server" required>
    <label for="nomeServer">Nome server</label>
  </div>

  <div class="form-floating mb-3">
    <textarea class="form-control auto-expand" id="details" name="details" placeholder="Funzionalità richieste" style="height:100px; resize:none;" required></textarea>
    <label for="details">Funzionalità richieste</label>
  </div>

  <div class="form-check form-switch mb-3">
    <input class="form-check-input" type="checkbox" id="privacyCheck" required>
    <label class="form-check-label" for="privacyCheck">
      Ho letto e accetto l'<a data-bs-toggle="modal" data-bs-target="#privacyInfoModal"><u style="cursor: pointer;">informativa sulla privacy</u></a>
    </label>
  </div>

  <button class="modernButton" type="submit">Invia richiesta</button>
</form>
`,
  },
  {
    title: `Siti web / applicazioni`,
    description: `Fornisco supporto tecnico, manutenzione e ottimizzazione di siti web e applicazioni desktop o web su richiesta.<br><br>
Posso effettuare aggiornamenti, backup, correzione di errori e ottimizzazione delle performance, sempre discutendo con te ogni intervento prima di procedere.<br><br>
Il servizio è pensato per aiutarti a mantenere i tuoi progetti online efficienti e aggiornati, senza impegno di contratto fisso.`,
    formHTML: `
<form method="post" class="needs-validation" novalidate>
  <input type="hidden" name="formType" value="application">

  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="nome" name="nome" placeholder="Nome" required>
    <label for="nome">Nome</label>
  </div>

  <div class="form-floating mb-3">
    <textarea class="form-control auto-expand" id="intervento" name="intervento" placeholder="Tipo di intervento" style="height:100px; resize:none;" required></textarea>
    <label for="intervento">Tipo di intervento</label>
  </div>

  <div class="form-check form-switch mb-3">
    <input class="form-check-input" type="checkbox" id="privacyCheck" required>
    <label class="form-check-label" for="privacyCheck">
      Ho letto e accetto l'<a data-bs-toggle="modal" data-bs-target="#privacyInfoModal"><u style="cursor: pointer;">informativa sulla privacy</u></a>
    </label>
  </div>

  <button class="modernButton" type="submit">Invia richiesta</button>
</form>
`,
  },
];



  //
  // Rimuove la classe active (evidenziamento del servizio selezionato) a tutti i servizi ogni volta che viene cliccato un servizio e poi aggiungo active a quello cliccato
  //
  serviceButtons.forEach((currentService, index) => {
    currentService.addEventListener("click", () => {
      
      selectedServiceForm.innerHTML = "";
      selectedServiceOverview.classList.remove("d-none");


      serviceButtons.forEach((service) => service.classList.remove("active"));
      currentService.classList.add("active");



      //
      // Aggiorna la descrizione del servizio sulla destra
      //
      serviceTitle.innerHTML = servicesData[index].title;
      serviceDescription.innerHTML = servicesData[index].description;




      //
      // Rimuove d-none dai div delle descrizioni del servizio dopo averne selezionato uno
      //
      serviceDescription.classList.remove("d-none");
      serviceCostDisclaimer.classList.remove("d-none");
      serviceStartButton.classList.remove("d-none");




      //
      // Mostra il form corrispondente al servizio selezionato quando si clicca il pulsante
      //
      serviceStartButton.onclick = () => {
        selectedServiceForm.innerHTML = servicesData[index].formHTML;
        selectedServiceOverview.classList.add("d-none");
      };
    });
  });
});
