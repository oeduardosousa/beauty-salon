// Simulated professional dashboard: appointment statuses and weekly availability, kept in sessionStorage.
import { clearPro, getAccount, getPro, savePro } from './session';

const LABEL: Record<string, string> = { pendente: 'Pendente', confirmado: 'Confirmado', concluido: 'Concluído' };
const ACTION: Record<string, string> = { pendente: 'Confirmar', confirmado: 'Concluir', concluido: 'Reabrir' };
const NEXT: Record<string, string> = { pendente: 'confirmado', confirmado: 'concluido', concluido: 'pendente' };
const money = (n: number) => `R$ ${n.toLocaleString('pt-BR')}`;

function init() {
  const page = document.querySelector<HTMLElement>('[data-pro]');
  if (!page) return;
  const state = getPro();
  const rows = [...page.querySelectorAll<HTMLElement>('.appt')];
  const stat = (k: string) => page.querySelector<HTMLElement>(`[data-stat="${k}"]`)!;

  function setStat(el: HTMLElement, text: string) {
    if (el.textContent === text) return;
    el.textContent = text;
    el.classList.remove('is-bump');
    void el.offsetWidth;
    el.classList.add('is-bump');
  }

  function totals() {
    const done = rows.filter((r) => r.dataset.status !== 'pendente');
    setStat(stat('total'), String(rows.length));
    setStat(stat('confirmed'), String(done.length));
    setStat(stat('revenue'), money(done.reduce((sum, r) => sum + Number(r.dataset.price), 0)));
  }

  function paint(row: HTMLElement, status: string) {
    row.dataset.status = status;
    row.querySelector('[data-chip]')!.textContent = LABEL[status];
    row.querySelector('[data-act]')!.textContent = ACTION[status];
  }

  for (const row of rows) {
    paint(row, state.status[row.dataset.id!] ?? row.dataset.initial!);
    row.querySelector('[data-act]')!.addEventListener('click', () => {
      const next = NEXT[row.dataset.status!];
      paint(row, next);
      state.status[row.dataset.id!] = next;
      savePro(state);
      totals();
    });
  }
  totals();

  for (const sw of page.querySelectorAll<HTMLButtonElement>('[data-day]')) {
    const apply = (on: boolean) => {
      sw.setAttribute('aria-checked', String(on));
      sw.closest('.day')!.querySelector('[data-hours]')!.textContent = on ? '9h às 19h' : 'Folga';
    };
    apply(state.days[sw.dataset.day!] ?? sw.dataset.default === 'true');
    sw.addEventListener('click', () => {
      const on = sw.getAttribute('aria-checked') !== 'true';
      apply(on);
      state.days[sw.dataset.day!] = on;
      savePro(state);
    });
  }

  // A client who created a demo account in the other view shows up here.
  const account = getAccount();
  const demo = page.querySelector<HTMLElement>('#cliente-demo')!;
  if (account) {
    demo.hidden = false;
    demo.querySelector('[data-demo-name]')!.textContent = account.nome;
    demo.querySelector('[data-demo-initial]')!.textContent = account.nome.trim().charAt(0).toUpperCase();
  }

  page.querySelector('#pro-reset')!.addEventListener('click', () => {
    clearPro();
    state.status = {};
    state.days = {};
    for (const row of rows) paint(row, row.dataset.initial!);
    for (const sw of page.querySelectorAll<HTMLButtonElement>('[data-day]')) {
      const on = sw.dataset.default === 'true';
      sw.setAttribute('aria-checked', String(on));
      sw.closest('.day')!.querySelector('[data-hours]')!.textContent = on ? '9h às 19h' : 'Folga';
    }
    totals();
  });
  initNav(page);
}

// Header links glide to their panel, the current panel's link stays underlined, and panels rise in as they arrive.
let navController: AbortController | null = null;

function initNav(page: HTMLElement) {
  navController?.abort();
  navController = new AbortController();
  const { signal } = navController;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.nav-desktop a[href*="#"], .menu-overlay nav a[href*="#"]')];
  const sections = ['agenda', 'clientes', 'disponibilidade']
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => !!el);
  const pad = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;

  let frame = 0;
  function glide(target: HTMLElement) {
    cancelAnimationFrame(frame);
    const from = scrollY;
    const to = Math.max(0, Math.min(scrollY + target.getBoundingClientRect().top - pad(), document.documentElement.scrollHeight - innerHeight));
    const arrive = () => {
      spy();
      target.classList.remove('is-arrived');
      void target.offsetWidth;
      target.classList.add('is-arrived');
      setTimeout(() => target.classList.remove('is-arrived'), 1100);
    };
    if (reduced || Math.abs(to - from) < 2) { scrollTo(0, to); arrive(); return; }
    const duration = Math.min(1100, 500 + Math.abs(to - from) * 0.35);
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      scrollTo(0, from + (to - from) * (1 - Math.pow(1 - t, 4)));
      if (t < 1) frame = requestAnimationFrame(step);
      else arrive();
    };
    frame = requestAnimationFrame(step);
  }

  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const target = document.getElementById(url.hash.slice(1));
    if (!target || !page.contains(target)) return;
    // Capture phase and preventDefault keep the router's instant hash jump out of the way.
    e.preventDefault();
    history.pushState(null, '', url.hash);
    requestAnimationFrame(() => glide(target));
  }, { signal, capture: true });

  // Scroll-spy: underline the link of the panel under the header.
  function spy() {
    const line = pad() + 40;
    let current = '';
    for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s.id;
    for (const l of links) {
      const on = new URL(l.href, location.href).hash === `#${current}`;
      l.classList.toggle('is-active', on);
      if (on) l.setAttribute('aria-current', 'location'); else l.removeAttribute('aria-current');
    }
  }
  addEventListener('scroll', spy, { passive: true, signal });
  spy();

  // Entrance: tiles, appointments, and panels rise once as they scroll into view.
  if (reduced || !('IntersectionObserver' in window)) return;
  const items = [...page.querySelectorAll<HTMLElement>('.tile, .appt, .panels .panel, .client:not([hidden]), .day')];
  items.forEach((el, i) => {
    el.classList.add('rv');
    el.style.setProperty('--rv', String(el.matches('.appt, .tile, .client, .day') ? [...(el.parentElement?.children ?? [])].indexOf(el) : 0));
  });
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      (en.target as HTMLElement).classList.add('is-in');
      io.unobserve(en.target);
    }
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
  items.forEach((el) => io.observe(el));
  signal.addEventListener('abort', () => io.disconnect());
}

document.addEventListener('astro:page-load', init);
