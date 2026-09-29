import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://atlanta.privatemoneyloans.click',
  output: 'server',
  adapter: cloudflare(),
  trailingSlash: 'always',
  build: { format: 'directory' }
});
