import { $$, finePointer, reducedMotion } from '../lib/dom';

/** [data-magnetic] buttons lean toward the cursor; the CSS transition springs them back. */
export function initMagnetic() {
  if (!finePointer || reducedMotion) return;
  $$('[data-magnetic]').forEach(el => {
    const label = el.firstElementChild as HTMLElement | null;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${x * 0.22}px, ${y * 0.3}px, 0)`;
      if (label) label.style.transform = `translate3d(${x * 0.08}px, ${y * 0.1}px, 0)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
      if (label) label.style.transform = '';
    });
  });
}
