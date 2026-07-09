# Progress Tracker

Update this file after every meaningful implementation change.

---

## Canon Analysis Summary

Analysis of all 43 markdown files under `docs/` (July 2026). Extracts website-relevant canon only. Full detail lives in source docs.

### 1. Company identity

| Element | Value | Source |
| --- | --- | --- |
| Name | Kamiyon Studio | `docs/company/overview.md` |
| Founded | 2024 | overview |
| HQ | Biñan City, Laguna, Philippines | overview |
| Mission | Create games and interactive experiences that educate, inspire, and make a lasting impact | `docs/company/mission-vision.md` |
| Vision | World-class multimedia entertainment company; Filipino creativity globally (**Vision**) | mission-vision |
| Motto | **Create. Play. Inspire.** (confirmed for website) | mission-vision, overview |
| Values | Curiosity, Education, Innovation, Accessibility, Long-Term Thinking | `docs/company/core-values.md` |
| Positioning | Multidisciplinary interactive experience studio | `docs/marketing/positioning.md` |
| Team | 6 members (names/roles canon) | overview, `docs/company/organizational-structure.md` |
| Mascot | Kami-chan | `docs/branding/mascot-kami-chan.md` |

### 2. Website objectives and audiences

**Objectives** (`docs/marketing/website-guidelines.md`): explain who Kamiyon is; showcase products; present services; build credibility; generate leads; highlight expertise; thought leadership; support community; reflect brand.

**Audiences:** prospective clients, partners, educational institutions, Web3 orgs, investors, community orgs, future team members, media, players.

### 3. Page requirements (7 sections)

| Page | Canon content | Placeholder needed |
| --- | --- | --- |
| Home | Value prop, mission, featured work, CTA | Featured work, highlights |
| About | Story, mission/vision/values, team, culture | Team bios, photos |
| Services | 4 categories + 10 service areas | Detail page copy |
| Products | Eclipse, Vocabu, Afterschool Cleanup | Screenshots, trailers, dev status |
| Portfolio | Case study structure | All entries (no canon clients) |
| Community | Event types | All specific events |
| Contact | External channels | Facebook URL, LinkedIn URL, email |

### 4. Brand and design tokens

- **Colors:** Sakura Pink, Warm Ivory, Charcoal, Deep Indigo, Soft Gold — roles in `docs/design-system/color-palette.md`
- **Confirmed hex:** Sakura `#f97695` from `docs/assets/svg.svg`
- **Other hex:** TBD in canon (not in markdown)
- **Fonts:** Poppins (UI), Montserrat (headlines), Beaufort for LoL (decorative hero only) — `docs/branding/visual-identity.md`
- **Logo / mascot:** `docs/design-system/logo-guidelines.md`, `docs/branding/mascot-kami-chan.md`

### 5. Products and services

**Products (canon IP):** Eclipse (2D platformer), Vocabu Wildlife Edition (educational word puzzle), Afterschool Cleanup (thriller cleaning sim) — `docs/products/future-ip.md`

**Services (4 categories):** Interactive Experience Development, Software Development, Creative & Design, Consulting & Technical Advisory — `docs/services/services.md`

### 6. CMS content types

Defined in `context/architecture.md`: siteSettings, homePage, aboutPage, teamMember, serviceCategory, service, product, caseStudy, communityItem, contactPage, seoMetadata.

### 7. Gaps and conflicts (for review)

| Issue | Resolution |
| --- | --- |
| README motto "Play. Question. Create." vs "Create. Play. Inspire." | Website uses **Create. Play. Inspire.**; flag README for canon update |
| `docs/design-system/typography.md` duplicates color-palette.md | Fonts sourced from visual-identity.md only |
| `docs/services/consultation-process.md` duplicates ideal-client.md | No consultation process doc; use services.md |
| No hex for 4/5 colors in markdown | Sakura only; others TBD |
| No social URLs or public email in docs | Open questions below |
| No named portfolio clients or community events | Placeholder-first; never fabricate |
| website-guidelines suggests "Book a consultation" | v1 override: external contact links only |

