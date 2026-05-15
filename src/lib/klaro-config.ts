/**
 * Klaro configuration — Progetto Svizzera
 *
 * Docs: https://klaro.org/docs/getting-started
 *
 * Compliance: GDPR + Garante Privacy IT (opt-in granulare per servizio).
 * Cookie/storage cleanup automatico su revoca consenso.
 *
 * Env vars (PUBLIC_*, esposte al client):
 *   - PUBLIC_GA4_MEASUREMENT_ID
 *   - PUBLIC_GTM_CONTAINER_ID
 *   - PUBLIC_META_PIXEL_ID
 */

const GTM_ID = import.meta.env.PUBLIC_GTM_CONTAINER_ID || '';
const GA4_ID = import.meta.env.PUBLIC_GA4_MEASUREMENT_ID || '';
const META_PIXEL_ID = import.meta.env.PUBLIC_META_PIXEL_ID || '';

export const klaroConfig = {
  version: 1,
  elementID: 'klaro',
  storageMethod: 'localStorage',
  storageName: 'ps-klaro-v1',
  cookieDomain: undefined as string | undefined,
  cookieExpiresAfterDays: 365,
  privacyPolicy: { default: '/progetto-svizzera-site/v2/privacy-policy' },
  default: false,
  mustConsent: false,
  acceptAll: true,
  hideDeclineAll: false,
  hideLearnMore: false,
  noticeAsModal: false,
  htmlTexts: true,
  embedded: false,
  groupByPurpose: true,
  lang: 'it',
  translations: {
    it: {
      consentModal: {
        title: 'Cookie e tracciamento',
        description:
          "Usiamo cookie tecnici (necessari) per far funzionare il sito. Con il tuo consenso usiamo anche cookie di <strong>analisi</strong> per capire come migliorare le pagine e cookie di <strong>marketing</strong> per misurare le campagne. Puoi accettare tutto, rifiutare tutto o scegliere servizio per servizio.",
      },
      consentNotice: {
        changeDescription: 'Abbiamo aggiornato la configurazione cookie. Rivedi la tua scelta.',
        description:
          "Usiamo cookie tecnici (sempre attivi) e — con il tuo consenso — cookie di analisi e marketing. <a class='cn-learn-more' href='#'>Scegli servizio per servizio</a>.",
        learnMore: 'Personalizza',
      },
      ok: 'Accetta tutto',
      save: 'Salva preferenze',
      decline: 'Rifiuta',
      close: 'Chiudi',
      acceptAll: 'Accetta tutto',
      acceptSelected: 'Salva scelte',
      service: {
        disableAll: { title: 'Abilita / disabilita tutti', description: 'Cambia tutti i servizi insieme' },
        optOut: { title: '(opt-out)', description: 'Servizio attivo di default — puoi disattivarlo' },
        required: { title: '(necessario)', description: 'Servizio indispensabile, non disattivabile' },
        purposes: 'Finalità',
        purpose: 'Finalità',
      },
      poweredBy: 'Gestione consenso: Klaro!',
      contextualConsent: {
        description: 'Vuoi caricare contenuto esterno da {title}?',
        acceptOnce: 'Sì',
        acceptAlways: 'Sempre',
      },
      privacyPolicyUrl: '/progetto-svizzera-site/v2/privacy-policy',
    },
  },
  purposes: [
    { name: 'analytics', title: 'Analisi', description: 'Misuriamo il traffico per migliorare il sito.' },
    { name: 'marketing', title: 'Marketing', description: 'Misuriamo l\'efficacia delle campagne pubblicitarie.' },
  ],
  services: [
    ...(GTM_ID
      ? [
          {
            name: 'gtm',
            title: 'Google Tag Manager',
            purposes: ['analytics', 'marketing'],
            cookies: [/^_ga/, /^_gid/, /^_gcl/],
            onAccept: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
            onDecline: `
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({event: 'gtm_consent_revoked'});
            `,
          },
        ]
      : []),
    ...(GA4_ID && !GTM_ID
      ? [
          {
            name: 'google-analytics',
            title: 'Google Analytics 4',
            purposes: ['analytics'],
            cookies: [/^_ga/, /^_gid/],
            onAccept: `
              var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA4_ID}';
              document.head.appendChild(s);
              window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
              window.gtag=gtag;gtag('js',new Date());gtag('config','${GA4_ID}',{anonymize_ip:true});
            `,
          },
        ]
      : []),
    ...(META_PIXEL_ID
      ? [
          {
            name: 'meta-pixel',
            title: 'Meta Pixel (Facebook / Instagram)',
            purposes: ['marketing'],
            cookies: [/^_fbp/, /^fr/],
            onAccept: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','${META_PIXEL_ID}');fbq('track','PageView');
            `,
          },
        ]
      : []),
  ],
};
