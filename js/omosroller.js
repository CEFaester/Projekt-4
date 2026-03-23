// Sara: Roller JS - håndterer karousellen på om-os.html
// Lavet i samarbejde med AI (GPT-4.1) - rettet og tilpasset af Sara
// SE AI PROMPT DOKUMENT FOR MERE INFO OM KODEN

const karousel = document.getElementById('rollerKarousel');
const dotsContainer = document.getElementById('rollerDots');
const cards = karousel.querySelectorAll('.omos-roller__kort');
let current = 0;

// Dots
function renderDots() {
  dotsContainer.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'omos-roller__dot' + (i === current ? ' active' : '');
    dot.addEventListener('click', () => scrollToCard(i));
    dotsContainer.appendChild(dot);
  });
}
function scrollToCard(i) {
  cards[i].scrollIntoView({ behavior: 'smooth', inline: 'center' });
  current = i;
  renderDots();
}

// Swipe/scroll tracking
karousel.addEventListener('scroll', () => {
  let minDist = Infinity, idx = 0;
  cards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    const dist = Math.abs(rect.left + rect.width/2 - window.innerWidth/2);
    if (dist < minDist) { minDist = dist; idx = i; }
  });
  if (current !== idx) {
    current = idx;
    renderDots();
  }
});

renderDots();