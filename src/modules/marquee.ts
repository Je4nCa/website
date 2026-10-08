import { $, reducedMotion } from '../lib/dom';

/** Endless band of services; it speeds up and follows the direction you scroll. */
export function initMarquee() {
  const track = $('[data-marquee]');
  if (!track) return;
  track.innerHTML += track.innerHTML; // two copies so the loop is seamless
  if (reducedMotion) return;

  let x = 0, dir = -1, boost = 0, lastY = scrollY, last = 0, raf = 0, half = 0;
  const measure = () => { half = track.scrollWidth / 2; };
  measure();
  new ResizeObserver(measure).observe(track);

  addEventListener('scroll', () => {
    const dy = scrollY - lastY;
    lastY = scrollY;
    if (dy) dir = dy > 0 ? -1 : 1;
    boost = Math.min(18, boost + Math.abs(dy) * 0.08);
  }, { passive: true });

  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(48, now - (last || now));
    last = now;
    boost *= 0.92;
    x += dir * (0.06 * dt + boost);
    if (half) x = ((x % half) - half) % half; // keep x in (-half, 0]
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !raf) { last = 0; raf = requestAnimationFrame(loop); }
    if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
  }).observe(track.parentElement!);
}
