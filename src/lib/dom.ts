export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);

export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  [...root.querySelectorAll<T>(sel)];

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

export const EASE_OUT = 'cubic-bezier(.16, 1, .3, 1)';

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, c => ESCAPES[c]);

/** Wraps every word of `el`'s text (nested elements included), keeping spaces as text nodes. */
export function splitWords(el: Element, wrap: (word: string, index: number) => Node): number {
  let i = 0;
  const walk = (node: Node) => {
    [...node.childNodes].forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE) return walk(child);
      if (child.nodeType !== Node.TEXT_NODE) return;
      const frag = document.createDocumentFragment();
      (child.textContent ?? '').split(/( +)/).forEach(part => {
        if (!part) return;
        frag.append(/^ +$/.test(part) ? part : wrap(part, i++));
      });
      (child as ChildNode).replaceWith(frag);
    });
  };
  walk(el);
  return i;
}

/** Locks page scroll without the layout jumping where scrollbars take space. */
export function lockScroll(locked: boolean) {
  const root = document.documentElement;
  root.style.paddingRight = locked ? `${innerWidth - root.clientWidth}px` : '';
  root.classList.toggle('is-locked', locked);
}
