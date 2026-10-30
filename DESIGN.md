---
name: Cintila Studio
description: Um salão editorial e cinematográfico na vitrine, com a marcação como um assistente de instalação em cinza de sistema.
colors:
  paper: "#FFF5F3"
  paper-deep: "#FBE3E4"
  ink: "#2B0E26"
  ink-raised: "#431A3C"
  rose: "#F46FA1"
  rose-text: "#B01E58"
  lilac: "#E8DAF6"
  muted: "#6B4560"
  muted-on-ink: "#E0C0D4"
  hairline: "#F0CFD4"
  system-gray: "#C0C0C0"
  bevel-light: "#FFFFFF"
  bevel-shadow: "#6B6B6B"
  success: "#1D6B43"
  success-on-ink: "#5CD393"
  warning: "#8A5200"
  error: "#B3261E"
  error-on-ink: "#FF8A80"
typography:
  display:
    fontFamily: "'Cormorant Variable', 'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(3.5rem, 12vw, 11rem)"
    fontWeight: 500
    lineHeight: 0.92
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "'Cormorant Variable', 'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(2.5rem, 6.6vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  accent-italic:
    fontFamily: "'Cormorant Variable', 'Cormorant Garamond', Georgia, serif"
    fontSize: "inherit"
    fontWeight: 500
    fontStyle: italic
    letterSpacing: "-0.005em"
  title:
    fontFamily: "'Cormorant Variable', Georgia, serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.05
  body-lg:
    fontFamily: "'Jost Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "'Jost Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Jost Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.14em"
  dialog:
    fontFamily: "Tahoma, 'Segoe UI', Verdana, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.4
  dialog-title:
    fontFamily: "Tahoma, 'Segoe UI', Verdana, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.25
rounded:
  none: "0px"
  sm: "2px"
  soft: "24px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "96px"
  5xl: "144px"
components:
  button-primary:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
    height: "52px"
  button-quiet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.rose-text}"
    typography: "{typography.label}"
    padding: "8px 0"
  dialog-window:
    backgroundColor: "{colors.system-gray}"
    textColor: "{colors.ink}"
    typography: "{typography.dialog}"
    rounded: "{rounded.none}"
    padding: "24px"
  dialog-button:
    backgroundColor: "{colors.system-gray}"
    textColor: "{colors.ink}"
    typography: "{typography.dialog}"
    rounded: "{rounded.none}"
    padding: "8px 24px"
    height: "44px"
  dialog-button-default:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.ink}"
  dialog-field:
    backgroundColor: "{colors.bevel-light}"
    textColor: "{colors.ink}"
    typography: "{typography.dialog}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
    height: "44px"
  nav-bar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: "72px"
  service-card:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.soft}"
    padding: "28px"
  chapter-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    padding: "96px 32px"
---

<!-- SEED: established with the user before implementation. No code exists yet. Re-run `/impeccable document` once there is code, so the real tokens and the .impeccable/design.json sidecar can be extracted. Every value above is a decision, not an observation. -->

# Design System: Cintila Studio

## Overview

**Creative North Star: "The Cutting Room"**

A salon cuts hair, and a film cuts footage. The public site plays like a short edited reel: big, elegant type, hard scene changes between a blush chapter and a deep plum chapter, and a single saturated rosé that works like a slate clap. Behind the reel sits the booking desk, where the visitor does the one thing that matters. That desk keeps the shareware-installer wizard chosen in the surface brief: system-gray dialogs, bevelled edges, a progress bar that fills in blocks, and Back and Next at the bottom right. The two halves are deliberately different. The reel is the performance, and the wizard is the ticket desk behind it, where nothing moves unless it helps.

The direction takes principles, not assets, from the research. From landonorris.com: one big manifesto sentence mixing a heavy grotesque with a serif accent, a background that flips from light to dark as you scroll, a scattered collage at different scroll speeds, and a single neon-like accent on a small pill CTA. From Hershesons: a rating with a count and quotes that name a place. From Rita Hazan: the person is the hero, and CTAs are impossible to miss on mobile. From Drybar: Book is always one tap away, and services have names with personality. From Aesop: warm paper instead of white, and wide, calm margins. From Lusion: a loader that fills in discrete blocks, which matches the wizard's own progress bar. None of their type, colors, imagery, copy or layouts is reused.

