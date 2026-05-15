// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Deploy target: GitHub Pages — claudiopasinetti.github.io/progetto-svizzera-site/
// API routes (src/pages/api.disabled/*) are disabled for static build; ri-abilita per produzione Cloudflare.
export default defineConfig({
  site: 'https://claudiopasinetti.github.io',
  base: '/progetto-svizzera-site',
  output: 'static',
  redirects: {
    '/': '/progetto-svizzera-site/v2/',
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: { it: 'it-IT' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['framer-motion'],
    },
  },
});
