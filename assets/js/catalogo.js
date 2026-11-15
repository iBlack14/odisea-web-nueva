document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.catalog-page .filter-btn');
  const cards = [...document.querySelectorAll('.catalog-page .cat-card')];
  const count = document.querySelector('.cat-result-count');
  buttons.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    const visible = cards.filter(card => category === 'all' || card.dataset.category === category).length;
    count.textContent = category === 'all' ? `Mostrando los ${visible} servicios` : `${visible} servicios en ${button.childNodes[0].textContent.trim()}`;
  }));
});
