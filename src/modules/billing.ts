import { $, $$, reducedMotion } from '../lib/dom';
import { segmented } from '../lib/segmented';

/**
 * Billing section: switches between the systems built on the same base
 * (desktop + phone screenshots), rotating on its own until someone picks one.
 * Its CTA also preselects "Facturación" in the contact form.
 */
export function initBilling(section: HTMLElement | null = $('#montevo-one')) {
  const tabs = $('.billing__tabs', section ?? document);
  if (!section || !tabs) return;

  const buttons = $$<HTMLButtonElement>('button', tabs);
  const layers = [$$('.billing__desk img', section), $$('.billing__phone img', section)];
  let current = 0, timer = 0, touched = false, visible = false;

  const show = (i: number) => {
    current = i;
    layers.forEach(imgs => imgs.forEach((img, k) => img.classList.toggle('is-on', k === i)));
  };

  segmented(tabs, btn => {
    touched = true;
    stop();
    show(Number(btn.dataset.skin ?? 0));
  });

  const next = () => buttons[(current + 1) % buttons.length].click();
  function stop() { clearInterval(timer); timer = 0; }
  function sync() {
    if (visible && !touched && !reducedMotion && !timer) {
      timer = window.setInterval(() => { next(); touched = false; }, 4500);
    } else if (!visible) stop();
  }

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0.4 })
    .observe($('.billing__stage', section)!);

  $$<HTMLElement>('[data-pick]', section).forEach(link => link.addEventListener('click', () => {
    const radio = document.querySelector<HTMLInputElement>(`#contactForm input[name="tipo"][value="${link.dataset.pick}"]`);
    if (radio) radio.checked = true;
  }));
}
