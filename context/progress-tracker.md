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

**Home section navigation** — React Bits LineSidebar on `/`.

## Current Goal

Fixed left rail on desktop listing home sections (Hero → Contact) with smooth scroll + scroll-spy active state.

## In Progress

- Done this session: Motion blur on scroll reveals (`useFadeIn` / `useReveal` / `useStagger` + `AnimatedSection`) — soft enter blur + velocity blur while elements pass through viewport; `lib/motion/motion-blur` + `attach-velocity-blur`; reduced-motion / coarse-pointer safe
- Done this session: `LineSidebar` + `HomeLineSidebar` on `/` (desktop-only fixed left rail); `lib/home/section-nav` anchors; section `id`s + `scroll-mt` on hero/partners/projects/services/contact; scroll-spy via `IntersectionObserver`; unit tests for sidebar + wiring
- Done this session: Restored `PartnersMarquee` as its own home section (reverted brief hero-overlay experiment); removed overlay/variant tests
- Done prior (committed): CardNav closed chrome (logo left / burger right, CTA hidden); open panel top-right vertical About/Work/Contact; Escape + focus trap; unit + e2e nav smoke
- Done prior (committed): HeroOpening brand-first (static `/assets/background.png`, SplitText + `SITE_MOTTO`); dropped featured opening list / `openingItems` from home page
- Done prior: `WordPullUp` + `lib/utils` `cn`; home `ProjectsBento` / `ServicesStack` / `HomeContact` adopted; motion-lab demo; documented in `ui-context.md` / `code-standards.md`
- Done prior: `ServicesCarousel` → `ServicesStack` + `ScrollStack`; `TiltedCard` on marketing cards; `CardNav` in `SiteHeader`; HeroOpening GSAP `useParallax` scrub

## Next Up (resume here)

1. Visual QA: motion blur on `/` and `/motion-lab` (desktop scroll speed → soft blur; stops when idle; reduced motion / touch unchanged)
2. Visual QA: LineSidebar on `/` (desktop rail; hidden below `lg`; click → smooth scroll; scroll-spy active; reduced motion; Lenis on/off)
3. Visual QA: partners as standalone section again (not hero overlay) + full home scroll path Hero → Contact
4. Visual QA: header closed/open + simplified hero on `/` and `/about` (desktop + mobile; reduced motion; Escape/focus)
5. Visual QA: WordPullUp + body fade on `/`; services stack (Lenis on/off + reduced motion)
6. Document LineSidebar in `ui-context.md` when phase closes
7. Roll WordPullUp + fade-in standard to About / Services / Portfolio / Contact page headings
8. Operator: set `DATABASE_URL` + `PAYLOAD_SECRET` in `.env.local`, run `npm run dev`, open `/admin`, create first user, publish content
9. Optional: draft/preview after cutover; Payload schema sign-off; production `NEXT_PUBLIC_SITE_URL` at deploy
10. Optional: dual-model a11y/UX polish on motion stack
11. Optional: remove unused `lib/home/opening-items` if nothing else adopts it

**Done (pointers only):**

- GSAP close-out (About + delivery note) 2026-07-11 — [`completed/2026-07-11-gsap-animation-delivery.md`](./completed/2026-07-11-gsap-animation-delivery.md)
- GSAP foundation + Home adoption 2026-07-11 — [`completed/2026-07-11-gsap-animation-foundation.md`](./completed/2026-07-11-gsap-animation-foundation.md)
- Sanity → Payload Phases 0–6 — [`completed/2026-07-11-payload-migration-phases-0-6.md`](./completed/2026-07-11-payload-migration-phases-0-6.md)
- Homepage redesign 2026-07-11 — [`completed/2026-07-11-homepage-redesign.md`](./completed/2026-07-11-homepage-redesign.md)
- v1 website Phase 0–10 — [`completed/2026-07-09-v1-website-phases-0-10.md`](./completed/2026-07-09-v1-website-phases-0-10.md)
- Sanity schema plan (superseded) — [`completed/2026-07-10-sanity-schema-plan-superseded.md`](./completed/2026-07-10-sanity-schema-plan-superseded.md)

