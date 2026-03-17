// Scroll-to-top
window.addEventListener('DOMContentLoaded', function() {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
