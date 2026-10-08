import { $, $$, clamp, reducedMotion } from '../lib/dom';
import { nav, navLinks, isMenuOpen } from './nav';

interface Box { top: number; bottom: number; height: number }

const docBox = (el: Element): Box => {
  const r = el.getBoundingClientRect();
  return { top: r.top + scrollY, bottom: r.bottom + scrollY, height: r.height };
};

/**
 * One rAF-throttled scroll handler drives every scroll-linked effect.
 * Layout is measured on resize only, so each frame does no layout reads
 * and writes nothing but transform, opacity and classes.
 */
export function initScroll(scrubWords: HTMLElement[]) {
  const heroCopy = $('[data-hero-copy]');
  const heroStage = $('[data-hero-stage]');
  const statement = $('.statement');
  const darkSections = $$('[data-nav="dark"]');
  const tracked = navLinks.map(a => $(a.getAttribute('href') ?? ''));

  let vh = innerHeight;
  let dark: Box[] = [];
  let trackedBoxes: (Box | null)[] = [];
  let statementBox: Box | null = null;
  let lastY = scrollY;
  let ticking = false;
  let lit = -1;

  function measure() {
    vh = innerHeight;
    dark = darkSections.map(docBox);
    trackedBoxes = tracked.map(el => (el ? docBox(el) : null));
    statementBox = statement && docBox(statement);
  }

  function frame() {
    ticking = false;
    const y = scrollY;

    // nav: glass once you leave the top; hides while reading down, returns on scroll up
    if (!isMenuOpen()) {
      nav.classList.toggle('is-scrolled', y > 8);
      if (y > lastY + 6 && y > vh * 0.6) nav.classList.add('is-hidden');
      else if (y < lastY - 6 || y < vh * 0.6) nav.classList.remove('is-hidden');
    }
    const probe = y + 32;
    nav.classList.toggle('is-dark', dark.some(b => probe >= b.top && probe < b.bottom));
    const mid = y + vh * 0.4;
    navLinks.forEach((a, i) => {
      const b = trackedBoxes[i];
      a.classList.toggle('is-current', !!b && mid >= b.top && mid < b.bottom);
    });
    lastY = y;

    if (reducedMotion) return;

    // hero: copy drifts up and fades, mascot sinks back
    if (heroCopy && heroStage && y < vh * 1.2) {
      const p = clamp(y / vh, 0, 1);
      heroCopy.style.transform = `translate3d(0, ${p * -90}px, 0)`;
      heroCopy.style.opacity = String(1 - p * 1.15);
      heroStage.style.transform = `translate3d(0, ${p * 70}px, 0) scale(${1 - p * 0.1})`;
      heroStage.style.opacity = String(1 - p * 0.9);
    }

    // statement: words light up as you scroll through the pinned paragraph
    if (statementBox && scrubWords.length) {
      const p = clamp((y - statementBox.top + vh * 0.25) / (statementBox.height - vh), 0, 1);
      const next = Math.round(p * 1.2 * scrubWords.length);
      if (next !== lit) {
        scrubWords.forEach((w, i) => w.classList.toggle('on', i < next));
        lit = next;
      }
    }
  }

  const request = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(frame);
  };

  addEventListener('scroll', request, { passive: true });
  const remeasure = () => { measure(); request(); };
  new ResizeObserver(remeasure).observe(document.body);
  document.fonts?.ready.then(remeasure);
  measure();
  frame();

  return { remeasure };
}
