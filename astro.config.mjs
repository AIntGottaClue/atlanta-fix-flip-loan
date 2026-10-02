import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://atlantafixandflip.loansapp.cfd',
  output: 'server',
  adapter: cloudflare(),
  trailingSlash: 'always',
  build: { format: 'directory' }
});
