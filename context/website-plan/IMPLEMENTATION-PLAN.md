# Kamiyon Studio Website — Implementation Plan

> **Status:** Planning complete. No feature code written yet. This document is the
> bridge between the creative `website-plan/` specs (Parts 01–06) and the canon
> build specs in `context/` (`project-overview.md`, `architecture.md`,
> `ui-context.md`, `code-standards.md`, `ai-workflow-rules.md`).
>
> **Source-of-truth precedence** (from `ai-workflow-rules.md`): user task
> instructions → `docs/` canon → `context/` build specs → CMS → assumptions.
> Where the `website-plan/` design specs (v2.0) conflict with the canon
> `context/` architecture, **canon wins for scope, routes, IA, CMS, and contact
> policy**; the `website-plan/` parts are retained as **creative direction and
> section-level visual detail**.

---

## 1. Key Finding: Two Divergent Visions

The `website-plan/` Parts 01–06 (v2.0) describe a **different site** from the
canon `context/` build specs. Both are internally consistent; they disagree on
structure. This plan reconciles them.

| Dimension | `website-plan/` v2.0 says | Canon `context/` says | This plan uses |
| --- | --- | --- | --- |
| Site map | 5 nav links: Portfolio, News, About, Press, Contact | 7 sections: Home, About, Services, Products, Portfolio, Community, Contact | **Canon 7 sections** |
| Portfolio IA | 3-level: `/portfolio/[category]/[slug]` across 6 creative disciplines | `/portfolio/[slug]` case studies (challenge/solution/impact) | **Canon `[slug]` case studies**; 6 disciplines become optional tags/filters |
| Services | No route; homepage summary cards only | `/services` + `/services/[slug]`, 4 categories | **Canon `/services` routes** |
| Products | Not present (listed under "future expansion") | `/products` + `/products/[slug]`, 3 canon IP titles | **Canon `/products` routes** |
| Community | Not present | `/community` feed | **Canon `/community` route** |
| Contact | Google Form embed (`NEXT_PUBLIC_CONTACT_FORM_URL`) | External links only — no forms, no auth | **Canon external links only** |
| Content source | Static JSON now, CMS "future" | Headless CMS + typed fallbacks now | **CMS layer + typed fallbacks** |
| News / Press | `/news` + `/pres` routes | Out of v1 scope (Vision items) | **Deferred** (see Open Questions) |
| Positioning | Game-dev-for-hire agency for startups/Web3/publishers | IP studio + client services with educational mission | **Canon mission-first**; adopt v2.0's "evidence before claims" craftsmanship |

**Value harvested from `website-plan/`:** the creative direction (Part 1), the
concrete design-token values and type scale (Part 6), the section layouts
(hero split, clients strip, services grid, awards highlight, contact CTA band,
4-column footer, 404), the card/gallery/badge systems, and the SEO/a11y/JSON-LD
structure. These are applied on top of the canon IA and CMS model.

---

## 2. Available Canon vs. Placeholder Gaps

**Available in `docs/` (usable canon — copy verbatim into typed fallbacks, cite source):**

- Company facts: name, founded **2024**, HQ **Biñan City, Laguna, Philippines** (`company/overview.md`)
- Mission, vision (label as *Vision*), motto **Create. Play. Inspire.** (`company/mission-vision.md`)
- Five core values: Curiosity, Education, Innovation, Accessibility, Long-Term Thinking (`company/core-values.md`)
- Positioning / messaging / tone of voice (`marketing/positioning.md`, `branding/messaging.md`, `branding/tone-of-voice.md`)
- Team: 6 members, names + roles only (`company/overview.md`, `company/organizational-structure.md`)
- Services: 4 categories + service areas (`services/services.md`, `services/target-industries.md`, `services/ideal-client.md`)
- Products: Eclipse, Vocabu Wildlife Edition, Afterschool Cleanup (`products/eclipse.md`, `products/vocabu.md`, `products/afterschool-cleanup.md`, `products/future-ip.md`, `products/philosophy.md`)
- Community/partnership philosophy (`company/culture.md`, `marketing/partnerships.md`, `marketing/social-media.md`)
- FAQ content (`ai/faq.md` — **exists**; use this, not the duplicate `services/consultation-process.md`)
- Brand assets: `docs/assets/` → `logo.png`, `logo-frame.png`, `svg.svg`, `kami-chan-concept-art.png`, `brand-kit.png`, `youtube-banner.png`
- Confirmed color: **Sakura Pink `#f97695`** (from `svg.svg`)

