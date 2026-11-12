document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.about-slider');
  if (!slider) return;
  const slides = [...slider.querySelectorAll('.about-slide')];
  const dots = [...slider.querySelectorAll('[data-about-slide]')];
  const pause = slider.querySelector('[data-about-pause]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, paused = reduced.matches, timer;
  const stop = () => clearInterval(timer);
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === current)));
    slider.querySelector('.about-slide-counter').textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
  }
  function start() {
    stop();
    if (!paused && !document.hidden && !slider.matches(':hover') && !slider.contains(document.activeElement)) timer = setInterval(() => show(current + 1), 7000);
  }
  function updatePause() {
    pause.textContent = paused ? 'Reanudar' : 'Pausar';
    pause.setAttribute('aria-label', paused ? 'Reanudar cambio automático' : 'Pausar cambio automático');
    start();
  }
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));
  slider.querySelector('[data-about-prev]').addEventListener('click', () => { show(current - 1); start(); });
  slider.querySelector('[data-about-next]').addEventListener('click', () => { show(current + 1); start(); });
  pause.addEventListener('click', () => { paused = !paused; updatePause(); });
  slider.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1)); start(); }
  });
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('focusin', stop);
  slider.addEventListener('focusout', () => setTimeout(start, 0));
  document.addEventListener('visibilitychange', start);
  reduced.addEventListener('change', event => { if (event.matches) { paused = true; updatePause(); } });
  updatePause();
});
