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
  nextDateIso: '2026-05-23T09:00:00+02:00',
  deadline: '2026-05-18',
  deadlineDisplay: '18 maggio 2026',
  deadlineIso: '2026-05-18T23:59:59+02:00',
  modality: 'online',
  duration: '20 minuti',
  stats: {
    activeSince: 2018,
    totalCastings: 11,
    placed: 150,
    completionRate: 95,
  },
  dates2026: [
    { id: 'maggio-2026', dayLabel: 'sabato', dateDisplay: '23 maggio 2026', dateIso: '2026-05-23', deadlineDisplay: '18 maggio 2026', deadlineIso: '2026-05-18', modality: 'online' as const, status: 'open' as const },
    { id: 'ottobre-2026', dayLabel: 'sabato', dateDisplay: '10 ottobre 2026', dateIso: '2026-10-10', deadlineDisplay: '5 ottobre 2026', deadlineIso: '2026-10-05', modality: 'online' as const, status: 'planned' as const },
  ],
} as const;

export const WHATSAPP = {
  number: '393488642316',
  link: 'https://wa.me/393488642316',
  presetMessage: 'Ciao, vorrei info sul casting Progetto Svizzera',
  linkWithMessage: 'https://wa.me/393488642316?text=Ciao%2C%20vorrei%20info%20sul%20casting%20Progetto%20Svizzera',
} as const;

export const TYPEFORM_IDS = {
  home: '01KBPVAGGFFJ6HGWEDF5GTFFBV',
  registration: '01HP759Q36Z6BJMD8VES8JGE1Z',
} as const;

export const TALLY_FORM_IDS = {
  registration: 'pbRqNb',
  approfondimento: 'xX4b7o',
} as const;

export const TALLY_FORM_URLS = {
  registration: 'https://tally.so/r/pbRqNb',
  approfondimento: 'https://tally.so/r/xX4b7o',
} as const;

export const SEO_DEFAULTS = {
  title: 'Progetto Svizzera — Lavora come infermiere nella Svizzera tedesca',
  description:
    'Percorso completo per infermieri italiani: formazione linguistica, preparazione al casting e inserimento in ospedali e cliniche della Svizzera tedesca. Attivo dal 2018, 150 infermieri collocati.',
  ogImage: '/og/default.svg',
} as const;