---

## Current Phase

**Phase 3 — CMS Layer** — complete. Sanity dependencies, typed CMS client/queries/types, typed fallbacks, schema definitions, seed placeholder docs, and env documentation are in place. **Phase 4 (Homepage) is next.**

## Current Goal

CMS plumbing is available but not yet rendered by pages. Next: build the homepage sections and wire `app/page.tsx` to CMS data with typed fallbacks.

## Completed

- [x] Read and analyze all 43 `docs/` markdown files
- [x] Produce canon analysis summary (above)
- [x] Populate all 6 `context/` build spec files
- [x] **Phase 0 — Decisions & tracker setup**
- [x] **Phase 1 — Design Foundation**
  - [x] Rewrote `app/globals.css`: Tailwind 4 `@theme` (brand color + shadow + radius), `@theme inline` (font refs), `:root` semantic tokens (bg, text, accent, border, type scale); removed all dark-mode CSS
  - [x] Rewrote `app/layout.tsx`: Poppins (`--font-poppins`, weights 400/500/600/700) + Montserrat (`--font-montserrat`, weights 600/700) via `next/font/google`; removed Geist/Geist Mono
  - [x] Fixed `eslint.config.mjs`: added `.cursor/**` and `.claude/**` to global ignores (pre-existing lint errors in Cursor tooling scripts; not introduced by Phase 1)
  - [x] `npm run build` ✅ · `npm run lint` ✅
  - [x] Read all 6 `website-plan/` specification parts in full
  - [x] Identify major divergence: `website-plan/` v2.0 describes a different site (5-link nav, category portfolio IA, Google Form, static JSON, no Products/Community) vs. canon 7-section architecture
  - [x] Resolve all spec conflicts in favor of canon scope/IA/CMS/contact policy
  - [x] Default CMS choice to Sanity (confirmation pending)
  - [x] Produce Spec Reconciliation Matrix (route → CMS collection → components → placeholder strategy)
  - [x] Produce 11-phase roadmap (Phase 0–10)
  - [x] Write `context/website-plan/IMPLEMENTATION-PLAN.md`
  - [x] Update this tracker
- [x] **Phase 2 — App Shell**
  - [x] `components/layout/PageShell.tsx` — skip-to-content link, semantic `<main>` landmark
  - [x] `components/layout/SiteHeader.tsx` — sticky header, 7-section nav, mobile drawer (`"use client"`), Contact CTA
  - [x] `components/layout/MainNav.tsx`, `Logo.tsx`, `SiteFooter.tsx` — 4-column footer, social placeholders labeled "Coming soon"
  - [x] `components/ui/Button.tsx`, `Container.tsx` — token-based primitives
  - [x] `lib/config/navigation.ts` — static nav + social link config (CMS wiring deferred)
  - [x] `lib/seo/constants.ts`, `lib/seo/organization-jsonld.ts` — default description from positioning canon; Organization JSON-LD (canon facts only, no fabricated URL)
  - [x] `app/layout.tsx` — PageShell wrapper, metadata template `%s | Kamiyon Studio`, JSON-LD script
  - [x] `app/not-found.tsx` — branded 404 with home + contact links
  - [x] `app/globals.css` — `:focus-visible` styles + `prefers-reduced-motion` guard
  - [x] `npm run build` ✅ · `npm run lint` ✅
- [x] **Phase 3 — CMS Layer**
  - [x] Installed `next-sanity` + `sanity`
  - [x] Added `lib/cms/types.ts` for all CMS content models from `architecture.md`
  - [x] Added typed fallback stubs for site settings, Home, About, Team, Services, Products, Portfolio, Community, and Contact
  - [x] Added `lib/cms/client.ts` with env-aware Sanity client and fallback-safe missing-config behavior
  - [x] Added `lib/cms/queries.ts` with one `get*` function per singleton, collection, and slug route
  - [x] Added Sanity Studio config, CLI config, reusable object schemas, document schemas, and seed placeholder docs
  - [x] Added `.env.example` for `CMS_PROJECT_ID`, `CMS_DATASET`, and optional `CMS_API_TOKEN`
  - [x] Added minimal Vitest setup for pure CMS fallback resolution logic
  - [x] `npm run test` ✅ · `npm run lint` ✅ · `npm run build` ✅

