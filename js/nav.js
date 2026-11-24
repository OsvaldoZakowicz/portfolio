// referencias del dom
const openMenu = document.querySelector('#openMenu');
const closeMenu = document.querySelector('#closeMenu');
const goTop = document.querySelector('#goTop');
const overlay = document.querySelector('#menuOverlay');
const backdrop = document.querySelector('#menuBackdrop');

// guard: si faltan elementos criticos, el modulo no se inicializa
if (!openMenu || !closeMenu || !goTop || !overlay) {
  console.warn(
    'nav.js: elementos del dom no encontrados, modulo no inicializado',
  );
} else {
  const navLinks = overlay.querySelectorAll('.main-nav--mobile .link');

  // funciones de navegacion mobile off-canvas
  function openNav() {
    overlay.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    openMenu.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    overlay.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    openMenu.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
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

  if (backdrop) {
    backdrop.addEventListener('click', closeNav);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeNav();
      openMenu.focus();
    }
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
