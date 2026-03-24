const anmeldelserKarousel = document.getElementById('forsideAnmeldelserKarousel');
const anmeldelserDots = document.getElementById('forsideAnmeldelserDots');

if (anmeldelserKarousel && anmeldelserDots) {
  const anmeldelsesKort = anmeldelserKarousel.querySelectorAll('.forside-anmeldelser__kort');
  let aktivtKort = 0;

  function tegnDots() {
    anmeldelserDots.innerHTML = '';

    anmeldelsesKort.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'forside-anmeldelser__dot' + (index === aktivtKort ? ' active' : '');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Gå til anmeldelse ${index + 1}`);
      dot.addEventListener('click', () => scrollTilKort(index));
      anmeldelserDots.appendChild(dot);
    });
  }

  function scrollTilKort(index) {
    anmeldelsesKort[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
    aktivtKort = index;
    tegnDots();
  }

  anmeldelserKarousel.addEventListener('scroll', () => {
    let mindsteAfstand = Infinity;
    let naermesteKort = 0;

    anmeldelsesKort.forEach((kort, index) => {
      const rektangel = kort.getBoundingClientRect();
      const afstand = Math.abs(rektangel.left + rektangel.width / 2 - window.innerWidth / 2);

      if (afstand < mindsteAfstand) {
        mindsteAfstand = afstand;
        naermesteKort = index;
      }
    });

    if (aktivtKort !== naermesteKort) {
      aktivtKort = naermesteKort;
      tegnDots();
    }
  });

  tegnDots();
}