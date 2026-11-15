(() => {
  const stage = document.getElementById('device-stage');
  if (!stage) return;
  const chips = [...stage.parentElement.querySelectorAll('.device-chip')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let revision = 0;
  let animations = [];
  let requested = stage.dataset.device;
  const visibleDevices = () => [...stage.querySelectorAll('.preview-device')]
    .filter(device => device.getClientRects().length);
  const cancel = () => {
    animations.forEach(animation => animation.cancel());
    animations = [];
  };
  const play = (element, frames, options) => {
    const animation = element.animate(frames, options);
    animations.push(animation);
    return animation.finished.catch(() => {});
  };
  const enter = () => Promise.all(visibleDevices().flatMap((device, index) => {
    const shell = play(device, [
    { opacity: 0, translate: '0 24px', scale: '.96' },
    { opacity: 1, translate: '0 0', scale: '1' }
  ], {
    duration: 520, delay: index * 65,
    easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards'
    });
    const content = [...device.querySelectorAll(
      '.preview-nav, .preview-hero > :not(.preview-art), .preview-art, .preview-services > div, .preview-footer'
    )].map((element, order) => play(element, [
      { opacity: 0, translate: '0 7px' },
      { opacity: 1, translate: '0 0' }
    ], {
      duration: 420,
      delay: 140 + index * 65 + order * 45,
      easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards'
    }));
    return [shell, ...content];
  }));

  async function select(chip) {
    const next = chip.dataset.device;
    if (next === requested) return;
    requested = next;
    const current = ++revision;
    cancel();
    chips.forEach(item => {
      item.classList.toggle('active', item === chip);
      item.setAttribute('aria-selected', String(item === chip));
    });
    if (reduced.matches) {
      stage.dataset.device = next;
      return;
    }
    await Promise.all(visibleDevices().map(device => play(device, [
      { opacity: 1, translate: '0 0', scale: '1' },
      { opacity: 0, translate: '0 -14px', scale: '.98' }
    ], { duration: 160, easing: 'ease-in', fill: 'forwards' })));
    if (current !== revision) return;
    const previousHeight = stage.getBoundingClientRect().height;
    cancel();
    stage.dataset.device = next;
    const nextHeight = stage.getBoundingClientRect().height;
    play(stage, [
      { height: `${previousHeight}px` }, { height: `${nextHeight}px` }
    ], { duration: 420, easing: 'cubic-bezier(.22, 1, .36, 1)' });
    await enter();
    if (current === revision) cancel();
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => select(chip));
    chip.addEventListener('keydown', event => {
      const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      const next = chips[(chips.indexOf(chip) + direction + chips.length) % chips.length];
      next.focus();
      select(next);
    });
  });
  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    ++revision;
    cancel();
    stage.dataset.device = requested;
  });
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (!reduced.matches && revision === 0) enter();
    }, { threshold: .15 });
    observer.observe(stage);
  }
})();