## In Progress

- None

## Next Up

Per `context/website-plan/IMPLEMENTATION-PLAN.md` (each ≈ one PR / session):

1. ~~**Phase 1 — Design foundation**~~ ✅ complete
2. ~~**Phase 2 — App shell**~~ ✅ complete
3. ~~**Phase 3 — CMS layer**~~ ✅ complete
4. **Phase 4 — Homepage** — hero, clients/partners, services summary, awards highlight, featured work, contact CTA (CMS-driven, fallbacks)
5. **Phase 5 — Portfolio** — `/portfolio` listing + `/portfolio/[slug]` case study (challenge/solution/impact)
6. **Phase 6 — About + Services** — About (story/mission/vision/values/6-member team) + Services listing + `/services/[slug]`
7. **Phase 7 — Trust + Contact** — Contact page, external links only (no form); FAQ from `docs/ai/faq.md`
8. **Phase 8 — Products + Community** — 3 IP product pages + community feed placeholders (canon-only)
9. **Phase 9 — Polish** — per-route SEO/OG, WCAG AA pass, responsive breakpoints, asset migration `docs/assets/` → `public/`
10. **Phase 10 — Verification** — add test infra; E2E smoke all routes; `npm run build` + lint; 80%+ coverage on new `lib/` + section components

## Open Questions

- [ ] **Sanity project provisioning** — Phase 3 implemented Sanity as the working CMS; create/confirm project ID, dataset, CORS, and token handling before real content entry
- [ ] **`/news` route** — deferred/skipped for v1 (Vision item); confirm no external news feed needed at launch
- [ ] **Press Kit `/pres`** — deferred (Part 4 spec); revisit post-v1; assets exist in `docs/assets/`
- [ ] **Portfolio taxonomy divergence** — canon `caseStudy` model adopted over `website-plan/` 6-category IA; if discipline browsing wanted later, add tag filters (no new routes) — flagged for review
- [ ] **Contact policy** — external links only confirmed; `website-plan/` Part 5 Google Form intentionally dropped; confirm no lead-capture form for v1
- [ ] **Deployment target** — Vercel assumed for Next.js; confirm host + env var handling
- [ ] **Facebook page URL** — not in canon (placeholder until provided)
- [ ] **LinkedIn URL** — not in canon (placeholder until provided)
- [ ] **Public email address** — not in canon (placeholder until provided)
- [ ] **Remaining brand color hex values** — Warm Ivory, Charcoal, Deep Indigo, Soft Gold TBD; extract from `brand-kit.png` in canon update; do not invent
- [ ] **Next.js 16.2 docs missing** — `node_modules/next/dist/docs/` exists but is empty (confirmed in Phase 1); relied on installed types + current file patterns instead; noted as known gap
- [ ] **Test stack** — minimal Vitest runner added for Phase 3 fallback resolution only; Phase 10 will add coverage thresholds, Testing Library, and Playwright
- [ ] **Beaufort for LoL license** — confirm before production use
- [ ] **Product development status** — canon says "Original IP" only; per-product status defaults to `tbd`
- [ ] **README motto conflict** — update canon README to match Create. Play. Inspire.?

