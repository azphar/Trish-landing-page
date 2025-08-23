// template_e88dr73
// service_wnn6l1s
// gMpKGYZUbmhQaUNsd

emailjs.init({ publicKey: 'gMpKGYZUbmhQaUNsd' });

let isModalOpen = false;
let contrastToggle= false;
const scaleFactor = 1 / 20;

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
  }
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}


(() => {
  const modal    = document.getElementById('contactModal');
  if (!modal) return; 

  const openBtn  = document.querySelector('.mail__btn');
  const closeBtn = modal.querySelector('.modal__close');
  const form     = modal.querySelector('#contact__form');

  const nameEl   = form?.querySelector('#name');
  const loading  = modal.querySelector('.modal__overlay--loading');
  const success  = modal.querySelector('.modal__overlay--success');

  let lastFocused = null;
  let canClose = true;

  function openModal() {
    lastFocused = document.activeElement;
    modal.classList.add('modal--open');
    modal.setAttribute('aria-hidden', 'false');
    nameEl?.focus();
    document.addEventListener('keydown', onKeyDown);
  }

  window.openModal = openModal;

  function closeModal() {
    if (!canClose) return;
    modal.classList.remove('modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', onKeyDown);
    loading?.classList.remove('is-active');
    success?.classList.remove('is-active');
    lastFocused?.focus?.();
  }

 
function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    modal.classList.remove("modal--open");
  } else {
    isModalOpen = true;
    modal.classList.add("modal--open");
  }
}
window.toggleModal = toggleModal; 





  function onKeyDown(e) {
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'Tab') {
      const focusables = Array.from(
        modal.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last  = focusables[focusables.length - 1];
      if (!e.shiftKey && document.activeElement === last)  { e.preventDefault(); first.focus(); }
      if ( e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus();  }
    }
  }

  openBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('[data-close-modal]')) closeModal();
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form) return;

    try {
      canClose = false;
      loading?.classList.add('is-active');

      await emailjs.sendForm('service_wnn6l1s', 'template_e88dr73', form);

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
  });
})();
