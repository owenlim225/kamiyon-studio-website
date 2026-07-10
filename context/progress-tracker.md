# Progress Tracker

Update this file after every meaningful implementation change.

**Historical completed work:** [`completed-work.md`](./completed-work.md) (v1 Phase 0–10, Sanity schema plan [superseded], Payload migration 0–5, session notes)

---

## Canon Analysis Summary (abbreviated)

Full analysis of 43 `docs/` files (July 2026). Detail in source docs and [`project-overview.md`](./project-overview.md).

| Area | Key facts |
| --- | --- |
| Identity | Kamiyon Studio — Founded 2024 — Biñan City, Laguna — Motto **Create. Play. Inspire.** — 6 team members — Mascot Kami-chan |
| Site scope | Routes: Home, About, Services, Products, Portfolio, Community, Contact, Blog (stub) — Payload CMS + typed fallbacks — External contact only (no forms) |
| Nav (shell) | Home, About, Services, Portfolio, Blog, Contact — Products/Community hidden from header/footer (routes preserved) |
| Products (canon IP) | Eclipse, Vocabu Wildlife Edition, Afterschool Cleanup |
| Services | 4 categories, 10 service areas (`docs/services/services.md`) |
| CMS (Payload) | Globals: `site-settings`, `home-page`, `about-page`, `contact-page` — Collections: `team-members`, `service-categories`, `services`, `products`, `case-studies`, `community-items`, `media`, `users` — see `architecture.md` |
| Design tokens | Sakura `#f97695` (confirmed); Warm Ivory/Charcoal/Soft Gold extracted Phase 9; Deep Indigo TBD — Fonts: Poppins (UI), Montserrat (headlines) |
| Placeholder gaps | Social URLs + public email **wired 2026-07-10** (operator-provided; not yet in canon docs); no named clients or community events in canon — never fabricate |

**Known conflicts:** README motto "Play. Question. Create." vs canon "Create. Play. Inspire." (website uses canon). `typography.md` / `consultation-process.md` are erroneous duplicates.

---

## Current Phase

**Sanity → Payload migration — Phase 6 (hardening)** — Phase 5 complete: context docs rewritten for Payload. Next: security review + e2e smoke.

## Current Goal

Finish Phase 6 (hardening). Operator must set `DATABASE_URL` + `PAYLOAD_SECRET` and run migrations before `/admin` is usable; public site uses typed fallbacks until Payload content is published.

## In Progress

- **Phase 6 — Hardening** — security review + e2e smoke; plan: `.claude/plan/sanity-to-payload.md`

### Homepage redesign (2026-07-11) — ✅ Complete

Per `context/website-change/website-changes.md`:

- **Nav:** `PRIMARY_NAV_ITEMS` → Home, About, Services, Portfolio, Blog, Contact; Products/Community hidden from header/footer (routes preserved)
- **Blog:** `/blog` coming-soon stub
- **Home `/`:** Hero (full-bleed `background.png`) → PartnersMarquee → ProjectsBento → ServicesCarousel → HomeContact; Mission/FeaturedWork/Highlights/ContactCTA removed from page
- **New:** `lib/home/{bento-layout,carousel-a11y,partner-placeholders}`, `components/sections/{PartnersMarquee,ProjectsBento,ServicesCarousel,HomeContact}`, `components/ui/BentoProjectCard`
- **Tests:** 266/266 Vitest pass; e2e nav updated (`primaryNavRoutes` + hidden sections test)

## Next Up

### Payload migration phases (locked decisions)

| Phase | Status | Goal |
| --- | --- | --- |
| **0** Inventory & mapping | ✅ Done | Sanity touchpoints inventoried; schema map in plan file |
| **1** Install Payload beside app | ✅ Done | `payload.config.ts`, `(payload)` routes, `withPayload`, build/lint/test green |
| **2** Schema parity | ✅ Done | 4 globals + 6 collections + shared fields; Lexical subset; empty CMS |
| **3** Swap `lib/cms` | ✅ Done | Payload Local API + adapters; fallbacks + public API preserved; build/lint/test green |
| **4** Delete Sanity | ✅ Done | Removed all Sanity deps, configs, scripts, draft-mode, docs plan tree |
| **5** Documentation | ✅ Done | Context docs rewritten for Payload; Sanity history archived |
| **6** Hardening | 🔄 In progress | Security review + e2e smoke |

### Phase 5 — Documentation (checklist) ✅

- [x] Rewrite `progress-tracker.md` as Payload-first active tracker (Sanity ops history → `completed-work.md`)
- [x] Archive Payload migration Phases 0–5 + superseded Sanity schema plan notes in `completed-work.md`
- [x] Align `architecture.md` with Payload (`/admin`, globals/collections slugs, adapters, env, deployment)
- [x] Confirm `code-standards.md` / `README.md` use Payload env (`DATABASE_URL`, `PAYLOAD_SECRET`)
- [x] Update `.claude/plan/sanity-to-payload.md` status → Phase 5 complete · Phase 6 next
- [x] Consistency pass: no live “use Sanity / CMS_PROJECT_*” instructions in active context docs

**Operator steps:** Set `DATABASE_URL` (Postgres) and `PAYLOAD_SECRET` in `.env.local`, run `npm run dev`, open `/admin`, create first user. Content starts empty — public site uses typed fallbacks until operators publish in admin.

**Out of scope (migration):** Sanity content export/migration; draft/preview — follow-up after cutover.

