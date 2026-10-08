import { $$ } from '../lib/dom';

/** The pillar crossing the middle of the viewport becomes active; its line art draws in. */
export function initServices() {
  const pillars = $$('[data-pillar]');
  const arts = $$<SVGElement>('[data-art]');

  const activate = (idx: number) => {
    pillars.forEach((p, i) => p.classList.toggle('is-active', i === idx));
    arts.forEach((a, i) => a.classList.toggle('is-active', i === idx));
  };
  activate(0);

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) activate(Number((e.target as HTMLElement).dataset.pillar));
    });
  }, { rootMargin: '-48% 0px -48% 0px' });
  pillars.forEach(p => io.observe(p));
}
