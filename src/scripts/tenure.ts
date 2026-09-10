// Live tenure counter in the top bar. Reads data-hire (YYYY-MM-DD, KST) from the element.
// Fails closed: if the date is unparsable the element stays empty instead of showing a wrong number.
const els = document.querySelectorAll<HTMLElement>('[data-tenure]');
for (const el of els) {
  const hire = el.dataset.hire;
  const t = Date.parse(`${hire}T00:00:00+09:00`);
  if (!hire || Number.isNaN(t)) continue;
  const days = Math.floor((Date.now() - t) / 86_400_000);
  if (days < 0) continue;
  const lang = document.documentElement.lang;
  el.textContent = lang === 'en'
    ? `Day ${days.toLocaleString('en-US')} at DSRV`
    : `재직 D+${days.toLocaleString('ko-KR')}`;
}
