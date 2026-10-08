import { $, reducedMotion } from '../lib/dom';

/** Cycles the hero's last word: "tu negocio." → "tu tienda." → … */
export function initRotator() {
  const el = $('[data-rotate]');
  if (!el) return;
  const words = (el.dataset.rotate ?? '').split(',').map(w => w.trim()).filter(Boolean);
  el.innerHTML = words.map((w, i) => `<span${i === 0 ? ' class="is-on"' : ''}>${w}</span>`).join('');
  el.setAttribute('aria-hidden', 'true');
  if (reducedMotion || words.length < 2) return;

  const spans = [...el.children] as HTMLElement[];
  let i = 0;
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(el);

  setInterval(() => {
    if (!visible || document.hidden) return;
    el.style.setProperty('--rd', '0ms');
    const cur = spans[i];
    i = (i + 1) % spans.length;
    const next = spans[i];
    cur.classList.replace('is-on', 'is-out');
    // park the next word below the mask without animating, then slide it up
    next.style.transition = 'none';
    next.classList.remove('is-out');
    void next.offsetWidth;
    next.style.transition = '';
    next.classList.add('is-on');
  }, 2600);
}
