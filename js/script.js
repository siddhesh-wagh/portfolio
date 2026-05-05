/* ══════════════════════════════════════════
   script.js  —  Siddhesh Wagh Portfolio
══════════════════════════════════════════ */

// ── Theme Toggle ──────────────────────────
const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Respect saved preference, then system preference
const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ── Hamburger Menu ────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile nav when any link is clicked
document.querySelectorAll('.nav-link-item').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Scroll Reveal ─────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── Back to Top ───────────────────────────
const btt = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  btt.classList.toggle('visible', window.scrollY > 500);
});

btt.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Footer Year ───────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Contact Form ──────────────────────────
function handleFormSubmit() {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in Name, Email, and Message before submitting.');
    return;
  }

  // Show success toast
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);

  // Clear fields
  document.getElementById('name').value    = '';
  document.getElementById('email').value   = '';
  document.getElementById('subject').value = '';
  document.getElementById('message').value = '';
}

// ── Active Nav Link on Scroll ─────────────
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const top    = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link-item[href="#${id}"]`);

    if (link) {
      link.style.color = (scrollY >= top && scrollY < bottom)
        ? 'var(--text)'
        : '';
    }
  });
});
