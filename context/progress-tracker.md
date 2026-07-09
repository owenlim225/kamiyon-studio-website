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

**Phase 8 — Products + Community** — complete. `/products`, `/products/[slug]` (3 canon IP titles), and `/community` are live on CMS + typed fallbacks. **Phase 9 (Polish) is next.**

## Current Goal

Products and Community are live end-to-end on fallbacks. Next: Phase 9 — per-route SEO/OG, WCAG AA pass, responsive breakpoints, asset migration `docs/assets/` → `public/` per `context/website-plan/IMPLEMENTATION-PLAN.md` Phase 9.

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
- [x] **Phase 4 — Homepage**
  - [x] `app/page.tsx` rewritten as an async Server Component: fetches `getHomePage()`, `getProducts()`, `getCaseStudies()` in parallel and resolves each via `resolveWithFallback` against `homePageFallback` / `productsFallback` / `caseStudiesFallback`
  - [x] `generateMetadata()` sources title/description from `homePage.seo` (CMS or fallback)
  - [x] Added `components/sections/{Hero,Mission,FeaturedWork,Highlights,ContactCTA}.tsx` — one per `HomePage.blocks` union member (`hero`, `mission`, `featuredWork`, `highlights`, `ctaBanner`); rendered in the canon Home layout order from `ui-context.md` (hero → mission band → featured grid → highlights → CTA banner)
  - [x] `FeaturedWork` resolves `featuredProductSlugs` / `featuredCaseStudySlugs` against fetched `Product[]` / `CaseStudy[]` and links to `/products/[slug]` and `/portfolio/[slug]` (routes land in Phases 5 and 8); each card shows a "Coming soon" `Badge` when `isPlaceholder`/placeholder data is used; renders an honest empty state if no featured items resolve
  - [x] Added `components/ui/Badge.tsx` (placeholder/info pill) — reused by `FeaturedWork`
  - [x] Added `lib/cms/image.ts` — resolves a Sanity `CmsImage` to a servable URL via `@sanity/image-url` (new direct dependency), returns `null` when unconfigured so `Hero` can fall back to a branded placeholder panel instead of a broken `next/image` src
  - [x] `Hero` includes a static secondary quick-link row (Services / Products / Contact) satisfying the canon "Secondary CTAs" requirement without new CMS fields
  - [x] `npm run test` ✅ · `npm run lint` ✅ · `npm run build` ✅ (`/` prerendered as static content) · verified rendered HTML output shows all five sections + fallback content correctly
