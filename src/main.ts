import './styles.css';
import { projects } from './content/projects';
import { $ } from './lib/dom';
import { initSplitHeadings, splitScrub } from './modules/text';
import { initReveal } from './modules/reveal';
import { initNav } from './modules/nav';
import { initScroll } from './modules/scroll';
import { initServices } from './modules/services';
import { initWork } from './modules/work';
import { initMascot } from './modules/mascot';
import { initMagnetic } from './modules/magnetic';
import { initCase } from './modules/case';
import { initDemos } from './modules/demos';
import { initFaq } from './modules/faq';

if (import.meta.env.DEV) {
  const seen = new Set<string>();
  for (const p of projects) {
    if (seen.has(p.slug)) console.warn(`[projects] slug repetido: "${p.slug}"`);
    if (!/^[a-z0-9-]+$/.test(p.slug)) console.warn(`[projects] slug inválido (usa minúsculas, números y guiones): "${p.slug}"`);
    seen.add(p.slug);
  }
}

$('#year')!.textContent = String(new Date().getFullYear());

initSplitHeadings();
$('.hero__title')?.style.setProperty('--d', '80ms');
const scrubWords = splitScrub($('[data-scrub]'));

const grid = initWork(projects, () => scroll.remeasure());
initReveal();
initNav();
const scroll = initScroll(scrubWords);
initServices();
initMascot();
initMagnetic();
initDemos();
initFaq();
initCase(projects, grid);
