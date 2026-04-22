export const BRAND = {
  name: 'Progetto Svizzera',
  tagline: 'Il percorso professionale per infermieri italiani in Svizzera tedesca',
  domain: 'progetto-svizzera.it',
  url: 'https://progetto-svizzera.it',
  locale: 'it-IT',
  language: 'it',
  colors: {
    primary: '#1E3A5F',
    secondary: '#B91C1C',
    navy: '#0F1F35',
  },
  legal: {
    company: 'Eumedica Recruitment Group LLC',
    address: '3833 Powerline Road, Suite 201, Fort Lauderdale, FL 33309, US',
  },
} as const;

export const CONTACTS = {
  email: 'selezione@progetto-svizzera.it',
  phone: '+393488642316',
  phoneDisplay: '+39 348 864 2316',
  whatsapp: 'https://wa.me/393488642316',
  instagram: 'https://www.instagram.com/progetto.svizzera',
  facebook: 'https://www.facebook.com/progettosvizzera',
} as const;

export const CASTING = {
  nextDate: '2026-05-23',
  nextDateDisplay: '23 maggio 2026',
  deadline: '2026-05-18',
  deadlineDisplay: '18 maggio 2026',
  modality: 'online',
  duration: '20 minuti',
  stats: {
    activeSince: 2018,
    totalCastings: 11,
    placed: 150,
    completionRate: 95,
  },
} as const;

export const TYPEFORM_IDS = {
  home: '01KBPVAGGFFJ6HGWEDF5GTFFBV',
  registration: '01HP759Q36Z6BJMD8VES8JGE1Z',
} as const;

export const SEO_DEFAULTS = {
  title: 'Progetto Svizzera — Lavora come infermiere nella Svizzera tedesca',
  description:
    'Percorso completo per infermieri italiani: formazione linguistica, preparazione al casting e inserimento in ospedali e cliniche della Svizzera tedesca. Attivo dal 2018, 150 infermieri collocati.',
  keywords:
    'lavorare come infermiere in svizzera, recruitment infermieri svizzera tedesca, casting infermieri svizzera, corso tedesco infermieri, percorso infermiere svizzera, lavoro infermieri svizzera',
  ogImage: '/og/default.jpg',
} as const;
