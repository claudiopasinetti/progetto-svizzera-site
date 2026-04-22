# Progetto Svizzera — Sito istituzionale

Sito del programma **Progetto Svizzera**: reclutamento e formazione di infermieri italiani per cliniche e ospedali della Svizzera tedesca. Attivo dal 2018.

**Produzione (futura):** `https://progetto-svizzera.it`
**Preview dev:** Cloudflare Pages branch preview

## Stack

- [Astro 6](https://astro.build) — SSG, zero-JS by default
- [Tailwind CSS 4](https://tailwindcss.com) — utility-first, CSS-first config
- [React 19](https://react.dev) — solo islands interattive (form, menu mobile, video player, Typeform modal)
- TypeScript strict
- [Cloudflare Pages](https://pages.cloudflare.com) — deploy + preview per PR

## Roadmap

### Fase 1 — Sito standalone Astro (in corso)

Blocchi roadmap:
1. Foundation — repo + Astro + design system + layout (completato nel primo commit)
2. Pagine statiche — Privacy, Termini, Eventi, Contatti (+ form Resend)
3. Pagine core — Home, Registrazione, Chi siamo, Percorso (con islands)
4. Media pesante — Portfolio, Testimonianze + migrazione uploads
5. Tracking + SEO — GA4, GTM, Meta Pixel, Consent Mode v2, Schema.org, sitemap
6. Polish + deploy produttivo

### Fase 2 — WordPress headless (rinviata post-casting 23/05)

Hostinger + WPGraphQL + Astro Content Layer loader. Il design system resta invariato, cambia solo la sorgente dei contenuti (da markdown/config a WP API).

Spec completa: `clienti/prospect/progetto-svizzera/2026-04-22_spec-rebuild-sito-astro.md` nel repo ClaudeCode (monorepo di lavoro).

## Sviluppo locale

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # build SSG → dist/
pnpm preview    # preview build locale
pnpm lint       # astro check (TypeScript + accessibility)
```

Node ≥ 22.12. pnpm 10.

## Credentials

Copia `.env.example` in `.env` e riempi i valori. `.env` è ignorato da git — **mai committare**.

## Struttura

```
src/
├── components/       # Astro components (Header, Footer)
│   └── islands/      # React components con client:*
├── data/             # config, navigation
├── layouts/          # Base.astro (meta, SEO, Header+Footer)
├── pages/            # 10 route static + api/
└── styles/           # global.css (Tailwind 4 + tokens)
```

## License

Proprietario — Eumedica Recruitment Group LLC.
