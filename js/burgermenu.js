
/* burger menu funktionalitet */
const menuItems = [
    { menuName: 'Forside', link: 'index.html' },
    { menuName: 'Events', link: 'aktiviteter.html' },
    { menuName: 'Om os', link: 'om-os.html' },
    { menuName: 'FAQ', link: 'faq.html' },
    { menuName: 'Kontakt', link: 'kontakt.html' }
];

const navbarMenu = document.getElementById('navbarMenu');
const navbarBurger = document.getElementById('navbarBurger');

navbarMenu.innerHTML = '';

for (let i = 0; i < menuItems.length; i++) {
    navbarMenu.innerHTML += '<a href="' + menuItems[i].link + '" class="navbar__menu-link">' + menuItems[i].menuName + '</a>';
}



/* burger menu transformering af menuen */
const navbarLinks = navbarMenu.querySelectorAll('.navbar__menu-link');

navbarBurger.addEventListener('click', function () {
    navbarMenu.classList.toggle('active');
    navbarBurger.classList.toggle('active');
});

for (let i = 0; i < navbarLinks.length; i++) {
    navbarLinks[i].addEventListener('click', function () {
        navbarMenu.classList.remove('active');
        navbarBurger.classList.remove('active');
    });
}

document.addEventListener('click', function (event) {
    if (!navbarMenu.contains(event.target) && !navbarBurger.contains(event.target)) {
        navbarMenu.classList.remove('active');
        navbarBurger.classList.remove('active');
    }
});
