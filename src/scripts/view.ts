// Module list: card/list switch + 14-day "NEW" tag. Mirrors theme.ts.
// Stored key: ui-modules-view = "grid" | "list". No key = grid.
const KEY = 'ui-modules-view';
const NEW_DAYS = 14; // ← EDIT: how long a module counts as new after its `added` date
const list = document.querySelector<HTMLElement>('.modules[data-view]');
if (list) {
  const apply = (v: 'grid' | 'list') => {
    list.dataset.view = v;
    document.querySelectorAll<HTMLElement>('[data-view-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.viewBtn === v)));
  };
  let stored: string | null = null;
  try { stored = localStorage.getItem(KEY); } catch {}
  apply(stored === 'list' ? 'list' : 'grid');
  document.querySelectorAll<HTMLElement>('[data-view-btn]').forEach((b) =>
    b.addEventListener('click', () => {
      const v = b.dataset.viewBtn === 'list' ? 'list' : 'grid';
      try { localStorage.setItem(KEY, v); } catch { /* private mode: still switch for this page */ }
      apply(v);
    }),
  );
}
// NEW tag: shown only while today < added + NEW_DAYS. Computed here so it expires without a rebuild.
document.querySelectorAll<HTMLElement>('.module-new[data-added]').forEach((el) => {
  const added = Date.parse(el.dataset.added ?? '');
  if (Number.isNaN(added)) return; // unreadable date → stay hidden rather than show a wrong tag
  el.hidden = Date.now() - added > NEW_DAYS * 86400e3;
});
