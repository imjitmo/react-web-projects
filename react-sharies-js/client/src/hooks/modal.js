const closeModal = (overlay) => {
  const $backdropEl = document.querySelector('[data-hs-overlay-backdrop-template]');
  const overLayEL = document.getElementById(overlay);
  overLayEL.classList.add('hidden');
  overLayEL.classList.remove('open');
  overLayEL.removeAttribute('aria-overlay');
  overLayEL.removeAttribute('tabindex', '-1');
  document.body.style.overflow = 'scroll';
  if (!$backdropEl) return;

  $backdropEl.classList.add('opacity-0');
  $backdropEl.style.transitionDuration = `${
    parseFloat(window.getComputedStyle($backdropEl).transitionDuration.replace(/[^\d.-]/g, '')) * 1.8
  }s`;

  $backdropEl.remove();
};

export default closeModal;