All imagery, names, prices, staff and reviews are placeholders. Anything that looks like a portrait or a result is marked "Imagem ilustrativa" until the owner supplies real, licensed material.

**Key Characteristics:**
- Two registers, one rule: the reel (home and marketing pages) is cinematic; the desk (wizard and admin) is quiet and square.
- Chapters alternate between blush paper (`#FFF5F3`) and deep plum ink (`#2B0E26`). There is no user dark-mode toggle; the site is already both.
- One accent, rosé (`#F46FA1`), used on small, decisive things, with soft lilac as a quiet second tint in imagery.
- Type is the main image. Large Cormorant in mixed case, with the same family in italic, set in rosé, for the one word per headline that carries emotion.
- Soft shapes: 24px rounded cards and frames, and arch-shaped portraits.

**Feminine direction (revision).** The first pass was cream, black and coral with a heavy uppercase grotesque. It was re-skinned for a women-first audience: blush, petal pink, rosé and plum; an elegant high-contrast serif with a light geometric sans for text; rounded corners and arch portraits. Layout, motion and structure were not changed. The film vocabulary in the copy ("em cena", "Claquete") is a leftover of the first concept and can be softened separately.
- A recurring motif of long, parallel "strand" lines (flowing hair-like curves) draws across backgrounds and is drawn in on scroll.

## Colors

Blush and petal pinks for the light chapters, a deep plum for the dark ones, and one saturated rosé. Contrast ratios below were computed, not estimated.

### Primary
- **Rosé** (`#F46FA1`): fills for primary buttons, the progress-bar blocks, highlighter wipes over key words, the cursor label bubble, the booking band. It never carries text on paper (2.57:1 fails). Plum text on rosé is 6.40:1, and rosé on plum is 6.40:1 (5.26:1 on Raised Plum).
- **Raspberry Link** (`#B01E58`): the only rosé-family color allowed as text on paper (6.18:1; 5.42:1 on Petal). The italic accent word, eyebrows, quiet buttons and inline links.
- **Lilac** (`#E8DAF6`): a soft second tint, used in placeholder imagery. Plum on it is 13.23:1.

### Neutral
- **Pearl Blush** (`#FFF5F3`): the base of the browsing chapters. Plum on it is 16.43:1.
- **Petal** (`#FBE3E4`): cards and quote tiles on blush. Muted text on it is 6.51:1.
- **Deep Plum** (`#2B0E26`): text on paper, and the background of dark chapters. Blush on it is 16.43:1.
- **Raised Plum** (`#431A3C`): panels sitting on plum. Muted-on-plum text on it is 8.72:1.
- **Mauve** (`#6B4560`): secondary text on paper (7.41:1).
- **Orchid Mist** (`#E0C0D4`): secondary text on plum (10.61:1).
- **Hairline** (`#F0CFD4`): 1px dividers and strand lines on paper. Decorative only; never the sole boundary of an input.

### System chrome (wizard and admin only)
- **System Gray** (`#C0C0C0`): dialog body and buttons. Plum on it is about 10:1.
- **Bevel Light** (`#FFFFFF`) and **Bevel Shadow** (`#6B6B6B`): the raised and sunken edges of dialogs, buttons and fields.
- The wizard does not exist yet. Revisit this chrome against the feminine direction before building it (soft plum and petal instead of Windows gray is the likely move).

### Status
- **Success** (`#1D6B43`, 5.76:1 on paper; `#5CD393` on ink, 9.75:1)
- **Warning** (`#8A5200`, 5.67:1 on paper)
- **Error** (`#B3261E`, 5.80:1 on paper; `#FF8A80` on ink, 8.01:1)
Status is always paired with an icon and a word; color alone never carries meaning.

