/**
 * Entry point: wires up every interactive module once the DOM is ready.
 * Each module is self-contained and respects prefers-reduced-motion.
 */
import './styles.css';
import { projects } from './content/projects';
import { $ } from './lib/dom';
import { initSplitHeadings, splitScrub } from './modules/text';
import { initReveal } from './modules/reveal';
import { initNav } from './modules/nav';
import { initScroll } from './modules/scroll';
import { initServices } from './modules/services';
import { initWork, cardHTML } from './modules/work';
import { initMascot } from './modules/mascot';
import { initMagnetic } from './modules/magnetic';
import { initCase } from './modules/case';
import { initDemos } from './modules/demos';
import { initFaq } from './modules/faq';
import { initStack } from './modules/stack';
import { stack } from './content/stack';
import { initRotator } from './modules/rotator';
import { initMarquee } from './modules/marquee';
import { initGlow } from './modules/glow';
import { initTilt } from './modules/tilt';
import { initCounters } from './modules/count';
import { initContact } from './modules/contact';
import { initFab } from './modules/fab';

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

// Los clientes de Montevo One van en su propia sección; "Trabajo seleccionado" muestra el resto.
const clientGrid = $('#clientGrid')!;
clientGrid.innerHTML = projects.filter(p => p.one).map(cardHTML).join('');
const grid = initWork(projects.filter(p => !p.one), () => scroll.remeasure());
initStack(stack);
initReveal();
initNav();
const scroll = initScroll(scrubWords);
initServices();
initMascot();
initMagnetic();
initDemos();
initFaq();
initRotator();
initMarquee();
initGlow();
initTilt(grid);
initTilt(clientGrid);
initCounters();
initContact();
initCase(projects, [clientGrid, grid]);
initFab();
