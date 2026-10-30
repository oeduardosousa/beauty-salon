---
name: Salão [nome provisório]
description: Um salão editorial e cinematográfico na vitrine, com a marcação como um assistente de instalação em cinza de sistema.
colors:
  paper: "#F5F1E8"
  paper-deep: "#EAE4D6"
  ink: "#16150F"
  ink-raised: "#24231B"
  coral: "#FF5B3A"
  coral-text: "#C23A1C"
  muted: "#5A5548"
  muted-on-ink: "#B0AA9A"
  hairline: "#D6CFBE"
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
    fontFamily: "Archivo, 'Arial Narrow', Arial, sans-serif"
    fontSize: "clamp(3rem, 11vw, 10rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, 'Arial Narrow', Arial, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 5rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 108"
  accent-serif:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontSize: "inherit"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.15
  body-lg:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
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
    backgroundColor: "{colors.coral}"
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
    textColor: "{colors.coral-text}"
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
    backgroundColor: "{colors.coral}"
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
    rounded: "{rounded.sm}"
    padding: "24px"
  chapter-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    padding: "96px 32px"
---

<!-- SEED: established with the user before implementation. No code exists yet. Re-run `/impeccable document` once there is code, so the real tokens and the .impeccable/design.json sidecar can be extracted. Every value above is a decision, not an observation. -->

# Design System: Salão [nome provisório]

## Overview

**Creative North Star: "The Cutting Room"**

A salon cuts hair, and a film cuts footage. The public site plays like a short edited reel: big, loud type, hard scene changes between a warm paper chapter and a near-black chapter, and a single saturated coral that works like a slate clap. Behind the reel sits the booking desk, where the visitor does the one thing that matters. That desk keeps the shareware-installer wizard chosen in the surface brief: system-gray dialogs, bevelled edges, a progress bar that fills in blocks, and Back and Next at the bottom right. The two halves are deliberately different. The reel is the performance, and the wizard is the ticket desk behind it, where nothing moves unless it helps.

The direction takes principles, not assets, from the research. From landonorris.com: one big manifesto sentence mixing a heavy grotesque with a serif accent, a background that flips from light to dark as you scroll, a scattered collage at different scroll speeds, and a single neon-like accent on a small pill CTA. From Hershesons: a rating with a count and quotes that name a place. From Rita Hazan: the person is the hero, and CTAs are impossible to miss on mobile. From Drybar: Book is always one tap away, and services have names with personality. From Aesop: warm paper instead of white, and wide, calm margins. From Lusion: a loader that fills in discrete blocks, which matches the wizard's own progress bar. None of their type, colors, imagery, copy or layouts is reused.

All imagery, names, prices, staff and reviews are placeholders. Anything that looks like a portrait or a result is marked "Imagem ilustrativa" until the owner supplies real, licensed material.

**Key Characteristics:**
- Two registers, one rule: the reel (home and marketing pages) is cinematic; the desk (wizard and admin) is quiet and square.
- Chapters alternate between paper (`#F5F1E8`) and ink (`#16150F`). There is no user dark-mode toggle; the site is already both.
- One accent, coral (`#FF5B3A`), used on small, decisive things.
- Type is the main image. Large uppercase Archivo, with an italic serif for the one word per line that carries emotion.
- A recurring motif of long, parallel "strand" lines (flowing hair-like curves) draws across backgrounds and is drawn in on scroll.

## Colors

A warm paper and a warm black, with a single hot coral. Everything else is a quiet neutral. Contrast ratios below were computed, not estimated.

### Primary
- **Slate-Clap Coral** (`#FF5B3A`): fills for primary buttons, the default dialog button, the progress-bar blocks, highlighter wipes over key words, the cursor label bubble. It never carries text on paper (2.74:1 fails). Ink text on coral is 5.93:1, and coral on ink is 5.93:1.
- **Brick Link** (`#C23A1C`): the only coral-family color allowed as text on paper (4.76:1). Quiet buttons and inline links.