### Named Rules
**The One Rosé Rule.** Rosé covers at most about 10% of any viewport, apart from the booking band. Its rarity is what makes the CTA findable.
**The Plum-On-Rosé Rule.** Text on a rosé fill is always plum, never white.
**The No-Gradient Rule.** Fills are flat. Depth comes from chapter changes and layering, never from gradient washes.

## Typography

**Display Font:** Cormorant (variable, weight 300–700; fallback Cormorant Garamond, Georgia). An elegant, high-contrast serif used at weight 500–600 in mixed case.
**Accent:** Cormorant Italic, in Raspberry Link on light chapters and Rosé on plum. One to three words per headline, never whole paragraphs.
**Body Font:** Jost (variable, weight 100–900). A soft geometric sans.
**Dialog Font:** system Tahoma / Segoe UI / Verdana. No webfont, because the installer is meant to look like the operating system.

**Character:** A fashion-magazine serif with one italic word in pink, over a clean, friendly sans. Both faces cover the Portuguese diacritics (ç, ã, õ, é, ê, â). Fonts are self-hosted through `@fontsource-variable/cormorant` and `@fontsource-variable/jost` (Latin subsets, `font-display: swap`), and the two Latin roman files are preloaded. Cormorant uses lining numerals (`lnum`) so prices read as prices. `lang="pt-BR"` and `hyphens: auto` let long Portuguese words such as "coloração" and "hidratação" break instead of overflowing at 390px.

### Hierarchy
- **Display** (500, `clamp(3.5rem, 12vw, 11rem)`, line-height 0.92): the home hero only. One per page.
- **Headline** (500, `clamp(2.5rem, 6.6vw, 5.5rem)`, 0.98): section openers.
- **Title** (600, 2rem, 1.05): card and service names. Staff names are the italic at 3.5rem.
- **Body Large** (400, 1.25rem, 1.5): chapter intro copy, maximum 60ch.
- **Body** (400, 1rem, 1.6): everything else, 65ch maximum. Never below 16px.
- **Label** (500, 0.8125rem, +0.14em, uppercase): navigation, tags, captions, price units. Used for short strings only.
- **Dialog** (400, 1rem, 1.4) and **Dialog Title** (700, 1.125rem): wizard and admin only.

### Named Rules
**The One Italic Word Rule.** The pink italic marks one word per headline, and it carries the meaning ("o seu *cabelo*"). If two words are italic, none of them is special.
**The No-Small-Caps-Paragraph Rule.** Uppercase is for labels only. Display, headlines and body copy are never all caps.

## Layout

The reel uses a 12-column grid inside a 1280px maximum content width (full-bleed for media and chapter backgrounds) with gutters of 16px on phones, 32px on tablets, and 48px on desktop. Spacing follows a 4px base: 4, 8, 16, 24, 32, 48, 64, 96, 144. Section padding is 96px on phones and 144px on desktop, so chapters breathe. Layouts are asymmetric on purpose: type is pushed to one edge and media to the other, and the collage scatters across columns at different sizes. Centered stacks are the exception, not the default.

The desk (wizard and admin) is a single fixed-width dialog (560px, 100% minus 16px on phones) centered on a dithered Raised Ink backdrop. The left 120px of the wizard dialog carries the dithered banner (hidden below 480px, where the progress bar and step title stack instead).

### Responsive rules
- Breakpoints: 480, 768, 1024, 1440. Design at 390 and 1440 first, and verify there is no horizontal scrolling at either.
- Below 768px: the pinned horizontal services track becomes a vertical stack, the custom cursor is removed, and parallax amplitude is halved.
- Touch targets are at least 44×44px, with 8px between neighbours.
- The sticky "Agendar" pill is always reachable: in the header from 768px up, and as a bottom-fixed full-width button on phones that hides while the wizard is open.
- Navigation collapses to a full-screen overlay menu below 768px. Menu items are display-size type.
- The wizard keeps Back and Next fixed at the bottom of the dialog on phones, never below the fold.

## Elevation & Depth

The reel is flat. Chapters have no shadows; depth is made by switching between paper and ink, by large overlaps, and by parallax. The desk is flat in a different way: depth is a 2px bevel (Bevel Light on the top and left, Bevel Shadow on the bottom and right, Deep Plum as the outer 1px line), never a blur. Fields are sunken with the bevel reversed. No soft shadows exist anywhere in the system.

