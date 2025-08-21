// script.js

(function () {
  const modal = document.getElementById('contactModal');
  const openBtn = document.querySelector('.mail__btn');

  if (!modal || !openBtn) return;

  let lastFocused = null;

  function openModal() {
    lastFocused = document.activeElement;
    modal.classList.add('modal--open');
    modal.setAttribute('aria-hidden', 'false');

    // Focus the first focusable element in the modal (or the modal itself)
    const focusable = modal.querySelector(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    (focusable || modal).focus();

    document.addEventListener('keydown', onKeyDown);
  }

  function closeModal() {
    modal.classList.remove('modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', onKeyDown);

    // Return focus to the opener
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  function onKeyDown(e) {
    // Close on Escape
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }

    // Basic focus trap (Tab only)
    if (e.key === 'Tab') {
      const focusables = Array.from(
        modal.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => el.offsetParent !== null); // only visible
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    }
  }

  // OPEN
  openBtn.addEventListener('click', openModal);

  // CLOSE when clicking any element with [data-close-modal]
  modal.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-close-modal]');
    if (btn) closeModal();
  });
})();
