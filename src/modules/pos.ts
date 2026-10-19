import { $, $$, esc, reducedMotion } from '../lib/dom';

const colones = (n: number) => `₡${Math.round(n).toLocaleString('es-CR')}`;
const seconds = (ms: number) => `${(ms / 1000).toLocaleString('es-CR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} s`;

/**
 * Montevo One demo: a sale from cart to "accepted by Hacienda", timed with a stopwatch
 * that starts on the first tap. Purely illustrative; nothing leaves the page.
 */
export function initPos() {
  const root = $('[data-pos]');
  if (!root) return;

  const products = [
    { name: 'Filtro de aceite', code: 'FIL-001', price: 4500 },
    { name: 'Pastillas de freno', code: 'FRE-001', price: 18500 },
    { name: 'Bujía de iridio', code: 'ELE-004', price: 6500 },
    { name: 'Bombillo LED H4', code: 'BL-2001', price: 11240 },
    { name: 'Filtro de aire', code: 'FIL-002', price: 7800 },
    { name: 'Batería 12 V', code: 'ELE-003', price: 62000 },
  ];
  const cart = new Map<number, number>();
  const q = <T extends HTMLElement = HTMLElement>(s: string) => $<T>(s, root)!;

  const items = q('[data-pos-items]');
  const lines = q('[data-pos-lines]');
  const clock = q('[data-pos-clock]');
  const pay = q<HTMLButtonElement>('[data-pos-pay]');
  const views = $$('[data-view]', root);
  const status = q('[data-pos-status]');
  const key = q('[data-pos-key]');
  const time = q('[data-pos-time]');

  let start = 0, raf = 0, timers: number[] = [];

  items.innerHTML = products.map((p, i) => `
    <button class="pos__item" data-add="${i}">
      <span class="pos__code">${esc(p.code)}</span>
      <span class="pos__name">${esc(p.name)}</span>
      <span class="pos__price">${colones(p.price)}</span>
      <span class="pos__plus" aria-hidden="true">+</span>
    </button>`).join('');

  const show = (name: string) => views.forEach(v => {
    const on = v.dataset.view === name;
    v.classList.toggle('is-on', on);
    v.inert = !on;
  });
  show('cart');

  const totals = () => {
    const sub = [...cart].reduce((a, [i, n]) => a + products[i].price * n, 0);
    return { sub, iva: sub * 0.13, total: sub * 1.13 };
  };

  const tick = () => {
    clock.textContent = seconds(performance.now() - start);
    raf = requestAnimationFrame(tick);
  };

  function render(added?: number) {
    const { sub, iva, total } = totals();
    lines.innerHTML = cart.size
      ? [...cart].map(([i, n]) => `<li${i === added ? ' class="is-new"' : ''}><span>${n} × ${esc(products[i].name)}</span><span>${colones(products[i].price * n)}</span></li>`).join('')
      : '<li class="pos__empty">Agrega algo para empezar</li>';
    q('[data-pos-sub]').textContent = colones(sub);
    q('[data-pos-iva]').textContent = colones(iva);
    q('[data-pos-total]').textContent = colones(total);
    q('[data-pos-total2]').textContent = colones(total);
    q('[data-pos-total3]').textContent = colones(total);
    pay.disabled = !cart.size;
  }

  items.addEventListener('click', e => {
    const btn = (e.target as Element).closest<HTMLElement>('[data-add]');
    if (!btn) return;
    if (!start) {
      start = performance.now();
      clock.classList.add('is-running');
      if (!reducedMotion) raf = requestAnimationFrame(tick);
    }
    const i = Number(btn.dataset.add);
    cart.set(i, (cart.get(i) ?? 0) + 1);
    render(i);
    btn.classList.remove('is-hit');
    void btn.offsetWidth;
    btn.classList.add('is-hit');
  });

  pay.addEventListener('click', () => show('pay'));
  q('[data-pos-back]').addEventListener('click', () => show('cart'));

  q('[data-pos-methods]').addEventListener('click', e => {
    const btn = (e.target as Element).closest('button');
    if (!btn) return;
    $$('button', q('[data-pos-methods]')).forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
  });

  q('[data-pos-emit]').addEventListener('click', () => {
    show('done');
    root.classList.remove('is-ok');
    status.textContent = 'Firmando comprobante…';
    key.textContent = '';
    time.textContent = '';
    const d = new Date();
    const fullKey = `506${String(d.getDate()).padStart(2, '0')}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getFullYear()).slice(2)}` +
      Array.from({ length: 41 }, () => Math.floor(Math.random() * 10)).join('');
    const typeStart = performance.now();
    const type = (now: number) => {
      const n = Math.min(fullKey.length, Math.round(((now - typeStart) / 700) * fullKey.length));
      key.textContent = fullKey.slice(0, n);
      if (n < fullKey.length) requestAnimationFrame(type);
    };
    requestAnimationFrame(type);
    timers.push(
      window.setTimeout(() => { status.textContent = 'Enviado a Hacienda…'; }, 800),
      window.setTimeout(() => {
        cancelAnimationFrame(raf);
        const ms = performance.now() - start;
        clock.textContent = seconds(ms);
        clock.classList.remove('is-running');
        status.textContent = 'Aceptado por Hacienda';
        time.textContent = `Venta lista en ${seconds(ms)}`;
        root.classList.add('is-ok');
      }, 1700),
    );
  });

  q('[data-pos-new]').addEventListener('click', () => {
    timers.forEach(clearTimeout);
    timers = [];
    cancelAnimationFrame(raf);
    cart.clear();
    start = 0;
    clock.textContent = seconds(0);
    root.classList.remove('is-ok');
    render();
    show('cart');
  });
}
