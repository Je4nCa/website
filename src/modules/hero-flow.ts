import { $, $$, esc, reducedMotion, finePointer } from '../lib/dom';

/**
 * Hero: one card that morphs through what a Montevo system does with a single customer,
 * from the first message to the electronic invoice. Each loop shows a different business.
 */

interface Scenario {
  channel: 'WhatsApp' | 'Instagram' | 'Messenger';
  time: string;
  ask: string;
  reply: string;
  name: string;
  source: string;
  tags: string[];
  day: string;
  slots: [string, string][]; // [hora, ocupado por]
  slot: string;
  service: string;
  item: string;
  total: string;
}

const SCENARIOS: Scenario[] = [
  {
    channel: 'WhatsApp', time: '11:42 p. m.',
    ask: '¿Tienen espacio mañana para limpieza facial?',
    reply: '¡Claro! Te agendé mañana a las 10:30. Te acabo de enviar la confirmación.',
    name: 'María Solís', source: 'Anuncio de Instagram · Limpieza facial', tags: ['Calificada', 'Clínica'],
    day: 'Mañana', slots: [['9:30', 'Valoración'], ['11:30', 'Libre']], slot: '10:30', service: 'Limpieza facial',
    item: 'Limpieza facial médica', total: '₡50 000',
  },
  {
    channel: 'Messenger', time: '7:15 a. m.',
    ask: '¿Tienen pastillas de freno para Hilux 2018?',
    reply: 'Sí, nos quedan 4 juegos a ₡34 000. Te aparté uno para retirar hoy.',
    name: 'Carlos Mora', source: 'Anuncio de Facebook · Frenos', tags: ['Cliente nuevo', 'Repuestos'],
    day: 'Hoy', slots: [['3:00', 'Retiro'], ['5:00', 'Libre']], slot: '4:00', service: 'Retiro de pedido',
    item: 'Pastillas de freno Hilux', total: '₡34 000',
  },
  {
    channel: 'Instagram', time: '9:03 p. m.',
    ask: '¿Hay campo el sábado para corte y barba?',
    reply: 'Sí, te agendé el sábado a las 9:00. ¡Te esperamos!',
    name: 'Diego Vargas', source: 'Instagram · Perfil del salón', tags: ['Frecuente', 'Salón'],
    day: 'Sábado', slots: [['8:00', 'Corte'], ['10:00', 'Libre']], slot: '9:00', service: 'Corte + barba',
    item: 'Corte + barba', total: '₡12 000',
  },
];

const STEPS = [
  { label: 'Mensaje', ms: 2800 },
  { label: 'IA', ms: 4400 },
  { label: 'CRM', ms: 3200 },
  { label: 'Agenda', ms: 3000 },
  { label: 'Factura', ms: 4400 },
];

const I = {
  ai: '<svg viewBox="0 0 24 24"><path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8Z"/><path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="3.6"/><path d="M4.5 20c.9-3.8 4-5.8 7.5-5.8s6.6 2 7.5 5.8"/></svg>',
  cal: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
  doc: '<svg viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6Z"/><path d="M15 3v4h4M9 12h7M9 16h5"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="m6 12.5 4 4L18 8"/></svg>',
};

const initials = (n: string) => n.split(' ').map(w => w[0]).join('').slice(0, 2);
const clave = () => '506' + Array.from({ length: 47 }, () => Math.floor(Math.random() * 10)).join('');

function panels(s: Scenario) {
  const head = (icon: string, title: string, meta = '') =>
    `<header class="fc__head"><span class="fc__ico">${icon}</span><b>${title}</b>${meta ? `<small>${meta}</small>` : ''}</header>`;
  const chIcon = $(`[data-ch="${s.channel}"] svg`)?.outerHTML ?? '';
  return [
    `<section class="fc fc--msg">
      ${head(chIcon, s.channel, s.time)}
      <p class="bub bub--in" style="--i:1">${esc(s.ask)}</p>
      <p class="typing" style="--i:2"><i></i><i></i><i></i><span>La IA está escribiendo</span></p>
    </section>`,
    `<section class="fc fc--ai">
      ${head(I.ai, 'Tu asistente con IA', s.channel)}
      <p class="bub bub--in bub--ghost">${esc(s.ask)}</p>
      <p class="bub bub--ai" style="--i:1"><span data-type="${esc(s.reply)}"></span><i class="caret"></i></p>
      <p class="fc__note" style="--i:6">${I.check}Respondió en 4 segundos, sin que nadie tocara el celular</p>
    </section>`,
    `<section class="fc fc--crm">
      ${head(I.user, 'CRM', 'Cliente nuevo')}
      <div class="crm" style="--i:1">
        <span class="crm__av">${initials(s.name)}</span>
        <div><b>${esc(s.name)}</b><span>${esc(s.source)}</span></div>
      </div>
      <div class="pipe" style="--i:2"><span>Nuevo</span><span>Calificado</span><span>Cliente</span><i class="pipe__dot"></i></div>
      <p class="fc-tags" style="--i:3">${s.tags.map(t => `<span>${esc(t)}</span>`).join('')}<span class="fc-tags__ad">Origen del anuncio guardado</span></p>
    </section>`,
    `<section class="fc fc--cal">
      ${head(I.cal, 'Agenda', s.day)}
      <ul class="slots">
        <li style="--i:1"><b>${s.slots[0][0]}</b><span>${s.slots[0][1]}</span></li>
        <li class="slot--new" style="--i:2"><b>${s.slot}</b><span>${esc(s.service)} · ${esc(s.name.split(' ')[0])}</span><em>${I.check}Confirmada</em></li>
        <li style="--i:3"><b>${s.slots[1][0]}</b><span>${s.slots[1][1]}</span></li>
      </ul>
      <p class="fc__note" style="--i:4">${I.check}Confirmación y recordatorio enviados</p>
    </section>`,
    `<section class="fc fc--inv">
      ${head(I.doc, 'Factura electrónica', 'v4.4')}
      <div class="inv__line" style="--i:1"><span>${esc(s.item)}</span><b>${s.total}</b></div>
      <div class="inv__tot" style="--i:2"><span>Total · IVA incluido</span><b>${s.total}</b></div>
      <p class="inv__key" style="--i:3"><small>Clave numérica</small><code data-scramble="${clave()}"></code></p>
      <p class="stamp">${I.check}<span>Aceptada por Hacienda</span></p>
    </section>`,
  ].join('');
}

