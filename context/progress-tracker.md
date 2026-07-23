# Progress Tracker

Update this file after every meaningful implementation change.

## Archival process

When a task/phase is marked complete:

1. Create `context/completed/YYYY-MM-DD-<slug>.md` with the finished context.
2. Add a row/link in [`completed/README.md`](./completed/README.md).
3. Remove bulky finished blocks from this file; leave at most a one-line pointer.
4. Do not delete historical detail — relocate it.

**Historical completed work:** [`completed/README.md`](./completed/README.md)

---

## Current Phase

**Phase E nearly done (2026-07-24):** Staging Worker deployed; DNS cutover (Wave 4) pending your smoke check.

**Staging URL:** https://kamiyon-studio-website-staging.limosnerosherwin.workers.dev  
**Source of truth:** [`WEBSITE-ESSENTIAL-CONTEXT.md`](./WEBSITE-ESSENTIAL-CONTEXT.md) · [`DECISIONS.md`](./DECISIONS.md) · [`deploy-runbook.md`](./deploy-runbook.md)

---

## Current Goal

Smoke staging (nav, pages, `/studio` redirect, media/webhook) → Wave 4 apex DNS cutover → Phase F.

---

## Recently completed (2026-07-24)

- **Kinetic nav (Track G)** — `SterlingGateKineticNavigation` replaces CardNav in `SiteHeader` (Kamiyon tokens + full primary nav). ADR-008.
- **OpenNext staging deploy** — Worker gzip ~2.2 MiB (under Free 3 MiB); R2 bindings + staging vars/secrets set.
- **Build fixes** — `next build --webpack` + `*.ttf.bin` loader; OG routes use node runtime for OpenNext.

---

## Completed earlier

- Phase C CMS swap — [`completed/2026-07-23-phase-c-sanity-cms-swap.md`](./completed/2026-07-23-phase-c-sanity-cms-swap.md)
- Cinematic footer — [`completed/2026-07-23-cinematic-footer.md`](./completed/2026-07-23-cinematic-footer.md)
- Phase B Studio schemas; ADR-005 hygiene; ADR-007 hosted Studio

---

## Next Up (resume here)

1. **You:** Open staging URL — Menu open/close, About/Services/Contact links, Escape; `/studio` → hosted Studio
2. **Operator:** `pnpm sanity:deploy` if Studio host not live; Sanity CORS for `*.sanity.studio` + staging Worker origin; wire webhook to staging `/api/revalidate`
3. **Wave 4:** Attach `kamiyonstudio.com` + `www` to prod Worker; pause Vercel
4. **Phase F:** contact+Resend (T8), blog UI (T9), expanded E2E (T15)

**Done (pointers):** see [`completed/README.md`](./completed/README.md)

---

## Open Questions

- [ ] **`/news` route** — deferred
- [ ] **Press Kit** — deferred
- [ ] **Portfolio taxonomy filters** — deferred
- [ ] **README motto conflict** — update docs README to Create. Play. Inspire.?
- [x] **R2 public CDN hostname** — `media.kamiyonstudio.com` / `media-staging.kamiyonstudio.com` (active)
- [ ] **Resend from-address / CONTACT_TO_EMAIL** — confirm production inbox

---

## Architecture Decisions (active)

See [`DECISIONS.md`](./DECISIONS.md) for locked stack and cleanup ADRs.