**Placeholder gaps (TBD — never fabricate; source from CMS as labeled placeholders):**

- 4/5 brand hex values: Warm Ivory, Charcoal, Deep Indigo, Soft Gold (extract from `brand-kit.png` in a future canon update)
- Social URLs (Facebook, LinkedIn) and public email — not in canon
- Awards, client/partner names + logos, testimonials — none in canon
- Portfolio case studies — no named clients exist in canon
- Community events — none documented
- Per-product development status — canon says "Original IP" only; default `tbd`
- Team bios + photos — names/roles are canon, bios/photos are placeholder
- Deployment target (Vercel assumed) and Beaufort for LoL license

**Tooling gaps found:**

- `AGENTS.md` points to `node_modules/next/dist/docs/` for Next.js 16.2 conventions, **but that directory does not exist** in the installed package. Implementers must verify any exotic Next.js 16.2 API against the installed TypeScript types / official Next.js docs before use. Keep to documented App Router primitives (`layout.tsx`, `page.tsx`, `generateMetadata`, `generateStaticParams`, `next/font`, `next/image`, `next/link`, `notFound()`).
- No test runner is installed (`package.json` has no jest/vitest/playwright). Phase 10 must add test infrastructure.
- `app/` is still the stock template (`layout.tsx` uses Geist fonts, `globals.css` has dark-mode media query). Both must be replaced in Phase 1–2.

---

## 3. Spec Reconciliation Matrix

CMS collections reference the model in `architecture.md`. Component names follow
`code-standards.md` naming (PascalCase; `components/layout|sections|ui`).
Placeholder strategy per `ai-workflow-rules.md`: **content flows from CMS →
typed fallback; never inline fabricated facts in components.**

### Global (Parts 1, 5, 6)

| Spec area (part) | Route(s) | CMS collection | Components | Placeholder strategy |
| --- | --- | --- | --- | --- |
| Creative direction, brand system (P1) | all | — | design tokens in `globals.css` | N/A (brand rules) |
| Design tokens, type scale, buttons, cards, badges (P6) | all | — | `ui/Button`, `ui/Card`, `ui/Badge`, `ui/Container`, `ui/Chip` | N/A |
| Global nav (P2, P5) | all | `siteSettings.globalCtas` | `layout/SiteHeader`, `layout/MainNav`, `layout/Logo` | Nav links = **canon 7 sections** (not the v2.0 5-link set) |
| Footer (P2, P5) | all | `siteSettings.socialLinks`, `footerText` | `layout/SiteFooter` | Social links = placeholder `#` + "Coming soon" until URLs in canon |
| PageShell / skip-link / main landmark (P6 a11y) | all | — | `layout/PageShell` | N/A |
| SEO defaults, title template, JSON-LD Organization (P6) | all | `siteSettings.defaultSeo` | root `layout.tsx` metadata, `lib/seo/` helpers | Default description from positioning canon |
| 404 page (P5) | `not-found.tsx` | fallback only | `sections/NotFound` | Kami-chan illustration = branded placeholder |

### Home (Part 2)

