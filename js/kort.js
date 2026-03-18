// 1. VORES ORDBOG (Mapping Object): Oversætter sikre ID'er til pæne navne
const regionNames = {
    "hovedstaden": "Hovedstaden",
    "sjaelland": "Sjælland",
    "syddanmark": "Syddanmark",
    "midtjylland": "Midtjylland",
    "nordjylland": "Nordjylland"
};

// 2. Data: Bemærk at 'region' nu bruger de små, sikre ID'er
const eventsData = [
    { title: "Kulturnat i København", region: "hovedstaden", date: "15. Marts", description: "En aften med masser af kulturelle oplevelser." },
    { title: "Strandfest i Helsingør", region: "hovedstaden", date: "20. Marts", description: "Musik, dans og sjov på stranden." },
    { title: "Vandretur på Møns Klint", region: "sjaelland", date: "18. Marts", description: "Oplev den smukke natur og den betagende udsigt." },
    { title: "Lego House Besøg", region: "syddanmark", date: "12. Marts", description: "Sjov og læring for hele familien." },
    { title: "Musikevent i Odense", region: "syddanmark", date: "22. Marts", description: "Live musik fra danske kunstnere." },
    { title: "Aarhus Festuge", region: "midtjylland", date: "28. Marts", description: "Danmarks største kulturfestival." },
    { title: "Kunstbyvandring", region: "nordjylland", date: "16. Marts", description: "Opdag de skjulte perler i Aalborg." },
    { title: "Smag på Himmerland", region: "nordjylland", date: "25. Marts", description: "Prøv lokale delikatesser." }
];

// 3. Få fat i HTML-elementer
const regions = document.querySelectorAll('.map-section__region'); 
const cardsContainer = document.querySelector('.map-section__cards');
const resetBtn = document.querySelector('.map-section__reset-btn');

// 4. Funktion til at vise alle kort
function showAllEvents() {
    cardsContainer.innerHTML = '';
    eventsData.forEach(event => {
        const cardHTML = generateCardHTML(event);
        cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// 5. Funktion til at filtrere kort efter region
function filterEventsByRegion(regionId) {
    cardsContainer.innerHTML = '';
    const filteredEvents = eventsData.filter(event => event.region === regionId);
    
    // Slå det pæne navn op i vores ordbog
    const displayName = regionNames[regionId]; 
    
    if (filteredEvents.length === 0) {
        // Brug det pæne navn i fejlbeskeden
        cardsContainer.innerHTML = `<p class="map-section__empty-message">Der er ingen events i ${displayName} lige nu.</p>`;
    } else {
        filteredEvents.forEach(event => {
            const cardHTML = generateCardHTML(event);
            cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    }
}

// 6. Funktion til at generere HTML for et enkelt kort
function generateCardHTML(event) {
    // Slå det pæne navn op i ordbogen baseret på eventets ID (f.eks. "sjaelland" -> "Sjælland")
    const displayName = regionNames[event.region];

    return `
        <div class="event-card">
            <span class="event-card__label">${displayName}</span>
            <h3 class="event-card__title">${event.title}</h3>
            <p class="event-card__date"><strong>Dato:</strong> ${event.date}</p>
            <p class="event-card__description">${event.description}</p>
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