### Named Rules
**The Bevel-Not-Blur Rule.** Anything inside the wizard that looks raised or sunken is made of hard 1–2px lines. A `box-shadow` with blur is a mistake.

## Shapes

Soft and feminine, kept apart from the desk. The reel uses 24px rounded cards, quote tiles and frames, arch-shaped portraits (a 50% / 32% dome on top, 24px corners below) for the hero and the staff, and the pill for the Agendar CTA and tags. The desk is entirely square, with a radius of 0. Images may overlap each other. Circles appear only as the cursor and as step indicators. Strand lines are 1.5px strokes, never filled shapes.

## Components

### Buttons
- **Primary (reel):** a rosé pill, plum label in uppercase, 52px tall, `16px 32px`. Hover: a plum fill rises from the bottom (clip-path, 240ms ease-out) and the label turns paper. Focus: a 3px Deep Plum outline with a 3px paper offset, which stays visible on both paper and ink chapters. Active: `scale(0.97)`.
- **Secondary:** paper pill with a 1.5px ink border; same hover sweep.
- **Quiet:** Raspberry Link text with an underline that draws in on hover.
- **Dialog button:** System Gray, square, 44px tall, bevelled; pressing inverts the bevel. **Default** dialog button is rosé with a plum label, with an extra 1px dotted focus line inside it. **Disabled** is gray text on gray, and the reason is always shown in text (for example "Escolha um serviço para continuar").

### Cards (services, staff)
Petal, 24px radius, 28px padding, no border and no shadow. Service cards carry a name, duration and a placeholder price marked "preço de exemplo". Staff cards lead with a large arch-shaped placeholder image and an italic first name.

### Inputs / Fields (wizard)
Sunken white field, 44px tall, a visible label above (never placeholder-only), 16px text so iOS does not zoom. Error: the field gets a 2px Error border plus an icon and a message below ("Informe um celular válido"). Radio rows for services are full-width, 44px minimum, with the whole row clickable.

### Navigation
A 72px paper bar with the wordmark on the left, five labels (Serviços, Equipe, Galeria, Contato, Agendar) and the pill. It sits over the hero without a background at first and gains a paper background after 80px of scroll. When the page is in an ink chapter, the bar switches to paper text on transparent. Active page: an underline that is 2px thick.

### Footer
An ink chapter with the contact block, hours, map link and a giant wordmark that fills the width. A permanent line states that the site is a portfolio demo and that bookings are simulated.

### Signature: The Installer Wizard
A System Gray dialog with a title bar (step name and "Passo 1 de 4"), a 120px dithered rosé-plum-blush banner on the left, a ten-block progress bar below the step title, the step content, and a bottom row with Back and Next. Next is disabled until the step is valid, and Back keeps entered values. The confirmation step ends in a "Concluir" default button and then a confirmation dialog with simulated email and a calendar file.

### Signature: The Strand Lines
Five to nine long parallel curves in 1.5px strokes (Hairline on paper, 20% paper on ink), drawn in as the chapter enters and drifting slowly at 0.9× scroll speed. They are the only background decoration.

### Admin (demo)
The same dialog chrome with a permanent "DEMO – sem login, dados guardados só neste navegador" strip, a table of stored bookings with square, bevelled column headers, and a "Limpar reservas" button. Because it is an operating view, nothing animates here.

## Do's and Don'ts

### Do:
- **Do** keep the reel and the desk visibly separate: cinematic and asymmetric outside, square and still inside the wizard.
- **Do** use rosé as fill only, with plum text, and Raspberry Link for rosé-colored text.
- **Do** let type be the hero image and mark every placeholder image "Imagem ilustrativa".
- **Do** show a visible focus ring, a text reason for every disabled control, and plain-Portuguese error messages.
- **Do** keep every Portuguese string in its final length when testing layouts; Portuguese runs about 20% longer than English.

