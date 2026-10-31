// Always-on and tiny: menu, header state, before/after control, and page-transition wiring.
// With <ClientRouter /> the document is swapped, not reloaded, so everything is set up on
// `astro:page-load` and torn down on `astro:before-swap`.
import { navigate } from 'astro:transitions/client';
import { prefersReducedMotion } from './shared';
import { getRole, introSeen, setRole, syncAccountLabels, type Role } from './session';
// Static on purpose: a dynamic CSS import is injected once, and the router's head swap
// drops it, leaving the map's tiles unstyled after navigating away and back.
import 'leaflet/dist/leaflet.css';

const root = document.documentElement;

let controller: AbortController | null = null;
let stopMotion: (() => void) | null = null;
type NavKind = 'plain' | 'curtain' | 'role-pro' | 'role-client';
let navKind: NavKind = 'curtain';
// Set by the role switch / gateway just before it navigates, so the next transition is the role wipe.
let pendingSwitch: NavKind | null = null;

const PLAIN_ROUTES = ['/agendar', '/conta'];

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
  matchMedia('(min-width: 1760px)').addEventListener('change', (e) => {
    if (e.matches && menu?.classList.contains('is-open')) setMenu(false);
  }, { signal });

  // Role switch (Cliente / Profissional) and the gateway cards. The thumb slides first, then the page wipes.
  syncAccountLabels();
  document.querySelectorAll<HTMLAnchorElement>('[data-role-link]').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = link.dataset.roleLink as Role;
      if (document.body.dataset.role === target) { e.preventDefault(); setMenu(false); return; }
      setRole(target);
      pendingSwitch = target === 'profissional' ? 'role-pro' : 'role-client';
      if (prefersReducedMotion()) return;
      e.preventDefault();
      const group = link.closest<HTMLElement>('.role-switch, .role-cards');
      if (group) {
        group.dataset.active = target;
        group.classList.add('is-leaving');
      }
      link.setAttribute('data-chosen', '');
      setTimeout(() => navigate(link.href), 240);
    }, { signal });
  });
  const pageRole = document.body.dataset.role as Role | 'entrada';
  if (pageRole !== 'entrada' && !getRole()) setRole(pageRole);

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

  // Footer map (Leaflet + OpenStreetMap tiles), loaded only when it nears the viewport.
  const mapEl = document.getElementById('shop-map');
  if (mapEl && 'IntersectionObserver' in window) {
    let map: import('leaflet').Map | undefined;
    const mapIo = new IntersectionObserver(async ([en]) => {
      if (!en.isIntersecting) return;
      mapIo.disconnect();
      const L = (await import('leaflet')).default;
      if (signal.aborted) return;
      // MASP, Avenida Paulista. The salon itself is fictional.
      const center: [number, number] = [-23.5614, -46.6559];
      map = L.map(mapEl, { center, zoom: 15, scrollWheelZoom: false });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      const pin = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" viewBox="0 0 24 29" aria-hidden="true"><path d="M12 1.5C6.8 1.5 3 5.4 3 10.3c0 6.6 9 17 9 17s9-10.4 9-17C21 5.4 17.2 1.5 12 1.5z" fill="#f46fa1" stroke="#2b0e26" stroke-width="1.8"/><circle cx="12" cy="10.3" r="3.2" fill="#2b0e26"/></svg>';
      const icon = L.divIcon({ html: pin, className: 'shop-pin', iconSize: [40, 48], iconAnchor: [20, 46], popupAnchor: [0, -44] });
      const popup = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = mapEl.dataset.popupTitle ?? '';
      const note = document.createElement('span');
      note.textContent = mapEl.dataset.popupNote ?? '';
      popup.append(title, note);
      L.marker(center, { icon, title: title.textContent }).addTo(map).bindPopup(popup).openPopup();
      // Wheel zoom only once the map is focused, so page scrolling is never trapped.
      map.on('focus click', () => map?.scrollWheelZoom.enable());
      map.on('blur', () => map?.scrollWheelZoom.disable());
    }, { rootMargin: '300px' });
    mapIo.observe(mapEl);
    signal.addEventListener('abort', () => { mapIo.disconnect(); map?.remove(); });
  }

  // Hide the phone booking button while a booking entry point (hero buttons, band, wizard) is on screen.
  const sticky = document.getElementById('sticky-cta');
  const bookingParts = document.querySelectorAll('.hero-actions, .band, .booking');
  if (sticky && bookingParts.length && 'IntersectionObserver' in window) {
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
      sticky.style.display = visible.size ? 'none' : '';
    });
    bookingParts.forEach((el) => io.observe(el));
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

// Pages into the working screens (booking, account) get a plain cross-fade; the rest get the curtain.
document.addEventListener('astro:before-preparation', (e) => {
  const to = (e as unknown as { to: URL }).to;
  if (pendingSwitch) {
    navKind = pendingSwitch;
    pendingSwitch = null;
  } else {
    navKind = PLAIN_ROUTES.some((r) => to.pathname.startsWith(r)) ? 'plain' : 'curtain';
  }
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
  // In dev, Vite injects the imported CSS as a <style> that runs once; the head swap would drop it.
  document.head.querySelectorAll<HTMLStyleElement>('style[data-vite-dev-id]').forEach((s) => {
    const id = s.dataset.viteDevId;
    if (!next.head.querySelector(`style[data-vite-dev-id="${CSS.escape(id ?? '')}"]`)) {
      next.head.appendChild(s.cloneNode(true));
    }
  });
});

document.addEventListener('astro:page-load', initPage);
