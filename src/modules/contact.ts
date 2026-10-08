import { $ } from '../lib/dom';

/** Sends the contact form to the Cloudflare Pages Function at /api/contact. */
export function initContact() {
  const form = $<HTMLFormElement>('#contactForm');
  const status = $('#formStatus');
  if (!form || !status) return;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const label = submit.querySelector('span')!;

  const say = (text: string, kind: '' | 'is-ok' | 'is-error' = '') => {
    status.textContent = text;
    status.className = `form__status ${kind}`;
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fields = ['nombre', 'contacto', 'mensaje'].map(n => form.elements.namedItem(n) as HTMLInputElement);
    fields.forEach(f => f.classList.toggle('is-invalid', !f.checkValidity()));
    const firstBad = fields.find(f => !f.checkValidity());
    if (firstBad) {
      firstBad.focus();
      return say('Completa tu nombre, cómo contactarte y un mensaje de al menos 10 caracteres.', 'is-error');
    }

    const data = Object.fromEntries(new FormData(form));
    submit.disabled = true;
    label.textContent = 'Enviando…';
    say('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) throw new Error(body.error || 'No se pudo enviar.');
      form.classList.add('is-sent');
      label.textContent = 'Enviado';
      say('¡Listo! Te escribo en menos de 24 horas.', 'is-ok');
    } catch {
      submit.disabled = false;
      label.textContent = 'Enviar mensaje';
      say('No se pudo enviar. Inténtalo de nuevo o escríbeme por WhatsApp.', 'is-error');
    }
  });

  form.addEventListener('input', e => (e.target as HTMLElement).classList.remove('is-invalid'));
}
