# Migration Report — sanjeevanpgi.com → Astro

**Source:** `http://sanjeevanpgi.com/` (WordPress) · **Date:** 2026-08-28
**Target:** Astro + TypeScript + Tailwind CSS static site
**Method:** Read-only. Content pulled via the WordPress REST API
(`/wp-json/wp/v2/`), the sitemap, and rendered pages. **The live site was never
modified.**

---

## 1. What was migrated

### Pages (13 WP pages → new IA)
Every WordPress page's content was captured and re-homed into a cleaner information
architecture:

| Old WordPress URL | New URL | Notes |
| --- | --- | --- |
| `/` (home) | `/` | Rebuilt hero + sections (old Smart Slider markup discarded, content kept) |
| `/about-us/` | `/about` | Page was 404 on the live site; About rebuilt from home + history facts |
| `/ent-pg-admission-process/` | `/admissions/ms-ent` | Seat matrix table preserved exactly |
| `/fellowship-admission-process/` | `/admissions/fellowship` | Courses, seats, fees, eligibility preserved |
| `/ent-pg-teaching-staff/` | `/teaching-staff` | Merged with fellowship staff, grouped |
| `/fellowship-teaching-staff/` | `/teaching-staff` | — |
| `/ent-pg-institute-students/` | `/students` | All batches 2022–26 preserved |
| `/fellowship-students/` | `/students` | — |
| `/ent-pg-institute-gallery/` | `/gallery/campus-b` | Consolidated |
| `/fellowship-gallery/` | `/gallery/campus-a` | Consolidated |
| `/campus-a-general-department/` | `/gallery/campus-a` | Primary Campus A source (47 imgs) |
| `/campus-b-ent/` | `/gallery/campus-b` | Primary Campus B source (23 imgs) |
| `/contact-entpg/` | `/contact` | Both contacts merged onto one page |
| `/contact-fellowship/` | `/contact` | — |

All old URLs **301-redirect** to their new homes (`public/.htaccess` + `_redirects`).

> **Second-pass deep extraction.** Several substantial blocks live inside the old
> homepage's Smart Slider / sections (not in the WordPress REST bodies) and were pulled
> from the rendered page in a second pass: the **full institute history**, the
> **quota-wise seat matrix**, the **complete FRA fee structure + payment mode**, and every
> **recognition reference number**. These are now on the About and Admissions pages.

### Structured data preserved verbatim
- **Seat matrix (2025–26):** MS (ENT) — 3 sanctioned / 3 recognised (NMC/MCI) / 3 to fill,
  split **1 Management + 1 State-NEET-PG OBC + 1 State-NEET-PG Open**.
- **Fee structure (FRA, A.Y. 2025–26):** Tuition ₹9,57,500 · Development Nil · Management
  ₹28,72,500 · NRI ₹38,30,000 · Against-NRI ₹38,30,000 · Caution Nil; payment by DD/Cheque
  to "Sanjeevan Medical Foundation", payable at Miraj.
- **History:** NBE recognition since 1984; Shivaji University affiliation 1990–91 (MS 1 +
  DLO 2/yr); MCI recognition 2010 (No. MCI-92[22]/2010-Med./33731) with retrospective
  effect from 1991–92; 2019 renewal; DLO→MS conversion in 2020–21 raising intake 1→3.
- **Fellowship:** Onco-Pathology (1 seat) & Head & Neck Cancer Surgery (2 seats), 1 year
  each, ₹1,00,000 total fee; eligibility and MUHS centralised-admission note.
- **Faculty (13):** 5 ENT (with registration nos., experience, employment type) + 8
  fellowship, each with qualifications, designation and photo.
- **Students:** MS (ENT) batches 2022–23 → 2025–26 and current fellowship trainees.
- **Recognitions & affiliations:** NMC/MCI, NBE, MUHS Nashik, MoHFW (Govt. of India),
  Govt. of Maharashtra, Shivaji University — with dated reference numbers.
- **Contacts:** ENT institute + fellowship cancer-hospital addresses, phones, emails,
  named coordinators with cell numbers.

