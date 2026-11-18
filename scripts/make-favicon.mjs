// public/favicon.svg → public/favicon.ico (16·32·48px). SVG 파비콘을 못 읽는 브라우저가 이 파일을 쓴다.
// 실행: npm run favicon   (favicon.svg를 고친 뒤에)
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire('/Users/juyoung/Projects/career-ops/package.json'); // ← Playwright가 설치된 곳 (make-og.mjs와 같음)
const { chromium } = require('playwright');

const SIZES = [16, 32, 48];
const svg = readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8');
const browser = await chromium.launch();
const pngs = [];
for (const size of SIZES) {
  // .ico는 화면 밝기에 따라 바뀔 수 없어서 밝은 화면용(검은 타일)으로 고정한다
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1, colorScheme: 'light' });
  await page.setContent(`<body style="margin:0">${svg.replace('<svg ', `<svg width="${size}" height="${size}" style="display:block" `)}</body>`);
  const png = await page.screenshot({ type: 'png', omitBackground: true });
  if (png.readUInt32BE(16) !== size || png.readUInt32BE(20) !== size) throw new Error(`favicon render came out at the wrong size for ${size}px; favicon.ico not written`);
  pngs.push(png);
  await page.close();
}
await browser.close();

// ICO 파일 = 머리말 6바이트 + 크기별 목록 16바이트씩 + PNG 그대로
const head = Buffer.alloc(6 + 16 * pngs.length);
head.writeUInt16LE(1, 2); head.writeUInt16LE(pngs.length, 4);
let offset = head.length;
pngs.forEach((png, i) => {
  const at = 6 + 16 * i;
  head.writeUInt8(SIZES[i], at); head.writeUInt8(SIZES[i], at + 1);
  head.writeUInt16LE(1, at + 4); head.writeUInt16LE(32, at + 6);
  head.writeUInt32LE(png.length, at + 8); head.writeUInt32LE(offset, at + 12);
  offset += png.length;
});
const out = new URL('../public/favicon.ico', import.meta.url);
writeFileSync(out, Buffer.concat([head, ...pngs]));
console.log('wrote', out.pathname, `(${SIZES.join(', ')}px)`);