| Section (P2) | Route | CMS collection | Components | Placeholder strategy |
| --- | --- | --- | --- | --- |
| Hero (split, headline, CTA row, optional trust stats) | `/` | `homePage.hero` | `sections/Hero` | Headline/copy from messaging canon; stats canon-only or omitted |
| Clients / Partners strip | `/` | `homePage` block → `partner` refs (labeled placeholder) | `sections/ClientsPartners` | **Generic "Coming soon" logo slots**; never fabricate client names |
| Services summary (grid) | `/` | `serviceCategory` (top 4–6) | `sections/ServicesSummary`, `ui/ServiceCard` | Cards link to **`/services`** (canon), not `/portfolio/[category]` |
| Awards highlight | `/` | `homePage` block → `award` (labeled placeholder) | `sections/AwardsHighlight` | Placeholder award blocks labeled; never invent counts/wins |
| Contact CTA band | `/` | `homePage.ctaBanner` | `sections/ContactCTA` | CTA → `/contact` |
| News teaser (optional) | `/` | `communityItem` or external links | `sections/NewsTeaser` | **Likely omitted v1** (see Open Questions); if kept, external links only |
| Featured work (canon adds) | `/` | `caseStudy` (featured) / `product` refs | `sections/FeaturedWork` | Placeholder case studies, `isPlaceholder: true` |

### Portfolio (Part 3 → reconciled to canon IA)

| Level (P3) | Reconciled route | CMS collection | Components | Placeholder strategy |
| --- | --- | --- | --- | --- |
| Hub / listing | `/portfolio` | `caseStudy[]` | `sections/PortfolioListing`, `ui/ProjectCard` | Seed 1–2 placeholder case studies, visibly labeled |
| ~~Category page `/portfolio/[category]`~~ | **Dropped as a route** | — | discipline used as `caseStudy.industry`/tag filter | 6 disciplines become optional filter chips, not routes |
| Project detail | `/portfolio/[slug]` | `caseStudy` | `sections/CaseStudy`, `sections/ProjectGallery`, `sections/ProjectSidebar` | Structure = **challenge / solution / impact / lessons** (canon), rendered with P3's hero+gallery+sidebar visual treatment |
| Empty state | `/portfolio` | — | `sections/EmptyState` | Kami-chan + "Projects coming soon" |

> P3's `PortfolioCategory`/`PortfolioProject` static types map onto the canon
> `caseStudy` CMS type. `generateStaticParams` reads slugs from CMS.

### Services (Part 4 says "homepage only" → canon overrides with routes)

| Spec | Route | CMS collection | Components | Placeholder strategy |
| --- | --- | --- | --- | --- |
| Services listing (4 categories + service grid) | `/services` | `serviceCategory`, `service` | `sections/ServiceCategoryGroup`, `ui/ServiceCard` | Seed 4 canon categories + canon service names; outcome copy placeholder |
| Service detail | `/services/[slug]` | `service` | `sections/ServiceDetail` | Body/outcomes placeholder, on-voice; `isPlaceholder: true` |
| Industries callout | `/services` | `service.relatedIndustries` | `sections/IndustriesCallout` | Canon industries (education, K–12, Web3 ed, gamification) |

### Products (canon-only; not in `website-plan/` parts)

| Spec | Route | CMS collection | Components | Placeholder strategy |
| --- | --- | --- | --- | --- |
| Products listing | `/products` | `product` | `sections/ProductGrid`, `ui/ProductCard` | 3 canon IP titles; `developmentStatus: tbd` |
| Product detail | `/products/[slug]` | `product` | `sections/ProductDetail`, `sections/ProductMedia` | "Media coming soon" state; no fake "released" claims |

### About (Part 4)

| Section (P4) | Route | CMS collection | Components | Placeholder strategy |
| --- | --- | --- | --- | --- |
| Hero | `/about` | `aboutPage` | `sections/AboutHero` | Headline from canon overview |
| Our Story (+ optional timeline) | `/about` | `aboutPage.storySections` | `sections/OurStory` | Canon beats only (founded 2024, HQ) |
| Mission / Vision / Values | `/about` | `aboutPage.mission/vision/motto/values` | `sections/MissionVisionValues`, `ui/ValueCard` | Vision **labeled**; motto **Create. Play. Inspire.** |
| Team grid (6 members) | `/about` | `teamMember` | `sections/TeamGrid`, `ui/TeamMemberCard` | Canon names/roles; "Bio coming soon" + placeholder photo |
| Kami-chan (optional) | `/about` | `aboutPage` | `sections/KamiChanIntro` | Copy from mascot canon; concept-art placeholder |
| CTA → Contact | `/about` | `siteSettings.globalCtas` | `sections/ContactCTA` (reuse) | → `/contact` |

