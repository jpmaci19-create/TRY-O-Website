const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
}

const searchForm = document.querySelector('[data-product-search]');

if (searchForm) {
  const input = searchForm.querySelector('input');
  const cards = document.querySelectorAll('[data-product-card]');

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  if (input) {
    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }
}

const faqItems = document.querySelectorAll('[data-faq-item]');

faqItems.forEach((item) => {
  const question = item.querySelector('button');
  const answer = item.querySelector('.faq-answer');
  if (!question || !answer) return;

  question.addEventListener('click', () => {
    const expanded = question.getAttribute('aria-expanded') === 'true';
    question.setAttribute('aria-expanded', String(!expanded));
    answer.hidden = expanded;
  });
});

const yearField = document.getElementById('year');
if (yearField) {
  yearField.textContent = new Date().getFullYear();
}
