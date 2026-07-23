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

**Phase C complete (2026-07-23) → Phase E next:** OpenNext + R2 upload + webhook revalidation + CF Web Analytics.

**Source of truth:** [`WEBSITE-ESSENTIAL-CONTEXT.md`](./WEBSITE-ESSENTIAL-CONTEXT.md) · [`DECISIONS.md`](./DECISIONS.md)

---

## Current Goal

Deploy path + media + revalidation (Phase E); then Phase F surfaces (contact/Resend, blog UI, E2E).

---

## Recently completed (2026-07-23)

- **Cinematic footer** — global curtain-reveal `CinematicFooter` replaced `SiteFooter` in `PageShell`. Done — see [`completed/2026-07-23-cinematic-footer.md`](./completed/2026-07-23-cinematic-footer.md).

---

## Completed in Phase C (2026-07-23)

Done — see [`completed/2026-07-23-phase-c-sanity-cms-swap.md`](./completed/2026-07-23-phase-c-sanity-cms-swap.md).

---

## Completed in Phase B (2026-07-21)

Done — Sanity Studio `/studio` + §7 schemas. Operator still needs project ID in `.env.local` for live Studio/CMS.

---

## Completed in repo hygiene (2026-07-21)

Done — see [`DECISIONS.md`](./DECISIONS.md) ADR-005.

---

## Next Up (resume here)

1. **Operator:** Set `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`; verify `/studio` loads and CMS getters leave fallbacks when dataset is empty
2. **Phase E:** OpenNext + R2 upload + webhook revalidation + CF Web Analytics (T4/T5/T6/T14)
3. **Phase F surfaces:** contact+Resend (T8), blog UI (T9), expanded E2E (T15)
4. **Manual UX check:** scroll-reveal footer on `/` and `/contact` (desktop + mobile); keyboard tab into footer only after reveal

**Done (pointers):** see [`completed/README.md`](./completed/README.md)

---

## Open Questions

- [ ] **`/news` route** — deferred
- [ ] **Press Kit** — deferred
- [ ] **Portfolio taxonomy filters** — deferred
- [ ] **README motto conflict** — update docs README to Create. Play. Inspire.?
- [ ] **R2 public CDN hostname** — Phase E
- [ ] **Resend from-address / CONTACT_TO_EMAIL** — confirm production inbox

---

## Architecture Decisions (active)

See [`DECISIONS.md`](./DECISIONS.md) for locked stack and cleanup ADRs.