### Neutral
- **Warm Paper** (`#F5F1E8`): the base of the browsing chapters. Ink on it is 16.22:1.
- **Deep Paper** (`#EAE4D6`): cards and alternating bands on paper. Muted text on it is 5.86:1.
- **Darkroom Ink** (`#16150F`): text on paper, and the background of cinematic chapters. Paper on it is 16.22:1.
- **Raised Ink** (`#24231B`): panels sitting on ink. Muted-on-ink text on it is 6.81:1.
- **Quiet Brown-Gray** (`#5A5548`): secondary text on paper (6.59:1).
- **Fog on Ink** (`#B0AA9A`): secondary text on ink (7.89:1).
- **Hairline** (`#D6CFBE`): 1px dividers on paper. Decorative only; never the sole boundary of an input.

### System chrome (wizard and admin only)
- **System Gray** (`#C0C0C0`): dialog body and buttons. Ink on it is 10.05:1.
- **Bevel Light** (`#FFFFFF`) and **Bevel Shadow** (`#6B6B6B`): the raised and sunken edges of dialogs, buttons and fields. Bevel Shadow is the 1px outer-right/bottom line; Darkroom Ink is the outer-most 1px line.

### Status
- **Success** (`#1D6B43`, 5.76:1 on paper; `#5CD393` on ink, 9.75:1)
- **Warning** (`#8A5200`, 5.67:1 on paper)
- **Error** (`#B3261E`, 5.80:1 on paper; `#FF8A80` on ink, 8.01:1)
Status is always paired with an icon and a word; color alone never carries meaning.

### Named Rules
**The One Slate Rule.** Coral covers at most about 10% of any viewport. Its rarity is what makes the CTA findable.
**The Ink-On-Coral Rule.** Text on a coral fill is always ink, never paper or white.
**The No-Gradient Rule.** Fills are flat. Depth comes from chapter changes and layering, never from gradient washes.

## Typography

**Display Font:** Archivo (variable, with the width axis; fallback Arial Narrow, Arial). Heavy, uppercase, slightly expanded.
**Accent Serif:** Instrument Serif, italic (fallback Georgia). One to three words per headline, never whole paragraphs.
**Body Font:** Archivo.
**Dialog Font:** system Tahoma / Segoe UI / Verdana. No webfont, because the installer is meant to look like the operating system.

**Character:** A loud grotesque with a quiet serif whispering the key word, like a title card with one hand-lettered word. All faces cover the Portuguese diacritics (ç, ã, õ, é, ê, â). Self-host the two web fonts as subsetted WOFF2 (Latin and Latin Extended), `font-display: swap`, and preload only the display file. Add `lang="pt-BR"` and `hyphens: auto` so long Portuguese words such as "coloração" and "hidratação" break instead of overflowing at 390px.

### Hierarchy
- **Display** (800, `clamp(3rem, 11vw, 10rem)`, line-height 0.9, uppercase, `wdth` 112): the manifesto line and the home hero only. One per page.
- **Headline** (700, `clamp(2.25rem, 6vw, 5rem)`, 0.95, uppercase): section openers.
- **Title** (600, 1.5rem, 1.15): card and service names, staff names. Sentence case.
- **Body Large** (400, 1.25rem, 1.5): chapter intro copy, maximum 60ch.
- **Body** (400, 1rem, 1.6): everything else, 65ch maximum. Never below 16px.
- **Label** (600, 0.8125rem, +0.08em, uppercase): navigation, tags, captions, price units. Used for short strings only.
- **Dialog** (400, 1rem, 1.4) and **Dialog Title** (700, 1.125rem): wizard and admin only.

### Named Rules
**The One Serif Word Rule.** The italic serif marks one word per headline, and it carries the meaning ("o seu *cabelo*"). If two words are italic, none of them is special.
**The No-Small-Caps-Paragraph Rule.** Uppercase is for display and labels. Body copy is never all caps.

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

