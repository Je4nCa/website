import { $, $$, reducedMotion } from '../lib/dom';

/** Width of the mascot PNG; the eye overlay SVG shares its coordinate space. */
const ART_WIDTH = 1412;

interface Eye {
  lid: SVGGElement;
  pupil: SVGEllipseElement;
  cx: number;
  cy: number;
  maxX: number;
  maxY: number;
  x: number;
  y: number;
}

/** The mascot's eyes follow the pointer (or wander when idle), blink, and squint when clicked. */
export function initMascot() {
  const mascot = $('#mascot');
  const svg = $<SVGSVGElement>('.mascot__eyes');
  if (!mascot || !svg) return;

  const eyes: Eye[] = $$<SVGGElement>('[data-eye]').map(g => {
    const white = $<SVGEllipseElement>('.eye__white', g)!;
    const pupil = $<SVGEllipseElement>('[data-pupil]', g)!;
    const n = (el: Element, attr: string) => Number(el.getAttribute(attr));
    return {
      lid: $<SVGGElement>('.eye__lid', g)!,
      pupil,
      cx: n(white, 'cx'),
      cy: n(white, 'cy'),
      maxX: n(white, 'rx') - n(pupil, 'rx') - 8,
      maxY: n(white, 'ry') - n(pupil, 'ry') - 10,
      x: 0,
      y: 0,
    };
  });

  const pointer = { x: 0, y: 0, last: -Infinity };
  let idle = { x: 0, y: 0, next: 0 };
  let visible = true;
  let raf = 0;

  const track = (e: PointerEvent) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.last = performance.now();
  };
  addEventListener('pointermove', track, { passive: true });
  addEventListener('pointerdown', track, { passive: true });

  function loop(now: number) {
    raf = visible ? requestAnimationFrame(loop) : 0;
    const following = now - pointer.last < 4000;
    const rect = following ? svg!.getBoundingClientRect() : null;
    if (!following && now > idle.next) {
      idle = { x: Math.random() * 2 - 1, y: Math.random() * 1.4 - 0.5, next: now + 1400 + Math.random() * 2200 };
    }
    const scale = rect ? rect.width / ART_WIDTH : 1;

    for (const eye of eyes) {
      let tx = idle.x * eye.maxX;
      let ty = idle.y * eye.maxY;
      if (rect) {
        const dx = pointer.x - (rect.left + eye.cx * scale);
        const dy = pointer.y - (rect.top + eye.cy * scale);
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, dist / 260);
        tx = (dx / dist) * eye.maxX * reach;
        ty = (dy / dist) * eye.maxY * reach;
      }
      eye.x += (tx - eye.x) * 0.16;
      eye.y += (ty - eye.y) * 0.16;
      eye.pupil.style.transform = `translate(${eye.x.toFixed(2)}px, ${eye.y.toFixed(2)}px)`;
    }
  }

  const lids = (frames: Keyframe[], duration: number) =>
    eyes.forEach(eye => eye.lid.animate(frames, { duration, easing: 'ease-in-out' }));

  const blink = (double = false) => {
    lids([{ transform: 'scaleY(1)' }, { transform: 'scaleY(.08)', offset: 0.45 }, { transform: 'scaleY(1)' }], 190);
    if (double) setTimeout(() => blink(), 260);
  };
  const scheduleBlink = () => setTimeout(() => {
    if (visible && !document.hidden) blink(Math.random() < 0.2);
    scheduleBlink();
  }, 2400 + Math.random() * 3600);
  scheduleBlink();

  // Speech bubble: short lines while the hero is on screen, a reaction when clicked.
  const bubble = $('#bubble');
  const lines = ['¡Hola! Bienvenido a Montevo.', '¿Tienes una idea? Cuéntamela.', '¿Todavía facturas a mano?', 'Psst… abajo hay ejemplos que puedes probar.', 'Hecho en Costa Rica.', 'Tócame. No muerdo.'];
  const reactions = ['¡Jaja, cosquillas!', '¡Otra vez!', 'Ok, ok. ¿Hablamos de tu proyecto?'];
  let line = 0, reaction = 0, bubbleTimer = 0;
  const say = (text: string, hold = 3400) => {
    if (!bubble) return;
    clearTimeout(bubbleTimer);
    bubble.classList.remove('is-on');
    bubbleTimer = window.setTimeout(() => {
      bubble.textContent = text;
      bubble.classList.add('is-on');
      bubbleTimer = window.setTimeout(() => {
        bubble.classList.remove('is-on');
        bubbleTimer = window.setTimeout(next, 1400);
      }, hold);
    }, bubble.classList.contains('is-on') ? 250 : 0);
  };
  const next = () => {
    if (!visible || document.hidden) { bubbleTimer = window.setTimeout(next, 1500); return; }
    say(lines[line++ % lines.length]);
  };
  bubbleTimer = window.setTimeout(next, 1800);

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(loop);
  }).observe(mascot);

  mascot.addEventListener('click', () => {
    say(reactions[reaction++ % reactions.length], 2200);
    if (reducedMotion) return blink();
    mascot.classList.remove('is-boing');
    void mascot.offsetWidth;
    mascot.classList.add('is-boing');
    lids([{ transform: 'scaleY(1)' }, { transform: 'scaleY(.35)', offset: 0.3 }, { transform: 'scaleY(.35)', offset: 0.7 }, { transform: 'scaleY(1)' }], 700);
  });
  mascot.addEventListener('animationend', e => {
    if (e.animationName === 'boing') mascot.classList.remove('is-boing');
  });
}
