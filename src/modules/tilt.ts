import { finePointer, reducedMotion } from '../lib/dom';

/** Project covers lean toward the cursor with a soft glare. */
export function initTilt(grid: HTMLElement) {
  if (!finePointer || reducedMotion) return;
  let current: HTMLElement | null = null;

  const reset = () => {
    if (!current) return;
    current.style.transform = '';
    current.classList.remove('is-tilting');
    current = null;
  };

  grid.addEventListener('pointermove', e => {
    const media = (e.target as Element).closest<HTMLElement>('.card__media');
    if (media !== current) reset();
    if (!media) return;
    current = media;
    const r = media.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    media.classList.add('is-tilting');
    media.style.setProperty('--gx', `${px * 100}%`);
    media.style.setProperty('--gy', `${py * 100}%`);
    media.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 5}deg)`;
  });
  grid.addEventListener('pointerleave', reset);
  grid.addEventListener('pointerdown', reset);
}
