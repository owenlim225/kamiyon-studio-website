# Progress Tracker

Update this file after every meaningful implementation change.

**Historical completed work:** [`completed-work.md`](./completed-work.md) (Phase 0?10, Sanity schema plan, session notes)

---

## Canon Analysis Summary (abbreviated)

Full analysis of 43 `docs/` files (July 2026). Detail in source docs and [`project-overview.md`](./project-overview.md).

| Area | Key facts |
| --- | --- |
| Identity | Kamiyon Studio ? Founded 2024 ? Bi?an City, Laguna ? Motto **Create. Play. Inspire.** ? 6 team members ? Mascot Kami-chan |
| Site scope | 7 sections: Home, About, Services, Products, Portfolio, Community, Contact ? Headless CMS + typed fallbacks ? External contact only (no forms) |
| Products (canon IP) | Eclipse, Vocabu Wildlife Edition, Afterschool Cleanup |
| Services | 4 categories, 10 service areas (`docs/services/services.md`) |
| CMS types | `siteSettings`, `homePage`, `aboutPage`, `teamMember`, `serviceCategory`, `service`, `product`, `caseStudy`, `communityItem`, `contactPage`, `seoMetadata` ? see `architecture.md` |
| Design tokens | Sakura `#f97695` (confirmed); Warm Ivory/Charcoal/Soft Gold extracted Phase 9; Deep Indigo TBD ? Fonts: Poppins (UI), Montserrat (headlines) |
| Placeholder gaps | No social URLs, public email, named clients, or community events in canon ? never fabricate |

**Known conflicts:** README motto "Play. Question. Create." vs canon "Create. Play. Inspire." (website uses canon). `typography.md` / `consultation-process.md` are erroneous duplicates.

---

## Current Phase

**Phase 2 ? CMS ? app verification** ? Phase 1 complete (2026-07-10): 30 docs on `c6ej1xoj`/`production`, dev CORS origins verified, server-side CMS fetches OK without `CMS_API_TOKEN`.

## Current Goal

Verify CMS content replaces fallbacks across all 7 routes (`npm run dev`), then confirm featured-work refs, service grouping, and placeholder badges.

## In Progress

- None

## Next Up

Phase 2 CMS ? app verification (all 7 routes, featured-work refs, service grouping, placeholder badges).

### Phase 1 ? Provision & seed (ops)

**Pre-flight audit (code ? verified):**

- [x] Config parity: `.env.local` has `CMS_PROJECT_ID=c6ej1xoj`, `CMS_DATASET=production`; same env vars read by `sanity.config.ts`, `sanity.cli.ts`, `lib/cms/client.ts` (`sanity/load-env.ts` loads `.env` ? `.env.local`)
- [x] Schema registered: 11 document types + 8 object types in `sanity/schemaTypes/index.ts`
- [x] Desk structure in code: Settings (1) / Pages (3 singletons) / Collections (6 types) ? `sanity/structure.ts`
- [x] Singleton fixed IDs in seed: `siteSettings`, `homePage`, `aboutPage`, `contactPage` ? `sanity/seed/placeholder-docs.ts`
- [x] Seed document count: **30** (`placeholderDocuments.length`; matches `07-seed-and-provisioning.md` breakdown: 4 + 6 + 4 + 10 + 3 + 1 + 2)

**Manual operator steps (Sanity Manage ? verified 2026-07-10 where checked):**

