// Sara: Quiz JS - håndterer quizzen på om-os.html
// Lavet i samarbejde med AI (GPT-4.1) - rettet og tilpasset af Sara

// -----------------------------
// QUIZ SPØRGSMÅL OG SVAR (A-E)
// -----------------------------
const quizSpørgsmål = [
  {
    tekst: "Hvad giver mest mening for dig?",
    valg: [
      "At være der for ét menneske",         // A
      "At hjælpe nogen i en svær situation", // B
      "At skabe gode oplevelser for andre",  // C
      "At være med til at tage beslutninger",// D
      "At lytte til nogen, der har brug for det" // E
    ]
  },
  {
    tekst: "Hvordan vil du helst bruge din tid?",
    valg: [
      "I rolige samtaler",                   // A
      "Ved at støtte og guide",              // B
      "Planlægge og samle folk",             // C
      "Tænke over retning og udvikling",     // D
      "Tage snakke over telefon"             // E
    ]
  },
  {
    tekst: "Hvad passer bedst på dig?",
    valg: [
      "Jeg er god til at være nærværende",   // A
      "Jeg er god til at støtte andre",      // B
      "Jeg får energi af at sætte ting i gang", // C
      "Jeg kan godt lide ansvar",            // D
      "Jeg er god til at lytte"              // E
    ]
  },
  {
    tekst: "Hvad lyder mest som dig?",
    valg: [
      "En gåtur og en god snak",             // A
      "At være med til et vigtigt møde",     // B
      "At lave et event eller en aktivitet", // C
      "At sidde med til møder og tage beslutninger", // D
      "En samtale med én, der har brug for det" // E
    ]
  },
  {
    tekst: "Hvad betyder mest for dig?",
    valg: [
      "Nærvær",                              // A
      "At gøre en forskel i noget svært",    // B
      "Fællesskab",                          // C
      "Indflydelse",                         // D
      "At være der, når nogen rækker ud"     // E
    ]
  },
  {
    tekst: "Hvordan har du det med ansvar?",
    valg: [
      "Jeg vil helst bare være der for en anden", // A
      "Jeg tager gerne ansvar for at støtte én person", // B
      "Jeg tager ansvar for aktiviteter",      // C
      "Jeg trives med ansvar og beslutninger", // D
      "Jeg tager ansvar i samtaler"            // E
    ]
  }
];

// -----------------------------
// ROLLE-MAPPING TIL RESULTAT
// -----------------------------
const quizRoller = {
  A: {
    titel: "🌱 Besøgsven",
    beskrivelse: "Du er typen, man kan slappe af med. Du er god til at være der — og det gør en større forskel, end du tror. Du kan lide rolige samtaler, du er god til at skabe tryghed, og du nyder at gøre en forskel på et personligt niveau. Som besøgsven er du der for ét menneske ad gangen. Det kan være en gåtur, en kop kaffe eller bare en snak om stort og småt. Det vigtigste er nærvær og tid. Du behøver ikke være ekspert — det handler om at lytte og være til stede. De, der møder dig, oplever tryghed og varme, og du får ofte selv gode relationer og små øjeblikke, der betyder meget."
  },
  B: {
    titel: "🤝 Bisidder",
    beskrivelse: "Du er en, der bakker andre op, når det gælder. Du hjælper mennesker med at stå stærkere i svære situationer. Du er empatisk, rolig i pressede situationer og kan hjælpe andre med at navigere i svære ting. Som bisidder er du med, når nogen har brug for støtte i svære situationer. Det kan være ved møder, samtaler med myndigheder eller andre situationer, hvor det hjælper at have én med, der støtter og taler deres sag. Din rolle er vigtig, fordi du hjælper andre med at føle sig hørt og forstået."
  },
  C: {
    titel: "🎉 Arrangement & events",
    beskrivelse: "Du skaber liv og fællesskab. Du er med til at få ting til at ske — og samle mennesker. Du har energi og idéer, kan lide at arrangere og samle folk, og du får glæde af at se andre have det sjovt og være sammen. Her får du lov til at sætte gang i tingene! Du kan være med til at planlægge sociale aktiviteter, events eller fællesskaber, der samler folk. Din rolle er at skabe gode oplevelser, hvor folk føler sig velkomne, og hvor fællesskabet blomstrer."
  },
  D: {
    titel: "🧭 Bestyrelsesarbejde",
    beskrivelse: "Du tænker lidt længere frem. Du vil gerne have indflydelse og være med til at forme noget. Du kan lide ansvar, tænker strategisk og har lyst til at være med til at forme fremtiden for SIND. Som frivillig i bestyrelsen er du med til at tage beslutninger og udvikle organisationen. Du arbejder med strategiske opgaver, planer og rammer, der gør det muligt for SIND at vokse og nå ud til flere. Din indsats påvirker hele fællesskabet, og du får erfaring med ledelse, planlægning og samarbejde på et overordnet niveau."
  },
  E: {
    titel: "☎️ Telefonrådgivning",
    beskrivelse: "Du er god til at lytte — helt ægte. Du er der for mennesker, når de har brug for nogen at tale med. Du er tålmodig, god til at lytte og kan skabe tryghed selv i korte samtaler. Du synes det er givende at hjælpe andre, også uden fysisk kontakt. Som telefonrådgiver hjælper du mennesker, der ringer ind og har brug for nogen at tale med. Det kan være alt fra små ting til svære situationer. Din vigtigste rolle er at lytte, stille spørgsmål og give nærvær. Du hjælper anonymt, men din indsats kan betyde rigtig meget for den, der ringer."
  }
};