### Don't:
- **Don't** use purple-to-blue gradients, glassmorphism, centered stacks of three identical cards, emoji as icons, or gradient headline text.
- **Don't** put a real person's face, a real review, a real price or a real address on the site. These are placeholders (see PRODUCT.md).
- **Don't** reuse another site's type, colors, photos, copy or exact layout. The research gave principles only.
- **Don't** use a box-shadow with blur anywhere, including hover states.
- **Don't** animate anything inside the wizard or admin beyond the step change and the block progress.

## Accessibility

- Body text contrast is at least 4.5:1 and large text at least 3:1; all pairs in Colors were measured. Rosé is never text on paper.
- Visible keyboard focus on every interactive element: a 3px ink outline with a 3px paper offset (reel) and a 1px dotted inner line (dialogs).
- The wizard is a real form: labelled fields, a grouped radio set per step, `aria-current="step"` on the progress, an `aria-live="polite"` region announcing the step title and errors, and focus moved to the step heading on every step change.
- Content is complete without JavaScript. Reveals start from the visible state, and animation classes are added by script, so a failed script never hides text.
- Every scroll-driven scene has a static equivalent; pinned scenes never trap the keyboard, and Tab order follows the reading order.
- Language is Brazilian Portuguese (`pt-BR`, assumed; confirm with the owner). Images have meaningful Portuguese alt text, or empty alt when decorative (strand lines, banners).
- The custom cursor is decorative only; the system cursor remains visible over text, forms and dialogs.
- Nothing flashes more than three times per second. No loader or transition blocks input.

## Motion

Direction: bold, cinematic, highly dynamic on the reel; almost still on the desk. Motion follows the animation-decision rule from emil-design-eng: animate things seen rarely or once (loader, hero, chapters) with ambition, and strip animation from things used repeatedly (wizard buttons, form fields, keyboard actions). Interface feedback stays under 300ms, using only `transform`, `opacity` and `clip-path`.

### Shared curves and timings
- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for entering and responding (default).
- `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` for things that move on screen (curtains, pins).
- Linear for the marquee only.
- Interface feedback 100–250ms; chapter scenes 600–1400ms; stagger 30–80ms between items; exits faster than entrances.
- Never `ease-in`, never `transition: all`, never scale from 0 (start from 0.95 with opacity).

