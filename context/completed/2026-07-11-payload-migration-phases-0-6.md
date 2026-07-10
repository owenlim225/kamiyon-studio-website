# Sanity → Payload migration — Phases 0–6

**Archived:** 2026-07-11  
**Plan:** `.claude/plan/sanity-to-payload.md`  
**Status:** Migration complete (2026-07-11).  
**Active work:** [`../progress-tracker.md`](../progress-tracker.md)

---

## Outcomes

| Phase | Outcome |
| --- | --- |
| **0** | Inventory + Sanity→Payload schema map |
| **1** | Payload beside app: `payload.config.ts`, `(payload)` routes, `withPayload` |
| **2** | Schema parity: 4 globals + collections + Lexical subset; empty CMS |
| **3** | `lib/cms` → Payload Local API + `adapters/{lexical,media,mappers}`; public API preserved |
| **4** | Deleted Sanity deps/config/`sanity/`/studio scripts/draft-mode/`context/sanity-plan/**` |
| **5** | Docs rewrite: Payload-first context docs; Sanity history archived |
| **6** | Hardening: removed debug telemetry; explicit access helpers; `PAYLOAD_SECRET` gate; branded catch-all 404; e2e 15/15; tests 269/269 |

**Operator remaining:** Set `DATABASE_URL` + `PAYLOAD_SECRET`, migrate DB, create `/admin` user, publish content (public site uses fallbacks until then).

**Deferred:** draft/preview; Sanity content export (out of scope).

---

## Phase checklist (locked decisions)

| Phase | Status | Goal |
| --- | --- | --- |
| **0** Inventory & mapping | ✅ Done | Sanity touchpoints inventoried; schema map in plan file |
| **1** Install Payload beside app | ✅ Done | `payload.config.ts`, `(payload)` routes, `withPayload`, build/lint/test green |
| **2** Schema parity | ✅ Done | 4 globals + 6 collections + shared fields; Lexical subset; empty CMS |
| **3** Swap `lib/cms` | ✅ Done | Payload Local API + adapters; fallbacks + public API preserved; build/lint/test green |
| **4** Delete Sanity | ✅ Done | Removed all Sanity deps, configs, scripts, draft-mode, docs plan tree |
| **5** Documentation | ✅ Done | Context docs rewritten for Payload; Sanity history archived |
| **6** Hardening | ✅ Done | Security hardening + e2e smoke green |

---

## Phase 6 — Hardening detail (2026-07-11)

- [x] Security review (branch diff + runtime Payload surface)
- [x] Remove leftover debug telemetry (`Hero`, home `page`, `site-url`; deleted `debug-c8674a.log`)
- [x] Explicit access: public `read` + authenticated writes on collections/globals; Users authenticated-only (`access/authenticated.ts`)
- [x] `PAYLOAD_SECRET` required when `DATABASE_URL` is set; `.env.example` generation guidance
- [x] Branded 404 for unmatched public URLs (`(frontend)/[...notFound]` → `not-found.tsx`)
- [x] Verify: `npm test` 269/269 · scoped lint · `npm run test:e2e` 15/15

Detail:

- Removed agent debug `fetch`/`appendFile` instrumentation from `Hero.tsx`, `app/(frontend)/page.tsx`, `lib/seo/site-url.ts`; deleted `debug-c8674a.log`
- Added `access/authenticated.ts` (`anyone`, `authenticated`, `isAuthenticatedUser`) + unit tests
- Collections/globals: public `read`, authenticated `create`/`update`/`delete` (Users: authenticated-only including `admin`)
- `payload.config.ts`: throw if `DATABASE_URL` set without `PAYLOAD_SECRET`
- `.env.example`: secret generation guidance
- `app/(frontend)/[...notFound]/page.tsx` so unmatched public URLs use branded `not-found.tsx` (dual root layouts)
- e2e smoke asserts branded 404 heading + "Back to home"

**Out of scope (migration):** Sanity content export/migration; draft/preview — follow-up after cutover.

---

## Session notes (migration)

- **2026-07-11 (Phase 6 hardening):** Removed debug ingest telemetry; added `access/{anyone,authenticated,isAuthenticatedUser}`; locked Users + write ops; secret validation; catch-all branded 404; e2e 15/15; tests 269/269. **Phase 6 complete — migration finished.**
- **2026-07-11 (Phase 5 docs):** Payload-first tracker/architecture/README; Sanity history archived.
- **2026-07-11 (Phase 4 delete Sanity):** Full Sanity stack removed; grep-clean; build green.
- **2026-07-10 (Payload Phase 3):** `lib/cms` → Local API + adapters.
