// Builds the site, serves dist/, prints /print/ to an A4 PDF.
// Run: npm run pdf   → output/유주영_포트폴리오_YYYY-MM-DD.pdf
// Uses the Playwright + Chromium already installed in ../career-ops (no new download).
import { spawn, execSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire('/Users/juyoung/Projects/career-ops/package.json'); // ← Playwright lives here
const { chromium } = require('playwright');

const PORT = 4399;
const today = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10); // KST
const out = `output/유주영_포트폴리오_${today}.pdf`; // ← file name

execSync('npm run build', { stdio: 'inherit' });
mkdirSync('output', { recursive: true });

// reuse a running dev/preview server on 4321 if there is one, otherwise start our own
const probe = (port) => fetch(`http://localhost:${port}/print/`).then((r) => r.ok).catch(() => false);
let base = (await probe(4321)) ? 'http://localhost:4321' : `http://localhost:${PORT}`;
const server = base.endsWith('4321') ? null : spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'ignore' });
try {
  let ok = base.endsWith('4321');
  for (let i = 0; i < 120 && !ok; i++) {
    await new Promise((r) => setTimeout(r, 250));
    ok = await probe(PORT);
  }
  if (!ok) throw new Error('preview server did not start');

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${base}/print/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();

  const mb = statSync(out).size / 1024 / 1024;
  if (mb > 10) throw new Error(`PDF is ${mb.toFixed(1)} MB — over the 10 MB upload limit`);
  console.log(`✓ ${out} (${mb.toFixed(2)} MB)`);
} finally {
  server?.kill();
}
