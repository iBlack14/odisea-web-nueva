document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.about-slider');
  if (!slider) return;
  const slides = [...slider.querySelectorAll('.about-slide')];
  const dots = [...slider.querySelectorAll('[data-about-slide]')];
  const pause = slider.querySelector('[data-about-pause]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const home = slider.classList.contains('home-slider');
  const controls = slider.querySelector('.about-slider-controls');
  const isEditing = target => target?.closest('input, textarea, select, [contenteditable="true"]');
  let current = 0, paused = reduced.matches, timer;
  const stop = () => { clearTimeout(timer); slider.classList.remove('is-playing'); };
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; slide.inert = i !== current; });
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === current)));
    slider.querySelector('.about-slide-counter').textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
  }
  function start() {
    stop();
    const focus = document.activeElement;
    const blocked = home
      ? isEditing(focus) || (slider.contains(focus) && !controls.contains(focus) && focus.matches(':focus-visible') && focus !== slider)
      : slider.matches(':hover') || slider.contains(focus);
    if (!paused && !document.hidden && !blocked) {
      // Restart the visual timer along with the actual slide timer.
      void slider.offsetWidth;
      slider.classList.add('is-playing');
      timer = setTimeout(() => { show(current + 1); start(); }, 7000);
    }
  }
  function updatePause() {
    pause.textContent = paused ? 'Reanudar' : 'Pausar';
    pause.setAttribute('aria-label', paused ? 'Reanudar cambio automático' : 'Pausar cambio automático');
    slider.classList.toggle('is-paused', paused);
    start();
  }
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));
  slider.querySelector('[data-about-prev]').addEventListener('click', () => { show(current - 1); start(); });
  slider.querySelector('[data-about-next]').addEventListener('click', () => { show(current + 1); start(); });
  pause.addEventListener('click', () => { paused = !paused; updatePause(); });
  slider.addEventListener('keydown', event => {
    if (isEditing(event.target)) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1)); start(); }
  });
  if (!home) {
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
  }
  slider.addEventListener('focusin', () => { if (!home || !controls.contains(document.activeElement)) start(); });
  slider.addEventListener('focusout', () => setTimeout(start, 0));
  document.addEventListener('visibilitychange', start);
  reduced.addEventListener('change', event => { if (event.matches) { paused = true; updatePause(); } });
  if (home) {
    let gesture;
    slider.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0 || event.target.closest('a,button,input,textarea,select,label')) return;
      gesture = { x: event.clientX, y: event.clientY, id: event.pointerId };
      stop();
    });
    window.addEventListener('pointerup', event => {
      if (!gesture || gesture.id !== event.pointerId) return;
      const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
      gesture = null;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) show(current + (dx < 0 ? 1 : -1));
      start();
    });
    window.addEventListener('pointercancel', () => { gesture = null; start(); });
    slider.querySelectorAll('img').forEach(img => { img.draggable = false; });
  }
  show(0);
  updatePause();
});
