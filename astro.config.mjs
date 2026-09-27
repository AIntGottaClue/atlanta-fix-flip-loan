import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://your-domain.com',
  integrations: [sitemap({ filenameBase: 'sitemap' })],
  trailingSlash: 'always',
  build: { format: 'directory' }
});