## Architecture Decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Motto | Create. Play. Inspire. | User confirmed; matches mission-vision + overview |
| Contact v1 | Facebook + LinkedIn + mailto only | No forms, Calendly, or auth per project scope |
| Content strategy | Headless CMS + typed fallbacks | No hardcoded copy; placeholder-first |
| CMS (proposed) | Sanity | Next.js fit, drafts, image CDN, separate Studio |
| Data fetching | SSG + ISR (1h revalidate) | Marketing site performance per website-guidelines |
| Portfolio / community | All placeholders initially | No canon client names or events |
| Team section | Canon names/roles; placeholder bios/photos | overview.md is authoritative for roster |
| Vision labeling | UI/copy label for long-term aspirations | canon.md compliance |
| CMS (defaulted) | Sanity | Phase 0: architecture.md recommendation adopted as working default pending team confirmation |
| ESLint scope | `.cursor/**` + `.claude/**` globally ignored | Cursor/Claude tooling scripts use CommonJS and are not website source; added in Phase 1 |
| Spec precedence | Canon `context/` wins over `website-plan/` v2.0 | `website-plan/` describes a divergent site; canon defines v1 scope/IA/CMS/contact — plan harvests `website-plan/` creative direction + Part 6 design system only |
| Site IA | Canon 7 sections (Home, About, Services, Products, Portfolio, Community, Contact) | Overrides `website-plan/` 5-link nav |
| Portfolio IA | `/portfolio` + `/portfolio/[slug]` case studies | Overrides `website-plan/` 6-category 3-level IA; disciplines become optional tags/filters |
| Contact mechanism | External links only (Facebook, LinkedIn, mailto) | Overrides `website-plan/` Google Form embed; canon invariant (no forms/auth) |
| News + Press Kit | Deferred out of v1 | Vision items per project-overview.md; not built in v1 |
| FAQ source | `docs/ai/faq.md` | `docs/services/consultation-process.md` is a known duplicate — not a source |
| Nav config (Phase 2) | Static `lib/config/navigation.ts` | CMS wiring deferred to Phase 3; shell uses static 7-section nav + placeholder social links |
| Logo (Phase 2) | Text + sakura icon placeholder | Asset migration from `docs/assets/` deferred to Phase 9; no fake logo image |
| CMS implementation (Phase 3) | Sanity via `next-sanity` + `sanity` | Adopted the defaulted Phase 0 recommendation; app falls back cleanly when `CMS_PROJECT_ID` / `CMS_DATASET` are unset |
| Phase 3 testing scope | Minimal Vitest coverage for fallback resolution only | Added a pure TypeScript test harness without React/JSDOM/E2E; broader coverage remains Phase 10 scope |

## Session Notes

- Repo is default Next.js 16.2 template (`app/page.tsx`, `layout.tsx` still stock Geist fonts; `globals.css` has dark-mode media query) — no website implementation yet (as of Phase 0)
- `docs/design-system/typography.md` and `docs/services/consultation-process.md` are erroneous duplicates — do not use as sources
- Brand assets in `docs/assets/`: logo.png, logo-frame.png, svg.svg, kami-chan-concept-art.png, brand-kit.png, youtube-banner.png
- Context files are now the build spec; read `context/CLAUDE.md` order before implementing
- After CMS setup, seed placeholder documents matching schemas in `architecture.md`

### 2026-07-09 — Phase 3 implementation session

**Files added/changed:** `package.json`, `package-lock.json`, `.gitignore`, `.env.example`, `vitest.config.ts`, `lib/cms/{client,queries,types,index}.ts`, `lib/cms/fallbacks/{about,community,contact,home,index,portfolio,products,resolve,resolve.test,services,site-settings}.ts`, `sanity.config.ts`, `sanity.cli.ts`, `sanity/schemaTypes/{documents,index,objects}.ts`, `sanity/seed/placeholder-docs.ts`, `context/progress-tracker.md`.

