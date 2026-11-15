(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const stage = document.querySelector('.shop-demo-stage');
  const tabs = [...document.querySelectorAll('[data-shop-view]')];
  let revision = 0;
  let active = 'catalog';
  let animations = [];
  const cancel = () => { animations.forEach(a => a.cancel()); animations = []; };
  const animate = (element, frames, options) => {
    const animation = element.animate(frames, options);
    animations.push(animation);
    return animation.finished.catch(() => {});
  };
  const enter = panel => Promise.all([...panel.querySelectorAll(
    '.shop-desktop, .shop-mobile, .store-promo > div, .store-products > div, ' +
    '.store-detail-image, .store-detail-copy > *, .store-cart > *, .store-summary'
  )].filter(e => e.getClientRects().length).map((element, index) => animate(element, [
    { opacity: 0, translate: '0 16px' }, { opacity: 1, translate: '0 0' }
  ], { duration: 500, delay: Math.min(index, 6) * 45, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' })));

  async function select(tab) {
    if (active === tab.dataset.shopView) return;
    active = tab.dataset.shopView;
    const current = ++revision;
    cancel();
    tabs.forEach(button => {
      button.setAttribute('aria-selected', String(button === tab));
      button.tabIndex = button === tab ? 0 : -1;
    });
    const oldPanel = stage.querySelector('.shop-demo-panel:not([hidden])');
    if (!reduced.matches) await animate(oldPanel, [
      { opacity: 1, translate: '0 0' }, { opacity: 0, translate: '0 -10px' }
    ], { duration: 150, fill: 'forwards', easing: 'ease-in' });
    if (current !== revision) return;
    cancel();
    const next = document.getElementById(`shop-panel-${active}`);
    stage.querySelectorAll('.shop-demo-panel').forEach(panel => { panel.hidden = panel !== next; });
    if (!reduced.matches) await enter(next);
    if (current === revision) cancel();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      const next = tabs[(index + direction + tabs.length) % tabs.length];
      next.focus();
      select(next);
    });
  });
  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    ++revision;
    cancel();
    stage.querySelectorAll('.shop-demo-panel').forEach(panel => {
      panel.hidden = panel.id !== `shop-panel-${active}`;
    });
  });

  document.querySelectorAll('.shop-faq .faq-item').forEach(item => {
    const sync = () => {
      const expanded = item.classList.contains('active');
      item.querySelector('.faq-question').setAttribute('aria-expanded', String(expanded));
      const answer = item.querySelector('.faq-answer');
      answer.inert = !expanded;
      answer.setAttribute('aria-hidden', String(!expanded));
    };
    sync();
    new MutationObserver(sync).observe(item, { attributes: true, attributeFilter: ['class'] });
  });
  if (reduced.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    observer.unobserve(entry.target);
    if (reduced.matches) return;
    if (entry.target === stage) {
      if (revision === 0) enter(stage.querySelector('.shop-demo-panel:not([hidden])'));
      return;
    }
    const phaseIndex = entry.target.matches('.shop-process-card')
      ? [...entry.target.parentElement.children].indexOf(entry.target) : 0;
    entry.target.animate([
      { opacity: 0, translate: '0 20px' }, { opacity: 1, translate: '0 0' }
    ], { duration: 650, delay: phaseIndex * 85, fill: 'backwards', easing: 'cubic-bezier(.22,1,.36,1)' });
    entry.target.querySelectorAll('.process-task, .process-design-cursor, .process-code-status, .process-launch-check').forEach((element, index) => {
      element.animate([
        { opacity: 0, translate: '0 6px' }, { opacity: 1, translate: '0 0' }
      ], { duration: 500, delay: 180 + phaseIndex * 85 + index * 90, fill: 'backwards', easing: 'ease-out' });
    });
  }), { threshold: .12 });
  document.querySelectorAll(
    '.shop-demo-stage, .shop-section-heading, .shop-page .feature-card, ' +
    '.shop-order-board, .shop-page .workflow-card, .shop-page .cta-banner'
  ).forEach(element => observer.observe(element));
})();
