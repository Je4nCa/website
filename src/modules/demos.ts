import { $, $$, esc, reducedMotion } from '../lib/dom';
import { segmented } from '../lib/segmented';

const colones = (n: number) => `₡${n.toLocaleString('es-CR')}`;

/** Live examples: an e-invoice going through Hacienda, a self-updating inventory, and a synced app. */
export function initDemos() {
  const section = $('#demos');
  const tabs = $('.demos__tabs');
  if (!section || !tabs) return;

  const panels = $$('.demo', section);
  let active = 'invoice';
  let visible = false;

  const setPanel = (id: string) => {
    active = id;
    panels.forEach(p => {
      const on = p.id === `demo-${id}`;
      p.classList.toggle('is-active', on);
      p.inert = !on;
    });
    sync();
  };

  const invoice = initInvoice();
  const stock = initStock();
  initApp();

  function sync() {
    if (visible && active === 'invoice') invoice.play();
    stock.run(visible && active === 'stock');
  }

  segmented(tabs, btn => setPanel(btn.dataset.demo ?? 'invoice'));
  setPanel('invoice');
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    sync();
  }, { threshold: 0.35 }).observe($('.demos__stage', section)!);
}

/* ---------- Facturación ---------- */
function initInvoice() {
  const status = $('[data-invoice-status]');
  const label = status?.querySelector('b');
  const key = $('[data-invoice-key]');
  const fullKey = key?.textContent ?? '';
  const timers: number[] = [];
  let playing = false;

  const set = (cls: string, text: string) => {
    if (!status || !label) return;
    status.classList.remove('is-sent', 'is-ok');
    if (cls) status.classList.add(cls);
    label.textContent = text;
  };

  function play() {
    if (playing || !key) return;
    playing = true;
    timers.splice(0).forEach(clearTimeout);
    if (reducedMotion) {
      key.textContent = fullKey;
      return set('is-ok', 'Aceptado por Hacienda');
    }
    set('', 'Firmando');
    const start = performance.now();
    const type = (now: number) => {
      const n = Math.min(fullKey.length, Math.round(((now - start) / 900) * fullKey.length));
      key.textContent = fullKey.slice(0, n);
      if (n < fullKey.length) requestAnimationFrame(type);
    };
    requestAnimationFrame(type);
    timers.push(
      window.setTimeout(() => set('is-sent', 'Enviado a Hacienda'), 1300),
      window.setTimeout(() => set('is-ok', 'Aceptado por Hacienda'), 3000),
      window.setTimeout(() => { playing = false; }, 3200),
    );
  }

  return { play };
}

/* ---------- Inventario ---------- */
interface Item { name: string; unit: string; qty: number; max: number; low: number }

function initStock() {
  const rows = $('[data-stock]');
  const toast = $('[data-stock-toast]');
  const items: Item[] = [
    { name: 'Harina 000', unit: 'sacos', qty: 42, max: 60, low: 10 },
    { name: 'Queso mozzarella', unit: 'kg', qty: 14, max: 40, low: 8 },
    { name: 'Salsa de tomate', unit: 'galones', qty: 31, max: 40, low: 8 },
    { name: 'Cajas para pizza', unit: 'unidades', qty: 120, max: 200, low: 30 },
  ];
  if (!rows || !toast) return { run: (_on: boolean) => {} };

  rows.innerHTML = items.map(it => `
    <div class="stock__row">
      <div class="stock__name">${esc(it.name)}<small>${esc(it.unit)}</small></div>
      <div class="stock__bar"><i></i></div>
      <div class="stock__qty"></div>
    </div>`).join('');
  const els = $$('.stock__row', rows);

  const render = (i: number) => {
    const it = items[i], row = els[i];
    row.querySelector<HTMLElement>('.stock__bar i')!.style.transform = `scaleX(${it.qty / it.max})`;
    row.querySelector<HTMLElement>('.stock__qty')!.textContent = String(it.qty);
    row.classList.toggle('is-low', it.qty <= it.low);
  };
  items.forEach((_, i) => render(i));

  let ticket = 1042, timer = 0, toastTimer = 0;
  const say = (text: string) => {
    toast.textContent = text;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-on'), 1700);
  };

  function sale() {
    const i = Math.floor(Math.random() * items.length);
    const it = items[i];
    if (it.qty <= it.low) {
      it.qty = it.max;
      say(`Reabastecido · ${it.name}`);
    } else {
      const n = 1 + Math.floor(Math.random() * 3);
      it.qty = Math.max(0, it.qty - n);
      say(`Venta #${++ticket} · −${n} ${it.name}`);
    }
    render(i);
    els[i].classList.remove('is-hit');
    void els[i].offsetWidth;
    els[i].classList.add('is-hit');
  }

  return {
    run(on: boolean) {
      if (on && !timer && !reducedMotion) timer = window.setInterval(sale, 2200);
      if (!on && timer) { clearInterval(timer); timer = 0; }
    },
  };
}

/* ---------- App multiplataforma ---------- */
function initApp() {
  const menu = $('[data-app-menu]');
  const order = $('[data-app-order]');
  const total = $('[data-app-total]');
  const badges = $$('[data-app-count-phone], [data-app-count-desk]');
  if (!menu || !order || !total) return;

  const products = [
    { name: 'Pizza margarita', price: 7500 },
    { name: 'Pizza pepperoni', price: 8200 },
    { name: 'Limonada', price: 1800 },
    { name: 'Tiramisú', price: 3500 },
  ];
  const cart = new Map<number, number>();

  menu.innerHTML = products.map((p, i) => `
    <div class="appui__item">
      <span>${esc(p.name)}<small>${colones(p.price)}</small></span>
      <button class="appui__add" data-add="${i}" aria-label="Agregar ${esc(p.name)}">+</button>
    </div>`).join('');

  menu.addEventListener('click', e => {
    const btn = (e.target as Element).closest<HTMLElement>('[data-add]');
    if (!btn) return;
    const i = Number(btn.dataset.add);
    cart.set(i, (cart.get(i) ?? 0) + 1);

    const count = [...cart.values()].reduce((a, b) => a + b, 0);
    const sum = [...cart].reduce((a, [idx, q]) => a + products[idx].price * q, 0);
    order.innerHTML = [...cart].map(([idx, q]) =>
      `<li${idx === i ? ' class="is-new"' : ''}><span>${q} × ${esc(products[idx].name)}</span><span>${colones(products[idx].price * q)}</span></li>`).join('');
    total.textContent = colones(sum);
    badges.forEach(b => {
      b.textContent = String(count);
      b.classList.remove('is-bump');
      void b.offsetWidth;
      b.classList.add('is-bump');
    });
  });
}
