import { $, $$, reducedMotion } from '../lib/dom';
import { segmented } from '../lib/segmented';

type Kind = 'wa' | 'ia' | 'ok' | 'money' | 'team';
interface Toast { kind: Kind; title: string; text: string; meta: string }
interface Scene { cta: string; msg: string; bubble: string; toasts: [Toast, Toast, Toast] }

const WA = 'https://wa.me/50663331383?text=';

/** One scene per kind of business: what the visitor sees happening in their own system. */
const SCENES: Scene[] = [
  {
    cta: 'Quiero uno para mi tienda',
    msg: 'Hola Jean Carlo, tengo una tienda y quiero un sistema como los de Montevo.',
    bubble: '¡Mira! Otra venta facturada.',
    toasts: [
      { kind: 'wa', title: 'WhatsApp', text: '¿Tienen pastillas de freno para Hilux?', meta: 'ahora' },
      { kind: 'money', title: 'Venta cobrada', text: '₡34 057 · SINPE Móvil', meta: 'Caja 1' },
      { kind: 'ok', title: 'Factura aceptada', text: 'Hacienda respondió en 3 segundos', meta: 'v4.4' },
    ],
  },
  {
    cta: 'Quiero uno para mi clínica',
    msg: 'Hola Jean Carlo, tengo una clínica y quiero un sistema con IA como los de Montevo.',
    bubble: 'Son las 11 p. m. y la IA sigue agendando.',
    toasts: [
      { kind: 'wa', title: 'WhatsApp · 11:42 p. m.', text: '¿Tienen espacio mañana para limpieza facial?', meta: 'ahora' },
      { kind: 'ia', title: 'Tu asistente con IA', text: 'Listo, te agendé mañana a las 10:30.', meta: 'respondió sola' },
      { kind: 'ok', title: 'Cita confirmada', text: 'Correo y recordatorio enviados', meta: 'Agenda' },
    ],
  },
  {
    cta: 'Quiero uno para mi salón',
    msg: 'Hola Jean Carlo, tengo un salón o barbería y quiero un sistema como los de Montevo.',
    bubble: 'Las comisiones se calculan solas.',
    toasts: [
      { kind: 'money', title: 'Corte + barba', text: '₡12 000 · Tarjeta', meta: 'ahora' },
      { kind: 'team', title: 'Comisión calculada', text: '₡2 400 para el barbero', meta: 'automático' },
      { kind: 'ok', title: 'Tiquete aceptado', text: 'Enviado a Hacienda y al cliente', meta: 'v4.4' },
    ],
  },
];

const ICONS: Record<Kind, string> = {
  wa: '<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"/><path d="M8.5 9.5c.5 2.5 3 5 5.5 5.5l1.2-1.4 2 .9"/>',
  ia: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8Z"/><path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z"/>',
  ok: '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.6 2.5L16 9.5"/>',
  money: '<rect x="3" y="6" width="18" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6.5 9.5v5M17.5 9.5v5"/>',
  team: '<circle cx="9" cy="8.5" r="3.2"/><path d="M3 19c.7-3.4 3.2-5 6-5s5.3 1.6 6 5"/><path d="M16 5.5a3 3 0 0 1 0 6M18.5 14.5c1.3.8 2.2 2.4 2.5 4.5"/>',
};

const toastHTML = (t: Toast, i: number) => `
  <li class="toast toast--${t.kind}" style="--i:${i}">
    <span class="toast__ico"><svg viewBox="0 0 24 24">${ICONS[t.kind]}</svg></span>
    <span class="toast__body"><b>${t.title}</b><span>${t.text}</span></span>
    <small>${t.meta}</small>
  </li>`;

/**
 * The hero's live stage: the visitor picks a business and watches that system work
 * (laptop + phone + notifications). Cycles on its own until the visitor picks one.
 */
export function initHeroLive() {
  const stage = $('[data-live]');
  const tabs = $('.biz__opts');
  if (!stage || !tabs) return;
  const list = $('[data-toasts]', stage)!;
  const screens = [$$<HTMLImageElement>('.live__screen img', stage), $$<HTMLImageElement>('.live__pscreen img', stage)];
  const cta = $<HTMLAnchorElement>('[data-wa]');
  const ctaText = $('[data-cta]');
  const buttons = $$<HTMLButtonElement>('button', tabs);

  let current = -1;
  let timers: number[] = [];
  let auto = !reducedMotion;
  let autoClick = false;
  let visible = true;

  const later = (ms: number, fn: () => void) => { timers.push(window.setTimeout(fn, ms)); };

  function show(i: number) {
    if (i === current) return;
    current = i;
    timers.forEach(clearTimeout);
    timers = [];
    const scene = SCENES[i];

    screens.forEach(imgs => imgs.forEach((img, k) => {
      if (k === i) img.loading = 'eager';
      img.classList.toggle('is-on', k === i);
    }));
    if (cta) cta.href = WA + encodeURIComponent(scene.msg);
    if (ctaText) ctaText.textContent = scene.cta;

    const old = $$('.toast', list);
    old.forEach(t => t.classList.add('is-out'));
    later(old.length && !reducedMotion ? 260 : 0, () => {
      list.innerHTML = scene.toasts.map(toastHTML).join('');
      const items = $$('.toast', list);
      if (reducedMotion) return items.forEach(t => t.classList.add('is-in'));
      items.forEach((t, k) => later(450 + k * 1100, () => t.classList.add('is-in')));
    });
    later(reducedMotion ? 0 : 1900, () => dispatchEvent(new CustomEvent('mascot:say', { detail: scene.bubble })));
    if (auto) later(7600, next);
  }

  function next() {
    if (!auto) return;
    if (!visible || document.hidden) return later(1000, next);
    autoClick = true;
    buttons[(current + 1) % SCENES.length].click();
    autoClick = false;
  }

  segmented(tabs, btn => {
    if (!autoClick) auto = false; // the visitor chose: stay on their business
    show(Number(btn.dataset.biz));
  });

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(stage);
  show(0);
}