### Prior roadmap (complete)

- v1 website Phase 0–10 — see [`completed-work.md`](./completed-work.md)
- Sanity schema plan + provisioning — **superseded** by Payload (deleted Phase 4; archived in completed-work)

---

## Open Questions

- [x] **CMS choice** — **Payload CMS 3** (Postgres); Sanity removed Phase 4
- [ ] **Payload schema sign-off** — Confirm globals/collections in `payload.config.ts` accepted as v1 canon
- [x] **Facebook page URL** — **answered 2026-07-10:** `https://www.facebook.com/kamiyonstudio` (operator placeholder; not yet in canon docs)
- [x] **LinkedIn URL** — **answered 2026-07-10:** public `https://www.linkedin.com/company/105066188/`
- [x] **Public email address** — **answered 2026-07-10:** `kamiyonstudio@gmail.com`
- [x] **Deployment target** — **answered 2026-07-10:** Vercel; `NEXT_PUBLIC_SITE_URL` still TBD at deploy time
- [ ] **Deep Indigo hex value** — not in `brand-kit.png`; do not invent
- [ ] **`/news` route** — deferred/skipped for v1 (Vision item)
- [ ] **Press Kit `/pres`** — deferred post-v1
- [ ] **Portfolio taxonomy divergence** — canon `caseStudy` model adopted; discipline filters would need schema change
- [ ] **Contact policy** — external links only confirmed; no lead-capture form for v1
- [ ] **Beaufort for LoL license** — confirm before production use
- [ ] **Product development status** — per-product status defaults to `tbd`
- [ ] **README motto conflict** — update canon README to match Create. Play. Inspire.?

---

## Architecture Decisions (active)

| Decision | Choice | Rationale |
| --- | --- | --- |
| Motto | Create. Play. Inspire. | User confirmed; matches mission-vision + overview |
| Contact v1 | Facebook + LinkedIn + mailto only | No forms, Calendly, or public auth per project scope |
| Content strategy | Payload CMS + typed fallbacks | No hardcoded copy; placeholder-first; empty CMS OK |
| CMS (current) | Payload 3 + Postgres | In-repo `/admin`; Local API; Sanity deleted Phase 4 |
| Data fetching | SSG + ISR (1h `unstable_cache` revalidate) | Marketing site performance per website-guidelines |
| Rich text | Lexical subset → `PortableTextBlock[]` adapter | Matches `PortableText.tsx` (p/h2/h3 + strong/em) |
| Images | Payload media `url` via `getCmsImageUrl` | Local `/api/media/file/**`; no Sanity CDN |
| Spec precedence | Canon `context/` wins over `website-plan/` v2.0 | Plan harvests creative direction + design system only |
| Site IA (routes) | 7 canon sections + Blog stub | Products/Community routes kept; hidden from shell nav (2026-07-11 redesign) |
| Shell nav | Home, About, Services, Portfolio, Blog, Contact | Per `website-changes.md`; static `PRIMARY_NAV_ITEMS` |
| Portfolio IA | `/portfolio` + `/portfolio/[slug]` only | No category route; `industry` is free text |
| Contact mechanism | External links only | Overrides `website-plan/` Google Form embed |
| News + Press Kit | Deferred out of v1 | Vision items |
| FAQ source | `docs/ai/faq.md` | `consultation-process.md` is a known duplicate |
| Nav + shell copy | Static nav; CMS `siteSettings` for name/CTA/footer/social | `buildShellNavProps()` |
| Accessible sakura text | `--color-sakura-ink` (`#c23a5e`) for text on ivory | WCAG AA; raw `--color-sakura` for fills |
| Home composition (2026-07-11) | Hero → Partners → Projects bento → Services carousel → Home contact | Redesign; old Mission/FeaturedWork/Highlights/ContactCTA off home |
| Partners on home | Placeholder logo slots only | Never fabricate client names/logos |
| Contact URLs | Shared `lib/contact/channels.ts` | Facebook, public LinkedIn company path, `kamiyonstudio@gmail.com` |
| Phase 3 Payload adapter | Local API + `lib/cms/adapters/*` | Public `lib/cms` types/exports preserved; empty → `null` → fallbacks |
| Phase 4 Sanity deletion | Full stack removed | App source grep-clean; public site via Payload + fallbacks |

Historical decisions (Sanity Studio, GROQ, Presentation draft mode, seed `_id`s, etc.) live in [`completed-work.md`](./completed-work.md).

---

## Session notes

- **2026-07-11 (Phase 5 docs):** Rewrote active `progress-tracker.md` for Payload; archived Sanity ops history + Payload migration 0–5 summary into `completed-work.md`; aligned `architecture.md` (admin, slugs, adapters, env); updated README + migration plan status. **Phase 5 complete.** Next: Phase 6 hardening.
- **2026-07-11 (Phase 4 delete Sanity):** Removed Sanity deps/config/tree/scripts/draft-mode/`sanity-plan`; cleaned `lib/cms`; Payload-only env. Tests 266/266; lint + build exit 0.
- **2026-07-11 (homepage redesign):** Nav + home composition per `website-changes.md` (complete).
- **2026-07-10 (Payload Phase 3):** Swapped `lib/cms` to Payload Local API + adapters. Fallbacks preserved.
- **2026-07-10 (contact URLs):** Operator-provided Facebook, LinkedIn, email wired via `lib/contact/channels.ts`.
