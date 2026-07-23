# Deploy runbook (Phase E stub)

> Stub for Cloudflare OpenNext + R2 + webhooks. Fill real `*.workers.dev` / custom-domain URLs after Wave 3–4 cutover. Secrets are never committed.

## Branch → environment

| Git branch | Cloudflare env | Worker name (Track A) | Deploy command |
| --- | --- | --- | --- |
| `staging` | staging (`wrangler --env staging`) | `kamiyon-studio-website-staging` | `pnpm deploy:staging` |
| `main` | production (default) | `kamiyon-studio-website` | `pnpm deploy:prod` |
| `test` (feature) | — | — | no auto-deploy; merge → `staging` / `main` |

CI: [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) on push to `staging` / `main` (also `workflow_dispatch`).

### GitHub secrets (required for Actions)

| Secret | Purpose |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Wrangler / OpenNext deploy auth |
| `CLOUDFLARE_ACCOUNT_ID` | Target Cloudflare account |

### GitHub Actions variables (build-time `NEXT_PUBLIC_*`)

Set per environment as documented in the workflow (e.g. `NEXT_PUBLIC_SITE_URL_STAGING`, `NEXT_PUBLIC_SITE_URL_PRODUCTION`, R2 public base URLs, Sanity project/dataset, CF Web Analytics tokens).

Worker **runtime** secrets (`SANITY_REVALIDATE_SECRET`, `MEDIA_UPLOAD_SECRET`, `SANITY_API_READ_TOKEN`, …) are configured in the Cloudflare dashboard / `wrangler secret put`, not in this repo.

---

## Environment matrix

| Variable | Local | Staging | Production |
| --- | --- | --- | --- |
| `APP_ENV` | `local` | `staging` | `production` |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://kamiyon-studio-website-staging.limosnerosherwin.workers.dev` | `https://kamiyonstudio.com` |
| `NEXT_PUBLIC_R2_PUBLIC_BASE_URL` | optional / staging media | `https://media-staging.kamiyonstudio.com` | `https://media.kamiyonstudio.com` |
| `MEDIA_UPLOAD_SECRET` | `.env.local` / `.dev.vars` | Worker secret | Worker secret |
| `SANITY_REVALIDATE_SECRET` | `.env.local` / `.dev.vars` | Worker secret | Worker secret |
| `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` | optional | staging token | prod token |
| `CLOUDFLARE_ACCOUNT_ID` | optional local Wrangler | GitHub secret | GitHub secret |

Also document Sanity: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, optional `SANITY_API_READ_TOKEN`.

---

## Media domains (R2 public CDN)

| Env | Custom domain | R2 bucket (Track F) |
| --- | --- | --- |
| Staging | `media-staging.kamiyonstudio.com` | `kamiyon-media-staging` |
| Production | `media.kamiyonstudio.com` | `kamiyon-media-prod` |

Incremental cache buckets (OpenNext): `kamiyon-next-cache-staging` / `kamiyon-next-cache-prod`.

These names are wired in [`wrangler.jsonc`](../wrangler.jsonc). Track F provisioned all four buckets; media custom domains respond over HTTPS (empty `/` → 404 is expected).

---

## Webhook URLs (placeholders)

Configure in Sanity → API → Webhooks after each host is live.

| Env | Revalidate endpoint | Auth |
| --- | --- | --- |
| Staging | `https://kamiyon-studio-website-staging.limosnerosherwin.workers.dev/api/revalidate` | Header / query secret = `SANITY_REVALIDATE_SECRET` |
| Production | `https://kamiyonstudio.com/api/revalidate` *(after DNS cutover)* | same |

Until custom domains are attached, use the staging/prod `*.workers.dev` host printed by Wrangler deploy.

Payload: Sanity document mutation → Track C `POST /api/revalidate` → `revalidateTag`.

---

## Manual deploy (escape hatch)

```bash
pnpm deploy:staging   # OpenNext build + wrangler deploy --env staging
pnpm deploy:prod      # OpenNext build + production deploy
```

Requires Wrangler auth (`wrangler login` or `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`).

### Local OpenNext build notes (Wave 2–3)

