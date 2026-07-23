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
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://<staging-host>` *(TBD)* | `https://kamiyonstudio.com` |
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
| Staging | `https://<STAGING_WORKER_HOST>/api/revalidate` | Header / query secret = `SANITY_REVALIDATE_SECRET` |
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
- Cache populate to `kamiyon-next-cache-staging` succeeded (80 entries).
- **Deploy blocked:** Worker upload ~**5.5 MiB gzip** (Sanity Studio in server bundle) exceeds Workers **Free 3 MiB** limit. Needs **Workers Paid** (10 MiB) — see [Workers limits](https://developers.cloudflare.com/workers/platform/limits/).
- Staging Worker `kamiyon-studio-website-staging` was **not** created; secrets/vars/smoke deferred until Paid + redeploy.
- After Paid: `pnpm deploy:staging`, then set secrets/vars and smoke `*.workers.dev`.

---

## Cutover checklist (Wave 4 — fill in)

- [ ] **Workers Paid** enabled on account `273c0d63b6dc29bb5f52c77212bf87d7`
- [ ] Staging deploy + smoke on `*.workers.dev` (pages, `/studio`, media upload, webhook)
- [ ] Prod Worker smoke on `*.workers.dev`
- [ ] Attach `kamiyonstudio.com` + `www`
- [ ] Point Sanity CORS + webhook URLs at production
- [ ] Set prod `NEXT_PUBLIC_SITE_URL=https://kamiyonstudio.com`
- [ ] Pause Vercel (do not delete yet)
