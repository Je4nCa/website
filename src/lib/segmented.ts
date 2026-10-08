import { $, $$ } from './dom';

/**
 * A segmented control: buttons inside `root` with a sliding `.filters__pill`
 * under the selected one. Calls `onSelect` when the selection changes.
 */
export function segmented(root: HTMLElement, onSelect: (btn: HTMLButtonElement) => void) {
  const buttons = $$<HTMLButtonElement>('button', root);
  const pill = $('.filters__pill', root);

  function place(animate = true) {
    const active = buttons.find(b => b.getAttribute('aria-selected') === 'true');
    if (!active || !pill) return;
    if (!animate) pill.style.transition = 'none';
    pill.style.width = `${active.offsetWidth}px`;
    pill.style.transform = `translateX(${active.offsetLeft}px)`;
    if (!animate) {
      void pill.offsetWidth;
      pill.style.transition = '';
    }
  }

  buttons.forEach(btn => btn.addEventListener('click', () => {
    if (btn.getAttribute('aria-selected') === 'true') return;
    buttons.forEach(b => b.setAttribute('aria-selected', String(b === btn)));
    place();
    onSelect(btn);
  }));

  place(false);
  new ResizeObserver(() => place(false)).observe(root);
  document.fonts?.ready.then(() => place(false));
}