### Community (canon-only; not in `website-plan/` parts)

| Spec | Route | CMS collection | Components | Placeholder strategy |
| --- | --- | --- | --- | --- |
| Community feed + type filters | `/community` | `communityItem` | `sections/CommunityFeed`, `ui/CommunityCard`, `ui/TypeFilter` | All items placeholder; philosophy from culture/partnerships canon |

### Contact (Part 5 says Google Form → canon overrides to external links)

| Spec | Route | CMS collection | Components | Placeholder strategy |
| --- | --- | --- | --- | --- |
| Hero + intro | `/contact` | `contactPage` | `sections/ContactHero` | Copy from messaging canon |
| ~~Google Form embed~~ | **Removed** | — | — | **No form, no `NEXT_PUBLIC_CONTACT_FORM_URL`** — canon invariant |
| Direct contact methods | `/contact` | `contactPage.channels`, `siteSettings.socialLinks` | `sections/ContactMethods`, `ui/ContactCard` | Facebook / LinkedIn / mailto; placeholder `#` + "Coming soon" until URLs provided |
| FAQ (optional) | `/contact` | `contactPage` / from `docs/ai/faq.md` | `sections/ContactFAQ`, `ui/Accordion` | Answers from `ai/faq.md` canon only |
| Sidebar (optional) | `/contact` | `siteSettings` | `sections/ContactSidebar` | Location/founded from canon |

### Trust elements (Part 5)

| Element | Location | CMS | Placeholder strategy |
| --- | --- | --- | --- |
| Client/partner logos | Home | `partner` (placeholder) | Generic slots; never fabricate |
| Awards | Home | `award` (placeholder) | Labeled; no invented counts |
| Testimonials | **Not v1** | — | Add only when real canon quotes exist |
| Studio stats | Home / About (optional) | `siteSettings` / canon | Canon values only, else omit |

### Deferred (Part 4 News + Press Kit)

| Spec | Decision | Rationale |
| --- | --- | --- |
| `/news` route | **Deferred** | Vision item per `project-overview.md` out-of-scope + `ai-workflow-rules.md`. Optional external-link teaser on Home only if a genuine need appears. |
| `/pres` press kit | **Deferred** | Out of v1 scope; assets available in `docs/assets/` when built. Tracked in Open Questions. |

---

## 4. Resolved Conflicts (task table, finalized)

| `website-plan/` says | Canon says | **Resolution** |
| --- | --- | --- |
| Awards, client logos, testimonials as trust proof | Placeholder-first; no fake proof | Generic placeholder blocks sourced from CMS, labeled placeholder; **testimonials excluded v1** |
| Optional `/news` teaser + `/news` route | Blog/press out of v1 | **Skip `/news` route.** No homepage news teaser in v1 unless a real external feed exists |
| Press Kit `/pres` (Part 4) | Out of v1 | **Defer**; note in Open Questions |
| (silent) Products, Community | In v1 scope per canon | **Add `/products`, `/products/[slug]`, `/community` phases** |
| Contact Google Form embed | External links only, no forms | **External links only** (Facebook, LinkedIn, mailto). No Google Form, no form env var |
| Portfolio 6-category 3-level IA | `/portfolio/[slug]` case studies | **Canon `/portfolio` + `/portfolio/[slug]`**; disciplines become optional tags/filters; adopt P3 visual treatment |
| No `/services` route | `/services` + `/services/[slug]` | **Build canon Services routes** |
| Static JSON now, CMS later | Headless CMS + typed fallbacks now | **CMS layer (default Sanity) + typed fallbacks** from day one |
| 5-link nav (Portfolio/News/About/Press/Contact) | 7-section nav | **7-section nav** (Home, About, Services, Products, Portfolio, Community, Contact) |
| FAQ from `consultation-process.md` | That doc is a known duplicate | Use **`docs/ai/faq.md`** for FAQ content |

