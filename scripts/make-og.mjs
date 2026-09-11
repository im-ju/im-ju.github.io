// Renders the link-preview image (Open Graph) for KO and EN → public/og-ko.png, public/og-en.png (1200×630).
// Uses the site's own tokens.css so the card matches the site. Run: npm run og   (then commit the PNGs)
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire('/Users/juyoung/Projects/career-ops/package.json'); // ← Playwright lives here
const { chromium } = require('playwright');

const tokens = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
const SITE = 'im-ju.github.io'; // ← EDIT if the domain changes
const cards = {
  ko: { eyebrow: '인사기록 카드 · HR × AX', name: '유주영', role: 'HR Operations · People Systems',
        statement: '제도가 없으면 만들고, 만든 제도가 지켜지는지 코드로 확인하는 HR 담당자입니다.', lang: 'ko' },
  en: { eyebrow: 'Employee record · HR × AX', name: 'Juyoung You', role: 'HR Operations · People Systems',
        statement: 'An HR generalist who writes the policy when none exists, then builds the systems that make it hold.', lang: 'en' },
};
const html = (c) => `<!doctype html><html lang="${c.lang}" data-theme="light"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${tokens}
  html,body{margin:0;width:1200px;height:630px;background:var(--color-paper);color:var(--color-ink);font-family:var(--font-body);-webkit-font-smoothing:antialiased}
  .card{box-sizing:border-box;width:1200px;height:630px;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;border-top:10px solid var(--color-accent)}
  .wm{font-family:var(--font-wordmark);font-weight:600;font-size:56px;letter-spacing:-0.03em;line-height:1;display:flex;align-items:center;gap:20px}
  .wm b{color:var(--color-accent);font-weight:600}
  .tag{font-family:var(--font-body);font-size:20px;font-weight:700;letter-spacing:.1em;color:var(--color-ink-3);text-transform:uppercase}
  .eyebrow{font-family:var(--font-mono);font-size:22px;letter-spacing:.06em;color:var(--color-ink-3);text-transform:uppercase;margin:0 0 18px}
  html[lang=ko] .eyebrow{font-family:var(--font-body);font-weight:600;letter-spacing:.02em} /* mono has no Hangul; avoid ragged fallback spacing */
  .name{font-size:76px;font-weight:800;letter-spacing:-0.045em;line-height:1.05;margin:0}
  .role{font-size:30px;color:var(--color-ink-2);font-weight:500;margin:10px 0 0}
  .statement{font-size:30px;line-height:1.4;color:var(--color-ink);max-width:960px;margin:30px 0 0;word-break:keep-all}
  .foot{display:flex;justify-content:space-between;align-items:baseline;font-family:var(--font-mono);font-size:22px;color:var(--color-ink-3)}
</style></head><body><div class="card">
  <div class="wm"><span>ju<b>yo</b>ung</span><span class="tag">HR × AX</span></div>
  <div><p class="eyebrow">${c.eyebrow}</p><h1 class="name">${c.name}</h1><p class="role">${c.role}</p><p class="statement">${c.statement}</p></div>
  <div class="foot"><span>${SITE}</span><span>PORTFOLIO</span></div>
</div></body></html>`;

const browser = await chromium.launch();
for (const [k, c] of Object.entries(cards)) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html(c), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const out = new URL(`../public/og-${k}.png`, import.meta.url);
  writeFileSync(out, await page.screenshot({ type: 'png' }));
  console.log('wrote', out.pathname);
  await page.close();
}
await browser.close();
