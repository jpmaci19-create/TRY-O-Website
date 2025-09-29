const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
  if (window.scrollY > 12) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Hero intro animation
window.addEventListener('load', () => {
  heroContent.classList.add('is-visible');
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px',
  }
);

document.querySelectorAll('[data-animate]').forEach((element) => {
  if (!element.classList.contains('hero-content')) {
    observer.observe(element);
  }
});

const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    feedback.textContent = 'Por favor completa todos los campos.';
    feedback.style.color = '#ff6600';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    feedback.textContent = 'Ingresa un email válido.';
    feedback.style.color = '#ff6600';
    return;
  }

  feedback.textContent = '¡Gracias! Nos pondremos en contacto muy pronto.';
  feedback.style.color = '#008a4c';
  form.reset();
});