- `pnpm exec opennextjs-cloudflare build` runs `next build` then bundles for Workers.
- On **Windows without Developer Mode** (no `SeCreateSymbolicLinkPrivilege`), bundling fails with `EPERM: symlink` while recreating pnpm links in `.open-next/`. Workarounds: enable [Windows Developer Mode](https://learn.microsoft.com/en-us/windows/apps/get-started/enable-your-device-for-development), use WSL/Linux CI, or a local junction/copy fallback in `@opennextjs/aws` `copyTracedFiles` (not committed).
- Stop any lingering `workerd` (e.g. prior `preview`) before rebuild — it locks `.open-next/assets` and causes `EPERM` on `rmSync`.
- OpenNext warns Windows is not fully supported; Linux CI remains the durable path.

### Wave 3 staging deploy status (2026-07-24)

- OpenNext **build succeeded** on Windows after junction workaround.
- Cache populate to `kamiyon-next-cache-staging` succeeded.
- **First deploy blocked:** Worker upload ~**5.5 MiB gzip** (embedded Sanity Studio) exceeded Workers **Free 3 MiB**.
- **Mitigation (ADR-007):** Externalize Studio via `pnpm sanity:deploy`. Worker `/studio` is a **config redirect** to hosted Studio (no embedded `NextStudio`).
- **Staging live (Free):** `https://kamiyon-studio-website-staging.limosnerosherwin.workers.dev`
  - Upload size after externalize: ~**2.17 MiB gzip** (under 3 MiB)
  - Secrets present: `MEDIA_UPLOAD_SECRET`, `SANITY_REVALIDATE_SECRET`
  - Runtime workaround: `NEXT_PRIVATE_MINIMAL_MODE=1` (avoids Workers `middleware-manifest` dynamic require 500s)
- Prefer Free tier; do **not** enable Workers Paid solely for Studio size.

### Hosted Sanity Studio

```bash
# One-time / when schemas change — requires Sanity login (`pnpm sanity login` if needed)
pnpm sanity:deploy
# Local Studio without the Worker:
pnpm sanity:dev
```

| Item | Value |
| --- | --- |
| Hosted URL | `https://kamiyon.sanity.studio` (override with `SANITY_STUDIO_HOSTNAME` / `NEXT_PUBLIC_SANITY_STUDIO_URL`) |
| Worker path | `/studio` → 307 redirect to hosted URL (`next.config` redirects) |
| Sanity CORS | Add Studio origin + staging/prod site origins in [manage.sanity.io](https://www.sanity.io/manage) → API → CORS origins |
| Upload API | Studio posts to `{SANITY_STUDIO_API_ORIGIN}/api/media/upload` (Worker CORS allowlists Studio origin) |
| Revalidate webhook | `https://kamiyon-studio-website-staging.limosnerosherwin.workers.dev/api/revalidate` (header/query = `SANITY_REVALIDATE_SECRET`) |

For hosted Studio → R2 uploads, redeploy Studio with build-time env:

```bash
# PowerShell example
$env:SANITY_STUDIO_API_ORIGIN = "https://kamiyon-studio-website-staging.limosnerosherwin.workers.dev"
$env:SANITY_STUDIO_MEDIA_UPLOAD_SECRET = "<same as MEDIA_UPLOAD_SECRET>"
pnpm sanity:deploy -y
```

---

## Cutover checklist (Wave 4 — fill in)

- [x] Staging deploy on Free tier (`*.workers.dev`) — pages + `/studio` redirect + API auth smoke
- [ ] Point Sanity webhook at staging revalidate URL
- [ ] Redeploy Studio with `SANITY_STUDIO_API_ORIGIN` for R2 uploads; smoke upload
- [ ] Prod Worker smoke on `*.workers.dev`
- [ ] Attach `kamiyonstudio.com` + `www`
- [ ] Point Sanity CORS + webhook URLs at production
- [ ] Set prod `NEXT_PUBLIC_SITE_URL=https://kamiyonstudio.com` at **build** time (public vars are inlined)
- [ ] Pause Vercel (do not delete yet)
