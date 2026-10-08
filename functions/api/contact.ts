/**
 * POST /api/contact — Cloudflare Pages Function.
 * Receives the contact form and emails it to Jean Carlo through Resend.
 * Nothing is stored.
 *
 * Environment variables (Cloudflare Pages → Settings → Variables and Secrets):
 *   RESEND_API_KEY  secret, from resend.com
 *   CONTACT_TO      where requests arrive, e.g. montevostudio@outlook.com
 *   CONTACT_FROM    verified sender, e.g. "Montevo Studio <hola@montevostudio.com>"
 */

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

interface ContactRequest {
  nombre?: unknown;
  contacto?: unknown;
  tipo?: unknown;
  mensaje?: unknown;
  /** Honeypot: hidden from people, bots fill it in. */
  sitio?: unknown;
}

const TIPOS = ['Website', 'App', 'Facturación', 'Sistema', 'Portafolio', 'Invitación', 'Otro'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });

const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let data: ContactRequest;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'Formato inválido.' }, 400);
  }

  // Bots that fill the hidden field get a normal-looking success and no email.
  if (text(data.sitio, 200)) return json({ ok: true });

  const nombre = text(data.nombre, 120);
  const contacto = text(data.contacto, 160);
  const tipo = TIPOS.includes(text(data.tipo, 40)) ? text(data.tipo, 40) : 'Otro';
  const mensaje = text(data.mensaje, 4000);

  if (!nombre || !contacto || mensaje.length < 10) {
    return json({ ok: false, error: 'Escribe tu nombre, cómo contactarte y un mensaje de al menos 10 caracteres.' }, 422);
  }
  if (!env.RESEND_API_KEY) return json({ ok: false, error: 'El formulario no está configurado.' }, 500);

  const esCorreo = EMAIL.test(contacto);
  const telefono = contacto.replace(/[^\d]/g, '');
  const enlace = esCorreo
    ? `<a href="mailto:${escapeHtml(contacto)}">${escapeHtml(contacto)}</a>`
    : telefono.length >= 8
      ? `<a href="https://wa.me/${telefono.length === 8 ? `506${telefono}` : telefono}">${escapeHtml(contacto)}</a>`
      : escapeHtml(contacto);

  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#261C15">
      <p style="margin:0 0 16px;color:#A06733;font-weight:600">Nueva solicitud desde montevostudio.com</p>
      <p style="margin:0"><b>Nombre:</b> ${escapeHtml(nombre)}</p>
      <p style="margin:0"><b>Contacto:</b> ${enlace}</p>
      <p style="margin:0 0 16px"><b>Necesita:</b> ${escapeHtml(tipo)}</p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(mensaje)}</p>
    </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM || 'Montevo Studio <hola@montevostudio.com>',
      to: [env.CONTACT_TO || 'montevostudio@outlook.com'],
      subject: `${tipo} · ${nombre}`,
      html,
      ...(esCorreo ? { reply_to: contacto } : {}),
    }),
  });

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return json({ ok: false, error: 'No se pudo enviar.' }, 502);
  }
  return json({ ok: true });
};
