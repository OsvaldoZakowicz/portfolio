// referencias del dom
const achievementOverlay = document.querySelector('#achievementOverlay');
const overlayContent = document.querySelector('.achievement-overlay__content');
const closeBtn = document.querySelector('#closeAchievementOverlay');
const thumbs = document.querySelectorAll('.achievement-thumb');
const links = document.querySelectorAll('.achievement-link');

// guard: si faltan elementos criticos, el modulo no se inicializa
if (!achievementOverlay || !overlayContent || !closeBtn) {
  console.warn(
    'achievements.js: elementos del dom no encontrados, modulo no inicializado',
  );
} else {
  // mapa de logros: identificador => datos de la imagen a mostrar
  // centraliza la informacion para no repetirla en cada elemento del dom
  const achievementsData = {
    'title-analista': {
      src: 'assets/img/titulo-analista-sistemas.webp',
      alt: 'titulo de analista en sistemas de computacion',
    },
    'cert-ia': {
      src: 'assets/img/certificado-desarrollo-ia.webp',
      alt: 'certificado de desarrollo con ia, big school',
    },
  };

  // abre el overlay y carga la imagen correspondiente al logro
  function openOverlay(achievementKey) {
    const achievement = achievementsData[achievementKey];
    if (!achievement) return;

    const img = document.createElement('img');
    img.src = achievement.src;
    img.alt = achievement.alt;

    overlayContent.appendChild(img);
    achievementOverlay.classList.add('is-open');
  }

  // cierra el overlay y limpia la imagen cargada
  function closeOverlay() {
    achievementOverlay.classList.remove('is-open');
    // limpia la imagen creada dinamicamente
    overlayContent.innerHTML = '';
  }

  // listeners de apertura: tanto la miniatura como el boton ver
  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      openOverlay(thumb.dataset.achievement);
    });
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      openOverlay(link.dataset.achievement);
    });
  });

  // listeners de cierre
  closeBtn.addEventListener('click', closeOverlay);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeOverlay();
  });

  document.addEventListener('click', (e) => {
    if (e.target === achievementOverlay) closeOverlay();
  });
}
