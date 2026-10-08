import { $$, splitWords } from '../lib/dom';

/** [data-split]: each word slides up from a mask when the element is revealed. */
export function initSplitHeadings() {
  $$('[data-split]').forEach(el => {
    el.setAttribute('aria-label', (el.textContent ?? '').replace(/\s+/g, ' ').trim());
    splitWords(el, (word, i) => {
      const outer = document.createElement('span');
      outer.className = 'word';
      outer.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span');
      inner.style.setProperty('--i', String(i));
      inner.textContent = word;
      outer.append(inner);
      return outer;
    });
  });
}

/** [data-scrub]: returns one span per word, lit progressively by the scroll loop. */
export function splitScrub(el: Element | null): HTMLSpanElement[] {
  const words: HTMLSpanElement[] = [];
  if (!el) return words;
  splitWords(el, word => {
    const s = document.createElement('span');
    s.className = 'w';
    s.textContent = word;
    words.push(s);
    return s;
  });
  return words;
}
