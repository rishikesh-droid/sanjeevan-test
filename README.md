# Sanjeevan PGI — Website

Modern, fast, static website for the **Sanjeevan Medical Foundation Post Graduate
Institute (Sanjeevan PGI)**, Miraj — a postgraduate ENT institute established in 1984.

Built with **Astro + TypeScript + Tailwind CSS v4**, content in **Astro Content
Collections (MDX/JSON)**, editable via **Keystatic** (optional Git-based CMS). Ships as
pure static files for KnownHost static hosting — no database, no server runtime.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/  (static, deploy-ready)
npm run preview    # serve the built dist/ locally
```

Requires Node 18.20+ / 20.3+ / 22+.

---

## Project structure

```
src/
  config/site.ts          ← SINGLE SOURCE OF TRUTH: name, contacts, nav, SEO
  styles/global.css       ← design tokens (brand colours, fonts) + Tailwind
  styles/fonts.css        ← self-hosted Inter + Fraunces @font-face
  content.config.ts       ← content collection schemas
  content/                ← the editable content (MDX + JSON)
    faculty/  programmes/  notices/  recognitions/  students/  galleries/  pages/
  assets/                 ← images processed/optimised by Astro (faculty, gallery, hero)
  components/             ← Header, Footer, FacultyCard, Lightbox, EnquiryForm, …
  layouts/BaseLayout.astro
  pages/                  ← routes (index, about, admissions, gallery, notices, …)
  lib/                    ← image resolvers + SEO/JSON-LD helpers
public/
  brand/                  ← logo + favicon
  documents/              ← recognition & affiliation PDFs, seat-matrix scan
  fonts/                  ← self-hosted woff2
  .htaccess  _redirects  robots.txt
keystatic.config.ts       ← CMS schema (opt-in)
```

---

## Branding

The **entire theme is driven from two files** — never hardcode colours elsewhere:

- **`src/config/site.ts`** — institute name, taglines, address, phones, email,
  coordinators, navigation, socials.
- **`src/styles/global.css`** — the `@theme` block: brand palette (navy `brand-*` +
  logo red `accent-*`), fonts, radii, shadows.

The palette is a deep academic **navy** (primary, matching the old site's dominant
`#071041`) with the **institute logo's red** as the accent for calls-to-action — clean,
credible, medical-academic. See `migration-report.md` for the colour rationale and the
one item flagged for sign-off.

Fonts (**Inter** for UI, **Fraunces** for display headings) are **self-hosted** in
`public/fonts/` — zero external requests, no Google Fonts calls.

---

## Editing content

All content lives in `src/content/` as plain MDX/JSON files. Two ways to edit:

### A. Directly (developers)
Edit the MDX/JSON files. Examples:
- **Seat matrix & fees** → `src/pages/admissions/index.astro` (top of the file — clearly
  marked, editable arrays).
- **Faculty** → `src/content/faculty/*.json` (add a file; drop the photo in
  `src/assets/faculty/` and set `photo:` to the filename).
- **Notices** → add an MDX file in `src/content/notices/` (set `date`, `category`,
  optional `pdf` under `/documents`, `pinned: true` to feature).
- **Recognitions / Students / Galleries** → JSON in the matching folder.

### B. Keystatic CMS (non-technical staff) — opt-in
```bash
ENABLE_KEYSTATIC=true npm run dev
# then open http://localhost:4321/keystatic
```
Edit through a friendly UI; changes save straight to the content files. Commit to Git and
rebuild. The production site stays 100% static — **nothing Keystatic-related ships to
production**.

To let staff edit online via GitHub (no local setup), change `storage` in
`keystatic.config.ts` to `{ kind: 'github', repo: 'owner/repo' }` and follow
<https://keystatic.com/docs/github-mode>.

**To disable Keystatic entirely** (Webster manages content): just never set
`ENABLE_KEYSTATIC` — the default `npm run build` already excludes it. You may also delete
`keystatic.config.ts` and the `@keystatic/*`, `@astrojs/react`, `@astrojs/node`, `react*`
dev-dependencies.

---

## Connecting the enquiry form

The **Admission Enquiry** form (`src/components/EnquiryForm.astro`) is client-validated
and, by default, opens the visitor's email app pre-filled (`mailto:`) so it works on pure
static hosting with **zero configuration**.

To receive submissions automatically, set a POST endpoint on the form element:

```html
<!-- src/components/EnquiryForm.astro -->
<form id="enquiry-form" ... data-endpoint="https://formspree.io/f/XXXX">
```

Any service returning `200` works — **Formspree**, **Web3Forms**, a KnownHost mail
script, or a serverless function. For a **WhatsApp** handoff instead, point the submit
button at `https://wa.me/<number>?text=…`. A honeypot field blocks basic spam.

---

## SEO

- Per-page `<title>`, meta description, canonical, Open Graph — via `BaseLayout`.
- **JSON-LD**: `EducationalOrganization` / `CollegeOrUniversity` sitewide, plus
  `BreadcrumbList` and `Course` on relevant pages (`src/lib/seo.ts`).
- `@astrojs/sitemap` generates `sitemap-index.xml`; `robots.txt` points to it.
- **301 redirects** from every old WordPress URL are in `public/.htaccess` (Apache /
  KnownHost) and mirrored in `public/_redirects`.

---

## Deployment (KnownHost static)

```bash
npm run build
```
Upload the **contents of `dist/`** to the web root (e.g. `public_html/`). `.htaccess` is
included for HTTPS + non-www + 301 redirects + long-lived asset caching. See
`DEPLOY-CHECKLIST.md`.
