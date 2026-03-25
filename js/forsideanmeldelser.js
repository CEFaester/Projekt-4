// FORSIDE: Anmeldelser Karrusel (Pile og Prikker)
const reviewCarousel = document.getElementById('forsideAnmeldelserKarousel');
const leftArrow = document.querySelector('.forside-anmeldelser__pil--venstre');
const rightArrow = document.querySelector('.forside-anmeldelser__pil--højre');
const dots = document.querySelectorAll('.forside-anmeldelser__dot');
const cards = document.querySelectorAll('.forside-anmeldelser__kort');

if (reviewCarousel && cards.length > 0) {
    
    // Hjælpefunktion: Finder bredden på et kort + mellemrummet (gap)
    function getScrollAmount() {
        const cardWidth = cards[0].offsetWidth;
        // Henter karrusellens 'gap' automatisk fra CSS'en (så det passer på både mobil og desktop)
        const gap = parseFloat(window.getComputedStyle(reviewCarousel).gap) || 0; 
        return cardWidth + gap;
    }

    // =========================================
    // 1. PILE LOGIK
    // =========================================
    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            reviewCarousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        rightArrow.addEventListener('click', () => {
            reviewCarousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }

    // =========================================
    // 2. KLIK PÅ PRIKKER LOGIK
    // =========================================
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Rul karrusellen hen til den position, prikken repræsenterer
            reviewCarousel.scrollTo({
                left: index * getScrollAmount(),
                behavior: 'smooth'
            });
        });
    });

    // =========================================
    // 3. OPDATER PRIKKER VED SCROLL (SWIPE/KLIK)
    // =========================================
    reviewCarousel.addEventListener('scroll', () => {
        // Udregn hvilket kort der primært er synligt lige nu
        const scrollPosition = reviewCarousel.scrollLeft;
        const activeIndex = Math.round(scrollPosition / getScrollAmount());

        // Gennemgå alle prikker: Giv den rigtige prik 'active' klassen, og fjern den fra resten
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });
}