---

## Open Questions

- [x] **CMS choice** — **Payload CMS 3** (Postgres); Sanity removed Phase 4
- [ ] **Payload schema sign-off** — Confirm globals/collections in `payload.config.ts` accepted as v1 canon
- [x] **Facebook page URL** — **answered 2026-07-10:** `https://www.facebook.com/kamiyonstudio`
- [x] **LinkedIn URL** — **answered 2026-07-10:** public `https://www.linkedin.com/company/105066188/`
- [x] **Public email address** — **answered 2026-07-10:** `kamiyonstudio@gmail.com`
- [x] **Deployment target** — **answered 2026-07-10:** Vercel; `NEXT_PUBLIC_SITE_URL` still TBD at deploy time
- [ ] **Deep Indigo hex value** — not in `brand-kit.png`; do not invent
- [ ] **`/news` route** — deferred/skipped for v1 (Vision item)
- [ ] **Press Kit `/pres`** — deferred post-v1
- [ ] **Portfolio taxonomy divergence** — canon `caseStudy` model; discipline filters need schema change
- [ ] **Contact policy** — external links only; no lead-capture form for v1
- [ ] **Beaufort for LoL license** — confirm before production use
- [ ] **Product development status** — per-product status defaults to `tbd`
- [ ] **README motto conflict** — update canon README to match Create. Play. Inspire.?
- [ ] **Draft/preview** — deferred post-migration

---

## Architecture Decisions (active)

| Decision | Choice | Rationale |
| --- | --- | --- |
| Motto | Create. Play. Inspire. | User confirmed |
| Contact v1 | Facebook + LinkedIn + mailto only | No forms / visitor auth |
| Content strategy | Payload CMS + typed fallbacks | Empty CMS OK |
| CMS (current) | Payload 3 + Postgres | In-repo `/admin`; Sanity deleted |
| Data fetching | SSG + ISR (1h `unstable_cache`) | Marketing performance |
| Rich text | Lexical → `PortableTextBlock[]` adapter | Matches `PortableText.tsx` |
| Images | Payload media `url` + `/assets/**` localPatterns | No Sanity CDN |
| Access control | Public read / authenticated write; Users auth-only | Phase 6 hardening |
| Secret validation | `PAYLOAD_SECRET` required if `DATABASE_URL` set | Fail closed when CMS enabled |
| Unmatched public URLs | `(frontend)/[...notFound]` → branded `not-found` | Dual root layouts (frontend/payload) |
| Shell nav | Home, About, Services, Portfolio, Blog, Contact | Products/Community routes kept, hidden from nav |
| Home composition | HeroOpening (brand + motto) → Partners → Projects → ServicesStack → Contact | 2026-07-15: list removed; partners overlay trial reverted |
| Home section nav | React Bits LineSidebar (`HomeLineSidebar`); desktop-only (`lg+`) fixed left rail; `HOME_SECTION_NAV` + scroll-spy | 2026-07-15 |
| Home services UI | React Bits ScrollStack (`useWindowScroll`); reuse site Lenis, no nested root Lenis | Avoid dual smooth-scroll instances |
| Shell header | CardNav via SiteHeader — closed: logo+burger; open: top-right vertical About/Work/Contact; transparent on `/` | 2026-07-15 restyle |
| Contact URLs | `lib/contact/channels.ts` | Single source for fallbacks/nav/JSON-LD |
| Motion stack | GSAP + ScrollTrigger + Lenis; Framer Motion micro only | Frontend layout providers; Payload admin excluded |
| Motion demo | `/motion-lab` (noIndex, hidden from nav) | Architecture showcase before marketing adoption |
| Typography motion | Headings: `WordPullUp` (scroll); body: `AnimatedSection` fade + motion blur; hero brand: `SplitText` | Differentiated entrance; reduced-motion passthrough |
| Scroll motion blur | Enter blur → sharp; velocity blur while on-screen (`lib/motion/motion-blur`); fine pointer only | Realism on desktop scroll; opt-out via `motionBlur={false}` |

Historical decisions and session notes live in [`completed/README.md`](./completed/README.md).
