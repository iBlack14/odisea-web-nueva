// Progressive enhancement: content stays visible if animations are unavailable.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const running = new Set();
  const reveal = (element, delay = 0) => {
    if (reduced.matches || !element.getClientRects().length) return;
    // Preserve transforms used by device mockups and floating illustrations.
    const transform = getComputedStyle(element).transform;
    const base = transform === 'none' ? '' : transform;
    const animation = element.animate([
      { opacity: 0, transform: `translateY(36px) ${base}` },
      { opacity: 1, transform: `translateY(0) ${base}` }
    ], { duration: 900, delay, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    running.add(animation);
    animation.finished.catch(() => {}).finally(() => running.delete(animation));
  };
  const hero = document.querySelector('main > section:first-of-type') || document.querySelector('main > :first-child');
  // These pages already have dedicated hero entrance effects.
  const hasHeroMotion = document.body.matches('.home-page, .web-motion-page, .shop-page');
  if (hero && !hasHeroMotion) {
    const container = hero.querySelector('.container');
    const targets = [...hero.querySelectorAll('.service-intro-copy > *, .cat-hero-copy > *, .cat-hero-visual')];
    (targets.length ? targets : container ? [...container.children] : [...hero.children]).forEach((target, index) => reveal(target, Math.min(index, 5) * 110));
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const siblings = [...entry.target.parentElement.children];
      reveal(entry.target, Math.min(siblings.indexOf(entry.target), 3) * 65);
    });
  }, { threshold: .08 });
  // Avoid duplicating the dedicated animations on web, shop, and campus pages.
  if (!document.body.matches('.web-motion-page, .shop-page, .av-page')) {
    document.querySelectorAll('main > section:not(:first-of-type)').forEach(section => {
      const cards = [...section.querySelectorAll('.service-card, .feature-card, .workflow-card, .service-related-card, .service-price-card, .sector-card, .portfolio-card, .company-policy-card, .cat-journey-steps > li, .latam-project, .latam-steps > li')];
      if (cards.length) {
        const heading = section.querySelector('.section-header, .cat-section-heading, .cat-journey-heading, .latam-heading');
        if (heading) observer.observe(heading);
        cards.forEach(card => observer.observe(card));
      } else {
        const content = section.querySelector('.container');
        if (content) observer.observe(content);
      }
    });
  }
  // Continuous miniature motion runs only while the preview is on screen.
  const ambient = new IntersectionObserver(entries => entries.forEach(entry => {
    entry.target.classList.toggle('motion-in-view', entry.isIntersecting && !document.hidden);
  }), { threshold: .12 });
  const previews = [...document.querySelectorAll('.cat-card-preview, .service-related-preview')];
  const sections = new Set(previews.map(preview => preview.closest('section')).filter(Boolean));
  sections.forEach(section => {
    const container = section.querySelector('.container') || section;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'card-motion-control';
    button.textContent = 'Pausar animaciones';
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      const paused = section.classList.toggle('cards-motion-paused');
      button.setAttribute('aria-pressed', String(paused));
      button.textContent = paused ? 'Reanudar animaciones' : 'Pausar animaciones';
    });
    const grid = container.querySelector('.services-grid, .service-related-grid');
    if (grid) grid.before(button);
  });
  previews.forEach(preview => ambient.observe(preview));
  document.addEventListener('visibilitychange', () => {
    previews.forEach(preview => {
      preview.classList.remove('motion-in-view');
      if (!document.hidden) { ambient.unobserve(preview); ambient.observe(preview); }
    });
  });
  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    observer.disconnect();
    ambient.disconnect();
    previews.forEach(preview => preview.classList.remove('motion-in-view'));
    running.forEach(animation => animation.cancel());
    running.clear();
  });
  // Restoring browser history should never replay or leave an interrupted fade.
  addEventListener('pagehide', () => running.forEach(animation => animation.cancel()));
})();
