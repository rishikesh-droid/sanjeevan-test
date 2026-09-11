# Deployment — KnownHost via FTP (static Astro + GitHub Actions)

Standard deploy method for our Astro sites. GitHub Actions builds the static site in
CI and uploads `dist/` to the host over FTP. No Node.js runs on the server — it only
serves static files (Apache / LiteSpeed).

- **Workflow:** [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
- **Trigger:** every push to `main`, or **Actions** tab → *Build & Deploy (FTP)* → *Run workflow*.
- **Incremental:** the action keeps a `.ftp-deploy-sync-state.json` on the server and only
  transfers changed files. First deploy uploads everything; later deploys are fast.

The workflow is identical for every site — only the three secrets change.

---

## 1. GitHub secrets (3, per repo)

Repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret         | What it is                                          | Example              |
|----------------|-----------------------------------------------------|----------------------|
| `FTP_SERVER`   | FTP host — the domain or KnownHost hostname/IP       | `example.com`        |
| `FTP_USERNAME` | FTP account username (usually full `user@domain`)    | `deploy@example.com` |
| `FTP_PASSWORD` | FTP account password                                 | `••••••••`           |

---

## 2. One-time server setup (the key requirement)

The workflow uploads to `server-dir: ./`, so **the FTP account must be rooted at the
site's document root.** Create a dedicated FTP account for it:

**cPanel → FTP Accounts → Create:**
- **Username:** e.g. `deploy` (becomes `deploy@yourdomain.com`).
- **Directory:** the site's docroot — `public_html` for the primary domain, or the
  addon/subdomain folder (e.g. `public_html/subsite`). **Delete the auto-appended
  username** so the account lands exactly in the docroot, not a subfolder.
- **Quota:** Unlimited.

Put those credentials into the three secrets above.

> Why a dedicated account: the main cPanel/SSH user's FTP home is usually `/home/<user>`,
> not the docroot. A per-site account rooted at the docroot lets `server-dir: ./` stay
> identical for every project.

---

## 3. Repo requirements

- `astro.config.mjs`: `output: 'static'`, `site` set to the production domain, and (if the
  host serves directory URLs) `trailingSlash: 'always'` + `build.format: 'directory'`.
- Build must produce a static `dist/` (`npm run build`).
- If the site ships a `.htaccess` (redirects, trailing-slash, cache headers), keep it in
  `public/` so it lands in `dist/`. The FTP action uploads dotfiles — some desktop FTP
  clients hide them, the action does not.

---

## 4. Deploy

- **Automatic:** push to `main` → Actions builds and uploads.
- **Manual:** Actions tab → *Build & Deploy (FTP)* → **Run workflow**.

**Manual fallback (from a PC):**
```bash
npm ci && npm run build
# Upload the CONTENTS of dist/ to the docroot with any FTP client (FileZilla),
# preserving folders and dotfiles (.htaccess).
```

---

## 5. Post-deploy checks

- [ ] `https://<domain>/` loads; assets (CSS/JS/images) are not 404ing.
- [ ] Directory URLs resolve with trailing slashes if the site uses them (`/about/`).
- [ ] `.htaccess` is live (a known legacy redirect 301s correctly), and `dist/.htaccess`
      actually uploaded.
- [ ] `/sitemap-index.xml` and `/robots.txt` load.
- [ ] HTTPS is forced and `www` ↔ apex behaves as intended (host/DNS level).
- [ ] Custom 404 renders (if `ErrorDocument` is set in `.htaccess`).

---

## 6. Reuse checklist for a new site

1. Copy `.github/workflows/deploy.yml` + this file into the repo.
2. Create the dedicated FTP account rooted at that site's docroot.
3. Add the three secrets (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`).
4. Confirm the repo requirements in §3.
5. Push to `main` (or run the workflow manually) and walk the §5 checks.

Nothing else changes between sites.