### Assets
- **212 media items** downloaded from the WP library.
- **13 faculty photos** matched to individuals (parsed from each staff page's markup) and
  optimised.
- **70 gallery images** (Campus A 47 + Campus B 23) organised with human-readable
  captions derived from the original filenames.
- **Official PDFs** → `public/documents/`: NMC/MCI recognition, two MoHFW letters, Govt.
  of Maharashtra resolution, the latest **MUHS Continuation/Extension of Affiliation
  (A.Y. 2025–26)**, and the complete **MUHS Mandate** — LIC Part-II reports for
  **2022–23, 2023–24, 2024–25, 2025–26, 2026–27** — plus the seat-matrix scan.
- **"MUHS Mandate" documents section** added to the About page; **PG seats + fees
  snapshot** added to the homepage (both mirror the old site's homepage sections).
- **Logo + favicon** extracted from the source site.

---

## 2. What was re-optimised / changed (improvements)

- **Performance:** all raster images converted to responsive **WebP/AVIF** at correct
  sizes with lazy-loading; e.g. the hospital-building hero dropped from ~200 KB to ~44 KB.
  The site ships **no external JavaScript files** (all interactive scripts inlined) — the
  homepage is effectively zero-JS.
- **Self-hosted fonts** (Inter + Fraunces, 356 KB total) — the old site loaded remote
  fonts and heavy plugin CSS; there are now **no third-party requests**.
- **Accessibility:** semantic landmarks, skip-link, keyboard-operable menu/lightbox, alt
  text on every image, visible focus states, `prefers-reduced-motion` respected.
- **SEO:** per-page titles/descriptions, canonical URLs, Open Graph, JSON-LD
  (`EducationalOrganization`/`CollegeOrUniversity`, `BreadcrumbList`, `Course`),
  auto-generated sitemap, and 301 redirects so existing ranking is retained.
- **Modern IA & UX:** responsive mega-menu + mobile drawer, admission-focused hero and
  CTAs, a real seat-matrix/fees layout, a filterable notices list, and a gallery lightbox
  — a clear step up in credibility over the WordPress theme.
- **Editability:** fees, seats, notices, faculty and galleries are all structured content,
  editable directly or via Keystatic — no developer needed for routine updates.
- **Motion:** Lenis smooth-scroll (named in the brief) was trialled but **removed** — it
  hijacked the scroll and hung the page in testing, a real mobile/robustness risk. Native
  smooth scroll + lightweight, fail-safe CSS scroll-reveals are used instead, honouring
  the "tasteful motion / minimal JS" requirement.

---

## 3. ⚠️ Items needing client sign-off

1. **Brand colour direction.** The build brief specified "blue & white", and the old
   site's dominant chrome colour is indeed a deep navy (`#071041`) — so **navy is the
   primary**. However, the **institute logo is red + grey** (a red medical cross with a
   grey Ganesha). We used the **logo's red as the accent** (CTAs/highlights) to stay true
   to the mark. Please confirm the navy-primary + red-accent direction, or tell us if you'd
   prefer red as the primary.
2. **Fees — now carried over; confirm the year.** The full **FRA fee structure** was
   found on the old site's homepage and migrated verbatim: Tuition ₹9,57,500, Management
   ₹28,72,500, NRI/Against-NRI ₹38,30,000, Development & Caution — Nil; plus the payment
   mode (DD/Cheque, beneficiary "Sanjeevan Medical Foundation", payable at Miraj). These
   are labelled **A.Y. 2025–26** on the source — please confirm they are current for the
   upcoming cycle (or supply 2026–27 figures).
3. **Seat matrix year.** The old page was headed "2025–26". Confirm the seat matrix is
   current for the upcoming cycle, or provide updated numbers.
4. **Notices dates.** Notice dates were inferred from the source documents where an
   explicit publish date wasn't available. Please verify (especially the admissions
   notice) before launch.
5. **Map location.** The Google Maps embed and JSON-LD geo-coordinates for Station Road,
   Miraj are approximate — please confirm the exact pin.
6. **Enquiry form delivery.** The form currently uses a `mailto:` fallback. Decide the
   real delivery method (Formspree / Web3Forms / KnownHost mail script / WhatsApp) so we
   can wire `data-endpoint` — see README → "Connecting the enquiry form".
7. **Faculty photos & details.** A couple of photos were low-resolution on the source
   site (e.g. senior residents). Higher-res portraits and any missing
   qualifications/registration numbers would improve the Teaching Staff page.
8. **Social links.** None were found on the old site; `site.ts → socials` is empty. Add
   official handles if any exist.
9. **Outdated content review.** Please confirm the current-year student roll, faculty list
   and any new notices before go-live.
10. **Large PDF.** The MUHS LIC Part-II 2025–26 report is ~44 MB (as published on the old
    site), the bulk of the ~70 MB `public/documents/` folder. It's included as-is; if
    faster loads are preferred we can compress/optimise it or host large PDFs separately.

---

## 4. Not migrated (intentional)

- The old **Smart Slider / plugin markup** and inline theme CSS (rebuilt natively).
- Resized WordPress thumbnail duplicates (Astro regenerates all sizes).
- Empty/placeholder pages and the broken `/about-us` route (rebuilt as `/about`).
