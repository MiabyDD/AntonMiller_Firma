// Mobile Navigation
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

// Jahr im Footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Einblend-Animation beim Scrollen
const revealEls = document.querySelectorAll('.card, .skill-group, .mode, .steps li, .about-text, .contact-form');
if ('IntersectionObserver' in window) {
  revealEls.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

// Kontaktformular -> öffnet E-Mail-Programm (keine Datenspeicherung auf dem Server)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const ok = field.checkValidity() && field.value.trim() !== '';
      field.classList.toggle('invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) return;

    const data = new FormData(form);
    const to = document.querySelector('.js-email').textContent.trim();
    const subject = `Anfrage: ${data.get('topic')}`;
    const body = `${data.get('message')}\n\n--\n${data.get('name')}\n${data.get('email')}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
