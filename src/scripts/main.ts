// Always-on and tiny: menu, header state, before/after control. Motion is loaded separately.
const root = document.documentElement;
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
openBtn?.addEventListener('click', () => setMenu(true));
closeBtn?.addEventListener('click', () => setMenu(false));
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu?.classList.contains('is-open')) setMenu(false);
});
// The menu is a phone-only overlay; close it if the viewport grows past the breakpoint.
matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
  if (e.matches && menu?.classList.contains('is-open')) setMenu(false);
});

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
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
onScroll();

// Before/after: the range input is the real control and works without scroll scenes.
const stage = document.getElementById('compare-stage');
const range = document.getElementById('compare-range') as HTMLInputElement | null;
range?.addEventListener('input', () => stage?.style.setProperty('--pos', range.value));

// Hide the phone booking button while the booking band is on screen.
const sticky = document.getElementById('sticky-cta');
const band = document.querySelector('.band');
if (sticky && band && 'IntersectionObserver' in window) {
  new IntersectionObserver(([en]) => {
    sticky.style.display = en.isIntersecting ? 'none' : '';
  }).observe(band);
}

if (document.body.hasAttribute('data-scenes') && root.classList.contains('js-motion')) {
  import('./motion.ts').catch(() => {
    root.classList.add('motion-failed');
    root.classList.remove('has-loader');
  });
}
