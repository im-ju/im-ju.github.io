// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://im-ju.github.io', // ← EDIT: change if a custom domain is connected later
  trailingSlash: 'always',
  build: { format: 'directory' },
});