// -----------------------------
// QUIZ FLOW OG MODALS  

// -----------------------------
// QUIZ FLOW OG LOOP-SEKTIONER
// -----------------------------
let quizSvar = [];
let nuværende = 0;

// Elementer
const intro = document.getElementById('quizIntro');
const spil = document.getElementById('quizSpil');
const startKnap = document.getElementById('quizStartKnap');
const næsteKnap = document.getElementById('quizNæsteKnap');
const scoreModal = document.getElementById('quizScoreModal');
const valgModal = document.getElementById('quizValgModal');
const lukScore = document.getElementById('quizLukScore');
const lukValg = document.getElementById('quizLukValg');

// -----------------------------
// VIS SPØRGSMÅL (LOOP)
// -----------------------------
function visSpørgsmål() {
  const spm = quizSpørgsmål[nuværende];
  document.getElementById('quizSpørgsmålTekst').textContent = spm.tekst;
  for (let i = 0; i < 5; i++) {
    document.getElementById('quizValg' + (i+1) + 'Label').textContent = spm.valg[i];
    document.getElementById('quizValg' + (i+1)).checked = false;
  }
  document.getElementById('quizNr').textContent = (nuværende+1) + ' / ' + quizSpørgsmål.length;
  document.getElementById('quizScore').textContent = quizSvar.length;
}

function visQuiz() {
  startKnap.style.display = 'none';
  intro.style.display = 'none';
  spil.style.display = 'block';
  visSpørgsmål();
}

function visScoreModal(rolle) {
  scoreModal.style.display = 'block';
  document.getElementById('quizAntalForsøg').textContent = quizSpørgsmål.length;
  document.getElementById('quizForkert').textContent = '';
  document.getElementById('quizKorrekt').textContent = '';
  document.getElementById('quizProcent').textContent = '';
  document.getElementById('quizBemærkning').innerHTML = `<strong>${quizRoller[rolle].titel}</strong><br>${quizRoller[rolle].beskrivelse}`;
}

function skjulScoreModal() {
  scoreModal.style.display = 'none';
  intro.style.display = 'block';
  startKnap.style.display = 'inline-block';
  spil.style.display = 'none';
  nuværende = 0;
  quizSvar = [];
}

function visValgModal() {
  valgModal.style.display = 'block';
}
function skjulValgModal() {
  valgModal.style.display = 'none';
}

function håndterSvar() {
  // Find valgt svar (A-E)
  let valgt = -1;
  for (let i = 0; i < 5; i++) {
    if (document.getElementById('quizValg' + (i+1)).checked) valgt = i;
  }
  if (valgt === -1) {
    visValgModal();
    return;
  }
  quizSvar.push(['A','B','C','D','E'][valgt]);
  nuværende++;
  if (nuværende < quizSpørgsmål.length) {
    visSpørgsmål();
  } else {
    spil.style.display = 'none';
    // Tæl flest forekomster
    const counts = {A:0, B:0, C:0, D:0, E:0};
    quizSvar.forEach(s => counts[s]++);
    const max = Math.max(...Object.values(counts));
    const vinder = Object.keys(counts).find(key => counts[key] === max);
    visScoreModal(vinder);
  }
}

// Event listeners
if (startKnap) startKnap.addEventListener('click', visQuiz);
if (næsteKnap) næsteKnap.addEventListener('click', håndterSvar);
if (lukScore) lukScore.addEventListener('click', skjulScoreModal);
if (lukValg) lukValg.addEventListener('click', skjulValgModal);
