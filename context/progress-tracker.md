# Progress Tracker

Update this file after every meaningful implementation change.

## Archival process

When a task/phase is marked complete:

1. Create `context/completed/YYYY-MM-DD-<slug>.md` with the finished context (goal, decisions, checklist, verification results, session notes).
2. Add a row/link in [`completed/README.md`](./completed/README.md).
3. Remove the bulky finished block from this file; leave at most a one-line “Done — see completed/…” pointer if needed.
4. Do not delete historical detail — relocate it.

**Historical completed work:** [`completed/README.md`](./completed/README.md)

---

## Canon Analysis Summary (abbreviated)

Full analysis of 43 `docs/` files (July 2026). Detail in source docs and [`project-overview.md`](./project-overview.md). **Stack/design locks:** [`WEBSITE-ESSENTIAL-CONTEXT.md`](./WEBSITE-ESSENTIAL-CONTEXT.md).

| Area | Key facts |
| --- | --- |
| Identity | Kamiyon Studio — Founded 2024 — Biñan City, Laguna — Motto **Create. Play. Inspire.** — 6 team members — Mascot Kami-chan |
| Site scope | Home, About, Services, Products, Portfolio, Community, Blog, Contact, Motion Lab (noindex), Studio (noindex) |
| Target stack | Sanity + OpenNext (CF Pages/Workers free) + R2 media + Resend + CF Web Analytics |
| Nav (locked) | Home, About, Services, **Products**, Portfolio, **Community**, Blog, Contact |
| Products (canon IP) | Eclipse, Vocabu Wildlife Edition, Afterschool Cleanup |
| Services | 4 categories, 10 service areas (`docs/services/services.md`) |
| Design tokens | Primary `#FF7998` · Secondary `#E9C080` · Black `#201013` · White `#F8F8F8` · Fonts: Geologica (UI/display), Montserrat (body) |
| Contact | Form (Resend) + external links |
| Placeholder gaps | No named clients or community events in canon — never fabricate |

**Known conflicts:** README motto "Play. Question. Create." vs canon "Create. Play. Inspire." (website uses canon). Repo still on Payload until Phase D. Nav code still hides Products/Community (T16).

---

## Current Phase

**Phase A complete → Phase B next:** Sanity + Cloudflare target locked. See [`WEBSITE-ESSENTIAL-CONTEXT.md`](./WEBSITE-ESSENTIAL-CONTEXT.md) (wins over this file on stack/CMS/design).

## Current Goal

Scaffold a **new** Sanity project, embed Studio at `/studio`, recreate schemas (incl. blog), keep Payload until `lib/cms` swap is green.

## Decisions locked (2026-07-21)

OpenNext SSR/ISR · `kamiyonstudio.com` · free-tier CF · new Sanity + `/studio` · R2-only media · empty seed · contact form + Resend · full blog model · Products+Community in nav · GSAP-only · motion-lab noindex · colors `#FF7998` / `#E9C080` / `#201013` / `#F8F8F8` · Geologica + Montserrat · CF Web Analytics only.

## In Progress

- Context freeze: `WEBSITE-ESSENTIAL-CONTEXT.md` + `ui-context.md` colors/fonts synced; `architecture.md` marked stale
- Prior (Payload-era) home motion work remains in tree; Lenis/Framer to be removed in Phase F (T10)

## Next Up (resume here)

1. Phase B: `npm create sanity@latest` → embed `/studio` → schemas per essential context §7
2. Phase C: swap `lib/cms` to Sanity + GROQ + R2 refs; keep public API + fallbacks
3. Phase D: delete Payload
4. Phase E: OpenNext + R2 + Sanity webhook revalidation + CF Web Analytics
5. Phase F: nav Products/Community, blog UI, contact+Resend, fonts/colors, GSAP-only, lab noindex, CWV gates

**Done (pointers only):**