---

## 5. Phased Roadmap

Each phase ≈ one PR / one session. Phases are independently mergeable and
verifiable. Dependencies are explicit. Validation commands assume PowerShell.

### Phase 0 — Decisions & Tracker Setup ✅ (this planning task)

- **Goal:** Reconcile specs, choose CMS, record decisions.
- **Files:** `context/website-plan/IMPLEMENTATION-PLAN.md` (new), `context/progress-tracker.md` (update).
- **Decisions made:** CMS defaulted to **Sanity** (confirmation pending); canon IA wins over `website-plan/` IA; contact = external links; `/news` + `/pres` deferred; Products + Community added.
- **NOT in scope:** any code, any `app/`/`lib/`/`components/` changes, any `docs/` change.
- **Validation:** both context files updated; no code diff.

### Phase 1 — Design Foundation

- **Goal:** Replace stock template styling with Kamiyon design tokens + fonts (light mode only).
- **Files:** `app/globals.css` (rewrite `@theme`), `app/layout.tsx` (fonts + lang), remove dark-mode media query.
- **Details:** Part 6 tokens — `--bg-primary #FFFFFF`, `--bg-secondary #FAFAFA`, `--bg-accent #FFF5F7`, `--text-primary #1A1A1A`, `--text-secondary #6B7280`, `--text-muted #9CA3AF`, `--color-sakura #f97695`, `--border-default rgba(26,26,26,0.12)`; radius/shadow/spacing scales; type scale. Load **Poppins** (`--font-sans`) + **Montserrat** (`--font-display`) via `next/font/google`. Map `ui-context.md` semantic tokens. Mark TBD colors (ivory/charcoal/indigo/gold) with a comment — do not invent hex.
- **Dependencies:** none.
- **NOT in scope:** components, pages, dark mode, Beaufort font.
- **Validation:** `npm run build`; tokens resolve; no dark-mode styles.

### Phase 2 — App Shell

- **Goal:** Global chrome + SEO defaults.
- **Files:** `components/layout/PageShell.tsx`, `SiteHeader.tsx`, `MainNav.tsx`, `Logo.tsx`, `SiteFooter.tsx`; `app/layout.tsx` (metadata + shell); `app/not-found.tsx`; `components/ui/Button.tsx`, `Container.tsx`.
- **Details:** Header with **7-section nav** + sticky/scroll shadow + mobile drawer (`"use client"` only for toggle); Footer 4-column with social **placeholders**; skip-to-content link; semantic landmarks; SEO title template `%s | Kamiyon Studio` + default description from positioning canon; JSON-LD `Organization`.
- **Dependencies:** Phase 1.
- **NOT in scope:** page content, CMS wiring (use static nav config), News/Press links.
- **Validation:** `npm run build`; header/footer render on a stub page; keyboard nav + focus visible.

### Phase 3 — CMS Layer

- **Goal:** Typed CMS client, queries, types, and typed fallback stubs for every collection.
- **Files:** `lib/cms/client.ts`, `queries.ts`, `types.ts`, `fallbacks/{home,about,services,products,portfolio,community,contact,site-settings}.ts`; Sanity schemas + seed placeholder docs (in a `studio/` or `sanity/` workspace); `.env.example` (`CMS_PROJECT_ID`, `CMS_DATASET`, `CMS_API_TOKEN`).
- **Details:** One `get*` function per collection returning typed result or `null`. Fallbacks mirror CMS shapes exactly; canon facts copied verbatim with source-path comments; `isPlaceholder: true` on stub entries. Validate env at client init. All collections from `architecture.md` CMS model.
- **Dependencies:** Phase 0 (CMS choice).
- **NOT in scope:** rendering pages; visual components; real content.
- **Validation:** `npm run build`; unit test fallback resolution (`getX() ?? xFallback`); type-check passes with `strict`.

### Phase 4 — Homepage

