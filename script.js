// template_ffw0jnp
// service_wnn6l1s
// gMpKGYZUbmhQaUNsd

(function () {
  const modal   = document.getElementById('contactModal');
  const openBtn = document.querySelector('.mail__btn');
  const closeBtn = modal?.querySelector('.modal__close');
  const form     = modal?.querySelector('#contact__form');

  // Inputs & overlays
  const nameEl  = form?.querySelector('#name');
  const loading = modal?.querySelector('.modal__overlay--loading');
  const success = modal?.querySelector('.modal__overlay--success');

  // If neither modal nor form exists, bail
  if (!modal && !form) return;

  let lastFocused = null;
  let canClose = true;

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
        modal.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      if ( e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    }
  }

  // Open/close hooks (only if those elements exist)
  openBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
    if (e.target.closest?.('[data-close-modal]')) closeModal();
  });


  async function contact(e) {
    e.preventDefault();
    if (!form) return;

    try {
      // show loading, block closing while sending
      canClose = false;
      loading?.classList.add('is-active');

      // EmailJS v4 signature: (serviceID, templateID, form, { publicKey })
      await emailjs.sendForm(
        'service_wnn61ls',
        'template_ffw0jnp',
        form,
        { publicKey: 'gMpKGYZUbmhQaUNsd' } // <-- your key (or move to emailjs.init)
      );

      // hide loading, show green success, clear form
      loading?.classList.remove('is-active');
      success?.classList.add('is-active');
      form.reset();

    } catch (err) {
      loading?.classList.remove('is-active');
      console.error('Email send failed:', err);
      alert('Sorry—sending failed. Check console for details.');
    } finally {
      canClose = true;
    }
  }

  form?.addEventListener('submit', contact);
})();
