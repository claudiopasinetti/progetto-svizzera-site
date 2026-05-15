import type { APIRoute } from 'astro';

export const prerender = false;

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

async function sendViaResend(opts: {
  apiKey: string;
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  html: string;
}) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: opts.from,
      to: [opts.to],
      reply_to: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
    }),
  });
  if (!r.ok) {
    const txt = await r.text();
    throw new Error(`Resend ${r.status}: ${txt}`);
  }
  return r.json();
}

export const POST: APIRoute = async ({ request, locals }) => {
  let payload: { name?: string; email?: string; phone?: string; message?: string; honeypot?: string };
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (payload.honeypot) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim().toLowerCase();
  const phone = (payload.phone || '').trim();
  const message = (payload.message || '').trim();

  if (!name || name.length < 2) {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_name' }), { status: 400 });
  }
  if (!RE_EMAIL.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_email' }), { status: 400 });
  }
  if (!message || message.length < 10) {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_message' }), { status: 400 });
  }
  if (message.length > 4000) {
    return new Response(JSON.stringify({ ok: false, error: 'message_too_long' }), { status: 400 });
  }

  const env =
    // @ts-ignore — Cloudflare runtime env
    (locals as any)?.runtime?.env || (import.meta.env as Record<string, string>);
  const apiKey = env.RESEND_API_KEY;
  const from = env.EMAIL_FROM || 'Progetto Svizzera <selezione@progetto-svizzera.it>';
  const to = env.EMAIL_CONTACT_TO || 'selezione@progetto-svizzera.it';

  if (!apiKey) {
    return new Response(JSON.stringify({ ok: false, error: 'email_not_configured' }), { status: 503 });
  }

  try {
    await sendViaResend({
      apiKey,
      from,
      to,
      replyTo: email,
      subject: `[Sito] Nuovo contatto: ${name}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:640px;color:#0F1F35;">
          <h2 style="color:#1E3A5F;margin:0 0 16px;">Nuovo messaggio dal sito</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#7B8699;width:120px;">Nome</td><td style="padding:8px 0;"><strong>${escape(name)}</strong></td></tr>
            <tr><td style="padding:8px 0;color:#7B8699;">Email</td><td style="padding:8px 0;"><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#7B8699;">Telefono</td><td style="padding:8px 0;">${escape(phone)}</td></tr>` : ''}
          </table>
          <hr style="border:0;border-top:1px solid #E5E7EB;margin:24px 0;">
          <p style="white-space:pre-wrap;font-size:15px;line-height:1.6;">${escape(message)}</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[contact] send error', err);
    return new Response(JSON.stringify({ ok: false, error: 'send_failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
