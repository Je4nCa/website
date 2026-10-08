import { $$, reducedMotion } from '../lib/dom';

/** [data-count] numbers count up from zero the first time they scroll into view. */
export function initCounters() {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const el = e.target as HTMLElement;
    const to = Number(el.dataset.count);
    if (reducedMotion || !to) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - t, 4))));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { threshold: 0.6 });
  $$('[data-count]').forEach(el => io.observe(el));
}
