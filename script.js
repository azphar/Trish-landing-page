(function () {
  const modal   = document.getElementById('contactModal');
  const openBtn = document.querySelector('.mail__btn');

  if (!modal || !openBtn) return; // only hard requirements

  const closeBtn = modal.querySelector('.modal__close');         // optional
  const form     = modal.querySelector('#contact__form');        // optional
  const nameEl   = form?.querySelector('#name');
  const emailEl  = form?.querySelector('#email');
  const msgEl    = form?.querySelector('#message');
  const loading  = modal.querySelector('.modal__overlay--loading');
  const success  = modal.querySelector('.modal__overlay--success');

  let lastFocused = null;
  let canClose = true; // default: allow closing unless you gate it later

  function openModal() {
    lastFocused = document.activeElement;
    modal.classList.add('modal--open');
    modal.setAttribute('aria-hidden', 'false');
    nameEl?.focus();
    document.addEventListener('keydown', onKeyDown);
  }

  function closeModal() {
    if (!canClose) return;
    modal.classList.remove('modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', onKeyDown);
    loading?.classList.remove('is-active');
    success?.classList.remove('is-active');
    lastFocused && lastFocused.focus?.();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'Tab') {
      const focusables = Array.from(
        modal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')
      ).filter(el => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      if ( e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    }
  }

  // open
  openBtn.addEventListener('click', openModal);

  // close (if the button exists)
  closeBtn?.addEventListener('click', closeModal);

  // backdrop & [data-close-modal]
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
    if (e.target.closest?.('[data-close-modal]')) closeModal();
  });

  // optional submit handling (only if form exists)
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    loading?.classList.add('is-active');
    setTimeout(() => {
      loading?.classList.remove('is-active');
      success?.classList.add('is-active');
      // canClose = true; // keep or change gating logic here
    }, 800);
  });
})();
