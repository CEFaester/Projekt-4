// Carl Emil: Kort JS - håndterer kortene og filtreringen på kort-sektionen på events.html
// Lavet i samarbejde med AI - rettet og tilpasset af Carl Emil
// SE AI PROMPT DOKUMENT FOR MERE INFO OM KODEN

// 1. VORES ORDBOG (Mapping Object): Oversætter sikre ID'er til pæne navne
const regionNames = {
    "hovedstaden": "Hovedstaden",
    "sjaelland": "Sjælland",
    "syddanmark": "Syddanmark",
    "midtjylland": "Midtjylland",
    "nordjylland": "Nordjylland"
};

// 2.
const eventsData = [
    { 
        title: "Introaften", 
        region: "hovedstaden", 
        date: "01/03 - 2026", 
        description: "Vores introaften er en afslappet måde at lære SIND at kende på. <br><br> Her møder du både frivillige og ansatte, som fortæller om: <br><br> • hvad man laver som frivillig <br> • hvilke roller man kan have <br> • hvordan man kommer i gang <br><br> Der er også tid til spørgsmål, snak og kaffe.",
        image: "img/sind__events__introAften.webp", // Stien til dit billede
        icon: "assets/arrow-right.svg"  // Stien til dit ikon
    },
    { 
        title: "Åben Café", 
        region: "syddanmark", 
        date: "12/03 - 2026", 
        description: "Åben Café er et afslappet mødested med kaffe, spil og små snakke. Her kan du opleve stemningen i SIND og møde både frivillige og brugere i et roligt tempo. Du får en fornemmelse af, hvordan aktiviteterne foregår, og hvordan man kan være med. Du behøver ikke tilmelde dig. Kom og kig forbi.",
        image: "img/sind__events__coffee.webp",
        icon: "assets/arrow-right.svg"
    },
    { 
        title: "Walk & Talk", 
        region: "sjaelland", 
        date: "16/03 - 2026", 
        description: "Walk & Talk er en let gåtur, hvor vi taler om frivillighed, fællesskab og alt det, der fylder. Det er en uformel måde at møde os på, hvis du foretrækker bevægelse frem for et mødelokale. Du kan stille spørgsmål undervejs og høre om de forskellige roller. Du behøver ingen forberedelse. Kom og gå med os.",
        image: "img/sind__events__walkAndTalk.webp",
        icon: "assets/arrow-right.svg"
    },
    { 
        title: "Frivillig Workshop", 
        region: "nordjylland", 
        date: "22/03 - 2026", 
        description: "Vores frivillig workshop giver et konkret indblik i, hvad rollen som frivillig indebærer. Vi gennemgår opgaver, samarbejde og den støtte, du får som ny. Du møder både ansatte og erfarne frivillige, som deler deres erfaringer. Det er praktisk, jordnært og helt uforpligtende. Kom og se, om det er noget for dig.",
        image: "img/sind__events__krea.webp",
        icon: "assets/arrow-right.svg"
    },
    { 
        title: "Fællesspisning", 
        region: "nordjylland", 
        date: "05/03 - 2026", 
        description: "Vores fællesspisning er en hyggelig måde at møde både frivillige og andre unge på. Vi spiser sammen og taler om hverdagen i SIND, og du får et indblik i, hvordan fællesskabet fungerer. Der er tid til spørgsmål og uformelle snakke. Du behøver ikke kende nogen på forhånd. Kom og vær med.",
        image: "img/sind__events__spisning.webp",
        icon: "assets/arrow-right.svg"
    },
    { 
        title: "Introaften", 
        region: "midtjylland", 
        date: "01/03 - 2026", 
        description: "Vores introaften er en afslappet måde at lære SIND at kende på. <br><br> Her møder du både frivillige og ansatte, som fortæller om: <br><br> • hvad man laver som frivillig <br> • hvilke roller man kan have <br> • hvordan man kommer i gang <br><br> Der er også tid til spørgsmål, snak og kaffe.",
        image: "img/sind__events__introAften.webp", // Stien til dit billede
        icon: "assets/arrow-right.svg"  // Stien til dit ikon
    }
];

// 3. Få fat i HTML-elementer
const regions = document.querySelectorAll('.map-section__region'); 
const cardsContainer = document.querySelector('.map-section__cards');
const resetBtn = document.querySelector('.map-section__reset-btn');
const dynamicTitle = document.getElementById('dynamic-filter-title');

// 4. Funktion til at vise alle kort
function showAllEvents() {
    cardsContainer.innerHTML = '';
    
    // Valgfrit: En lille overskrift for at vise, at vi ser hele landet
    dynamicTitle.innerText = "Alle events i Danmark";
    dynamicTitle.style.display = "block"; // Sørg for at den er synlig

    eventsData.forEach(event => {
        // Bemærk: Vi sender nu 'true' med, fordi vi VIL se regionerne på kortene her
        const cardHTML = generateCardHTML(event, true);
        cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// 5. Funktion til at filtrere kort efter region
function filterEventsByRegion(regionId) {
    cardsContainer.innerHTML = '';
    const filteredEvents = eventsData.filter(event => event.region === regionId);
    
    const displayName = regionNames[regionId]; 
    
    if (filteredEvents.length === 0) {
        // Skjul overskriften, hvis der ingen events er (valgfrit)
        dynamicTitle.style.display = "none";
        cardsContainer.innerHTML = `<p class="map-section__empty-message">Der er ingen events i ${displayName} lige nu.</p>`;
    } else {
        // NYT: Opdater teksten i den faste overskrift
        dynamicTitle.innerText = `Events i ${displayName}`;
        dynamicTitle.style.display = "block"; // Sørg for at den er synlig

        filteredEvents.forEach(event => {
            const cardHTML = generateCardHTML(event, false);
            cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    }
}

// 6. Funktion til at generere HTML for et enkelt kort
// NYT: showLabel parameteren modtager true eller false
function generateCardHTML(event, showLabel) {
    const displayName = regionNames[event.region];

    // NYT: Vi bygger billedet først.
    const imageHTML = `<img src="${event.image}" alt="${event.title}" class="event-card__image">`;

    // NYT: Mærkatet (label) skal have en specifik klasse for placering.
    const labelHTML = showLabel ? `<span class="event-card__label event-card__label--on-image">${displayName}</span>` : '';

    // Vi bygger kortet med den præcise rækkefølge
    return `
        <div class="event-card">
            ${imageHTML}
            ${labelHTML} <h3 class="event-card__title">${event.title}</h3>
            
            <p class="event-card__description">${event.description}</p>
            
            <div class="event-card__footer">
                <p class="event-card__date">${event.date}</p>
                <img src="${event.icon}" alt="Ikon for ${event.title}" class="event-card__icon">
            </div>
        </div>
    `;
}

// 7. Lytter efter klik på kortet
regions.forEach(region => {
    region.addEventListener('click', function() {
        regions.forEach(r => r.classList.remove('map-section__region--active'));
        this.classList.add('map-section__region--active');
        
        // Får fat i dit nye, sikre ID (f.eks. "sjaelland")
        const selectedRegion = this.getAttribute('id');
        filterEventsByRegion(selectedRegion);
    });
});

// 8. Lytter efter klik på 'Reset Filter' knappen
resetBtn.addEventListener('click', function() {
    regions.forEach(r => r.classList.remove('map-section__region--active'));
    showAllEvents();
});

// 9. Start
showAllEvents();