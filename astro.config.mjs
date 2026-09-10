// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://juyoung-you.pages.dev', // ← replace with the custom domain once connected
  trailingSlash: 'always',
  build: { format: 'directory' },
});
