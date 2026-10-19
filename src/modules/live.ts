import { $, $$, reducedMotion } from '../lib/dom';

/**
 * Montevo One bento: a short list of receipts that keeps moving — a new one arrives
 * as "Enviado" and turns "Aceptado" a moment later. Purely decorative.
 */
export function initLive() {
  const list = $('[data-live]');
  if (!list || reducedMotion) return;
  let n = 1045;
  let timer = 0;
  const amounts = [12500, 31075, 8475, 64300, 22990, 5650, 148900];

  const add = () => {
    const li = document.createElement('li');
    const amount = amounts[n % amounts.length];
    li.className = 'is-new';
    li.innerHTML = `<span>Tiquete #${n++}</span><b>₡${amount.toLocaleString('es-CR')}</b><em data-st class="is-sent">Enviado</em>`;
    list.prepend(li);
    $$('li', list).slice(4).forEach(old => old.remove());
    window.setTimeout(() => {
      const st = li.querySelector('em');
      if (st) { st.textContent = 'Aceptado'; st.classList.remove('is-sent'); }
    }, 1200);
  };
  $$('[data-st]', list).forEach(st => st.textContent === 'Enviado' && st.classList.add('is-sent'));

  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !timer) timer = window.setInterval(add, 2600);
    if (!e.isIntersecting && timer) { clearInterval(timer); timer = 0; }
  }).observe(list);
}
