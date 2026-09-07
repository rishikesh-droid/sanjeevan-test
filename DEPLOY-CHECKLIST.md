# Deploy Checklist — Sanjeevan PGI (KnownHost static)

## Build
- [x] `npm install` succeeds (Node 18.20+/20.3+/22+).
- [x] `npm run build` completes with **0 errors** — 19 pages generated.
- [x] `npx astro check` passes — **0 TypeScript errors**.
- [x] No external JS bundles shipped; images output as WebP/AVIF; fonts self-hosted.

## Content sign-off (see migration-report.md §3)
- [ ] Brand direction confirmed (navy primary + logo-red accent).
- [ ] MS (ENT) fee figures supplied and entered (`src/pages/admissions/index.astro`).
- [ ] Seat matrix confirmed current for the admission cycle.
- [ ] Notice dates verified.
- [ ] Faculty list, photos and student roll confirmed current.

## SEO / redirects
- [x] Per-page `<title>` + meta description present.
- [x] Canonical URLs + Open Graph tags present.
- [x] JSON-LD (`EducationalOrganization`, `BreadcrumbList`, `Course`) present.
- [x] `sitemap-index.xml` generated; `robots.txt` references it.
- [x] 301 redirects for all legacy WordPress URLs (`.htaccess` + `_redirects`).
- [ ] After upload: spot-check 3–4 old URLs (e.g. `/ent-pg-admission-process/`) 301 to the
      new pages.
- [ ] Submit `sitemap-index.xml` in Google Search Console; request re-index of key pages.

## Forms
- [ ] Decide enquiry delivery (Formspree / Web3Forms / mail script / WhatsApp) and set
      `data-endpoint` on the form (README → "Connecting the enquiry form").
- [ ] Submit a live test enquiry and confirm it is received.

## Assets / config
- [x] Logo + favicon in `public/brand/`.
- [x] 11 recognition/affiliation PDFs + seat-matrix scan in `public/documents/`.
- [ ] Confirm Google Maps pin / geo-coordinates in `src/config/site.ts`.

## Upload (KnownHost)
- [ ] `npm run build`, then upload the **contents of `dist/`** to the web root
      (`public_html/`), including the hidden `.htaccess`.
- [ ] Verify HTTPS is enforced and `www` → non-www redirect works (or adjust `.htaccess`
      if www is preferred).
- [ ] Confirm the custom **404 page** renders (`ErrorDocument` is set in `.htaccess`).

## Post-launch spot checks
- [ ] Mobile: homepage, drawer menu, admissions, gallery lightbox, contact form.
- [ ] Desktop: mega-menu dropdowns, all nav links resolve.
- [ ] Run Lighthouse — target strong Performance / SEO / Accessibility / Best-Practices.
- [ ] All PDF links open; all faculty & gallery images load.
