import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://atlanta.privatemoneyloans.click',
  integrations: [sitemap({ filenameBase: 'sitemap' })],
  trailingSlash: 'always',
  build: { format: 'directory' }
});

