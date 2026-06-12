// referencias del dom
const openMenu = document.querySelector('#openMenu');
const closeMenu = document.querySelector('#closeMenu');
const goTop = document.querySelector('#goTop');
const overlay = document.querySelector('#menuOverlay');

// guard: si faltan elementos criticos, el modulo no se inicializa
if (!openMenu || !closeMenu || !goTop || !overlay) {
  console.warn(
    'nav.js: elementos del dom no encontrados, modulo no inicializado',
  );
} else {
  const navLinks = overlay.querySelectorAll('.main-nav--mobile .link');

  // funciones de navegacion mobile
  function openNav() {
    overlay.classList.add('is-open');
    openMenu.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    overlay.classList.remove('is-open');
    openMenu.setAttribute('aria-expanded', 'false');
  }

  // funciones del boton ir arriba
  function showGoTopButton() {
    goTop.classList.add('is-active');
  }

  function hideGoTopButton() {
    goTop.classList.remove('is-active');
  }

  // listeners del menu mobile
  openMenu.addEventListener('click', openNav);
  closeMenu.addEventListener('click', closeNav);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  document.addEventListener('click', (e) => {
    if (e.target === overlay) closeNav();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  // listeners del boton ir arriba
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      showGoTopButton();
    } else {
      hideGoTopButton();
    }
  });

  goTop.addEventListener('click', () => {
    hideGoTopButton();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
