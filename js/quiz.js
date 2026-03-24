// Sara: Quiz JS - håndterer quizzen på om-os.html
// Lavet i samarbejde med AI (GPT-4.1) - rettet og tilpasset af Sara
// SE AI PROMPT DOKUMENT FOR MERE INFO OM KODEN
// Quiz inspiration: https://dev.to/sulaimonolaniran/building-a-simple-quiz-with-html-css-and-javascript-4elp-->


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
    beskrivelse: "Du er en, man kan slappe af med. Du er god til at lytte og skabe tryghed. Som besøgsven er du der for ét menneske ad gangen – fx til en gåtur, en kop kaffe eller en rolig snak. <br><br>Det vigtigste er dit nærvær og din tid."
  },
  B: {
    titel: "🤝 Bisidder",
    beskrivelse: "Du er en tryg støtte, når det gælder. Du er rolig og empatisk, også i svære situationer. Som bisidder deltager du i møder og hjælper andre med at føle sig hørt, forstået og bedre rustet. <br><br>Det kan være i møder med myndigheder, på hospitalet eller andre steder, hvor det kan være svært at være alene. "
  },
  C: {
    titel: "🎉 Arrangement & events",
    beskrivelse: "Du kan lide at samle mennesker og skabe liv. Du får idéer og energi af fællesskaber. <br><br>Her er du med til at planlægge aktiviteter og events, hvor folk mødes og får gode oplevelser sammen."
  },
  D: {
    titel: "🧭 Bestyrelsesarbejde",
    beskrivelse: "Du tænker fremad og vil gerne have indflydelse. Du trives med ansvar og overblik. I bestyrelsen er du med til at udvikle organisationen og skabe rammerne for fællesskabet. <br><br>Du får erfaring med at arbejde strategisk og tage beslutninger, der har betydning for mange mennesker."
  },
  E: {
    titel: "☎️ Telefonrådgivning",
    beskrivelse: "Du er tålmodig og god til at lytte. Du kan skabe tryghed – også på afstand. <br><br>Som telefonrådgiver taler du med mennesker, der har brug for støtte, og giver nærvær gennem samtaler."
  }
};

// -----------------------------
// QUIZ FLOW OG MODALS  

// -----------------------------
// QUIZ FLOW OG LOOP-SEKTIONER

let quizSvar = [];
let nuværende = 0;

const el = {
  intro: document.getElementById('quizIntro'),
  spil: document.getElementById('quizSpil'),
  startKnap: document.getElementById('quizStartKnap'),
  næsteKnap: document.getElementById('quizNæsteKnap'),
  scoreModal: document.getElementById('quizScoreModal'),
  valgModal: document.getElementById('quizValgModal'),
  lukScore: document.getElementById('quizLukScore'),
  lukValg: document.getElementById('quizLukValg'),
  quizBemærkning: document.getElementById('quizBemærkning')
};

function visSpørgsmål() {
  const spm = quizSpørgsmål[nuværende];
  document.getElementById('quizSpørgsmålTekst').textContent = spm.tekst;
  for (let i = 0; i < 5; i++) {
    document.getElementById('quizValg' + (i+1) + 'Label').textContent = spm.valg[i];
    document.getElementById('quizValg' + (i+1)).checked = false;
  }
  document.getElementById('quizNr').textContent = (nuværende+1) + ' / ' + quizSpørgsmål.length;
}

function visQuiz() {
  el.startKnap.style.display = 'none';
  el.intro.style.display = 'none';
  el.spil.style.display = 'block';
  visSpørgsmål();
}

function visScoreModal(rolle) {
  el.scoreModal.style.display = 'flex';
  const rolleObj = quizRoller[rolle];
  el.quizBemærkning.innerHTML = rolleObj
    ? `<strong>${rolleObj.titel}</strong><br>${rolleObj.beskrivelse}`
    : '<strong>Resultat ikke fundet</strong><br>Der opstod en fejl – prøv igen.<br>Rolle: ' + rolle;
}

function skjulScoreModal() {
  el.scoreModal.style.display = 'none';
  el.intro.style.display = 'block';
  el.startKnap.style.display = 'inline-block';
  el.spil.style.display = 'none';
  nuværende = 0;
  quizSvar = [];
}

function visValgModal() {
  el.valgModal.style.display = 'flex';
}
function skjulValgModal() {
  el.valgModal.style.display = 'none';
}

function håndterSvar() {
  let valgt = -1;
  for (let i = 0; i < 5; i++) {
    if (document.getElementById('quizValg' + (i+1)).checked) valgt = i;
  }
  if (valgt === -1) return visValgModal();
  quizSvar.push(['A','B','C','D','E'][valgt]);
  nuværende++;
  if (nuværende < quizSpørgsmål.length) {
    visSpørgsmål();
  } else {
    el.spil.style.display = 'none';
    const counts = {A:0, B:0, C:0, D:0, E:0};
    quizSvar.forEach(s => counts[s]++);
    const max = Math.max(...Object.values(counts));
    const vinder = Object.keys(counts).find(key => counts[key] === max);
    visScoreModal(vinder);
  }
}

if (el.startKnap) el.startKnap.addEventListener('click', visQuiz);
if (el.næsteKnap) el.næsteKnap.addEventListener('click', håndterSvar);
if (el.lukScore) el.lukScore.addEventListener('click', skjulScoreModal);
if (el.lukValg) el.lukValg.addEventListener('click', skjulValgModal);