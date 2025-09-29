const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

function setActiveVariant(color) {
  if (!color) return;
  document.querySelectorAll('[data-variant-card]').forEach((card) => {
    card.classList.toggle('is-active', card.dataset.variantCard === color);
  });
}

const colorButtons = document.querySelectorAll('[data-color-option]');

colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;
    const image = button.dataset.image;
    const alt = button.dataset.alt;
    const color = button.dataset.color;
    const display = target ? document.querySelector(`[data-color-display="${target}"]`) : null;
    const group = button.closest('[data-color-group]');

    if (display && image) {
      display.src = image;
      if (alt) {
        display.alt = alt;
      }
    }

    if (group) {
      group.querySelectorAll('[data-color-option]').forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }

    if (color) {
      setActiveVariant(color);
    }
  });
});

document.querySelectorAll('[data-color-option].is-active').forEach((btn) => {
  if (btn.dataset.color) {
    setActiveVariant(btn.dataset.color);
  }
});

const searchInput = document.querySelector('[data-product-search]');
const clearSearch = document.getElementById('clearSearch');
const productCards = document.querySelectorAll('[data-product-card]');
const emptyState = document.getElementById('emptyState');

function updateProductVisibility() {
  const term = (searchInput?.value || '').toLowerCase().trim();

  if (!productCards.length) return;

  let visibleCount = 0;
  productCards.forEach((card) => {
    const keywords = (card.dataset.keywords || '').toLowerCase();
    const matches = !term || keywords.includes(term);
    card.hidden = !matches;
    if (matches) {
      visibleCount += 1;
    }
  });

  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

if (searchInput) {
  searchInput.addEventListener('input', updateProductVisibility);
}

if (clearSearch && searchInput) {
  clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    updateProductVisibility();
    searchInput.focus();
  });
}

updateProductVisibility();
