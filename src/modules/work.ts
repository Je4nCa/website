import type { Project, ProjectType } from '../types';
import { $, $$, esc, reducedMotion, EASE_OUT } from '../lib/dom';
import { segmented } from '../lib/segmented';

export const TYPE_LABEL: Record<ProjectType, string> = { client: 'Cliente', concept: 'Concepto' };

const MARK = '<svg class="cover__mark" viewBox="0 0 40 32" aria-hidden="true"><path d="M34 1.5v29a1 1 0 0 1-1.6.8L15 16 32.4.7A1 1 0 0 1 34 1.5Z"/><path d="M6 2.2v27.6a1.5 1.5 0 0 0 2.4 1.2l17.2-13.2a2.3 2.3 0 0 0 0-3.6L8.4 1A1.5 1.5 0 0 0 6 2.2Z"/></svg>';

/** The project's image, or a generated cover from its colors and title. */
export function coverHTML(p: Project, { eager = false } = {}) {
  const [c1, c2] = p.colors;
  const inner = p.cover
    ? `<img src="${esc(p.cover)}" alt="" ${eager ? '' : 'loading="lazy"'} decoding="async" />`
    : `${MARK}<span class="cover__word" aria-hidden="true">${esc(p.title)}</span>`;
  return `<div class="cover" style="--c1:${esc(c1)};--c2:${esc(c2)}">${inner}</div>`;
}

const cardHTML = (p: Project) => `
  <a class="card${p.featured ? ' card--featured' : ''}" href="#/proyecto/${esc(p.slug)}" data-slug="${esc(p.slug)}" data-type="${esc(p.type)}" data-reveal>
    <div class="card__media">
      ${coverHTML(p)}
      <span class="card__badge">Ver proyecto <span aria-hidden="true">→</span></span>
    </div>
    <div class="card__info">
      <div>
        <h3 class="card__title">${esc(p.title)}</h3>
        <p class="card__summary">${esc(p.summary)}</p>
      </div>
      <span class="card__year">${esc(p.services.slice(0, 2).join(' · '))}</span>
    </div>
  </a>`;

export function initWork(projects: Project[], onLayoutChange: () => void) {
  const grid = $('#projectGrid')!;
  grid.innerHTML = projects.map(cardHTML).join('');

  async function applyFilter(type: string) {
    const all = $$('.card', grid);
    const gone = (c: HTMLElement) => c.classList.contains('is-gone');
    const match = (c: HTMLElement) => type === 'all' || c.dataset.type === type;
    const leaving = all.filter(c => !gone(c) && !match(c));
    const entering = all.filter(c => gone(c) && match(c));
    const staying = all.filter(c => !gone(c) && match(c));

    if (reducedMotion) {
      leaving.forEach(c => c.classList.add('is-gone'));
      entering.forEach(c => c.classList.remove('is-gone'));
      return onLayoutChange();
    }

    await Promise.all(leaving.map(c => c.animate(
      [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.96)' }],
      { duration: 220, easing: 'ease-in', fill: 'forwards' },
    ).finished));

    // FLIP: remember where the staying cards were, change layout, animate from there
    const first = new Map(staying.map(c => [c, c.getBoundingClientRect()]));
    leaving.forEach(c => {
      c.classList.add('is-gone');
      c.getAnimations().forEach(a => a.cancel());
    });
    entering.forEach(c => c.classList.remove('is-gone'));

    staying.forEach(c => {
      const a = first.get(c)!;
      const b = c.getBoundingClientRect();
      const dx = a.left - b.left, dy = a.top - b.top;
      if (dx || dy) c.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 700, easing: EASE_OUT });
    });
    entering.forEach((c, i) => {
      c.classList.add('is-in');
      c.animate(
        [{ opacity: 0, transform: 'translateY(24px) scale(.98)' }, { opacity: 1, transform: 'none' }],
        { duration: 800, delay: 60 + i * 70, easing: EASE_OUT, fill: 'backwards' },
      );
    });
    onLayoutChange();
  }

  // Filters only make sense once there are both client and concept projects.
  const filters = $('.work .filters');
  const types = new Set(projects.map(p => p.type));
  if (filters && types.size > 1) segmented(filters, btn => applyFilter(btn.dataset.filter ?? 'all'));
  else filters?.remove();

  return grid;
}