- GSAP close-out (About + delivery note) 2026-07-11 — [`completed/2026-07-11-gsap-animation-delivery.md`](./completed/2026-07-11-gsap-animation-delivery.md)
- GSAP foundation + Home adoption 2026-07-11 — [`completed/2026-07-11-gsap-animation-foundation.md`](./completed/2026-07-11-gsap-animation-foundation.md)
- Sanity → Payload Phases 0–6 — [`completed/2026-07-11-payload-migration-phases-0-6.md`](./completed/2026-07-11-payload-migration-phases-0-6.md)
- Homepage redesign 2026-07-11 — [`completed/2026-07-11-homepage-redesign.md`](./completed/2026-07-11-homepage-redesign.md)
- v1 website Phase 0–10 — [`completed/2026-07-09-v1-website-phases-0-10.md`](./completed/2026-07-09-v1-website-phases-0-10.md)
- Sanity schema plan (superseded) — [`completed/2026-07-10-sanity-schema-plan-superseded.md`](./completed/2026-07-10-sanity-schema-plan-superseded.md)

---

## Open Questions

- [x] **CMS choice** — **Sanity** (new project); Payload retiring Phase D — see essential context
- [x] **Facebook page URL** — `https://www.facebook.com/kamiyonstudio`
- [x] **LinkedIn URL** — `https://www.linkedin.com/company/105066188/`
- [x] **Public email address** — `kamiyonstudio@gmail.com`
- [x] **Deployment** — Cloudflare OpenNext; prod `https://kamiyonstudio.com`; preview `*.pages.dev`
- [x] **Brand colors** — `#FF7998` / `#E9C080` / `#201013` / `#F8F8F8` (Deep Indigo not required for site)
- [x] **Fonts** — Geologica + Montserrat; Beaufort removed
- [x] **Contact policy** — form (Resend) + external links
- [x] **Nav** — Products + Community in primary nav
- [x] **Motion** — GSAP only on main site; `/motion-lab` public noindex
- [x] **Analytics** — Cloudflare Web Analytics only
- [ ] **`/news` route** — deferred/skipped
- [ ] **Press Kit** — deferred
- [ ] **Portfolio taxonomy / discipline filters** — deferred until needed
- [ ] **Product development status** — per-product defaults to `tbd`
- [ ] **README motto conflict** — update canon README to Create. Play. Inspire.?
- [ ] **Draft/preview (Sanity Presentation)** — optional post-launch
- [ ] **R2 public CDN hostname** — set during Phase E
- [ ] **Resend from-address / CONTACT_TO_EMAIL** — confirm production inbox

---

## Architecture Decisions (active)

| Decision | Choice | Rationale |
| --- | --- | --- |
| Motto | Create. Play. Inspire. | Canon |
| Target CMS | Sanity (new project) + `/studio` | Editors; no Postgres; publish via webhook |
| Media | Cloudflare R2 only | Sanity holds structured refs |
| Hosting | OpenNext on CF Pages/Workers (free) | SSR/ISR without paid plan until limits |
| Domain | `https://kamiyonstudio.com` | Locked |
| Revalidation | Sanity webhook → `revalidateTag` | Publish ≠ redeploy |
| Contact | Form (Resend) + external links | Production lead capture |
| Blog | Full model (authors, cats, tags, PT, SEO, related) | Production grade |
| Shell nav | Include Products + Community | Locked (code T16) |
| Motion (main) | GSAP + ScrollTrigger only | Drop Framer + Lenis |
| Motion lab | Public `/motion-lab`, noindex | Showcase without SEO cost |
| Colors | `#FF7998` `#E9C080` `#201013` `#F8F8F8` | Official brand |
| Fonts | Geologica (UI/display), Montserrat (body) | Google Fonts; no Beaufort |
| Analytics | Cloudflare Web Analytics only | Privacy + free tier |
| Content strategy | Sanity + typed fallbacks | Empty CMS OK until seeded |
| **Current repo CMS** | Payload (temporary) | Remove in Phase D |

Home composition / CardNav / LineSidebar decisions from 2026-07-15 remain until Phase F motion cleanup. Historical notes: [`completed/README.md`](./completed/README.md).
