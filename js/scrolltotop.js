// Sara: Scroll-to-top knap JS - håndterer scroll-to-top knappen på alle sider
// Lavet i samarbejde med AI (GPT-4.1) - rettet og tilpasset af Sara
// SE AI PROMPT DOKUMENT FOR MERE INFO OM KODEN

window.addEventListener('DOMContentLoaded', function() {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