- **Goal:** Home page wired to CMS with fallbacks (Parts 1, 2, 6).
- **Files:** `app/page.tsx`; `components/sections/{Hero,ClientsPartners,ServicesSummary,AwardsHighlight,FeaturedWork,ContactCTA}.tsx`; `components/ui/{ServiceCard,Badge}.tsx`.
- **Details:** Sections per Part 2 flow; services cards → `/services`; awards/clients = labeled placeholders; `generateMetadata` from CMS; hero LCP image via `next/image` priority.
- **Dependencies:** Phases 1–3.
- **NOT in scope:** other routes; News teaser (omit); Google Form.
- **Validation:** `npm run build`; `/` renders from fallbacks with empty CMS; AA contrast spot-check.

### Phase 5 — Portfolio

- **Goal:** Listing + case-study detail (Part 3 visuals, canon IA).
- **Files:** `app/portfolio/page.tsx`, `app/portfolio/[slug]/page.tsx`; `components/sections/{PortfolioListing,CaseStudy,ProjectGallery,ProjectSidebar,EmptyState}.tsx`; `components/ui/ProjectCard.tsx`.
- **Details:** `generateStaticParams` from CMS slugs; detail = challenge/solution/impact/lessons in hero+gallery+sidebar layout; discipline filter chips (optional, no sub-routes); `notFound()` for missing slug; breadcrumb + per-project SEO + `BreadcrumbList` JSON-LD.
- **Dependencies:** Phases 2–3.
- **NOT in scope:** `/portfolio/[category]` routes; fabricated clients/metrics.
- **Validation:** `npm run build`; listing + a placeholder detail render; 404 on bad slug.

### Phase 6 — About + Services

- **Goal:** About page + Services listing/detail.
- **Files:** `app/about/page.tsx`; `app/services/page.tsx`, `app/services/[slug]/page.tsx`; `components/sections/{AboutHero,OurStory,MissionVisionValues,TeamGrid,KamiChanIntro,ServiceCategoryGroup,ServiceDetail,IndustriesCallout}.tsx`; `components/ui/{ValueCard,TeamMemberCard}.tsx`.
- **Details:** About per Part 4 (mission/vision/values, 6 canon team members, Vision labeled, motto); Services = 4 canon categories + service names, outcome copy placeholder; `generateStaticParams` for service slugs.
- **Dependencies:** Phases 2–3.
- **NOT in scope:** press kit; separate Team page; hardcoded bios.
- **Validation:** `npm run build`; `/about`, `/services`, one `/services/[slug]` render.

### Phase 7 — Trust + Contact

- **Goal:** Contact page (external links only) + trust sections polish.
- **Files:** `app/contact/page.tsx`; `components/sections/{ContactHero,ContactMethods,ContactFAQ,ContactSidebar}.tsx`; `components/ui/{ContactCard,Accordion}.tsx`.
- **Details:** Facebook / LinkedIn / mailto cards with placeholder `#` + "Coming soon" until canon URLs; optional FAQ accordion from `docs/ai/faq.md`; `FAQPage` JSON-LD if FAQ present; external links `rel="noopener noreferrer" target="_blank"`.
- **Dependencies:** Phases 2–3.
- **NOT in scope:** Google Form, Calendly, form API, auth, custom thank-you route.
- **Validation:** `npm run build`; `/contact` renders; no form element; links correct.

### Phase 8 — Products + Community

- **Goal:** Canon-only sections not covered by `website-plan/` parts.
- **Files:** `app/products/page.tsx`, `app/products/[slug]/page.tsx`, `app/community/page.tsx`; `components/sections/{ProductGrid,ProductDetail,ProductMedia,CommunityFeed}.tsx`; `components/ui/{ProductCard,CommunityCard,TypeFilter}.tsx`.
- **Details:** 3 canon IP product pages (`developmentStatus: tbd`, "Media coming soon"); community feed with type filters, all placeholder items; `generateStaticParams` for product slugs.
- **Dependencies:** Phases 2–3.
- **NOT in scope:** fake release dates/status; real event data.
- **Validation:** `npm run build`; `/products`, one `/products/[slug]`, `/community` render.