The reel is flat. Chapters have no shadows; depth is made by switching between paper and ink, by large overlaps, and by parallax. The desk is flat in a different way: depth is a 2px bevel (Bevel Light on the top and left, Bevel Shadow on the bottom and right, Darkroom Ink as the outer 1px line), never a blur. Fields are sunken with the bevel reversed. No soft shadows exist anywhere in the system.

### Named Rules
**The Bevel-Not-Blur Rule.** Anything inside the wizard that looks raised or sunken is made of hard 1–2px lines. A `box-shadow` with blur is a mistake.

## Shapes

Two shape languages, kept apart. The reel uses square media (radius 0 or 2px) and exactly one soft shape, the pill, for the Agendar CTA and tags. The desk is entirely square, with a radius of 0. Images are rectangular, cropped hard, and may overlap each other. Circles appear only as the cursor and as step indicators. Strand lines are 1.5px strokes, never filled shapes.

## Components

### Buttons
- **Primary (reel):** a coral pill, ink label in uppercase, 52px tall, `16px 32px`. Hover: an ink fill rises from the bottom (clip-path, 240ms ease-out) and the label turns paper. Focus: a 3px Darkroom Ink outline with a 3px paper offset, which stays visible on both paper and ink chapters. Active: `scale(0.97)`.
- **Secondary:** paper pill with a 1.5px ink border; same hover sweep.
- **Quiet:** Brick Link text with an underline that draws in on hover.
- **Dialog button:** System Gray, square, 44px tall, bevelled; pressing inverts the bevel. **Default** dialog button is coral with an ink label, with an extra 1px dotted focus line inside it. **Disabled** is gray text on gray, and the reason is always shown in text (for example "Escolha um serviço para continuar").

### Cards (services, staff)
Deep Paper, 2px radius, 24px padding, no border and no shadow. Service cards carry a name, duration and a placeholder price marked "preço de exemplo". Staff cards lead with a large placeholder image and a serif-italic first name.

### Inputs / Fields (wizard)
Sunken white field, 44px tall, a visible label above (never placeholder-only), 16px text so iOS does not zoom. Error: the field gets a 2px Error border plus an icon and a message below ("Informe um celular válido"). Radio rows for services are full-width, 44px minimum, with the whole row clickable.

### Navigation
A 72px paper bar with the wordmark on the left, five labels (Serviços, Equipe, Galeria, Contato, Agendar) and the pill. It sits over the hero without a background at first and gains a paper background after 80px of scroll. When the page is in an ink chapter, the bar switches to paper text on transparent. Active page: an underline that is 2px thick.

### Footer
An ink chapter with the contact block, hours, map link and a giant wordmark that fills the width. A permanent line states that the site is a portfolio demo and that bookings are simulated.

### Signature: The Installer Wizard
A System Gray dialog with a title bar (step name and "Passo 1 de 4"), a 120px dithered coral-ink-paper banner on the left, a ten-block progress bar below the step title, the step content, and a bottom row with Back and Next. Next is disabled until the step is valid, and Back keeps entered values. The confirmation step ends in a "Concluir" default button and then a confirmation dialog with simulated email and a calendar file.

### Signature: The Strand Lines
Five to nine long parallel curves in 1.5px strokes (Hairline on paper, 20% paper on ink), drawn in as the chapter enters and drifting slowly at 0.9× scroll speed. They are the only background decoration.

### Admin (demo)
The same dialog chrome with a permanent "DEMO – sem login, dados guardados só neste navegador" strip, a table of stored bookings with square, bevelled column headers, and a "Limpar reservas" button. Because it is an operating view, nothing animates here.

## Do's and Don'ts

### Do:
- **Do** keep the reel and the desk visibly separate: cinematic and asymmetric outside, square and still inside the wizard.
- **Do** use coral as fill only, with ink text, and Brick Link for coral-colored text.
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

