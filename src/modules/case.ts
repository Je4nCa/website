import type { Project } from '../types';
import { $, $$, esc, lockScroll, reducedMotion, EASE_OUT } from '../lib/dom';
import { coverHTML, TYPE_LABEL } from './work';
import { setMenu } from './nav';

const ROUTE = /^#\/proyecto\/([\w-]+)/;
const BASE_TITLE = document.title;

/**
 * Project detail overlay with hash routing (#/proyecto/<slug>), so every
 * project has a shareable link and the back button closes it.
 */
export function initCase(projects: Project[], grid: HTMLElement) {
  const el = $('#case')!;
  const scroller = $('#caseScroller')!;
  const cover = $('#caseCover')!;
  const body = $('#caseBody')!;
  const close = $<HTMLButtonElement>('#caseClose')!;
  const find = (slug: string) => projects.find(p => p.slug === slug);

  let openSlug: string | null = null;
  let returnFocus: HTMLElement | null = null;

  function render(p: Project) {
    const next = projects[(projects.indexOf(p) + 1) % projects.length];
    const meta: [string, string][] = [
      ['Cliente', esc(p.client)],
      ['Año', esc(p.year)],
      ['Servicios', p.services.map(s => `<span class="tag">${esc(s)}</span>`).join('')],
    ];
    if (p.stack?.length) meta.push(['Tecnología', p.stack.map(s => `<span class="tag">${esc(s)}</span>`).join('')]);

    cover.innerHTML = coverHTML(p, { eager: true });
    body.innerHTML = `
      <div class="case__head">
        <div>
          <p class="eyebrow">${TYPE_LABEL[p.type]}</p>
          <h1 class="case__title" id="caseTitle">${esc(p.title)}</h1>
          <p class="case__summary">${esc(p.summary)}</p>
        </div>
        <dl class="case__meta">
          ${meta.map(([k, v]) => `<div${v.includes('class="tag"') ? ' class="case__meta-wide"' : ''}><dt>${k}</dt><dd class="tags">${v}</dd></div>`).join('')}
        </dl>
      </div>
      <div class="case__story">
        <h2>El proyecto</h2>
        <div>
          ${p.description.map(t => `<p>${esc(t)}</p>`).join('')}
          ${p.deliverables.length ? `<ul class="case__deliverables">${p.deliverables.map(d => `<li>${esc(d)}</li>`).join('')}</ul>` : ''}
        </div>
      </div>
      ${p.gallery?.length ? `<div class="case__gallery">${p.gallery.map(src => `<img src="${esc(src)}" alt="" loading="lazy" decoding="async" />`).join('')}</div>` : ''}
      ${next !== p ? `<a class="case__next" href="#/proyecto/${esc(next.slug)}" data-next="${esc(next.slug)}"><small>Siguiente proyecto</small><strong>${esc(next.title)} →</strong></a>` : ''}`;
  }

  function open(slug: string, card?: HTMLElement | null, animate = true) {
    const p = find(slug);
    if (!p) return false;
    returnFocus = card ?? (document.activeElement as HTMLElement | null);
    openSlug = slug;
    setMenu(false);
    render(p);
    el.hidden = false;
    lockScroll(true);
    scroller.scrollTop = 0;
    close.focus({ preventScroll: true });
    document.title = `${p.title} — Montevo Studio`;
    if (reducedMotion || !animate) return true;

    const r = card?.querySelector('.card__media')?.getBoundingClientRect();
    if (r && r.bottom > 0 && r.top < innerHeight) {
      // The card's cover grows into the page header, then the case fades in beneath it.
      const W = innerWidth, H = innerHeight;
      const ghost = document.createElement('div');
      ghost.className = 'ghost';
      ghost.innerHTML = coverHTML(p, { eager: true });
      document.body.append(ghost);
      const from = `inset(${r.top}px ${W - r.right}px ${H - r.bottom}px ${r.left}px round 28px)`;
      const to = `inset(0px 0px ${Math.max(0, H - cover.offsetHeight)}px 0px round 0px)`;
      ghost.animate([{ clipPath: from }, { clipPath: to }], { duration: 800, easing: EASE_OUT, fill: 'forwards' });
      ghost.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 280, delay: 700, fill: 'forwards' })
        .finished.then(() => ghost.remove());
      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1, delay: 640, fill: 'backwards' });
      $$('.cover__word, .cover__mark', cover).forEach(n => n.animate(
        [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'none' }],
        { duration: 900, delay: 520, easing: EASE_OUT, fill: 'backwards' },
      ));
      body.animate(
        [{ opacity: 0, transform: 'translateY(48px)' }, { opacity: 1, transform: 'none' }],
        { duration: 1000, delay: 600, easing: EASE_OUT, fill: 'backwards' },
      );
    } else {
      el.animate([{ opacity: 0, transform: 'translateY(32px)' }, { opacity: 1, transform: 'none' }], { duration: 600, easing: EASE_OUT });
    }
    return true;
  }

  function hide() {
    if (!openSlug) return;
    openSlug = null;
    document.title = BASE_TITLE;
    const done = () => {
      el.hidden = true;
      lockScroll(false);
      cover.innerHTML = body.innerHTML = '';
      returnFocus?.focus({ preventScroll: true });
    };
    if (reducedMotion) return done();
    el.animate(
      [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(40px)' }],
      { duration: 420, easing: 'cubic-bezier(.4, 0, .2, 1)' },
    ).finished.then(done);
  }

  function swap(slug: string) {
    const p = find(slug);
    if (!p) return;
    openSlug = slug;
    document.title = `${p.title} — Montevo Studio`;
    const run = () => { render(p); scroller.scrollTop = 0; };
    if (reducedMotion) return run();
    scroller.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: 'forwards' }).finished.then(() => {
      run();
      scroller.getAnimations().forEach(a => a.cancel());
      scroller.animate([{ opacity: 0, transform: 'translateY(32px)' }, { opacity: 1, transform: 'none' }], { duration: 700, easing: EASE_OUT });
    });
  }

  const leave = () => {
    if (history.state?.case) history.back();
    else {
      history.replaceState(null, '', `${location.pathname}${location.search}#work`);
      hide();
    }
  };

  function route() {
    const slug = location.hash.match(ROUTE)?.[1];
    if (!slug) return hide();
    if (slug === openSlug) return;
    if (openSlug) swap(slug);
    else if (!open(slug, grid.querySelector<HTMLElement>(`[data-slug="${CSS.escape(slug)}"]`))) hide();
  }

  grid.addEventListener('click', e => {
    const card = (e.target as Element).closest<HTMLElement>('.card');
    if (!card || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault();
    const slug = card.dataset.slug!;
    history.pushState({ case: slug }, '', `#/proyecto/${slug}`);
    open(slug, card);
  });
  body.addEventListener('click', e => {
    const link = (e.target as Element).closest<HTMLElement>('[data-next]');
    if (!link) return;
    e.preventDefault();
    const slug = link.dataset.next!;
    history.replaceState({ case: slug }, '', `#/proyecto/${slug}`);
    swap(slug);
  });
  close.addEventListener('click', leave);
  addEventListener('keydown', e => { if (e.key === 'Escape' && openSlug) leave(); });
  addEventListener('popstate', route);
  addEventListener('hashchange', route);

  const initial = location.hash.match(ROUTE)?.[1];
  if (initial) open(initial, null, false);
}
