// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // ← EDIT: change if a custom domain is connected later
  site: 'https://im-ju.github.io',

  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (url) => !url.includes('/print/') && !url.includes('/404/') })], // print edition and 404 stay out of search
});