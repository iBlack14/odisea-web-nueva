document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.catalog-page .filter-btn');
  const cards = [...document.querySelectorAll('.catalog-page .cat-card')];
  const count = document.querySelector('.cat-result-count');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const showCards = (visibleCards) => {
    cards.forEach(card => {
      const isVisible = visibleCards.includes(card);
      card.hidden = !isVisible;
      card.classList.remove('is-entering');
      card.style.removeProperty('--card-delay');
    });
    if (reducedMotion.matches) return;
    visibleCards.forEach((card, index) => {
      card.style.setProperty('--card-delay', `${Math.min(index * 55, 440)}ms`);
      card.classList.add('is-entering');
    });
  };

  showCards(cards);
  buttons.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    const visibleCards = cards.filter(card => category === 'all' || card.dataset.category === category);
    showCards(visibleCards);
    count.textContent = category === 'all' ? `Mostrando los ${visibleCards.length} servicios` : `${visibleCards.length} servicios en ${button.childNodes[0].textContent.trim()}`;
  }));
});