- [x] **Phase 5 — Portfolio**
  - [x] `app/portfolio/page.tsx` — static `generateMetadata`; fetches `getCaseStudies()` resolved against `caseStudiesFallback`; renders `PortfolioListing`
  - [x] `app/portfolio/[slug]/page.tsx` — `generateStaticParams` from CMS-or-fallback slugs; `generateMetadata` from `caseStudy.seo`; resolves CMS-or-fallback-by-slug and calls `notFound()` when neither has the slug; renders a `BreadcrumbList` JSON-LD (Home → Portfolio → project, relative hrefs since no production domain is confirmed yet) + `CaseStudy`
  - [x] Added `components/sections/{PortfolioListing,CaseStudy,ProjectGallery,ProjectSidebar,EmptyState}.tsx` and `components/ui/ProjectCard.tsx`
  - [x] `CaseStudy` renders challenge/solution/impact/lessonsLearned as headed sections in a ~65/35 gallery+sidebar layout (desktop), per `website-plan/03-PORTFOLIO...` visual treatment, adapted to the canon `/portfolio/[slug]` IA (no `/portfolio/[category]` route)
  - [x] `ProjectGallery` renders CMS gallery images via `getCmsImageUrl`, or an honest "Gallery coming soon." placeholder when empty
  - [x] `ProjectSidebar` shows client/industry/published-date metadata + "Discuss a similar project" CTA → `/contact`; industry links back to `/portfolio` in lieu of a discipline filter/category route
  - [x] `EmptyState` (new, reusable) shown on `/portfolio` if the case-study list is ever empty
  - [x] Deliberately did **not** build `/portfolio/[category]` routes or a 6-discipline filter UI — see Architecture Decisions for rationale (canon override already recorded in Phase 0; `caseStudy.industry` is free text, not a fixed 6-value enum, so a filter chip UI isn't backed by the schema yet)
  - [x] `npm run test` ✅ · `npm run lint` ✅ · `npm run build` ✅ (`/portfolio` static, `/portfolio/[slug]` SSG — `sample-client-project-placeholder` prerendered) · verified rendered HTML for both routes (listing card, breadcrumb JSON-LD, sections, sidebar, empty-gallery state)
- [x] **Phase 6 — About + Services**
  - [x] `app/about/page.tsx` — `generateMetadata` from `aboutPage.seo`; fetches `getAboutPage()` + `getTeamMembers()` in parallel, resolved against `aboutPageFallback` / `teamMembersFallback`; renders the canon About layout (Hero → Story → Vision → Values → Team → Culture closing)
  - [x] Added `components/sections/{AboutHero,OurStory,VisionBand,ValuesGrid,TeamGrid,CultureClosing}.tsx` and `components/ui/TeamMemberCard.tsx`
  - [x] `AboutHero` renders `aboutPage.motto` as the headline and `aboutPage.mission` as the supporting line (no new CMS fields added — reuses existing `aboutPage` schema fields as the closest canon-backed hero content) plus a static in-page quick-link row (`#values`, `#team`, `/contact`)
  - [x] `VisionBand` renders `aboutPage.vision` behind an explicit "Vision — long-term aspiration" `Badge`, satisfying the canon invariant that Vision content is never presented as current fact
  - [x] `TeamMemberCard` renders `getCmsImageUrl(member.photo)` or a rounded-rectangle initials avatar (via new `lib/team/initials.ts`) when no photo is set — matches `ui-context.md`'s "Team photos: initials avatar or generic silhouette" guidance instead of the CaseStudy precedent's plain emoji placeholder
  - [x] `app/services/page.tsx` — static `generateMetadata` (page-level copy, same precedent as `/portfolio`); fetches `getServiceCategories()` + `getServices()` resolved against fallbacks; renders `ServicesListing`
  - [x] `app/services/[slug]/page.tsx` — `generateStaticParams` from CMS-or-fallback service slugs; `generateMetadata` from `service.seo`; resolves CMS-or-fallback-by-slug and calls `notFound()` when neither has the slug; renders a `BreadcrumbList` JSON-LD (Home → Services → service) + `ServiceDetail`
  - [x] Added `components/sections/{ServicesListing,ServiceIndustries,ServiceDetail,ServiceSidebar}.tsx` and `components/ui/{ServiceCard,PortableText}.tsx`
  - [x] `ServicesListing` groups services under their category via new `lib/services/group-by-category.ts` (categories always render, even with zero matching services, showing an honest "More services coming soon." message instead of hiding the category) and renders a global "Industries we work with" band via `ServiceIndustries` + new `lib/services/related-industries.ts` (deduplicates `relatedIndustries` across all services at render time — same cross-referencing pattern as Phase 4's `FeaturedWork` slug resolution)
  - [x] `ServiceDetail` renders category label, title, summary, and `service.body` (Sanity portable text) via new minimal `components/ui/PortableText.tsx` renderer (supports `normal`/`h1`–`h4`/`blockquote` styles and `strong`/`em` marks only — the subset actually used by the schema; no `@portabletext/react` dependency added since the render needs are this small)
  - [x] `ServiceSidebar` shows outcomes + related industries + "Discuss this service" CTA → `/contact`, mirroring the `ProjectSidebar` layout precedent from Phase 5
  - [x] Added unit tests for the three new pure logic helpers: `lib/services/group-by-category.test.ts`, `lib/services/related-industries.test.ts`, `lib/team/initials.test.ts` (18 total assertions across the three files) — narrower TDD scope than full component coverage, consistent with the Phase 3 `resolve.test.ts` precedent of testing only extracted pure logic, not presentational Server Components
  - [x] `npm run test` ✅ (18/18, up from 5) · `npm run lint` ✅ · `npm run build` ✅ (`/about` static, `/services` static, `/services/[slug]` SSG — all 10 fallback service slugs prerendered) · verified rendered HTML for `/about` (hero, story, labeled vision band, all 5 values, all 6 team members with initials avatars, culture CTA), `/services` (all 4 categories grouped correctly, 10 service cards, 11 deduplicated industry tags), and `/services/game-development` (breadcrumb JSON-LD, category label, portable text body, outcomes, industries, sidebar CTA)
- [x] **Phase 7 — Trust + Contact**
  - [x] `app/contact/page.tsx` — `generateMetadata` from `contactPage.seo`; fetches `getContactPage()` resolved against `contactPageFallback`; renders `ContactHero` → two-column band (`ContactMethods` + `ContactSidebar`) → `ContactFAQ`; injects `FAQPage` JSON-LD only when `contactPage.faq.length > 0`
  - [x] Added `components/sections/{ContactHero,ContactMethods,ContactSidebar,ContactFAQ}.tsx` and `components/ui/{ContactCard,Accordion}.tsx`
  - [x] `ContactHero` renders `contactPage.headline`/`intro` plus in-page quick links (`#methods`, and `#faq` only when FAQ content exists) — same conditional-quick-link pattern precedent as `AboutHero`
  - [x] `ContactMethods` renders one `ContactCard` per `contactPage.channels` entry (Facebook/LinkedIn/email) plus `contactPage.ctaNote` when present; explicitly states there is no contact form (canon invariant, not a fabricated fact)
  - [x] `ContactCard` (new): real channels render as an external link (`mailto:` for email, `target="_blank" rel="noopener noreferrer"` for Facebook/LinkedIn); placeholder channels (`isPlaceholder: true`, true for all three today) render as a non-interactive `aria-disabled` card with a "Coming soon" `Badge` instead of a dead/misleading link
  - [x] `ContactSidebar` (new) renders canon-only studio facts — Founded `2024`, Based in `Biñan City, Laguna, Philippines` — via two new constants in `lib/seo/constants.ts` (`STUDIO_FOUNDED_YEAR`, `STUDIO_LOCATION`); deliberately omits any stat without a canon source (team size, awards, client count)
  - [x] `ContactFAQ` + new `components/ui/Accordion.tsx` (`"use client"`, single-open, `aria-expanded`/`aria-controls`/`role="region"`) render `contactPage.faq`; component returns `null` when the FAQ array is empty rather than rendering an empty section
  - [x] Added `lib/seo/faq-jsonld.ts` (`getFaqJsonLd`) — mirrors the existing `breadcrumb-jsonld.ts` precedent of a small pure JSON-LD builder computed at the page level, not inside a presentational section
  - [x] Expanded `contactPageFallback.faq` from 3 to 8 canon Q&A pairs sourced verbatim from `docs/ai/faq.md` (identity, services, industries, consultation, original products, partnerships, brand description) — the `contactPage` CMS type/query/fallback shell already existed from Phase 3, so this phase only deepened its FAQ content and built the rendering layer
  - [x] Deliberately did **not** add a Google Form, `NEXT_PUBLIC_CONTACT_FORM_URL`, Calendly embed, or custom thank-you route — canon invariant confirmed in `IMPLEMENTATION-PLAN.md` Phase 7 scope
  - [x] `npm run test` ✅ (18/18, unchanged — no new pure-logic units; see TDD note) · `npm run lint` ✅ · `npm run build` ✅ (`/contact` prerendered as static content) · verified rendered HTML directly: headline/intro, "Ways to reach us" heading, three "Coming soon" placeholder cards (no `mailto:` present, confirming placeholder channels never render as fake links), "Studio facts" sidebar with `Founded`/`2024`/location, "Frequently asked questions" heading, `FAQPage` JSON-LD script, and accordion button `contact-faq-button-0`
- [x] **Phase 8 — Products + Community**
  - [x] `app/products/page.tsx` — static `generateMetadata`; fetches `getProducts()` resolved against `productsFallback` (both already existed from Phase 3); renders `ProductGrid`
  - [x] `app/products/[slug]/page.tsx` — `generateStaticParams` from CMS-or-fallback product slugs; `generateMetadata` from `product.seo`; `getProductContent(slug)` tries `getProductBySlug` then falls back to a slug lookup in `productsFallback`, then `notFound()`; renders a `BreadcrumbList` JSON-LD (Home → Products → product) + `ProductDetail`
  - [x] `app/community/page.tsx` — static `generateMetadata`; fetches `getCommunityItems()` resolved against `communityItemsFallback`; renders `CommunityFeed`. No `/community/[slug]` route — canon scope (`IMPLEMENTATION-PLAN.md` Phase 8) is feed-only, matching `communityItem`'s lack of a dedicated detail-page CMS field beyond `body`
  - [x] Added `components/sections/{ProductGrid,ProductMedia,ProductDetail,CommunityFeed}.tsx` and `components/ui/{ProductCard,CommunityCard,TypeFilter}.tsx`
  - [x] `ProductGrid`/`ProductCard`: 3-column responsive card grid; each card shows genre, title, tagline, a `Badge` with the product's development-status label (`getDevelopmentStatusLabel`, new `lib/products/development-status.ts`), and a "Media coming soon" placeholder state when `media[0].asset` is unset (true for all 3 fallback products today, since no CMS project is configured)
  - [x] `ProductDetail`: hero (genre eyebrow, title, status badge, tagline) → `~65/35` two-column layout (same grid classes as `ServiceDetail`/`CaseStudy`) — main column renders `ProductMedia` + Overview + Key features, aside renders Project goals + Platforms + "Interested in this project?" CTA → `/contact` (same sidebar-CTA precedent as `ServiceSidebar`/`ProjectSidebar`)
  - [x] `ProductMedia` (new): renders resolved CMS media images in a grid, or an honest media-coming-soon placeholder (using the media item's own `caption` when set) when the array has no resolvable images; renders a "Watch trailer →" external link only when `product.trailerUrl` is set
  - [x] `CommunityFeed` (`"use client"`, new): the smallest client boundary needed for interactive type filtering — receives all `CommunityItem[]` as a prop (fetched server-side in `app/community/page.tsx`), holds `activeType` state, and derives the filtered list + available filter chips via two new pure functions in `lib/community/filter-by-type.ts` (`getAvailableTypes`, `filterCommunityItemsByType`); renders the existing `EmptyState` when a filter yields zero results
  - [x] `TypeFilter` (new, presentational, no `"use client"` of its own — bundled into the client boundary via `CommunityFeed`'s import): filter chip row with an "All" option plus one chip per type actually present in the fetched items (via `getAvailableTypes`, not a static enum list — avoids showing empty filter categories); `aria-pressed` + `role="group"` for a11y
  - [x] `CommunityCard` (new): renders type label (`getCommunityTypeLabel`, new `lib/community/type-labels.ts`) + optional formatted date, title, summary, optional location, a "Coming soon" `Badge` for placeholder items, and an external `Learn more →` link only when `externalUrl` is set (no internal detail route exists, matching the feed-only IA)
  - [x] Added unit tests for the two new pure filtering functions before wiring them into `CommunityFeed`: `lib/community/filter-by-type.test.ts` (`getAvailableTypes` — empty input, dedupe, first-seen order; `filterCommunityItemsByType` — `"all"` pass-through, type match, no-match empty array)
  - [x] `npm run test` ✅ (24/24, up from 18 — 6 new assertions) · `npm run lint` ✅ · `npm run build` ✅ (`/products` static, `/products/[slug]` SSG — all 3 fallback product slugs prerendered: `eclipse`, `vocabu-wildlife-edition`, `afterschool-cleanup`; `/community` static) · verified rendered HTML directly for all three routes: `/products` (all 3 product cards, correct genres/taglines, "Status: TBD" badges, media-coming-soon placeholders), `/products/eclipse` (breadcrumb JSON-LD, status badge, media-coming-soon state, overview, 3 features, 3 project goals, `PC` platform tag, contact CTA), and `/community` (type filter chips reading "All"/"Workshop"/"Partnership" derived from the 2 fallback items, both cards rendering correct type label, title, summary, and "Coming soon" badge)

## In Progress

- None

## Next Up

Per `context/website-plan/IMPLEMENTATION-PLAN.md` (each ≈ one PR / session):

1. ~~**Phase 1 — Design foundation**~~ ✅ complete
2. ~~**Phase 2 — App shell**~~ ✅ complete
3. ~~**Phase 3 — CMS layer**~~ ✅ complete
4. ~~**Phase 4 — Homepage**~~ ✅ complete
5. ~~**Phase 5 — Portfolio**~~ ✅ complete
6. ~~**Phase 6 — About + Services**~~ ✅ complete
7. ~~**Phase 7 — Trust + Contact**~~ ✅ complete
8. ~~**Phase 8 — Products + Community**~~ ✅ complete
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
| Phase 4 Home section scope | 5 sections only: Hero, Mission, Featured Work, Highlights, Contact CTA — no Clients/Partners or Awards sections | `IMPLEMENTATION-PLAN.md`'s reconciliation matrix listed `website-plan/` Part 2 ideas (`ClientsPartners`, `AwardsHighlight`) as components to build, but `architecture.md`'s actual `homePage` CMS model (built in Phase 3) and `project-overview.md`'s canon Home feature list only define hero/mission/featuredWork/highlights/ctaBanner — canon has zero award or client/partner data, so adding those sections now would mean inventing placeholder content outside the approved schema |
| Featured work slug resolution | `FeaturedWork` cross-references `homePage.featuredWork` slugs against fetched `Product[]`/`CaseStudy[]` at render time (not stored denormalized) | Keeps `homePage` CMS content decoupled from product/case-study content; matches the reference-array shape already defined in `architecture.md`'s `homeBlock.featuredWork` |
| CMS image resolution | Added `lib/cms/image.ts` using `@sanity/image-url` (new direct dependency) | Sanity image refs (`{_ref}`) are not directly usable as a `next/image` `src`; a URL builder is required. Added as an explicit dependency (was previously only a transitive dep of `sanity`) rather than relying on hoisting |
| Phase 5 Portfolio IA (confirmed in code) | `/portfolio` + `/portfolio/[slug]` only — no `/portfolio/[category]` route, no discipline filter chips | Re-confirms the Phase 0 canon override of `website-plan/03-PORTFOLIO...`'s 3-level category IA; `caseStudy.industry` is free text (not the spec's fixed 6-discipline enum), so a filter UI isn't backed by the existing schema — would need a Phase 3 schema change, out of Phase 5 scope |
| Breadcrumb JSON-LD URLs | Relative hrefs (`/portfolio/[slug]`) instead of absolute URLs | Deployment target is still TBD (open question); mirrors the existing `organization-jsonld.ts` precedent of omitting a fabricated absolute site URL |
| Case study detail 404 handling | `getCaseStudyContent(slug)` checks CMS first, then linearly searches `caseStudiesFallback` by slug, then calls `notFound()` | Keeps the same CMS-then-fallback resolution order as everywhere else, while still producing a real 404 for genuinely unknown slugs (required by the Phase 5 validation criterion) |
| About Hero content source | `AboutHero` reuses `aboutPage.motto` (headline) + `aboutPage.mission` (subheadline) instead of adding new `heroHeadline`/`heroSubheadline` fields | `aboutPage` has no dedicated hero block in the Phase 3 schema; motto/mission are the closest canon-backed marketing copy already in the model — same "no new CMS fields" discipline as Phase 4's Hero secondary-link row |
| Vision presentation (About) | Dedicated `VisionBand` section renders `aboutPage.vision` behind an explicit "Vision — long-term aspiration" `Badge`, separate from the Mission text in the Hero | Directly satisfies the `architecture.md` invariant that Vision content is never presented as current fact; keeping it as its own labeled section (rather than folding it into Hero/Values copy) makes the distinction visually unambiguous |
| Team photo placeholder style | `TeamMemberCard` renders initials avatars (via `lib/team/initials.ts`) instead of a generic emoji placeholder when `member.photo` is unset | `ui-context.md`'s Placeholder Media Guidelines specifically calls for "initials avatar or generic silhouette" for team photos — a different placeholder rule than case studies/products, which use the sakura emoji |
| Service body rendering | Added a minimal `components/ui/PortableText.tsx` (supports `normal`/heading styles + `strong`/`em` marks only) instead of installing `@portabletext/react` | `service.body` is the only portable-text field rendered on the site so far and the fallback data only ever produces single `normal` paragraph blocks; a small in-house renderer covers the actual schema surface without a new dependency — revisit if `communityItem.body` (also portable text, Phase 8) needs richer marks/annotations |
| Services category grouping | New pure `lib/services/group-by-category.ts` always returns one group per category (even with 0 matching services), rendering "More services coming soon." for empty ones rather than hiding the category | Matches the placeholder-first, never-hide-structure strategy used elsewhere (e.g. `ProjectGallery`'s "Gallery coming soon." empty state) |
| Services industries callout | New pure `lib/services/related-industries.ts` deduplicates `service.relatedIndustries` across all fetched services at render time (first-seen order, no sorting) | Same cross-referencing-at-render-time pattern as Phase 4's `FeaturedWork` slug resolution — keeps `service` documents as the single source of truth instead of maintaining a separate CMS-managed industries list |
| Phase 6 testing scope | Added unit tests only for the three new pure logic helpers (`groupServicesByCategory`, `getUniqueIndustries`, `getInitials`) — no component/E2E tests for the new About/Services Server Components | Continues the Phase 3–5 precedent (`resolve.test.ts`, inline `formatPublishedDate`) of testing extracted pure logic and deferring presentational-component/E2E coverage to Phase 10 |
| Placeholder contact channels render as disabled cards, not dead links | `ContactCard` renders `isPlaceholder` channels as a non-interactive `aria-disabled` `<span>` with a "Coming soon" `Badge`, instead of an `<a href="#">` | An `<a href="#">` would be keyboard-focusable and appear clickable while doing nothing — worse a11y and UX than an honestly-disabled placeholder; matches the "never fabricate/mislead" guardrail applied to a link affordance instead of just text content |
| FAQ JSON-LD computed at page level | New `lib/seo/faq-jsonld.ts` (`getFaqJsonLd`) is called from `app/contact/page.tsx`, not inside `ContactFAQ` | Mirrors the existing `getBreadcrumbJsonLd` precedent from Phase 5 — JSON-LD scripts are a page-level SEO concern, not a Server Component's rendering responsibility |
| Studio facts sidebar sourced from new SEO constants | `ContactSidebar` reads `STUDIO_FOUNDED_YEAR`/`STUDIO_LOCATION` from `lib/seo/constants.ts` rather than a CMS field | These are static canon facts (`docs/company/overview.md`) already duplicated as literals in `organization-jsonld.ts`'s `foundingDate`/`address`; promoting them to named constants avoids introducing a third hardcoded copy without adding CMS schema scope creep for Phase 7 |
| Phase 7 testing scope | No new pure-logic unit added; test count stays at 18/18 | `Accordion`'s open/closed state and `ContactCard`'s href derivation are both trivial single-branch logic embedded in presentational components (same threshold `ProjectSidebar`'s `formatPublishedDate` used in Phase 5 to justify skipping an isolated unit test) — broader component/E2E coverage remains Phase 10 scope |
| Community filter state lives in `CommunityFeed`, not `TypeFilter` | `CommunityFeed` is the sole `"use client"` boundary for the `/community` route; `TypeFilter` and `CommunityCard` stay plain presentational components that receive props/callbacks | Matches the existing "smallest client boundary" precedent (`Accordion` in Phase 7); avoids marking more of the community section as client-rendered than strictly needed for the filter interaction |
| Filter chips derived from data, not a static `CommunityItemType` enum list | `TypeFilter` receives `types` from `getAvailableTypes(items)` (first-seen order across the actual fetched items) rather than iterating all 7 enum values | Prevents showing empty filter chips for types with zero current items (e.g. `hackathon`, `game-jam`, `speaking`, `education`, `other` all have zero fallback items today) — same "don't show structure with nothing behind it" instinct as `ServicesListing`'s per-category coming-soon text, applied in the opposite direction (hide instead of label) since a filter chip with 0 results is pure noise, not a placeholder-worthy content gap |
| No `/community/[slug]` detail route | Community section is `/community` feed-only; `CommunityCard` links externally (`externalUrl`) when present, otherwise is not a link at all | Re-confirms the Phase 0/`IMPLEMENTATION-PLAN.md` Phase 8 scope (feed + type filters only, no detail route in the Spec Reconciliation Matrix); `communityItem.body` (portable text) is fetched by `getCommunityItems()` but intentionally unused until a detail route is scoped |
| Product development-status shown as a card/detail badge, not separate copy | `getDevelopmentStatusLabel` (new `lib/products/development-status.ts`) maps the 4 enum values to display labels reused by both `ProductCard` and `ProductDetail` | Single source of truth for the label text avoids drifting copy between the grid and detail views; mirrors the `getCommunityTypeLabel`/`getDevelopmentStatusLabel` pairing as the same kind of trivial-lookup helper Phase 7's `ContactCard` established as below the unit-test threshold |

## Session Notes

### 2026-07-10 — Phase 8 implementation session

**Files added/changed:** `app/products/page.tsx`, `app/products/[slug]/page.tsx`, `app/community/page.tsx`, `components/sections/{ProductGrid,ProductMedia,ProductDetail,CommunityFeed}.tsx`, `components/ui/{ProductCard,CommunityCard,TypeFilter}.tsx`, `lib/products/development-status.ts`, `lib/community/{type-labels,filter-by-type,filter-by-type.test}.ts`, `context/progress-tracker.md`.

**What was implemented:**
- `app/products/page.tsx` / `app/products/[slug]/page.tsx`: same CMS-then-fallback-then-`notFound()` pattern as `/services`/`/services/[slug]` and `/portfolio`/`/portfolio/[slug]`; `generateStaticParams` prerenders all 3 canon fallback slugs (`eclipse`, `vocabu-wildlife-edition`, `afterschool-cleanup`); breadcrumb JSON-LD via the existing `getBreadcrumbJsonLd` helper.
- `ProductGrid`/`ProductCard`: responsive 3-column grid; each card shows genre, title, tagline, a development-status `Badge`, and a "Media coming soon" placeholder (true for all 3 products today, since `productsFallback` media entries have no `asset`).
- `ProductDetail`: `~65/35` layout reusing the `ServiceDetail`/`CaseStudy` grid precedent — main column (`ProductMedia`, Overview, Key features), aside (Project goals, Platforms, "Interested in this project?" → `/contact` CTA).
- `ProductMedia` (new): resolves CMS media via `getCmsImageUrl`; renders an honest coming-soon placeholder using the media item's own `caption` when no image resolves; renders a trailer link only when `trailerUrl` is set.
- `app/community/page.tsx`: fetches `getCommunityItems()` resolved against `communityItemsFallback` (both already existed from Phase 3); renders `CommunityFeed`. No `/community/[slug]` — feed-only per canon scope.
- `CommunityFeed` (new `"use client"` section): the only client boundary for this route; holds `activeType` filter state; derives the filter-chip list and filtered items via two new pure functions in `lib/community/filter-by-type.ts`.
- `TypeFilter` + `CommunityCard` (new `ui` primitives): `TypeFilter` renders "All" plus one chip per type actually present in the data (never a fixed 7-value list); `CommunityCard` shows type label, optional date/location, summary, "Coming soon" badge, and an external link only when `externalUrl` is set.
- Added `lib/products/development-status.ts` (`getDevelopmentStatusLabel`) and `lib/community/type-labels.ts` (`getCommunityTypeLabel`) — simple enum-to-label lookup helpers shared between grid/card and detail views.
- Wrote `lib/community/filter-by-type.test.ts` first (RED — confirmed failing on missing module), then implemented `getAvailableTypes`/`filterCommunityItemsByType` (GREEN) before wiring them into `CommunityFeed`, mirroring the Phase 6 `getUniqueIndustries` TDD precedent exactly.

**Verification:** `npm run test` ✅ (24/24, up from 18 — 6 new assertions in `filter-by-type.test.ts`) · `npm run lint` ✅ · `npm run build` ✅ (`/products` static, `/products/[slug]` SSG with all 3 canon slugs, `/community` static). Read the generated static HTML directly to confirm: `/products` (all 3 product cards with correct genre/title/tagline/status-badge/media-placeholder), `/products/eclipse` (breadcrumb JSON-LD, status badge, media-coming-soon block, overview paragraph, 3 key features, 3 project goals, `PC` platform tag, "Interested in this project?" CTA linking to `/contact`), and `/community` (filter chips "All"/"Workshop"/"Partnership" — correctly derived from only the 2 types present in `communityItemsFallback`, not all 7 enum values — plus both cards rendering with correct type label, title, summary, and "Coming soon" badge).

**TDD note:** Followed RED→GREEN for the two new pure community-filter functions (test written and run-to-fail before the implementation existed), consistent with the Phase 6 precedent. `getDevelopmentStatusLabel`/`getCommunityTypeLabel` (single-branchless `Record` lookups) and the new presentational components remain untested in isolation — same "trivial lookup, no branching" threshold Phase 7 used for `ContactCard`'s href derivation. Broader component/E2E coverage remains Phase 10 scope.

**Deviations from plan:** None structural. `IMPLEMENTATION-PLAN.md`'s Phase 8 file list named `ui/TypeFilter` and this session kept it purely presentational (no `"use client"` of its own) rather than making it a second client component — an implementation-level choice, not a scope change. The `product`/`communityItem` CMS types, queries, and fallback data all already existed from Phase 3 and needed no changes.

**Next task:** Phase 9 — Polish (per-route SEO/OG for all routes, WCAG AA audit, responsive breakpoint pass, asset migration `docs/assets/` → `public/`).

### 2026-07-10 — Phase 7 implementation session

**Files added/changed:** `app/contact/page.tsx`, `components/sections/{ContactHero,ContactMethods,ContactSidebar,ContactFAQ}.tsx`, `components/ui/{ContactCard,Accordion}.tsx`, `lib/seo/faq-jsonld.ts`, `lib/seo/constants.ts` (new `STUDIO_FOUNDED_YEAR`/`STUDIO_LOCATION`), `lib/cms/fallbacks/contact.ts` (FAQ expanded 3 → 8 items), `context/progress-tracker.md`.

**What was implemented:**
- `app/contact/page.tsx`: fetches `getContactPage()` resolved against `contactPageFallback` (both already existed from Phase 3); `generateMetadata` reads `contactPage.seo`; renders `ContactHero` → a two-column band (`ContactMethods` main / `ContactSidebar` aside, `lg:grid-cols-[2fr_1fr]` — same ratio precedent as `ServiceDetail`/`CaseStudy`) → `ContactFAQ`; injects a `FAQPage` JSON-LD `<script>` computed via new `lib/seo/faq-jsonld.ts`, only when `contactPage.faq.length > 0`.
- `ContactHero`: headline/intro from `contactPage`, plus in-page quick links — `#methods` always, `#faq` only when FAQ content exists (avoids a dead anchor link).
- `ContactMethods`: renders one `ContactCard` per `contactPage.channels` entry, an explicit "no contact form" statement, and `contactPage.ctaNote` when present.
- `ContactCard` (new `ui` primitive): real channels render as an actual link (`mailto:` for email; `target="_blank" rel="noopener noreferrer"` for Facebook/LinkedIn); placeholder channels (`isPlaceholder: true`, true for all three today since no canon URLs exist) render as a non-interactive `aria-disabled` card with a "Coming soon" `Badge` — never a fake clickable link.
- `ContactSidebar` (new): canon-only studio facts (Founded `2024`, Based in `Biñan City, Laguna, Philippines`) via two new `lib/seo/constants.ts` constants; no invented stats.
- `ContactFAQ` + new `ui/Accordion.tsx` (`"use client"`, single-open, first item expanded by default, `aria-expanded`/`aria-controls`/`role="region"`): renders `contactPage.faq`; returns `null` when the array is empty instead of an empty section shell.
- Expanded `contactPageFallback.faq` from 3 to 8 canon Q&A pairs, copied verbatim from `docs/ai/faq.md` (studio identity, service scope, industries, consultation, original products, partnerships, brand description) — broader canon coverage than the Phase 3 stub without inventing any new answers.
- Deliberately did **not** add a Google Form, `NEXT_PUBLIC_CONTACT_FORM_URL`, Calendly embed, or thank-you route — reconfirms the Phase 0 canon override of `website-plan/` Part 5.

**Verification:** `npm run test` ✅ (18/18, unchanged) · `npm run lint` ✅ · `npm run build` ✅ (`/contact` prerendered as static content). Read the generated static HTML directly to confirm: headline/intro render, "Ways to reach us" heading, three "Coming soon" placeholder cards with **no** `mailto:` link present anywhere in the document (confirming placeholder channels never leak a real-looking link), "Studio facts" sidebar with `Founded`/`2024`/location, "Frequently asked questions" heading, the `FAQPage` JSON-LD script tag, and the first accordion button (`contact-faq-button-0`).

**TDD note:** No new pure-logic unit introduced — `Accordion`'s open/closed toggle and `ContactCard`'s href derivation are both single-branch logic inline in presentational components, at the same "too trivial to isolate" threshold Phase 5 used for `ProjectSidebar`'s `formatPublishedDate`. Test count remains 18/18. Component/E2E coverage remains Phase 10 scope.

**Deviations from plan:** None structural. The `contactPage` CMS type, query, and fallback shell already existed from Phase 3 (unused until now), so this phase's CMS-layer work was limited to deepening the fallback FAQ content rather than building new schema.

**Next task:** Phase 8 — Products + Community (`/products` + `/products/[slug]` for the 3 canon IP titles; `/community` feed with placeholder items).

### 2026-07-09 — Phase 6 implementation session

**Files added/changed:** `app/about/page.tsx`, `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `components/sections/{AboutHero,OurStory,VisionBand,ValuesGrid,TeamGrid,CultureClosing,ServicesListing,ServiceIndustries,ServiceDetail,ServiceSidebar}.tsx`, `components/ui/{TeamMemberCard,ServiceCard,PortableText}.tsx`, `lib/services/{group-by-category,group-by-category.test,related-industries,related-industries.test}.ts`, `lib/team/{initials,initials.test}.ts`, `context/progress-tracker.md`.

**What was implemented:**
- `app/about/page.tsx`: fetches `getAboutPage()` + `getTeamMembers()` in parallel, resolved against `aboutPageFallback` / `teamMembersFallback`; `generateMetadata` reads `aboutPage.seo`; renders the canon About layout in order: `AboutHero` → `OurStory` (`storySections`, alternating card layout) → `VisionBand` (labeled Vision) → `ValuesGrid` (5 core values, `id="values"`) → `TeamGrid` (`teamIntro` + 6 team members, `id="team"`) → `CultureClosing` (`cultureSummary` + Contact CTA).
- `AboutHero`'s in-page quick links (`#values`, `#team`, `/contact`) resolve to the anchor `id`s set on `ValuesGrid` and `TeamGrid`.
- `TeamMemberCard`: resolves `getCmsImageUrl(member.photo)`; falls back to a rounded-rectangle panel with a two-letter initials avatar (new `lib/team/initials.ts`) when unset (always true today); shows a `Placeholder` badge when `member.isPlaceholder`.
- `app/services/page.tsx`: static `generateMetadata` (page-level copy, same precedent as `/portfolio`); fetches `getServiceCategories()` + `getServices()` resolved against fallbacks; renders `ServicesListing`.
- `ServicesListing`: intro + one section per category (via new `lib/services/group-by-category.ts`, ordered by `category.order` then `service.order`) with a `ServiceCard` grid per category, plus a global "Industries we work with" band (`ServiceIndustries` + new `lib/services/related-industries.ts`, deduplicating `relatedIndustries` across all services in first-seen order).
- `ServiceCard`: icon glyph (mapped from the known `icon` string values used in `servicesFallback` — `gamepad`, `rocket`, etc. — with a `✦` default for anything else), title, summary, `Placeholder` badge when `isPlaceholder`, links to `/services/[slug]`.
- `app/services/[slug]/page.tsx`: `generateStaticParams` from CMS-or-fallback service slugs; `generateMetadata` from `service.seo`; `getServiceContent(slug)` tries `getServiceBySlug` then falls back to a slug lookup in `servicesFallback`, then `notFound()`; looks up the matching `ServiceCategory` by `service.categorySlug` for display; renders a `BreadcrumbList` JSON-LD (Home → Services → service) + `ServiceDetail`.
- `ServiceDetail`: category eyebrow, placeholder badge, title, summary, then a `~65/35` two-column layout (same grid classes as Phase 5's `CaseStudy`) — main column renders `service.body` via new minimal `components/ui/PortableText.tsx`, aside is `ServiceSidebar` (outcomes list, related-industry tags, "Discuss this service" CTA → `/contact`).
- `PortableText`: supports `normal` (→ `<p>`), `h1`–`h4`, and `blockquote` block styles, plus `strong`/`em` span marks — the actual subset used by the `service`/`communityItem` schemas today; no new dependency added.
- Added and passed unit tests for the three new pure logic helpers before wiring them into components: `groupServicesByCategory` (category ordering, service-to-category assignment, in-category ordering, empty-category handling), `getUniqueIndustries` (dedupe, first-seen order, empty input), `getInitials` (two/three/one-word names, empty string, extra whitespace).

**Verification:** `npm run test` ✅ (18/18, up from 5 — 13 new assertions across 3 new test files) · `npm run lint` ✅ · `npm run build` ✅ — `/about` and `/services` prerendered as static content; `/services/[slug]` prerendered via SSG with all 10 `servicesFallback` slugs as static params. Read the generated static HTML directly for all three routes: `/about` (hero with motto/mission, both story sections, labeled Vision band, all 5 value cards, all 6 team members rendering initials avatars + placeholder badges, culture CTA), `/services` (all 4 categories with correctly grouped service cards and icon glyphs, 11 deduplicated industry tags), and `/services/game-development` (breadcrumb JSON-LD, category eyebrow, portable-text body paragraph, 3 outcomes, 3 related-industry tags, sidebar CTA).

**TDD note:** Followed RED→GREEN for the three new pure helpers (`groupServicesByCategory`, `getUniqueIndustries`, `getInitials`) — wrote implementation + test together, ran the suite to confirm all 18 tests pass. The 10 new Server Components (About/Services sections + UI primitives) remain untested in isolation, consistent with the Phase 3–5 precedent of deferring presentational-component and E2E coverage to Phase 10.

**Deviations from plan:** None structural. `aboutPage` has no dedicated hero fields in the Phase 3 schema, so `AboutHero` reuses `motto`/`mission` rather than adding new CMS fields (documented in Architecture Decisions). Did not add `@portabletext/react` for `service.body` rendering — a small in-house `PortableText` component covers the schema's actual surface (see Architecture Decisions); revisit if Phase 8's `communityItem.body` needs richer marks.

**Next task:** Phase 7 — Trust + Contact (`/contact` external-links page + FAQ from `docs/ai/faq.md`).

### 2026-07-09 — Phase 5 implementation session

**Files added/changed:** `app/portfolio/page.tsx`, `app/portfolio/[slug]/page.tsx`, `components/sections/{PortfolioListing,CaseStudy,ProjectGallery,ProjectSidebar,EmptyState}.tsx`, `components/ui/ProjectCard.tsx`, `lib/seo/breadcrumb-jsonld.ts`, `context/progress-tracker.md`.

**What was implemented:**
- `app/portfolio/page.tsx`: static `generateMetadata` (page-level copy, not a company fact) + fetches `getCaseStudies()` resolved against `caseStudiesFallback`, renders `PortfolioListing`.
- `app/portfolio/[slug]/page.tsx`: `generateStaticParams` reads slugs from CMS-or-fallback case studies; `generateMetadata` reads `caseStudy.seo`; `getCaseStudyContent(slug)` tries `getCaseStudyBySlug` first, then falls back to a slug lookup in `caseStudiesFallback`, then calls `notFound()` if neither resolves.
- Added a `BreadcrumbList` JSON-LD script (Home → Portfolio → project title) via new `lib/seo/breadcrumb-jsonld.ts`, using relative hrefs since no production domain is confirmed yet (same discipline as `organization-jsonld.ts`).
- `PortfolioListing`: page intro + responsive card grid via new `ui/ProjectCard`; falls back to the new reusable `EmptyState` component if the case-study list is ever empty.
- `ProjectCard`: cover image (via `getCmsImageUrl`, sakura emoji placeholder otherwise), industry tag, title, challenge excerpt, "Placeholder" badge when `isPlaceholder`.
- `CaseStudy` (detail): full-width cover hero, then a `~65/35` two-column layout — challenge/solution/impact/lessonsLearned as headed sections plus `ProjectGallery` in the main column, `ProjectSidebar` (client/industry/published date + "Discuss a similar project" CTA) in the aside — adapting `website-plan/03-PORTFOLIO...`'s hero+gallery+sidebar visual treatment to the canon `/portfolio/[slug]` IA (no category level).
- `ProjectGallery` renders resolved CMS gallery images in a responsive grid, or an honest "Gallery coming soon." placeholder when the gallery array is empty (true today for the one fallback case study).
- Deliberately did **not** build `/portfolio/[category]` routes or interactive discipline filter chips — see Architecture Decisions.

**Verification:** `npm run test` ✅ (5/5, unchanged) · `npm run lint` ✅ · `npm run build` ✅ — `/portfolio` prerendered as static content, `/portfolio/[slug]` prerendered via SSG with `sample-client-project-placeholder` as the only static param (matches the single fallback case study). Read the generated static HTML for both routes directly to confirm the listing card, breadcrumb JSON-LD, all four case-study sections, gallery empty state, and sidebar CTA all render correctly with fallback content.

**TDD note:** No new pure-logic units introduced (Server Components + one small `formatPublishedDate` date-formatting helper inlined in `ProjectSidebar`, judged too trivial to warrant an isolated unit test at this scope). Broader component/E2E coverage remains Phase 10 scope, consistent with prior phases.

**Deviations from plan:** Skipped `/portfolio/[category]` and discipline filter chips (both already flagged as "optional"/overridden in Phase 0 and `IMPLEMENTATION-PLAN.md`'s Resolved Conflicts table); this session just re-confirms that override in the actual route structure.

**Next task:** Phase 6 — About + Services (`/about`; `/services` + `/services/[slug]`).

### 2026-07-09 — Phase 4 implementation session

**Files added/changed:** `app/page.tsx` (rewritten), `components/sections/{Hero,Mission,FeaturedWork,Highlights,ContactCTA}.tsx`, `components/ui/Badge.tsx`, `lib/cms/image.ts`, `package.json`/`package-lock.json` (added `@sanity/image-url`), `context/progress-tracker.md`.

**What was implemented:**
- `app/page.tsx` is now an async Server Component. It fetches `getHomePage()`, `getProducts()`, and `getCaseStudies()` in parallel and resolves each against its typed fallback via `resolveWithFallback`, then renders the five `homePage.blocks` in canon order.
- `generateMetadata()` sources the page title/description from `homePage.seo` (CMS or fallback), satisfying the per-route SEO rule in `code-standards.md`.
- New presentational section components (`Hero`, `Mission`, `FeaturedWork`, `Highlights`, `ContactCTA`) each receive a single typed CMS block as props — no direct CMS calls inside sections, matching the "sections are presentational" rule.
- `Hero` renders the CMS `hero` block plus a static secondary quick-link row (Services / Products / Contact) — satisfies `project-overview.md`'s "Secondary CTAs" Home feature without adding new CMS fields. Falls back to a branded sakura placeholder panel when no hero image is set (always true today, since no CMS project is provisioned).
- `FeaturedWork` resolves `featuredWork.featuredProductSlugs` / `featuredCaseStudySlugs` against the fetched `Product[]` / `CaseStudy[]` lists and renders cards linking to `/products/[slug]` and `/portfolio/[slug]` (these routes do not exist yet — they land in Phases 5 and 8 — so links will 404 until then, consistent with the existing precedent of the Hero CTA already pointing at `/services` before Phase 6 exists). Each placeholder-backed card shows a "Coming soon" `Badge`; an honest empty state renders if no featured items resolve.
- Added `components/ui/Badge.tsx` (`placeholder` / `info` pill variants).
- Added `lib/cms/image.ts` with `getCmsImageUrl()`, wrapping `@sanity/image-url`'s `createImageUrlBuilder`; returns `null` when `CMS_PROJECT_ID`/`CMS_DATASET` are unset so callers can render a placeholder instead of a broken image `src`. Added `@sanity/image-url` as an explicit `package.json` dependency (previously only resolvable as a transitive dependency of `sanity`).
- Deliberately did **not** build `ClientsPartners` or `AwardsHighlight` sections from the `IMPLEMENTATION-PLAN.md` Phase 4 file list — see Architecture Decisions for rationale (no canon data, not part of the actual `homePage` CMS schema built in Phase 3).

**Verification:** `npm run test` ✅ (5/5, unchanged) · `npm run lint` ✅ · `npm run build` ✅ (`/` prerendered as static content with fallback data, since no CMS project is configured in this environment) · Read the generated static HTML output (`.next/server/app/index.html`) directly to confirm all five sections render with correct fallback copy, links, and "Coming soon" badges.

**TDD note:** No new pure-logic units were introduced (only presentational Server Components and a thin Sanity image URL wrapper with no branching logic worth unit-testing in isolation). Formal TDD skipped per the same rationale as Phase 1/2 CSS/shell work; component/E2E test coverage remains Phase 10 scope.

**Deviations from plan:** Home section list (5 sections, no Clients/Partners/Awards) diverges from `IMPLEMENTATION-PLAN.md`'s Phase 4 file list in favor of the already-implemented canon CMS schema — see Architecture Decisions. `@sanity/image-url` was added as a new direct dependency (not explicitly listed in the Phase 4 plan, but required for correct CMS image rendering).

**Next task:** Phase 5 — Portfolio (`/portfolio` listing + `/portfolio/[slug]` case study detail).

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
