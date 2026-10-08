import { $, $$, lockScroll } from '../lib/dom';

export const nav = $('#nav')!;
export const navLinks = $$<HTMLAnchorElement>('#navLinks a');
const toggle = $('#navToggle')!;

export const isMenuOpen = () => nav.classList.contains('is-open');

export function setMenu(open: boolean) {
  if (open === isMenuOpen()) return;
  nav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  lockScroll(open);
}

export function initNav() {
  toggle.addEventListener('click', () => setMenu(!isMenuOpen()));
  navLinks.forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
}
