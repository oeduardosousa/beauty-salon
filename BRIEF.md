# Beauty Salon Portfolio Brief

## Business

A fictional beauty salon website, built as a portfolio piece. The salon name is a placeholder. Nothing here is a real business, and all prices, staff, and reviews are invented.

## Audience

Primary: potential employers and clients who review the developer's work. They judge how complete and well built a salon website is.
Secondary: prospective salon clients, so the demo should feel like a real site a visitor could use.

## Goals

- Show every common salon feature working together, end to end.
- Show front-end and booking-flow engineering quality.
- Keep the project free to host and simple to maintain.

## Content

- Home: hero, services preview, staff preview, and a booking entry point.
- Services and prices: categories, durations, and prices (placeholder).
- Staff: stylist profiles with specialties and availability (placeholder).
- Booking: a four-step wizard (service, stylist, date and time, details).
- Gallery and reviews: before and after work and testimonials (placeholder).
- Contact, hours, and map: address, opening hours, map link, and a contact form.
- Simulated admin view: lists the temporarily stored bookings. Demo only. (Status: shipped as the professional view at `/profissional`, which shows sample appointments plus a "Reservas do site" list of the bookings made in `/agendar` in the same tab. They are also listed in `/conta` once a demo account exists.)
- Contact form: shipped in the home page footer as a validated, simulated form. Nothing is sent or stored.

Language: Portuguese only.

## Features

- Booking wizard with validated steps. The details step must be complete before confirmation.
- Temporary storage of bookings in the browser. Bookings are simulated and are not saved permanently.
- Confirmation after booking, with a simulated email confirmation and an add-to-calendar file.
- Simulated admin view for the stored bookings. No login.
- Responsive layout that works at phone width and on desktop.

Out of scope: payments, user accounts, a real database, SMS reminders, and any outside API.

## Design direction

Cinematic blush-and-plum site with a centered four-step booking card. The system is recorded in `DESIGN.md`; the original surface brief (an installer-style wizard that was later redesigned) is kept under `.impeccable/surfaces/`.

## Stack

- Astro with TypeScript, static output.
- Small client-side scripts only where interaction needs them (the booking wizard and the admin view).
- Temporary storage in the browser (localStorage or sessionStorage) to simulate bookings.
- No database, no Supabase, no backend, no authentication.

Why this stack: most of the site is content that should be static and fast. Astro ships little JavaScript, so the only interactive parts are the booking wizard and the admin view. Simulating state in the browser avoids any database, keeps cost at zero, and removes secrets entirely from the project. Astro's static output is also the simplest thing to deploy on a free host.

## Deployment

- Cloudflare Pages free tier, deployed from the git repository.
- Free default subdomain (`*.pages.dev`) for now. A custom domain can be added later.
- Production changes need the owner's approval first.

## Acceptance criteria

- Every page in the content list renders and links to the others.
- The booking wizard completes all four steps. Next is disabled until a step is valid, and Back returns to the previous step with its values kept.
- A completed booking shows a confirmation, stores the booking temporarily, and shows it in the admin view.
- The admin view is clearly labeled as a demo and has no login.
- Layout works at 390px wide and at 1440px wide with no horizontal scrolling.
- Body text contrast meets WCAG AA (4.5:1). Interactive controls have visible keyboard focus.
- No secrets, API keys, or `.env` values in the repository or the browser bundle.
- The Lighthouse performance score is at least 90 on the home page.

## Assumptions

- The salon name, prices, staff, and reviews are placeholders that the owner can replace later.
- Free hosting limits are enough for a portfolio.
- The owner reads Portuguese comfortably and will review the copy.

## Open questions

- The salon's real name and whether it should use a logo.
- Whether the owner wants a custom domain before launch.
- Whether the simulated email and calendar file should be real downloads or preview-only.
