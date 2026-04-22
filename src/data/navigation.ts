export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Il tuo percorso', href: '/il-tuo-percorso' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Testimonianze', href: '/testimonianze' },
  { label: 'Eventi', href: '/eventi' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contatti', href: '/contatti' },
] as const;

export const PRIMARY_CTA = {
  label: 'Registrati al casting',
  href: '/registrazione',
} as const;
