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

**Phase B scaffold complete (2026-07-21) → Phase C next:** Sanity Studio at `/studio` with §7 schemas. Operator must set `NEXT_PUBLIC_SANITY_PROJECT_ID`.

**Source of truth:** [`WEBSITE-ESSENTIAL-CONTEXT.md`](./WEBSITE-ESSENTIAL-CONTEXT.md) · [`DECISIONS.md`](./DECISIONS.md)

---

## Current Goal

Swap `lib/cms` to Sanity + GROQ + R2 refs (Phase C); preserve public API + typed fallbacks.

---

## Completed in Phase B (2026-07-21)

- `sanity`, `next-sanity`, `@sanity/vision` installed
- `sanity.config.ts`, `sanity.cli.ts`, desk structure, env helpers
- Full §7 schemas: singletons, collections, blog (author/category/tag/post), `r2Asset` object, `mediaAsset` doc
- Embedded Studio at `/studio` (`app/studio/[[...tool]]`) with `noindex` layout + robots disallow
- `.env.example` updated with Sanity/R2/Resend vars
- Unit tests: `sanity/env.test.ts`, `sanity/schemaTypes/index.test.ts`

**Operator step:** Create project at [sanity.io/manage](https://www.sanity.io/manage) or `pnpm sanity init`; copy project ID to `.env.local`.

---

## Completed in repo hygiene (2026-07-21)

- Payload runtime removed; `lib/cms` fallbacks-only
- Framer Motion + Lenis removed from main site (GSAP-only)
- Geologica + Montserrat; brand hex `#FF7998` etc.
- Products + Community in primary nav
- `context/DECISIONS.md` created; agent docs aligned
- `graphify-out/` retired (regenerate: `graphify update .`)

---

## Next Up (resume here)

1. **Operator:** Set `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`; verify `/studio` loads
2. **Phase C:** swap `lib/cms` to Sanity + GROQ + R2 refs; keep public API + fallbacks
3. **Phase E:** OpenNext + R2 + webhook revalidation + CF Web Analytics
4. **Phase F surfaces:** contact+Resend (T8), blog UI (T9), expanded E2E (T15)

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
