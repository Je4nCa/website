import { $$ } from '../lib/dom';

/**
 * Adds `.is-in` to [data-reveal] / [data-split] elements as they enter the viewport.
 * Elements entering together are staggered unless they set their own `--d`.
 */
export function initReveal() {
  const io = new IntersectionObserver(entries => {
    let n = 0;
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', `${n++ * 90}ms`);
      el.classList.add('is-in');
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  $$('[data-reveal], [data-split]').forEach(el => io.observe(el));
}
