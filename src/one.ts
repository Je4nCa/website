/**
 * Montevo One product page: reuses the site's modules (nav, reveal, glow, magnetic, FAQ)
 * plus the brand showcase and the timed sale demo.
 */
import './styles.css';
import './one.css';
import { $ } from './lib/dom';
import { initSplitHeadings, splitScrub } from './modules/text';
import { initReveal } from './modules/reveal';
import { initNav } from './modules/nav';
import { initScroll } from './modules/scroll';
import { initMagnetic } from './modules/magnetic';
import { initGlow } from './modules/glow';
import { initFaq } from './modules/faq';
import { initBilling } from './modules/billing';
import { initPos } from './modules/pos';

$('#year')!.textContent = String(new Date().getFullYear());

initSplitHeadings();
const scrubWords = splitScrub($('[data-scrub]'));
initReveal();
initNav();
initScroll(scrubWords);
initMagnetic();
initGlow();
initFaq();
initBilling($<HTMLElement>('.ohero'));
initPos();