### Libraries
| Job | Library |
|---|---|
| Timelines, scroll scrubbing, pinning, SplitText | **GSAP** with ScrollTrigger and SplitText |
| Smooth scrolling | **Lenis** (synced to GSAP's ticker) |
| Page transitions | **Astro's `<ClientRouter />`** (View Transitions, no extra dependency) |
| Hover, focus, press, underline, wizard steps | **Plain CSS** transitions |
| Cursor follower | **GSAP `quickTo`** |
| Wizard progress blocks | **Plain CSS** |

GSAP and Lenis are new dependencies. CLAUDE.md requires approval before they are added, and this document does not add them. Load them with dynamic imports only on pages that have scenes, and keep them off `/agendar` and `/admin`. Budget: roughly 50 KB gzipped for GSAP core, ScrollTrigger, SplitText and Lenis together (to be measured when installed), with Lighthouse performance at 90 or more on the home page. There is no WebGL or Three.js.

### Loading animation
Shown on the first home visit per session only (`sessionStorage`), never on later pages. A full-screen Deep Plum curtain holds a ten-block progress bar, the same shape as the wizard's, filling in discrete steps, with a rolling three-digit counter (000 to 100) in Cormorant. Maximum duration 1.2s, shorter if the page is ready sooner. The curtain exits upward with `clip-path: inset(0 0 100% 0)` over 700ms `--ease-in-out`. The hero is fully rendered beneath it, so the loader never delays the largest paint, and any key press or click skips it.

### Hero intro sequence
Starts as the curtain lifts, about 1.8s in total, and the page is usable from the first frame:
1. 0ms: strand lines draw in (stroke-dashoffset, 1600ms, ease-out).
2. 100ms: the display headline reveals line by line from masked overflow (`yPercent` 110 to 0, 800ms ease-out, 70ms stagger); the serif word lands last.
3. 200ms: the hero media settles from `scale(1.12)` to `scale(1)` over 1400ms.
4. 900ms: the nav and the Agendar pill fade and rise 8px, 240ms.

### Scroll-driven storytelling
Seven chapters, each a "scene" that cuts to the next:
1. **Abertura** (paper): the hero.
2. **Manifesto** (paper to ink): the background colour scrubs from paper to ink across 40vh of scroll while the manifesto sentence's words rise from 20% to 100% opacity as you scroll.
3. **Serviços** (ink): pinned horizontal track on desktop. Cards pass left, and a counter shows the active category.
4. **Equipe** (paper): a collage of staff placeholders at three scroll speeds.
5. **Antes e depois** (ink): pinned comparison; scrolling drives a clip-path reveal between the placeholder before and after images.
6. **Opiniões** (paper): a linear marquee of placeholder quotes that slows on hover and pauses on focus.
7. **Agendar** (rosé band, then plum footer): an oversized "Agendar" line leads into the wizard.

### Pinned sections
Two only: the services track (desktop only, pinned for the length of the cards, `scrub: 1`) and the before/after comparison (pinned for about 100vh). Below 768px both are plain vertical stacks. Pins use `pin: true` with `anticipatePin`, and are removed under `prefers-reduced-motion`.

### Text reveals
- **Line mask reveal** on headlines when they enter (once): lines slide up from `overflow: clip`, 800ms ease-out, 70ms stagger.
- **Word scrub** on the manifesto (opacity 0.2 to 1 per word, scrubbed).
- **Highlighter wipe:** a rosé bar sweeps across a key word with `clip-path` (400ms) before the word's colour flips to ink. At most one per chapter.
- Text is real DOM text split by SplitText with `aria-label` preserved on the parent; the split is reverted after the animation.

### Parallax
Media frames use `overflow: clip` and the image inside moves ±8% of the frame height against the scroll (halved on phones). The collage uses three speed tiers (0.85, 1, 1.15). Strand lines drift at 0.9×. Transform only; no parallax on text.

### Cursor effects (fine pointers only: `@media (hover: hover) and (pointer: fine)`)
A 12px ink dot with `mix-blend-mode: difference` follows the pointer through a GSAP `quickTo` spring (duration 0.35). Over media it grows to a 72px rosé circle labelled "Ver"; over CTAs it hides and the CTA gets a magnetic pull (maximum 8px, 250ms return). The cursor is disabled over text inputs, inside dialogs, and on `/agendar` and `/admin`. The system cursor is always left visible.

### Hover states
Wrap every hover animation in `@media (hover: hover) and (pointer: fine)`. Links: underline draws left to right in 220ms ease-out and retracts toward the opposite side. Cards: the image scales to 1.04 over 600ms ease-out. Buttons: ink fill sweep (240ms) and `scale(0.97)` on press (140ms). Nothing keyboard-initiated animates.

### Page transitions
Astro `<ClientRouter />` with a custom animation: the outgoing page fades and rises 12px in 180ms; the incoming page is revealed by a rosé curtain that wipes away with `clip-path` over 450ms ease-in-out. A shared `view-transition-name` links a service name on the services page to the wizard's first step. Navigation into `/agendar` and `/admin` is a plain 150ms cross-fade because those are working screens.

### Wizard motion (calm)
- Step change: content slides 12px and fades, 200ms ease-out (Back reverses direction). Skipped for keyboard-initiated step changes: the content swaps instantly and focus moves to the step heading.
- Progress bar: each block fills in 150ms with a 40ms stagger.
- Confirmation: a 600ms ten-block "Instalando…" bar, then the confirmation dialog appears with `scale(0.97)` to 1 and opacity, 200ms, from the centre.

### Reduced motion
Under `prefers-reduced-motion: reduce`: no loader, no Lenis, no pinning, no parallax, no cursor effects; the strand lines are drawn statically; text reveals become 150ms opacity fades; the page transition becomes a 150ms cross-fade; and the wizard step change is instant. Information is never carried by motion alone.
