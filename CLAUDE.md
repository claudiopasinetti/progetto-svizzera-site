# CLAUDE.md — Progetto Svizzera Site

Contesto per sessioni Claude Code sul repo.

## Summary

Sito Astro 6 + Tailwind 4 + React islands per **Progetto Svizzera** (recruiting infermieri IT→CH). Sostituisce il vecchio fork ContentFarm su Lovable. Fase 1 = standalone. Fase 2 (post-casting 2026-05-23) = migrazione content su WordPress headless hostato su Hostinger, letto via Astro Content Layer.

Spec completa nel monorepo ClaudeCode: `clienti/prospect/progetto-svizzera/2026-04-22_spec-rebuild-sito-astro.md`.

## Design system

Normalizzato rispetto al vecchio repo (che aveva `#FF1A1A` in CSS vs `#B91C1C` hardcoded). Source of truth: `src/styles/global.css` — blocco `@theme` (Tailwind 4 CSS-first).

- `--color-brand-primary`: `#1E3A5F` (blu Svizzera)
- `--color-brand-secondary`: `#B91C1C` (rosso Svizzera)
- `--color-brand-navy`: `#0F1F35` (footer)
- Font display: Montserrat
- Font body: Inter
- Radius base: 0.5rem

## Data source attuale

Content hardcoded nei componenti Astro + config in `src/data/config.ts`.
In Fase 2 si swappa con WP loader (Astro Content Layer API) — i componenti non cambiano, cambia solo il modulo che popola i dati.

## Typeform

Mantenuti dal vecchio sito Lovable. Condivisi finché non migriamo a form proprio.
- Home: `01KBPVAGGFFJ6HGWEDF5GTFFBV`
- Registrazione: `01HP759Q36Z6BJMD8VES8JGE1Z`

## Tracking

Nessun tag installato in Fase 1 Blocco 1. GA4 / GTM / Meta Pixel vengono aggiunti in Blocco 5 dietro Consent Mode v2 (Klaro).

## Deploy

Cloudflare Pages con adapter `@astrojs/cloudflare`. Preview automatico su ogni PR.
CI `.github/workflows/ci.yml` fa `astro check` + `pnpm build` prima del merge.

## Vecchio sito

Il vecchio sito `progetto-svizzera.it/swiss` resta **online su Lovable** fino al cutover DNS (TBD). Raccoglie candidature per il casting del **23 maggio 2026**. Non toccare.

Mirror locale del vecchio codice: `clienti/prospect/progetto-svizzera/site-repo/` nel monorepo (ref per migrazione copy/immagini/layout).

## Convenzioni operative

- Path assoluti nei Write / Edit
- Mai committare `.env`
- Sempre `pnpm lint` + `pnpm build` prima di push
- Branch feature → PR → merge main → deploy automatico via Cloudflare
