(() => {
  document.querySelectorAll('.web-faq .faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const sync = () => {
      const expanded = item.classList.contains('active');
      question.setAttribute('aria-expanded', String(expanded));
      answer.setAttribute('aria-hidden', String(!expanded));
      answer.inert = !expanded;
    };
    sync();
    new MutationObserver(sync).observe(item, {
      attributes: true, attributeFilter: ['class']
    });
  });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '.web-motion-page main .section-header, .web-motion-page .feature-card, ' +
    '.web-motion-page .workflow-card, .web-motion-page .about-grid > *, ' +
    '.web-motion-page .service-guide > *, .web-motion-page .cta-banner, ' +
    '.web-overview-heading > *, .web-overview-details, .web-overview-guarantee, ' +
    '.web-technologies .tech-badge, .web-related .service-card'
  );
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (reducedMotion.matches) return;
      const index = [...entry.target.parentElement.children].indexOf(entry.target);
      entry.target.animate([
        { opacity: 0, transform: 'translateY(22px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 650,
        delay: Math.min(index, 3) * 75,
        easing: 'cubic-bezier(.22, 1, .36, 1)',
        fill: 'backwards'
      });
    });
  }, { threshold: 0.08 });
  targets.forEach(target => observer.observe(target));

  const scene = document.querySelector('.web-hero-scene');
  if (!scene) return;
  const visibility = new IntersectionObserver(([entry]) => {
    scene.classList.toggle('scene-paused', !entry.isIntersecting);
  });
  visibility.observe(scene);
})();
