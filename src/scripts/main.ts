// Always-on and tiny: menu, header state, before/after control, and page-transition wiring.
// With <ClientRouter /> the document is swapped, not reloaded, so everything is set up on
// `astro:page-load` and torn down on `astro:before-swap`.
const root = document.documentElement;

let controller: AbortController | null = null;
let stopMotion: (() => void) | null = null;
let navKind: 'plain' | 'curtain' = 'curtain';

const PLAIN_ROUTES = ['/agendar', '/admin'];
const introSeen = () => {
  try { return !!sessionStorage.getItem('cintila-intro'); } catch { return true; }
};

function initPage() {
  controller?.abort();
  controller = new AbortController();
  const { signal } = controller;

  const header = document.getElementById('site-header');
  const menu = document.getElementById('menu');
  const openBtn = document.getElementById('menu-open') as HTMLButtonElement | null;
  const closeBtn = document.getElementById('menu-close') as HTMLButtonElement | null;

  function setMenu(open: boolean) {
    if (!menu || !openBtn) return;
    menu.classList.toggle('is-open', open);
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    (open ? closeBtn : openBtn)?.focus();
  }
  openBtn?.addEventListener('click', () => setMenu(true), { signal });
  closeBtn?.addEventListener('click', () => setMenu(false), { signal });
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false), { signal }));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu?.classList.contains('is-open')) setMenu(false);
  }, { signal });
  // The menu is a phone-only overlay; close it if the viewport grows past the breakpoint.
  matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
    if (e.matches && menu?.classList.contains('is-open')) setMenu(false);
  }, { signal });

  // Header: paper background after 80px; paper text while over an ink chapter.
  const themed = [...document.querySelectorAll<HTMLElement>('[data-theme]')];
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 80);
    const probe = header.offsetHeight / 2;
    const under = themed.find((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= probe && r.bottom > probe;
    });
    header.classList.toggle('on-ink', under?.getAttribute('data-theme') === 'ink');
  }
  addEventListener('scroll', onScroll, { passive: true, signal });
  addEventListener('resize', onScroll, { signal });
  onScroll();

  // Before/after: the range input is the real control and works without scroll scenes.
  const stage = document.getElementById('compare-stage');
  const range = document.getElementById('compare-range') as HTMLInputElement | null;
  range?.addEventListener('input', () => stage?.style.setProperty('--pos', range.value), { signal });
  // Dragging the picture itself also moves the divider.
  if (stage && range) {
    const setFromPointer = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const v = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100));
      stage.style.setProperty('--pos', v.toFixed(1));
      range.value = String(Math.round(v));
    };
    stage.addEventListener('pointerdown', (e) => {
      stage.setPointerCapture(e.pointerId);
      setFromPointer(e);
      const move = (ev: PointerEvent) => setFromPointer(ev);
      const up = () => {
        stage.removeEventListener('pointermove', move);
        stage.removeEventListener('pointerup', up);
        stage.removeEventListener('pointercancel', up);
      };
      stage.addEventListener('pointermove', move);
      stage.addEventListener('pointerup', up);
      stage.addEventListener('pointercancel', up);
    }, { signal });
  }

  // Hide the phone booking button while the booking band is on screen.
  const sticky = document.getElementById('sticky-cta');
  const band = document.querySelector('.band');
  if (sticky && band && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(([en]) => {
      sticky.style.display = en.isIntersecting ? 'none' : '';
    });
    io.observe(band);
    signal.addEventListener('abort', () => io.disconnect());
  }

  if (document.body.hasAttribute('data-scenes') && root.classList.contains('js-motion')) {
    import('./motion.ts')
      .then(async (m) => {
        if (signal.aborted) return;
        const stop = await m.initMotion();
        if (signal.aborted) stop();
        else stopMotion = stop;
      })
      .catch(() => {
        root.classList.add('motion-failed');
        root.classList.remove('has-loader');
      });
  }
}

function teardownPage() {
  controller?.abort();
  controller = null;
  stopMotion?.();
  stopMotion = null;
}

// Pages into the working screens (booking, admin) get a plain cross-fade; the rest get the curtain.
document.addEventListener('astro:before-preparation', (e) => {
  const to = (e as unknown as { to: URL }).to;
  navKind = PLAIN_ROUTES.some((r) => to.pathname.startsWith(r)) ? 'plain' : 'curtain';
  root.dataset.nav = navKind;
});

document.addEventListener('astro:before-swap', (e) => {
  teardownPage();
  const next = (e as unknown as { newDocument: Document }).newDocument;
  const nextRoot = next.documentElement;
  // The swap replaces <html> attributes, so carry over the flags the CSS relies on.
  if (root.classList.contains('js-motion')) {
    nextRoot.classList.add('js-motion');
    if (next.body.hasAttribute('data-scenes') && !introSeen()) nextRoot.classList.add('has-loader');
  }
  nextRoot.dataset.nav = navKind;
});

document.addEventListener('astro:page-load', initPage);
