export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Il tuo percorso', href: '/il-tuo-percorso' },
  { label: 'Testimonianze', href: '/testimonianze' },
  { label: 'Eventi', href: '/eventi' },
  { label: 'Casi di studio', href: '/casi-di-studio' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Contatti', href: '/contatti' },
] as const;

export const PRIMARY_CTA = {
  label: 'Registrati al casting',
  href: '/registrazione',
} as const;

export const SECONDARY_CTA = {
  label: 'Resta aggiornata',
  href: '/newsletter',
} as const;
