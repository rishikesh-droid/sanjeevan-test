# Deployment — KnownHost via FTP (static Astro + GitHub Actions)

**Standard deploy method for all our Astro sites.** GitHub Actions builds the static
site in CI and uploads `dist/` to the host over FTP. No Node.js is needed on the
server — it only serves static files (Apache/LiteSpeed).

Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
Trigger: every push to `main`, or **Actions** tab → *Run workflow*.
Uploads are **incremental** — the action keeps a `.ftp-deploy-sync-state.json` on the
server and only transfers changed files.

---

## 1. GitHub secrets to add (only 3 — same for every site)

Repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret name    | What it is                                             | Example |
|----------------|--------------------------------------------------------|---------|
| `FTP_SERVER`   | FTP host — domain or KnownHost server hostname/IP       | `sangolkarheartcare.com` or `123.45.67.89` |
| `FTP_USERNAME` | FTP account username (usually full `user@domain`)      | `deploy@mrdigde.com` |
| `FTP_PASSWORD` | FTP account password                                    | `••••••••` |

That's it. The workflow itself never changes between sites.

---

## 2. One-time server setup (the key requirement)

The workflow uploads to `server-dir: ./`, so **the FTP account must be rooted at the
site's document root.** Create a dedicated FTP account for that:

**cPanel → FTP Accounts → Create:**
- **Log In / Username:** e.g. `deploy` (becomes `deploy@yourdomain.com`)
- **Directory:** set to the site's docroot — `public_html` for the primary domain, or the
  addon/subdomain's folder (e.g. `public_html/subsite`). **Remove the auto-appended
  username** so the account lands exactly in the docroot, not a subfolder.
- **Quota:** Unlimited

Then put those credentials into the three secrets above.

> Why a dedicated account: the main cPanel/SSH user's FTP home is usually `/home/<user>`,
> not the docroot. A per-site FTP account rooted at the docroot lets `server-dir: ./`
> stay identical for every project.

**Apache `.htaccess`:** the site ships a `.htaccess` (trailing-slash serving + legacy
301s). On shared cPanel/LiteSpeed hosting it's honored automatically. On a self-managed
Apache vhost, ensure `AllowOverride All` and `mod_rewrite`/`deflate`/`expires`/`headers`.

---

## 3. Deploy

- **Automatic:** push to `main` → Actions builds and uploads.
- **Manual:** Actions tab → *Build & Deploy (FTP)* → **Run workflow**.

### Manual fallback (from your PC)
```bash
npm ci && npm run build
# then upload the CONTENTS of dist/ to the docroot with any FTP client (FileZilla),
# preserving folders and dotfiles (.htaccess).
```

---

## 4. Post-deploy checklist

- [ ] `https://<domain>/` loads; assets not 404ing.
- [ ] Directory URLs resolve with trailing slashes (`/about/`, `/filmography/`).
- [ ] Unicode post URL works: `/2022/02/26/मोहन-राठोड-दिग्दर्शित-म/` (FTP must keep UTF-8 names).
- [ ] `.htaccess` active: `/?p=101` 301-redirects to `/filmography/`.
- [ ] `/sitemap-index.xml` and `/robots.txt` load.
- [ ] Ensure `dist/.htaccess` uploaded (some FTP clients hide dotfiles — the Action uploads them).
- [ ] Images serve as WebP; mobile has no horizontal scroll.
- [ ] HTTPS forced; `www` ↔ apex behaves as intended (host/DNS level).

---

## 5. Reuse for any Astro site

Copy `.github/workflows/deploy.yml` + this file into the repo, create the dedicated FTP
account rooted at that site's docroot, add the same three secrets. Nothing else changes.
Keep `astro.config.mjs` `site` = production domain, `trailingSlash: 'always'`,
`build.format: 'directory'`.
