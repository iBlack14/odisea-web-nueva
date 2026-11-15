(() => {
  const root = document.querySelector('[data-floating-contact]');
  if (!root || root.dataset.contactReady === 'true') return;
  const init = () => {
    if (root.dataset.contactReady === 'true') return;
    const toggle = root.querySelector('[data-floating-toggle]');
    const closeButton = root.querySelector('[data-floating-close]');
    const panel = root.querySelector('.floating-contact-panel');
    if (!toggle || !panel) return;
    root.dataset.contactReady = 'true';

    const setOpen = (open, returnFocus = false) => {
      root.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar ventana de contacto' : 'Abrir ventana de contacto por WhatsApp');
      panel.setAttribute('aria-hidden', String(!open));
      panel.inert = !open;
      if (open) toggle.focus({ preventScroll: true });
      else if (returnFocus) toggle.focus({ preventScroll: true });
    };

    toggle.addEventListener('click', () => setOpen(!root.classList.contains('is-open')));
    closeButton?.addEventListener('click', () => {
      root.dataset.contactDismissed = 'true';
      setOpen(false, true);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && root.classList.contains('is-open')) setOpen(false, true);
    });
    document.addEventListener('click', (event) => {
      if (root.classList.contains('is-open') && !root.contains(event.target)) setOpen(false);
    });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.setTimeout(() => {
        if (!root.dataset.contactDismissed && !root.classList.contains('is-open')) setOpen(true);
      }, 2000);
    }
    toggle.addEventListener('click', () => {
      if (root.classList.contains('is-open')) root.dataset.contactDismissed = 'true';
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
