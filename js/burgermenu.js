// Responsive burger menu toggle
window.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('burgerMenu');
  const menu = document.getElementById('navbarMenu');
  if (burger && menu) {
    burger.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
    burger.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        menu.classList.toggle('active');
      }
    });
  }
});
