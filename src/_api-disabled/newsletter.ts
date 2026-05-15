import type { APIRoute } from 'astro';

export const prerender = false;

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendViaResend(opts: {
  apiKey: string;
  from: string;
  to: string;
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
  let payload: { email?: string; honeypot?: string };
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Anti-bot honeypot
  if (payload.honeypot) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const email = (payload.email || '').trim().toLowerCase();
  if (!RE_EMAIL.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_email' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const env =
    // @ts-ignore — Cloudflare runtime env
    (locals as any)?.runtime?.env || (import.meta.env as Record<string, string>);
  const apiKey = env.RESEND_API_KEY;
  const from = env.EMAIL_FROM || 'Progetto Svizzera <selezione@progetto-svizzera.it>';

  if (!apiKey) {
    return new Response(JSON.stringify({ ok: false, error: 'email_not_configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await sendViaResend({
      apiKey,
      from,
      to: email,
      subject: 'Sei iscritto/a alla newsletter di Progetto Svizzera',
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0F1F35;">
          <h1 style="color:#1E3A5F;font-size:24px;margin:0 0 16px;">Grazie per esserti iscritto/a</h1>
          <p style="font-size:16px;line-height:1.6;">
            Ti scriviamo solo quando c'è qualcosa di concreto: prossimi casting, storie di chi è
            già partito, aggiornamenti sul percorso. Niente spam, niente promozioni.
          </p>
          <p style="font-size:16px;line-height:1.6;">
            Prossimo casting: <strong>23 maggio 2026</strong> · Online.
          </p>
          <p style="font-size:14px;color:#7B8699;margin-top:32px;">
            Vuoi disiscriverti? Rispondi a questa email scrivendo "STOP".
          </p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[newsletter] send error', err);
    return new Response(JSON.stringify({ ok: false, error: 'send_failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