- Body text contrast is at least 4.5:1 and large text at least 3:1; all pairs in Colors were measured. Coral is never text on paper.
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
Shown on the first home visit per session only (`sessionStorage`), never on later pages. A full-screen Darkroom Ink curtain holds a ten-block progress bar, the same shape as the wizard's, filling in discrete steps, with a rolling three-digit counter (000 to 100) in Archivo. Maximum duration 1.2s, shorter if the page is ready sooner. The curtain exits upward with `clip-path: inset(0 0 100% 0)` over 700ms `--ease-in-out`. The hero is fully rendered beneath it, so the loader never delays the largest paint, and any key press or click skips it.

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
7. **Agendar** (coral band, then ink footer): an oversized "Agendar" line leads into the wizard.

### Pinned sections
Two only: the services track (desktop only, pinned for the length of the cards, `scrub: 1`) and the before/after comparison (pinned for about 100vh). Below 768px both are plain vertical stacks. Pins use `pin: true` with `anticipatePin`, and are removed under `prefers-reduced-motion`.

### Text reveals
- **Line mask reveal** on headlines when they enter (once): lines slide up from `overflow: clip`, 800ms ease-out, 70ms stagger.
- **Word scrub** on the manifesto (opacity 0.2 to 1 per word, scrubbed).
- **Highlighter wipe:** a coral bar sweeps across a key word with `clip-path` (400ms) before the word's colour flips to ink. At most one per chapter.
- Text is real DOM text split by SplitText with `aria-label` preserved on the parent; the split is reverted after the animation.

### Parallax
Media frames use `overflow: clip` and the image inside moves ±8% of the frame height against the scroll (halved on phones). The collage uses three speed tiers (0.85, 1, 1.15). Strand lines drift at 0.9×. Transform only; no parallax on text.

### Cursor effects (fine pointers only: `@media (hover: hover) and (pointer: fine)`)
A 12px ink dot with `mix-blend-mode: difference` follows the pointer through a GSAP `quickTo` spring (duration 0.35). Over media it grows to a 72px coral circle labelled "Ver"; over CTAs it hides and the CTA gets a magnetic pull (maximum 8px, 250ms return). The cursor is disabled over text inputs, inside dialogs, and on `/agendar` and `/admin`. The system cursor is always left visible.

### Hover states
Wrap every hover animation in `@media (hover: hover) and (pointer: fine)`. Links: underline draws left to right in 220ms ease-out and retracts toward the opposite side. Cards: the image scales to 1.04 over 600ms ease-out. Buttons: ink fill sweep (240ms) and `scale(0.97)` on press (140ms). Nothing keyboard-initiated animates.

### Page transitions
Astro `<ClientRouter />` with a custom animation: the outgoing page fades and rises 12px in 180ms; the incoming page is revealed by a coral curtain that wipes away with `clip-path` over 450ms ease-in-out. A shared `view-transition-name` links a service name on the services page to the wizard's first step. Navigation into `/agendar` and `/admin` is a plain 150ms cross-fade because those are working screens.

### Wizard motion (calm)
- Step change: content slides 12px and fades, 200ms ease-out (Back reverses direction). Skipped for keyboard-initiated step changes: the content swaps instantly and focus moves to the step heading.
- Progress bar: each block fills in 150ms with a 40ms stagger.
- Confirmation: a 600ms ten-block "Instalando…" bar, then the confirmation dialog appears with `scale(0.97)` to 1 and opacity, 200ms, from the centre.

### Reduced motion
Under `prefers-reduced-motion: reduce`: no loader, no Lenis, no pinning, no parallax, no cursor effects; the strand lines are drawn statically; text reveals become 150ms opacity fades; the page transition becomes a 150ms cross-fade; and the wizard step change is instant. Information is never carried by motion alone.
