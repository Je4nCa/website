import { $$ } from '../lib/dom';

/** Accordion: each question opens and closes its answer independently. */
export function initFaq() {
  $$('.qa').forEach(qa => {
    const btn = qa.querySelector('button');
    btn?.addEventListener('click', () => {
      const open = !qa.classList.contains('is-open');
      qa.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
}