- [x] Confirm project **`c6ej1xoj`** exists at [sanity.io/manage](https://www.sanity.io/manage) with dataset **`production`** ? verified by successful seed to `production` (2026-07-10)
- [x] CORS origins (Manage ? API ? CORS origins; also `npx sanity cors list` / `cors add`):
  - [x] `http://localhost:3333` ? listed in project CORS; OPTIONS preflight returns `Access-Control-Allow-Origin: http://localhost:3333`; Studio HTTP 200 (2026-07-10)
  - [x] `http://localhost:3000` ? listed in project CORS; OPTIONS preflight returns `Access-Control-Allow-Origin: http://localhost:3000` (2026-07-10)
  - [ ] Production domain ? add when deployment target + `NEXT_PUBLIC_SITE_URL` confirmed
- [x] Optional: **Viewer** read token ? `CMS_API_TOKEN` ? **not required** for v1: `.env.local` has empty `CMS_API_TOKEN`; `getHomePage()` succeeds via public CDN (`useCdn: true`); no token created or committed (2026-07-10)

**Runtime steps (other agents / operator):**

- [x] `sanity login` ? `npm run studio:seed` (expect 30 docs logged) ? **2026-07-10:** auth OK via `npx sanity debug --secrets` (GitHub; no interactive `sanity login`); seed exit **0**, log: *Seeded 30 placeholder documents to Sanity.*
- [x] `npm run studio` ? desk verified: Settings (1) / Pages (3) / Collections (6) ? `sanity/structure.ts` + `sanity schema validate` (0 errors); HTTP 200 on `localhost:3333` (existing `node` instance; browser visual skipped ? no Chrome)
- [x] Spot-check seeded singleton `_id`s in Studio or Vision (2026-07-10: GROQ via `getCliClient` in one-off `sanity exec --with-user-token`: `siteSettings`, `homePage`, `aboutPage`, `contactPage`; `contentCount` 30, `total` 43)

### Phase 2 ? CMS ? app verification

- [ ] `npm run dev` ? confirm CMS content replaces fallbacks on all 7 routes
- [ ] Verify featured work refs on home page resolve (products + case study)
- [ ] Verify service category refs group correctly on `/services`
- [ ] Confirm placeholder badges still show where `isPlaceholder: true`

### Phase 3 ? Content entry (placeholder-first)

- [ ] Upload hero image to `homePage` block
- [ ] Upload team photos (or keep initials avatars)
- [ ] Upload product media placeholders
- [ ] Replace `socialLink` / `contactChannel` `#` URLs when canon provides real values
- [ ] Polish service body portable text (subset: normal/h2/h3, strong/em only)

### Phase 4 ? Deferred (document, don't implement unless asked)

- [ ] Wire `getSiteSettings()` to header/footer (currently static `lib/config/navigation.ts`)
- [ ] Sanity preview URLs / presentation tool (`CMS_PREVIEW_SECRET`)
- [ ] `npm run studio:schema deploy` to remote if schema drift detected

Prior v1 website roadmap (Phase 0?10) is complete ? see [`completed-work.md`](./completed-work.md).

## Open Questions

- [ ] **Sanity schema sign-off** ? Confirm Phase 7 extensions (`contactPage.faq`, `socialLink.isPlaceholder`, per-collection `seo`) are accepted as v1 canon
- [ ] **Facebook page URL** ? not in canon (placeholder until provided)
- [ ] **LinkedIn URL** ? not in canon (placeholder until provided)
- [ ] **Public email address** ? not in canon (placeholder until provided)
- [ ] **Deployment target** ? Vercel assumed for Next.js; confirm host + `NEXT_PUBLIC_SITE_URL`
- [ ] **Deep Indigo hex value** ? not in `brand-kit.png`; do not invent
- [ ] **`/news` route** ? deferred/skipped for v1 (Vision item)
- [ ] **Press Kit `/pres`** ? deferred post-v1
- [ ] **Portfolio taxonomy divergence** ? canon `caseStudy` model adopted; discipline filters would need schema change
- [ ] **Contact policy** ? external links only confirmed; no lead-capture form for v1
- [ ] **Next.js 16.2 docs missing** ? `node_modules/next/dist/docs/` empty; relied on types + patterns
- [ ] **Beaufort for LoL license** ? confirm before production use
- [ ] **Product development status** ? per-product status defaults to `tbd`
- [ ] **README motto conflict** ? update canon README to match Create. Play. Inspire.?

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
| Spec precedence | Canon `context/` wins over `website-plan/` v2.0 | `website-plan/` describes a divergent site; canon defines v1 scope/IA/CMS/contact ? plan harvests `website-plan/` creative direction + Part 6 design system only |
| Site IA | Canon 7 sections (Home, About, Services, Products, Portfolio, Community, Contact) | Overrides `website-plan/` 5-link nav |
| Portfolio IA | `/portfolio` + `/portfolio/[slug]` case studies | Overrides `website-plan/` 6-category 3-level IA; disciplines become optional tags/filters |
| Contact mechanism | External links only (Facebook, LinkedIn, mailto) | Overrides `website-plan/` Google Form embed; canon invariant (no forms/auth) |
| News + Press Kit | Deferred out of v1 | Vision items per project-overview.md; not built in v1 |
| FAQ source | `docs/ai/faq.md` | `docs/services/consultation-process.md` is a known duplicate ? not a source |
| Nav config (Phase 2) | Static `lib/config/navigation.ts` | CMS wiring deferred to Phase 3; shell uses static 7-section nav + placeholder social links |
| Logo (Phase 2) | Text + sakura icon placeholder | Asset migration from `docs/assets/` deferred to Phase 9; no fake logo image |
| Accessible sakura text tint (Phase 9) | Added `--color-sakura-ink` (`#c23a5e`) distinct from the raw `--color-sakura` brand token | Raw sakura on the ivory background measures ~2.6:1, failing WCAG AA's 4.5:1 text threshold; sakura-ink measures ~5.2:1 and passes. `--color-sakura` itself is left unchanged for use as a background/accent fill, where a different (3:1 non-text) threshold applies |
| Satori OG image glyph (Phase 9) | Plain "K" monogram instead of the `?` sakura emoji | Satori's dynamic font loading for the emoji glyph failed during `next build` in this sandbox; a plain text glyph needs no extra font and renders identically across environments |
| Responsive verification method (Phase 9) | Code-based breakpoint audit (390/768/1280/1440) instead of live Playwright screenshots | No system Chrome install available and the Playwright MCP browser tool couldn't locate a usable browser binary in this sandbox; audited actual Tailwind classes/grid definitions against each target width instead ? found and fixed one real bug (`MainNav` orientation) |
| CMS implementation (Phase 3) | Sanity via `next-sanity` + `sanity` | Adopted the defaulted Phase 0 recommendation; app falls back cleanly when `CMS_PROJECT_ID` / `CMS_DATASET` are unset |
| Phase 3 testing scope | Minimal Vitest coverage for fallback resolution only | Added a pure TypeScript test harness without React/JSDOM/E2E; broader coverage remains Phase 10 scope |
| Phase 4 Home section scope | 5 sections only: Hero, Mission, Featured Work, Highlights, Contact CTA ? no Clients/Partners or Awards sections | `IMPLEMENTATION-PLAN.md`'s reconciliation matrix listed `website-plan/` Part 2 ideas (`ClientsPartners`, `AwardsHighlight`) as components to build, but `architecture.md`'s actual `homePage` CMS model (built in Phase 3) and `project-overview.md`'s canon Home feature list only define hero/mission/featuredWork/highlights/ctaBanner ? canon has zero award or client/partner data, so adding those sections now would mean inventing placeholder content outside the approved schema |
| Featured work slug resolution | `FeaturedWork` cross-references `homePage.featuredWork` slugs against fetched `Product[]`/`CaseStudy[]` at render time (not stored denormalized) | Keeps `homePage` CMS content decoupled from product/case-study content; matches the reference-array shape already defined in `architecture.md`'s `homeBlock.featuredWork` |
| CMS image resolution | Added `lib/cms/image.ts` using `@sanity/image-url` (new direct dependency) | Sanity image refs (`{_ref}`) are not directly usable as a `next/image` `src`; a URL builder is required. Added as an explicit dependency (was previously only a transitive dep of `sanity`) rather than relying on hoisting |
| Phase 5 Portfolio IA (confirmed in code) | `/portfolio` + `/portfolio/[slug]` only ? no `/portfolio/[category]` route, no discipline filter chips | Re-confirms the Phase 0 canon override of `website-plan/03-PORTFOLIO...`'s 3-level category IA; `caseStudy.industry` is free text (not the spec's fixed 6-discipline enum), so a filter UI isn't backed by the existing schema ? would need a Phase 3 schema change, out of Phase 5 scope |
| Breadcrumb JSON-LD URLs | Relative hrefs (`/portfolio/[slug]`) instead of absolute URLs | Deployment target is still TBD (open question); mirrors the existing `organization-jsonld.ts` precedent of omitting a fabricated absolute site URL |
| Case study detail 404 handling | `getCaseStudyContent(slug)` checks CMS first, then linearly searches `caseStudiesFallback` by slug, then calls `notFound()` | Keeps the same CMS-then-fallback resolution order as everywhere else, while still producing a real 404 for genuinely unknown slugs (required by the Phase 5 validation criterion) |
| About Hero content source | `AboutHero` reuses `aboutPage.motto` (headline) + `aboutPage.mission` (subheadline) instead of adding new `heroHeadline`/`heroSubheadline` fields | `aboutPage` has no dedicated hero block in the Phase 3 schema; motto/mission are the closest canon-backed marketing copy already in the model ? same "no new CMS fields" discipline as Phase 4's Hero secondary-link row |
| Vision presentation (About) | Dedicated `VisionBand` section renders `aboutPage.vision` behind an explicit "Vision ? long-term aspiration" `Badge`, separate from the Mission text in the Hero | Directly satisfies the `architecture.md` invariant that Vision content is never presented as current fact; keeping it as its own labeled section (rather than folding it into Hero/Values copy) makes the distinction visually unambiguous |
| Team photo placeholder style | `TeamMemberCard` renders initials avatars (via `lib/team/initials.ts`) instead of a generic emoji placeholder when `member.photo` is unset | `ui-context.md`'s Placeholder Media Guidelines specifically calls for "initials avatar or generic silhouette" for team photos ? a different placeholder rule than case studies/products, which use the sakura emoji |
| Service body rendering | Added a minimal `components/ui/PortableText.tsx` (supports `normal`/heading styles + `strong`/`em` marks only) instead of installing `@portabletext/react` | `service.body` is the only portable-text field rendered on the site so far and the fallback data only ever produces single `normal` paragraph blocks; a small in-house renderer covers the actual schema surface without a new dependency ? revisit if `communityItem.body` (also portable text, Phase 8) needs richer marks/annotations |
| Services category grouping | New pure `lib/services/group-by-category.ts` always returns one group per category (even with 0 matching services), rendering "More services coming soon." for empty ones rather than hiding the category | Matches the placeholder-first, never-hide-structure strategy used elsewhere (e.g. `ProjectGallery`'s "Gallery coming soon." empty state) |
| Services industries callout | New pure `lib/services/related-industries.ts` deduplicates `service.relatedIndustries` across all fetched services at render time (first-seen order, no sorting) | Same cross-referencing-at-render-time pattern as Phase 4's `FeaturedWork` slug resolution ? keeps `service` documents as the single source of truth instead of maintaining a separate CMS-managed industries list |
| Phase 6 testing scope | Added unit tests only for the three new pure logic helpers (`groupServicesByCategory`, `getUniqueIndustries`, `getInitials`) ? no component/E2E tests for the new About/Services Server Components | Continues the Phase 3?5 precedent (`resolve.test.ts`, inline `formatPublishedDate`) of testing extracted pure logic and deferring presentational-component/E2E coverage to Phase 10 |
| Placeholder contact channels render as disabled cards, not dead links | `ContactCard` renders `isPlaceholder` channels as a non-interactive `aria-disabled` `<span>` with a "Coming soon" `Badge`, instead of an `<a href="#">` | An `<a href="#">` would be keyboard-focusable and appear clickable while doing nothing ? worse a11y and UX than an honestly-disabled placeholder; matches the "never fabricate/mislead" guardrail applied to a link affordance instead of just text content |
| FAQ JSON-LD computed at page level | New `lib/seo/faq-jsonld.ts` (`getFaqJsonLd`) is called from `app/contact/page.tsx`, not inside `ContactFAQ` | Mirrors the existing `getBreadcrumbJsonLd` precedent from Phase 5 ? JSON-LD scripts are a page-level SEO concern, not a Server Component's rendering responsibility |
| Studio facts sidebar sourced from new SEO constants | `ContactSidebar` reads `STUDIO_FOUNDED_YEAR`/`STUDIO_LOCATION` from `lib/seo/constants.ts` rather than a CMS field | These are static canon facts (`docs/company/overview.md`) already duplicated as literals in `organization-jsonld.ts`'s `foundingDate`/`address`; promoting them to named constants avoids introducing a third hardcoded copy without adding CMS schema scope creep for Phase 7 |
| Phase 7 testing scope | No new pure-logic unit added; test count stays at 18/18 | `Accordion`'s open/closed state and `ContactCard`'s href derivation are both trivial single-branch logic embedded in presentational components (same threshold `ProjectSidebar`'s `formatPublishedDate` used in Phase 5 to justify skipping an isolated unit test) ? broader component/E2E coverage remains Phase 10 scope |
| Community filter state lives in `CommunityFeed`, not `TypeFilter` | `CommunityFeed` is the sole `"use client"` boundary for the `/community` route; `TypeFilter` and `CommunityCard` stay plain presentational components that receive props/callbacks | Matches the existing "smallest client boundary" precedent (`Accordion` in Phase 7); avoids marking more of the community section as client-rendered than strictly needed for the filter interaction |
| Filter chips derived from data, not a static `CommunityItemType` enum list | `TypeFilter` receives `types` from `getAvailableTypes(items)` (first-seen order across the actual fetched items) rather than iterating all 7 enum values | Prevents showing empty filter chips for types with zero current items (e.g. `hackathon`, `game-jam`, `speaking`, `education`, `other` all have zero fallback items today) ? same "don't show structure with nothing behind it" instinct as `ServicesListing`'s per-category coming-soon text, applied in the opposite direction (hide instead of label) since a filter chip with 0 results is pure noise, not a placeholder-worthy content gap |
| No `/community/[slug]` detail route | Community section is `/community` feed-only; `CommunityCard` links externally (`externalUrl`) when present, otherwise is not a link at all | Re-confirms the Phase 0/`IMPLEMENTATION-PLAN.md` Phase 8 scope (feed + type filters only, no detail route in the Spec Reconciliation Matrix); `communityItem.body` (portable text) is fetched by `getCommunityItems()` but intentionally unused until a detail route is scoped |
| Product development-status shown as a card/detail badge, not separate copy | `getDevelopmentStatusLabel` (new `lib/products/development-status.ts`) maps the 4 enum values to display labels reused by both `ProductCard` and `ProductDetail` | Single source of truth for the label text avoids drifting copy between the grid and detail views; mirrors the `getCommunityTypeLabel`/`getDevelopmentStatusLabel` pairing as the same kind of trivial-lookup helper Phase 7's `ContactCard` established as below the unit-test threshold |
| Coverage scope: `lib/` + `components/sections/` only (Phase 10) | `vitest.config.ts`'s `coverage.include` excludes `components/ui/` and `components/layout/` from the 80% threshold gate, even though both were also given full test suites | Matches `IMPLEMENTATION-PLAN.md` Phase 10's literal scope ("80%+ coverage on new `lib/` + section components"); `ui/`/`layout/` tests are written and passing as defense-in-depth but aren't required to hit the numeric gate |
| `lib/seo/og-image.tsx` excluded from coverage | Added to `coverage.exclude` alongside the pre-existing `lib/cms/types.ts`/`lib/cms/fallbacks/**` exclusions | It's a Satori (`next/og`) JSX-to-PNG renderer with no conditional logic; exercising it needs a real font-fetch/WASM runtime that `jsdom` can't provide, and there's no branch/logic value to test in isolation ? same category as the type-only/fallback-data files already excluded |
| `lib/cms/client.ts` tested via `vi.mock("next-sanity")` + `vi.stubEnv`/`vi.resetModules` | New `lib/cms/client.test.ts` mocks `createClient` and re-imports the module per test to exercise the unconfigured/configured/cached/CDN-vs-token branches | `cmsProjectId`/`cmsDataset`/`sanityClient` are all read or cached at module-load time (module-level `let`/`const`), so branch coverage requires a fresh module instance per env combination ? same pattern already used by the Phase 9 `lib/seo/site-url.test.ts` (also added this phase) |
| Portable text schema subset | `portableBody` allows only `normal`/`h2`/`h3` + `strong`/`em`; no lists or annotations | Matches `components/ui/PortableText.tsx` renderer and progress-tracker minimal PT decision; prevents editors from adding unrenderable list blocks |
| Studio desk structure | Custom `sanity/structure.ts` groups Settings, Pages (singletons), Collections | Editors see singletons first with fixed document IDs matching seed; avoids duplicate home/about/contact docs |

## Session notes

- **2026-07-10 (Phase 1 seed):** Sanity CLI auth OK (GitHub). `npm run studio:seed` exit 0; **30** docs logged. Singleton `_id`s confirmed via authenticated `getCliClient` fetch. Bare `sanity documents query` returned `[]` for content filters (PowerShell quoting / default query path); use here-strings or `sanity exec` for GROQ spot-checks. No CORS/auth errors during seed.
- **2026-07-10 (Phase 1 re-seed):** User-requested idempotent re-run. Auth OK (`npx sanity debug --secrets`, GitHub; project c6ej1xoj / dataset production). `npm run studio:seed` exit **0**; log: *Seeded 30 placeholder documents to Sanity.* Singletons spot-checked via `npx sanity documents get`: siteSettings, homePage, aboutPage, contactPage (all present; _updatedAt 2026-07-10T08:08:22Z). No auth or seed errors.
- **2026-07-10 (Phase 1 closure):** CORS verified ? `npx sanity cors list` shows `http://localhost:3333` and `http://localhost:3000`; OPTIONS preflight to `c6ej1xoj.api.sanity.io` allows both origins. Studio `:3333` and Next.js dev `:3000` HTTP 200. Server-side CMS fetch OK: `getHomePage()` returns `homePage` with 5 blocks (no token; CDN). `CMS_API_TOKEN` empty in `.env.local` ? omitted by design. Production CORS origin deferred (deployment TBD). **Phase 1 complete.**