export function initHeroFlow() {
  const found = $('[data-flow]');
  if (!found) return;
  const stage: HTMLElement = found;
  const card = $('[data-card]', stage)!;
  const rail = $('[data-rail]', stage)!;
  const chans = $$('[data-ch]', stage);

  rail.innerHTML = STEPS.map((st, i) =>
    `<li><button type="button" data-step="${i}"><i><b></b></i><span>${st.label}</span></button></li>`).join('');
  const railBtns = $$<HTMLButtonElement>('button', rail);

  let sc = 0, step = -1, timers: number[] = [], visible = true, hover = false, held = 0;
  const later = (ms: number, fn: () => void) => { timers.push(window.setTimeout(fn, ms)); };
  const clear = () => { timers.forEach(clearTimeout); timers = []; };

  function render() {
    card.innerHTML = panels(SCENARIOS[sc]);
    chans.forEach(c => c.classList.toggle('is-on', c.dataset.ch === SCENARIOS[sc].channel));
  }

  function fit(panel: HTMLElement) { card.style.height = `${panel.offsetHeight}px`; }

  function go(i: number, auto = true) {
    clear();
    step = i;
    const list = $$('.fc', card);
    list.forEach((p, k) => p.classList.toggle('is-on', k === i));
    const panel = list[i];
    fit(panel);
    stage.dataset.step = String(i);
    railBtns.forEach((b, k) => {
      b.classList.toggle('is-on', k === i);
      b.classList.toggle('is-done', k < i);
      b.style.setProperty('--ms', `${STEPS[k].ms}ms`);
    });

    // step-specific motion
    const typed = $('[data-type]', panel);
    if (typed) {
      const text = typed.dataset.type ?? '';
      typed.textContent = reducedMotion ? text : '';
      if (!reducedMotion) [...text].forEach((_, n) => later(500 + n * 32, () => { typed.textContent = text.slice(0, n + 1); fit(panel); }));
    }
    const key = $('[data-scramble]', panel);
    if (key) {
      const final = key.dataset.scramble ?? '';
      key.textContent = final;
      if (!reducedMotion) for (let f = 0; f <= 14; f++) later(300 + f * 55, () => {
        const done = Math.floor((f / 14) * final.length);
        key.textContent = final.slice(0, done) + Array.from({ length: final.length - done }, () => Math.floor(Math.random() * 10)).join('');
      });
    }

    if (!auto || reducedMotion) return;
    later(STEPS[i].ms, advance);
  }

  function advance() {
    if (!visible || document.hidden || hover || Date.now() < held) return later(600, advance);
    if (step < STEPS.length - 1) return go(step + 1);
    // new business, from the top
    card.classList.add('is-swap');
    later(reducedMotion ? 0 : 320, () => {
      sc = (sc + 1) % SCENARIOS.length;
      render();
      card.classList.remove('is-swap');
      go(0);
    });
  }

  railBtns.forEach((b, i) => b.addEventListener('click', () => { held = Date.now() + 6000; go(i); }));
  stage.addEventListener('pointerenter', () => { hover = finePointer; stage.classList.toggle('is-paused', hover); });
  stage.addEventListener('pointerleave', () => { hover = false; stage.classList.remove('is-paused'); });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(stage);
  new ResizeObserver(() => { const p = $$('.fc', card)[step]; if (p) fit(p); }).observe(card);

  // subtle 3D lean toward the pointer
  if (finePointer && !reducedMotion) {
    stage.addEventListener('pointermove', e => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
    });
    stage.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  }

  render();
  // wait for the hero headline to land, then start
  later(reducedMotion ? 0 : 700, () => go(reducedMotion ? 4 : 0));
}
