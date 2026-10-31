import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { markIntroSeen } from './session';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const q = <T extends Element = HTMLElement>(s: string, from: ParentNode = document) => from.querySelector<T>(s);
const qa = <T extends Element = HTMLElement>(s: string, from: ParentNode = document) => [...from.querySelectorAll<T>(s)];
const EASE_OUT = 'expo.out'; // stands in for cubic-bezier(0.23, 1, 0.32, 1)
const EASE_IN_OUT = 'power3.inOut'; // stands in for cubic-bezier(0.77, 0, 0.175, 1)

/**
 * Sets up every scroll scene for the current document and returns a teardown function.
 * Called once per page view (the router swaps the document without a reload).
 */
export async function initMotion(): Promise<() => void> {
  const ac = new AbortController();
  const { signal } = ac;
  const ctx = gsap.context(() => {});
  const mm = gsap.matchMedia();
  let destroyed = false;

  root.classList.add('motion-ready');

  /* ---------- Smooth scroll (Lenis, driven by GSAP's ticker) ---------- */
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const target = document.querySelector<HTMLElement>(url.hash);
    if (!target) return;
    // Capture phase: keep the router's own (instant) hash handling from fighting the glide.
    e.preventDefault();
    e.stopImmediatePropagation();
    a.classList.add('is-going');
    // Lenis also honours the CSS scroll-padding-top (header height + 16px), so no manual offset for sections.
    const pad = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
    const offset = target.id === 'contato' ? pad : 0;
    // Headline splits revert as they are passed and nudge the layout, so settle once more on arrival.
    const settle = () => {
      if (Math.abs(target.getBoundingClientRect().top - (pad - offset)) > 4) lenis.scrollTo(target, { offset, duration: 0.5 });
    };
    lenis.scrollTo(target, {
      offset,
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      onComplete: () => { a.classList.remove('is-going'); settle(); },
    });
    history.pushState(null, '', url.hash);
  }, { signal, capture: true });

  /* ---------- Loader and hero intro ---------- */
  function heroIntro() {
    const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
    tl.to('.hero .strands path', { strokeDashoffset: 0, duration: 1.6, stagger: 0.06 }, 0)
      .to('.hero .line-inner', { yPercent: 0, duration: 0.8, stagger: 0.07 }, 0.1)
      .to('.hero-scene', { opacity: 1, scale: 1, duration: 1.2 }, 0.2)
      .from('.hero-scene .petal i', { scaleY: 0, scaleX: 0.3, duration: 1.3, stagger: { each: 0.035, from: 'end' } }, 0.3)
      .from('.hero-scene .prop, .hero-scene .spark', { scale: 0, duration: 0.9, stagger: 0.06, ease: 'back.out(1.6)' }, 0.8)
      .to('.hero [data-intro]', { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, 0.4)
      .to('#site-header', { opacity: 1, duration: 0.24 }, 0.9);
    return tl;
  }

  function runLoader(): Promise<void> {
    return new Promise((resolve) => {
      const loader = q('.loader');
      if (!loader || !root.classList.contains('has-loader')) return resolve();
      const count = q('#loader-count')!;
      const blocks = qa('#loader-blocks i');
      lenis.stop();
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        markIntroSeen();
        gsap.to(loader, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.7,
          ease: EASE_IN_OUT,
          onComplete: () => { root.classList.remove('has-loader'); if (!destroyed) lenis.start(); },
        });
        resolve();
      };
      addEventListener('keydown', finish, { signal });
      addEventListener('pointerdown', finish, { signal });
      const state = { n: 0 };
      gsap.to(state, {
        n: 100,
        duration: 1,
        ease: 'steps(10)',
        onUpdate: () => {
          const n = Math.round(state.n);
          count.textContent = String(n).padStart(3, '0');
          blocks.forEach((b, i) => b.classList.toggle('on', i < Math.floor(n / 10)));
        },
        onComplete: finish,
      });
    });
  }

  /* ---------- Scroll scenes ---------- */
  function scenes() {
    // Headlines: line-mask reveal, once, then the split is reverted.
    qa('.headline').forEach((el) => {
      const label = el.textContent?.trim() ?? '';
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          el.setAttribute('aria-label', label);
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 0.8,
            ease: EASE_OUT,
            stagger: 0.07,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onComplete: () => { self.revert(); el.removeAttribute('aria-label'); },
          });
        },
      });
    });

    // Manifesto: background paper to ink over ~40vh; words scrub from 0.2 to 1.
    const manifesto = q('#manifesto');
    const text = q('#manifesto-text');
    if (manifesto && text) {
      gsap.fromTo(
        manifesto,
        { backgroundColor: '#FFF5F3', color: '#2B0E26' },
        {
          backgroundColor: '#2B0E26',
          color: '#FFF5F3',
          ease: 'none',
          scrollTrigger: { trigger: manifesto, start: 'top 80%', end: () => `+=${innerHeight * 0.4}`, scrub: true },
        },
      );
      const label = text.textContent?.trim() ?? '';
      const split = SplitText.create(text, { type: 'words' });
      text.setAttribute('aria-label', label);
      gsap.fromTo(
        split.words,
        { opacity: 0.2 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: text, start: 'top 75%', end: 'bottom 45%', scrub: true },
        },
      );
      const hl = q('.hl');
      if (hl) ScrollTrigger.create({ trigger: hl, start: 'top 60%', once: true, onEnter: () => hl.classList.add('is-on') });
    }

    // Strand lines: drawn in as each chapter enters, drifting slowly.
    qa<SVGElement>('.chapter > .strands').forEach((s) => {
      gsap.fromTo(s, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: s.parentElement!, scrub: true } });
    });
    qa<SVGPathElement>('.chapter > .strands path').forEach((p) => {
      gsap.fromTo(p, { strokeDasharray: 1, strokeDashoffset: 1 }, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: EASE_OUT,
        scrollTrigger: { trigger: p.closest('.chapter')!, start: 'top 80%', once: true },
      });
    });

    // Parallax: +-8% of frame height on desktop, halved on phones. Images are 112% tall.
    mm.add({ wide: '(min-width: 768px)', narrow: '(max-width: 767px)' }, (c) => {
      const amp = c.conditions!.wide ? 4.5 : 2.2;
      qa('.frame .img-inner').forEach((img) => {
        gsap.fromTo(img, { yPercent: -amp }, {
          yPercent: amp,
          ease: 'none',
          scrollTrigger: { trigger: img.parentElement!, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    });

    // Collage speed tiers (0.85, 1, 1.15) on tablet and up.
    mm.add('(min-width: 768px)', () => {
      qa('.person').forEach((p) => {
        const speed = parseFloat(p.dataset.speed ?? '1');
        gsap.fromTo(p, { y: (speed - 1) * 300 }, {
          y: (1 - speed) * 300,
          ease: 'none',
          scrollTrigger: { trigger: '#equipe', start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    });

    // Services: on desktop the cards drift sideways while the section scrolls past.
    // Nothing is pinned, so vertical scrolling never stalls.
    mm.add('(min-width: 1024px)', () => {
      const track = q('#services-track')!;
      const section = q('#servicos')!;
      const counter = q('#services-counter')!;
      const cards = qa('.card', track);
      track.classList.add('is-drift');
      const dist = () => {
        const view = track.parentElement!;
        const pad = parseFloat(getComputedStyle(view).paddingLeft) * 2;
        return Math.max(0, track.scrollWidth - (view.clientWidth - pad));
      };
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const i = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
            const cat = cards[i]?.dataset.cat ?? '';
            if (counter.textContent !== cat) counter.textContent = cat;
          },
        },
      });
      return () => {
        track.classList.remove('is-drift');
        tween.kill();
        gsap.set(track, { clearProps: 'transform' });
      };
    });

    // Before/after: the divider sweeps as the stage scrolls through the screen. Not pinned.
    {
      const stage = q('#compare-stage');
      const rangeEl = q<HTMLInputElement>('#compare-range');
      if (stage && rangeEl) {
        const pos = { v: 100 };
        gsap.to(pos, {
          v: 0,
          ease: 'none',
          onUpdate: () => {
            stage.style.setProperty('--pos', pos.v.toFixed(1));
            rangeEl.value = String(Math.round(pos.v));
          },
          scrollTrigger: { trigger: stage, start: 'top 75%', end: 'bottom 35%', scrub: 0.6 },
        });
      }
    }

    gsap.from('.band-link', {
      yPercent: 25,
      opacity: 0.4,
      duration: 1,
      ease: EASE_OUT,
      scrollTrigger: { trigger: '.band', start: 'top 70%', once: true },
    });
  }

  /* ---------- Cursor and magnetic buttons (fine pointers only) ---------- */
  function cursorFx() {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const dot = q('.cursor');
    if (!dot) return;
    // 3D hero scene: ease toward the pointer so the depth layers shift against each other.
    const tilt = q('[data-scene-tilt]');
    if (tilt) {
      const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.9, ease: 'power3' });
      const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.9, ease: 'power3' });
      addEventListener('pointermove', (e) => {
        ry((e.clientX / innerWidth - 0.5) * 22);
        rx((0.5 - e.clientY / innerHeight) * 14);
      }, { signal });
    }
    root.classList.add('cursor-on');
    const x = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3' });
    const y = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3' });
    addEventListener('pointermove', (e) => { x(e.clientX); y(e.clientY); }, { signal });
    document.addEventListener('pointerover', (e) => {
      const t = e.target as Element;
      const media = t.closest('[data-cursor="ver"]');
      const cta = t.closest('[data-magnetic], .btn');
      const field = t.closest('input, textarea, select, [role="dialog"]');
      const showMedia = !!media && !cta;
      dot.classList.toggle('is-media', showMedia);
      dot.textContent = showMedia ? 'Ver' : '';
      dot.classList.toggle('is-hidden', !!cta || !!field);
    }, { signal });
    qa('[data-magnetic]').forEach((el) => {
      const mx = gsap.quickTo(el, 'x', { duration: 0.25, ease: 'power3' });
      const my = gsap.quickTo(el, 'y', { duration: 0.25, ease: 'power3' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = ((e as PointerEvent).clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = ((e as PointerEvent).clientY - (r.top + r.height / 2)) / (r.height / 2);
        mx(dx * 8);
        my(dy * 8);
      }, { signal });
      el.addEventListener('pointerleave', () => { mx(0); my(0); }, { signal });
    });
  }

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    ac.abort();
    mm.revert();
    ctx.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.ticker.remove(tick);
    lenis.destroy();
    root.classList.remove('motion-ready', 'cursor-on');
  }

  /* ---------- Boot ---------- */
  await document.fonts.ready;
  if (destroyed) return destroy;
  // The hero is fully rendered beneath the loader, so the loader never delays paint.
  gsap.set('.hero [data-intro]', { y: 8 });
  gsap.set('.hero .line-inner', { yPercent: 110 });
  gsap.set('.hero-scene', { opacity: 0, scale: 0.92 });
  gsap.set('.hero .display', { visibility: 'visible' });
  await runLoader();
  if (signal.aborted) return destroy;
  ctx.add(() => {
    heroIntro();
    scenes();
    cursorFx();
  });
  ScrollTrigger.refresh();
  // Arriving from another page with a hash (e.g. /agendar to /#equipe): glide there.
  const hashTarget = location.hash.length > 1 ? document.querySelector<HTMLElement>(location.hash) : null;
  if (hashTarget) lenis.scrollTo(hashTarget, { offset: hashTarget.id === 'contato' ? parseFloat(getComputedStyle(root).scrollPaddingTop) || 0 : 0, duration: 1.5 });
  return destroy;
}
