// Kode til andmeldelse kort
const reviewCarousel = document.getElementById('forsideAnmeldelserKarousel');
const leftArrow = document.querySelector('.forside-anmeldelser__pil--venstre');
const rightArrow = document.querySelector('.forside-anmeldelser__pil--højre');

// Tjekker om de findes på siden (så vi ikke får fejl på andre sider)
if (reviewCarousel && leftArrow && rightArrow) {
    
    // Klik på venstre pil
    leftArrow.addEventListener('click', () => {
        const cardWidth = reviewCarousel.querySelector('.forside-anmeldelser__kort').offsetWidth;
        // Tilføj gap (f.eks. 32px) til scroll-afstanden så den scroller et helt kort af gangen
        reviewCarousel.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' });
    });

    // Klik på højre pil
    rightArrow.addEventListener('click', () => {
        const cardWidth = reviewCarousel.querySelector('.forside-anmeldelser__kort').offsetWidth;
        reviewCarousel.scrollBy({ left: (cardWidth + 32), behavior: 'smooth' });
    });
}