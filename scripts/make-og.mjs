// Renders the link-preview image (Open Graph) for KO and EN → public/og-ko.png, public/og-en.png (1200×630).
// Same look as the site (2026-11 palette): white ground, Pretendard 800 headline, a sky-blue file drawer along the
// bottom edge with white folders and hot-pink tabs. Run: npm run og   (then commit the PNGs)
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire('/Users/juyoung/Projects/career-ops/package.json'); // ← Playwright lives here
const { chromium } = require('playwright');

// the site's self-hosted font, inlined so the render never falls back to a system face
const font = readFileSync(new URL('../public/fonts/PretendardVariable.woff2', import.meta.url)).toString('base64');
const SITE = 'im-ju.github.io'; // ← EDIT if the domain changes
const C = { paper: '#FCFFFF', band: '#0593C6', point: '#D83995', ink: '#0a0a0a', muted: '#5a6268' }; // ← src/styles/site.css 값과 같게 유지
const cards = {
  ko: { lang: 'ko', name: '유주영', role: 'HR Operations · DSRV', h1: '사람은 사람의 일에<br>집중하도록.', sub: 'Systems for people.' },
  en: { lang: 'en', name: 'Juyoung You', role: 'HR Operations · DSRV', h1: 'Systems for people.', sub: 'HR Operations · People Systems portfolio' },
};
const html = (c) => `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><style>
  @font-face { font-family: P; src: url(data:font/woff2;base64,${font}) format("woff2-variations"); font-weight: 45 920; }
  html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:${C.paper};color:${C.ink};font-family:P,sans-serif;-webkit-font-smoothing:antialiased;word-break:keep-all}
  .top{position:absolute;left:72px;right:72px;top:56px;display:flex;justify-content:space-between;align-items:baseline;font-size:26px}
  .top b{font-weight:800;letter-spacing:-0.03em}.top b span{font-weight:500;color:${C.muted};letter-spacing:0;margin-left:14px}
  .top i{font-style:normal;color:${C.muted};font-size:22px}
  h1{position:absolute;left:72px;top:128px;margin:0;font-size:${c.lang === 'ko' ? 88 : 104}px;line-height:1.08;font-weight:800;letter-spacing:-0.045em}
  .sub{position:absolute;left:74px;top:${c.lang === 'ko' ? 340 : 268}px;margin:0;font-size:30px;font-weight:600;color:${C.muted};letter-spacing:-0.02em}
  .band{position:absolute;left:0;right:0;top:420px;bottom:0;background:${C.band}} /* 사이트처럼 파일 서랍 구역만 파랑 */
  .drawer{position:absolute;left:72px;top:448px;display:flex;gap:22px}
  .f{position:relative;width:196px;padding-top:34px}
  .f u{position:absolute;top:0;left:16px;height:36px;padding:0 14px;display:flex;align-items:center;background:${C.point};color:${C.ink};text-decoration:none;font-weight:800;font-size:18px;border-radius:12px 12px 0 0}
  .f s{display:block;height:220px;border-radius:6px 24px 24px 24px;text-decoration:none;background:${C.paper}}
</style></head><body>
  <div class="top"><b>${c.name}<span>${c.role}</span></b><i>${SITE}</i></div>
  <h1>${c.h1}</h1><p class="sub">${c.sub}</p>
  <div class="band"></div>
  <div class="drawer">${[1, 2, 3, 4, 5].map((n) => `<div class="f"><u>HR-0${n}</u><s></s></div>`).join('')}</div>
</body></html>`;

const browser = await chromium.launch();
for (const [k, c] of Object.entries(cards)) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html(c), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  // fail loudly if the font did not load: a fallback face would ship a preview that looks nothing like the site
  if (!(await page.evaluate(() => document.fonts.check('800 40px P')))) throw new Error('Pretendard did not load; preview not written');
  const out = new URL(`../public/og-${k}.png`, import.meta.url);
  writeFileSync(out, await page.screenshot({ type: 'png' }));
  console.log('wrote', out.pathname);
  await page.close();
}
await browser.close();
