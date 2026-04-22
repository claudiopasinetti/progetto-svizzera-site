// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://progetto-svizzera.it',
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
  },
  adapter: cloudflare(),
});
