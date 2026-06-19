// === NAV scroll state ===
const nav = document.getElementById('nav');
const heroWrapper = document.querySelector('.hero-wrapper');

const onScroll = () => {
  const scrolled = window.scrollY > 20;
  nav.classList.toggle('scrolled', scrolled);

  if (heroWrapper) {
    const heroBottom = heroWrapper.getBoundingClientRect().bottom;
    nav.classList.toggle('light', heroBottom < 72);
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// === Mobile nav toggle ===
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// === Scroll reveal ===
const revealEls = document.querySelectorAll(
  '.service-card, .project-card, .about__card, .channel-card, .section-head, .about__text, .hero__content, .hero__visual'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach(el => observer.observe(el));

// === Smooth active nav link ===
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--brown-mid)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach(s => sectionObserver.observe(s));