**What was implemented:**
- Sanity integration dependencies installed: `next-sanity` and `sanity`.
- CMS TypeScript model added for all architecture collections: `siteSettings`, `homePage`, `aboutPage`, `teamMember`, `serviceCategory`, `service`, `product`, `caseStudy`, `communityItem`, `contactPage`, and `seoMetadata`.
- Typed fallbacks added for every collection. Canon facts are sourced from `docs/`; unknown social URLs, email, case studies, community events, team bios/photos, media, and product development statuses remain honest placeholders.
- Query layer added with fallback-safe `get*` functions returning typed results or `null`; missing CMS env vars do not break local builds.
- Sanity Studio schema types added plus seed placeholder docs with stable IDs and references.
- `.env.example` documents `CMS_PROJECT_ID`, `CMS_DATASET`, and optional `CMS_API_TOKEN`.
- `.gitignore` now explicitly allows `.env.example` while keeping real `.env*` files ignored.
- Minimal Vitest setup added for `resolveWithFallback`, covering CMS content present, `null`, `undefined`, and empty object behavior.
- Review follow-up fixed seed `_key` generation, case-study gallery image metadata fields, ISR fetch revalidation, required service category references, fallback-only seed slug cleanup, Sanity client memoization, and CMS image `_key` projection for future React list rendering.
- TypeScript review follow-up tightened CMS env narrowing, nullable image metadata/featured refs, home block GROQ projections, product media schema alignment, static nav social type naming, Studio/CLI project ID errors for Sanity commands, and minimal Vitest coverage including future `.tsx` tests.

**Verification:** `npm run test` ✅ · `npm run lint` ✅ · `npm run build` ✅ · IDE diagnostics clean.

**TDD note:** Added only the pure TypeScript fallback-resolution test harness. Phase 10 still owns coverage thresholds, React Testing Library, component tests, and Playwright E2E.

**Deviations from plan:** CMS project provisioning and real Sanity dataset import were not performed; Phase 3 added the local integration layer and seed fixture only.

**Next task:** Phase 4 — Homepage wired to CMS with fallbacks.

### 2026-07-09 — Phase 2 implementation session

**Files added/changed:** `components/layout/{PageShell,SiteHeader,MainNav,Logo,SiteFooter}.tsx`, `components/ui/{Button,Container}.tsx`, `lib/config/navigation.ts`, `lib/seo/{constants,organization-jsonld}.ts`, `app/layout.tsx` (PageShell + metadata + JSON-LD), `app/not-found.tsx`, `app/globals.css` (`:focus-visible` + reduced-motion).

**What was implemented:**
- Global app shell wraps all pages via root layout: sticky header with 7-section nav (Home, About, Services, Products, Portfolio, Community, Contact), mobile drawer with Escape-to-close, Contact CTA, skip-to-content link.
- Footer: 4-column layout (brand/motto, nav repeat, social placeholders labeled "Coming soon", studio location from canon). No fabricated social URLs or email.
- SEO: metadata title template `%s | Kamiyon Studio`, default description from `docs/marketing/positioning.md`, Organization JSON-LD with canon name/foundingDate/address only (no fabricated website URL).
- Branded `not-found.tsx` with home + contact links.
- UI primitives: `Button` (primary/secondary/ghost, link or button), `Container` (max-w-7xl).

**Verification:** `npm run build` ✅ · `npm run lint` ✅ · Routes: `/` + `/_not-found` static.

**Deviations from plan:** Logo uses text + sakura blossom icon placeholder (assets not yet in `public/`). `app/page.tsx` left as stock stub — homepage content is Phase 4.

**Next task:** Phase 3 — CMS layer.

### 2026-07-09 — Phase 1 implementation session

**Files changed:** `app/globals.css` (full rewrite), `app/layout.tsx` (font swap), `eslint.config.mjs` (ignore `.cursor/**` + `.claude/**`).

