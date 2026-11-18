// Renders the link-preview image (Open Graph) for KO and EN → public/og-ko.png, public/og-en.png (1200×630).
// Same look as the site (2026-11 redesign): dark ground, big white headline, the laptop from the home page rising
// from the bottom edge. Run: npm run og   (then commit the PNGs)
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire('/Users/juyoung/Projects/career-ops/package.json'); // ← Playwright lives here
const { chromium } = require('playwright');

// the site's self-hosted font, inlined so the render never falls back to a system face
const font = readFileSync(new URL('../public/fonts/PretendardVariable.woff2', import.meta.url)).toString('base64');
const SITE = 'im-ju.github.io'; // ← EDIT if the domain changes
const C = { ground: '#1c1c1c', ink: '#ffffff', muted: 'rgba(255,255,255,0.62)' }; // ← src/styles/site.css 값과 같게 유지
const cards = {
  // role은 사이트 머리글과 같게 "HR" (2026-11-17 결정: 개인 포트폴리오라 회사명은 넣지 않는다. "HR Operations"도 쓰지 않는다)
  // rows ← EDIT: src/data/cases.ts의 앞 세 프로젝트 short 이름과 같게
  ko: { lang: 'ko', name: '유주영', role: 'HR', h1: '사람은 사람의 일에 집중하도록.', size: 74, sub: 'Systems for people.', rows: ['사내 HRIS', 'HR/GA Hub', '식대 검증'] },
  en: { lang: 'en', name: 'Juyoung You', role: 'HR', h1: 'Systems for people.', size: 100, sub: 'HR · People Systems portfolio', rows: ['In-house HRIS', 'HR/GA Hub', 'Meal checks'] },
};
const html = (c) => `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><style>
  @font-face { font-family: P; src: url(data:font/woff2;base64,${font}) format("woff2-variations"); font-weight: 45 920; }
  html,body{margin:0;width:1200px;height:630px;overflow:hidden;color:${C.ink};font-family:P,sans-serif;-webkit-font-smoothing:antialiased;word-break:keep-all;
    background:radial-gradient(120% 70% at 50% 0%, #2c2c2c, ${C.ground} 70%)}
  .top{position:absolute;left:64px;right:64px;top:44px;display:flex;justify-content:space-between;align-items:baseline;font-size:24px}
  .top b{font-weight:700;letter-spacing:-0.02em}.top b span{font-weight:500;color:${C.muted};letter-spacing:0;margin-left:12px}
  .top i{font-style:normal;color:${C.muted};font-size:20px}
  h1{position:absolute;left:0;right:0;top:${c.lang === 'ko' ? 128 : 112}px;margin:0;text-align:center;font-size:${c.size}px;line-height:1.06;font-weight:700;letter-spacing:-0.04em}
  .sub{position:absolute;left:0;right:0;top:248px;margin:0;text-align:center;font-size:28px;font-weight:500;color:${C.muted};letter-spacing:-0.015em}
  /* 사이트 홈의 노트북: 화면 윗부분만 보이게 아래로 잘린다 */
  .lid{position:absolute;left:220px;top:338px;width:760px;height:420px;box-sizing:border-box;padding:11px 11px 0;border-radius:20px 20px 0 0;background:#0a0a0b;box-shadow:inset 0 0 0 1.5px #3a3a3e,0 -30px 80px -30px rgba(0,0,0,.6)}
  .screen{display:grid;grid-template-columns:200px 1fr;height:100%;border-radius:9px 9px 0 0;overflow:hidden;background:#fff;color:#111}
  .side{background:#f1f1f2;border-right:1px solid #e2e2e5;padding:16px 12px}
  .dots{display:flex;gap:8px;margin:0 4px 16px}.dots u{width:12px;height:12px;border-radius:50%;background:#d8d8dc}
  .item{display:flex;align-items:center;gap:10px;height:34px;padding:0 8px;border-radius:9px;font-size:14px;font-weight:500;letter-spacing:-0.01em}
  .item u{width:22px;height:22px;border-radius:7px;background:#111}.item.on{background:#111;color:#fff}.item.on u{background:#fff}
  .main{padding:26px 28px}
  .head{display:flex;align-items:center;gap:14px;margin-bottom:18px}.head u{width:46px;height:46px;border-radius:13px;background:#111}
  .head b{font-size:24px;font-weight:700;letter-spacing:-0.03em}
  .list{border-radius:14px;background:#f3f3f5;border:1px solid #ececef}
  .row{display:flex;align-items:center;gap:12px;height:50px;padding:0 16px}.row+.row{border-top:1px solid #e1e1e5}
  .row u{width:24px;height:24px;border-radius:7px;background:#111}.row s{flex:1;height:10px;max-width:190px;border-radius:5px;background:#d6d6da;text-decoration:none}
  .row em{margin-left:auto;width:40px;height:23px;border-radius:12px;background:#111}
</style></head><body>
  <div class="top"><b>${c.name}<span>${c.role}</span></b><i>${SITE}</i></div>
  <h1>${c.h1}</h1><p class="sub">${c.sub}</p>
  <div class="lid"><div class="screen">
    <div class="side"><div class="dots"><u></u><u></u><u></u></div>${c.rows.map((r, i) => `<div class="item${i === 0 ? ' on' : ''}"><u></u>${r}</div>`).join('')}</div>
    <div class="main"><div class="head"><u></u><b>${c.rows[0]}</b></div><div class="list">${[150, 190, 120].map((w) => `<div class="row"><u></u><s style="max-width:${w}px"></s><em></em></div>`).join('')}</div></div>
  </div></div>
</body></html>`;

const browser = await chromium.launch();
for (const [k, c] of Object.entries(cards)) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html(c), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  // fail loudly if the font did not load: a fallback face would ship a preview that looks nothing like the site
  if (!(await page.evaluate(() => document.fonts.check('700 40px P')))) throw new Error('Pretendard did not load; preview not written');
  const out = new URL(`../public/og-${k}.png`, import.meta.url);
  writeFileSync(out, await page.screenshot({ type: 'png' }));
  console.log('wrote', out.pathname);
  await page.close();
}
await browser.close();
