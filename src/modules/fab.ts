import { $ } from '../lib/dom';

/**
 * Floating WhatsApp button: appears once the hero is out of view and hides
 * again over the contact section, where the WhatsApp buttons already are.
 */
export function initFab() {
  const fab = $('#fab');
  const hero = $('.hero');
  const contact = $('#contact');
  if (!fab || !hero) return;

  let pastHero = false;
  let atContact = false;
  const sync = () => fab.classList.toggle('is-on', pastHero && !atContact);

  new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; sync(); }, { threshold: 0.15 }).observe(hero);
  if (contact) new IntersectionObserver(([e]) => { atContact = e.isIntersecting; sync(); }, { threshold: 0.05 }).observe(contact);
}
