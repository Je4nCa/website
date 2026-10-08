import { $$, finePointer, reducedMotion } from '../lib/dom';

/** A soft copper light that follows the cursor across the dark sections. */
export function initGlow() {
  if (!finePointer || reducedMotion) return;
  $$('[data-glow]').forEach(section => {
    const glow = document.createElement('div');
    glow.className = 'glow';
    glow.setAttribute('aria-hidden', 'true');
    section.prepend(glow);

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    section.addEventListener('pointermove', e => {
      const r = section.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!glow.classList.contains('is-on')) { x = tx; y = ty; glow.classList.add('is-on'); }
      if (!raf) raf = requestAnimationFrame(loop);
    });
    section.addEventListener('pointerleave', () => glow.classList.remove('is-on'));
  });
}