**What was implemented:**
- `app/globals.css` fully rewritten. Stock Geist/dark-mode CSS removed. Replaced with:
  - `@theme` block: `--color-sakura: #f97695` (only confirmed brand hex); shadow scale (`--shadow-sm/md/lg`); radius scale (`--radius-pill/button/card/card-lg/band`). TBD brand colors (Warm Ivory, Charcoal, Deep Indigo, Soft Gold) have `/* TODO(TBD): ... */` comment stubs only — no invented hex.
  - `@theme inline` block: `--font-sans: var(--font-poppins)` and `--font-display: var(--font-montserrat)`.
  - `:root` block: `--bg-primary/#ffffff`, `--bg-secondary/#fafafa`, `--bg-accent/#fff5f7`, `--bg-surface/#ffffff`, `--text-primary/#1a1a1a`, `--text-secondary/#6b7280`, `--text-muted/#9ca3af`, `--accent-primary: var(--color-sakura)`, `--border-default: rgba(26,26,26,0.12)`, full type scale (`--font-size-xs` through `--font-size-hero` as rem values), `--bg-base` alias. TBD accent-dark and accent-premium also commented only.
- `app/layout.tsx`: Geist/Geist Mono removed; Poppins (weights 400/500/600/700) + Montserrat (weights 600/700) loaded via `next/font/google` with `display: "swap"`. Font CSS vars (`--font-poppins`, `--font-montserrat`) applied on `<html>` element.
- `eslint.config.mjs`: Added `.cursor/**` and `.claude/**` to global ignores. The 405 pre-existing lint errors were all in `.cursor/scripts/` (Cursor tooling using CommonJS `require()`), not in website source. Phase 1 introduced zero lint errors itself; fixing the ignores was the correct scoped fix.

**TDD note:** No TypeScript utility or helper was introduced in Phase 1 (pure CSS token values + a `next/font` call). Formal TDD skipped per task specification — this is acceptable for a CSS-only phase. Logged here rather than silently skipped.

**Verification:** `npm run build` ✅ · `npm run lint` ✅ · No dark-mode CSS remains · No invented hex for TBD brand colors · Build output: 2 static routes (`/` + `/_not-found`).

**Deviations from plan:** None. All token values match Part 6 and `context/ui-context.md`. Tailwind 4.3.2 used. `node_modules/next/dist/docs/` is present but empty (known gap).

### 2026-07-09 — Phase 0 planning session

- Read all 6 `website-plan/` parts (01–06, v2.0) in full alongside the 6 `context/` build specs.
- **Major finding:** `website-plan/` v2.0 describes a divergent site (game-dev agency framing, 5-link nav, 3-level category portfolio, Google Form contact, static JSON, `/news` + `/pres` routes, no Products/Community). Canon `context/` defines the authoritative v1 (7 sections, CMS + fallbacks, external-links contact, case-study portfolio, Products + Community).
- Resolved all conflicts in favor of canon scope/IA/CMS/contact; retained `website-plan/` creative direction (Part 1) and design system/SEO/a11y detail (Part 6) as the visual layer.
- Defaulted CMS to **Sanity** (pending confirmation). Deferred `/news` and `/pres`. Added Products + Community phases.
- Created `context/website-plan/IMPLEMENTATION-PLAN.md` with a full Spec Reconciliation Matrix and 11-phase roadmap (Phase 0–10), each phase scoped to ~one PR with goal / files / dependencies / scope boundaries / validation command.
- Found tooling gaps: `node_modules/next/dist/docs/` (referenced by `AGENTS.md`) does not exist; no test runner installed. Logged as open questions.
- No code changed; only `IMPLEMENTATION-PLAN.md` (new) and this tracker updated. `docs/` untouched.
- **Next task:** begin Phase 1 (design foundation) execution.

---

## Verification (context population pass)

- [x] All 6 context files populated (no `[placeholder]` template brackets)
- [x] Factual claims trace to `docs/` sources
- [x] Canon vs Vision labeled where relevant
- [x] `ui-context.md` has Sakura hex + font names; other hex TBD documented
- [x] `architecture.md` CMS model covers all 7 sections
- [x] Contact approach documented (external links only)
- [x] Placeholder-first strategy documented
- [x] Analysis summary and gaps in this file
- [x] No code implementation in this pass
