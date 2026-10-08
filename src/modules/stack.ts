import { $, esc } from '../lib/dom';
import type { Tool } from '../content/stack';

/** Renders the tool grid; each logo takes its brand color on hover. */
export function initStack(tools: Tool[]) {
  const grid = $('#stackGrid');
  if (!grid) return;
  grid.innerHTML = tools.map(({ icon, role }) => `
    <li class="tool" data-reveal style="--brand:#${esc(icon.hex)}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${esc(icon.path)}"/></svg>
      <h3>${esc(icon.title)}</h3>
      <p>${esc(role)}</p>
    </li>`).join('');
}
