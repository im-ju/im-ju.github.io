// Theme toggle. The initial theme is applied by an inline <script> in <head> (Base.astro) to avoid a flash;
// this file only wires the button. Stored key: ui-theme = "light" | "dark". No key = follow the OS.
const KEY = 'ui-theme';
const root = document.documentElement;
const apply = (t: 'light' | 'dark') => {
  root.dataset.theme = t;
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((b) => {
    const toDark = t === 'light';
    const lang = root.lang;
    b.setAttribute('aria-label', toDark ? (lang === 'en' ? 'Dark mode' : '다크 모드') : (lang === 'en' ? 'Light mode' : '라이트 모드'));
    b.dataset.mode = t;
  });
};
apply((root.dataset.theme as 'light' | 'dark') ?? 'light');
document.querySelectorAll('[data-theme-toggle]').forEach((b) =>
  b.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(KEY, next); } catch { /* private mode: still toggle for this page */ }
    apply(next);
  }),
);
// follow OS changes only while the user has not chosen
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  let stored: string | null = null;
  try { stored = localStorage.getItem(KEY); } catch {}
  if (!stored) apply(e.matches ? 'dark' : 'light');
});
