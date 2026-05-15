import { useState, type FormEvent } from 'react';

interface NewsletterFormProps {
  endpoint?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function NewsletterForm({ endpoint = '/api/newsletter' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !consent) {
      setErrorMsg('Servono email e consenso al trattamento.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, consent }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
      setEmail('');
      setName('');
      setConsent(false);
    } catch (err) {
      setStatus('error');
      setErrorMsg('Qualcosa non ha funzionato. Riprova fra qualche minuto o scrivici.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-brand-success/40 bg-brand-success/5 p-6 text-sm text-brand-ink">
        <p className="font-semibold text-brand-success">Iscritta. Ti scriviamo prima del prossimo casting.</p>
        <p className="mt-2 text-brand-ink/70">
          Niente spam. Se vuoi disiscriverti, ogni email ha il link in fondo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="nl-name" className="mb-1 block text-sm font-medium text-brand-ink">
          Nome (facoltativo)
        </label>
        <input
          id="nl-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="given-name"
          className="w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/20"
        />
      </div>

      <div>
        <label htmlFor="nl-email" className="mb-1 block text-sm font-medium text-brand-ink">
          Email <span className="text-brand-secondary">*</span>
        </label>
        <input
          id="nl-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/20"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-brand-ink/85">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-brand-border text-brand-secondary focus:ring-brand-secondary/40"
        />
        <span>
          Acconsento all'uso della mia email per ricevere informazioni sui prossimi casting e
          aggiornamenti dal Progetto Svizzera. Posso disiscrivermi in ogni momento.
        </span>
      </label>

      {errorMsg && (
        <p role="alert" className="rounded-md bg-brand-secondary/10 px-3 py-2 text-sm text-brand-secondary">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex w-full items-center justify-center rounded-md bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary/90 disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? 'Iscrizione in corso…' : 'Iscriviti alla newsletter'}
      </button>

      <p className="text-xs text-brand-muted-foreground">
        Una email al mese, niente spam. Riceverai info sui prossimi casting + storie di chi ha completato il percorso.
      </p>
    </form>
  );
}
