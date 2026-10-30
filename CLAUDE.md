# Beauty Salon Portfolio

Read BRIEF.md and PRODUCT.md before any work.

## Approved stack
- Astro with TypeScript, static output. Small client scripts only for the booking wizard and admin view.
- Bookings are simulated in temporary browser storage. No database, no Supabase, no backend, no auth, no payments.
- Hosting: Cloudflare Pages free tier on a free subdomain.

## Rules
- Use only the stack in BRIEF.md. Ask before adding a dependency or service.
- Test changes before committing. Commit each completed, verified step with a clear message.
- Never push, force-push, or commit `.env` files or secrets. Keep `.env*` in `.gitignore`; only `.env.example` templates are allowed.
- Never expose secrets in code, logs, browser bundles, or chat.
- Obtain approval before any production change.
- Use emil-design-eng for animations and interactions.
- Use Impeccable for design and UI audits.
- Treat all prices, staff, and reviews as placeholders. Never present them as real.