### Phase 9 — Polish (SEO / A11y / Responsive / Assets)

- **Goal:** Cross-cutting quality pass (Part 6).
- **Files:** all `app/**/page.tsx` (`generateMetadata` per route), `lib/seo/`, `app/sitemap.ts`, `app/robots.ts`, `public/` (migrated assets), section components (responsive/a11y fixes).
- **Details:** Per-route SEO + OG per Part 6 SEO table; WCAG AA audit (contrast, focus, headings, alt text, 48px targets, `prefers-reduced-motion`); breakpoints 390/768/1280/1440; migrate needed assets from `docs/assets/` → `public/` (or upload to CMS) — do **not** modify `docs/`.
- **Dependencies:** Phases 4–8.
- **NOT in scope:** new features; TBD color finalization (still gated on canon).
- **Validation:** `npm run build`; `npm run lint`; manual a11y checklist from Part 6.

### Phase 10 — Verification

- **Goal:** Test infrastructure + coverage + green build.
- **Files:** test config (Vitest + Testing Library recommended; Playwright for E2E), `lib/**/*.test.ts`, `components/sections/**/*.test.tsx`, E2E smoke spec.
- **Details:** Unit test fallback resolution + type guards; integration test CMS queries with mocked responses; E2E smoke that every route renders (`/`, `/about`, `/services`, `/services/[slug]`, `/products`, `/products/[slug]`, `/portfolio`, `/portfolio/[slug]`, `/community`, `/contact`, 404); target **80%+** coverage on new `lib/` and section components (workspace testing rule).
- **Dependencies:** Phases 1–9.
- **NOT in scope:** production deploy (target TBD).
- **Validation:** `npm run build`; `npm run lint`; `npm test` (or `npx vitest run --coverage`); `npx playwright test`.

---

## 6. Open Questions

1. **CMS confirmation** — Defaulted to **Sanity** (per `architecture.md` recommendation). Needs team sign-off before Phase 3.
2. **`/news` route** — Deferred/skipped for v1 (Vision item). Confirm no external news feed is required at launch.
3. **Press Kit `/pres`** — Deferred. Assets exist in `docs/assets/`; revisit post-v1.
4. **Social URLs** — Facebook + LinkedIn URLs and public email still TBD in canon. Placeholder `#` + "Coming soon" until provided.
5. **Brand color hex** — Warm Ivory, Charcoal, Deep Indigo, Soft Gold are TBD (only Sakura `#f97695` confirmed). Extract from `brand-kit.png` in a canon update; do not invent.
6. **Portfolio taxonomy** — Canon `caseStudy` model adopted over the v2.0 6-category IA. If discipline-based browsing is later desired, add it as tag filters (no new routes) or reconsider IA — flagged as a divergence for review.
7. **Contact policy** — Confirmed external links only; Google Form from Part 5 intentionally dropped. Confirm no lead-capture form is required for v1.
8. **Next.js 16.2 docs** — `node_modules/next/dist/docs/` referenced by `AGENTS.md` is absent; verify exotic APIs against installed types/official docs during implementation.
9. **Test stack** — No runner installed; propose Vitest + Testing Library + Playwright (confirm in Phase 10).
10. **Deployment target** — Vercel assumed; confirm host + env var handling.
11. **Beaufort for LoL** — decorative hero font requires license check before production use.
12. **Product development status** — canon states "Original IP" only; per-product status defaults to `tbd` until canon provides it.

---

## 7. Guardrails (enforce every phase)

- No fabricated clients, awards, testimonials, metrics, release dates, social URLs, or email.
- No company facts hardcoded in JSX — CMS or typed fallbacks (canon copied verbatim + cited) only.
- No contact form, Calendly, auth, or in-app admin.
- Light mode only; tokens only (no ad-hoc hex); motto **Create. Play. Inspire.**; Vision content labeled.
- `docs/` is read-only. Update `context/progress-tracker.md` after each phase.
- Every phase ends green: `npm run build` (+ `npm run lint` / tests once they exist).
