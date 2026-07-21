# Architecture Context

> **STALE (Payload era).** Target architecture is locked in [`WEBSITE-ESSENTIAL-CONTEXT.md`](./WEBSITE-ESSENTIAL-CONTEXT.md): Sanity + OpenNext on Cloudflare + R2 + Resend. Use that file for all new work. This document describes the **current repo** until Payload is removed (migration Phase D).

## Stack (current repo — being replaced)

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Next.js 16.2 (App Router) + TypeScript | Routing, SSR/SSG, metadata |
| UI | React 19 + Tailwind CSS 4 | Components and styling |
| Content | Payload CMS (Postgres) — **retiring** | Temporary; migrating back to Sanity |
| Fonts | Poppins/Montserrat today → **Geologica + Montserrat** (locked) | See essential context §8 |
| Deployment | Assumed Vercel today → **Cloudflare OpenNext** (locked) | See essential context §3–§6 |

Target: Sanity Studio at `/studio`, media on R2, contact form via Resend, ISR + webhook revalidation (publish without redeploy).

> **Source of truth:** [`WEBSITE-ESSENTIAL-CONTEXT.md`](./WEBSITE-ESSENTIAL-CONTEXT.md)

---

## CMS

**Target (locked): Sanity** — new project/dataset, Studio at `/studio`, R2 for all binaries.

**Current repo: Payload CMS 3** (Postgres) at `/admin` — delete in Phase D after `lib/cms` swap.

| Criterion | Sanity (target) |
| --- | --- |
| Next.js integration | `next-sanity` + embedded `/studio` |
| Publish without deploy | Webhook → `revalidateTag` / ISR |
| Media | Cloudflare R2 only (Sanity holds refs) |
| Ops burden | Sanity-hosted content lake; no Postgres for CMS |
| Fit for marketing blocks | Portable Text + singletons/documents |

---

## System Boundaries

- `app/(frontend)/` — Public routes and page-level composition; no hardcoded company facts
- `app/(payload)/` — Payload admin UI and REST/GraphQL API routes
- `components/` — Presentational and section components; receive typed content props
- `lib/cms/` — Payload Local API client, Lexical/media adapters, TypeScript types, fallback stubs
- `collections/` + `globals/` — Payload schema definitions
- `docs/` — Company canon (read-only for website repo unless explicitly asked)
- `context/` — Build-time instructions for developers and AI agents
- CMS admin — Embedded at `/admin` (requires `DATABASE_URL` + `PAYLOAD_SECRET`)

---

## App Router Structure

```
app/
  (frontend)/
    layout.tsx               # Public layout, fonts, PageShell, default metadata
    page.tsx                 # Home
    about/page.tsx
    services/page.tsx
    services/[slug]/page.tsx
    products/page.tsx
    products/[slug]/page.tsx
    portfolio/page.tsx
    portfolio/[slug]/page.tsx
    community/page.tsx
    contact/page.tsx
    blog/page.tsx            # Coming-soon stub
  (payload)/
    admin/[[...segments]]/   # Payload admin UI
    api/                     # Payload REST / GraphQL / media

components/
  layout/                    # Header, Footer, Nav, PageShell
  sections/                  # Home + section components
  ui/                        # Buttons, cards, typography primitives

lib/
  cms/
    client.ts                # getPayloadClient / isPayloadConfigured
    queries.ts               # Per-page/collection Local API loaders
    image.ts                 # getCmsImageUrl (Payload media url)
    types.ts                 # Shared content types (public API)
    adapters/                # Lexical → PortableText, media, mappers
    fallbacks/               # Placeholder content when CMS empty/unconfigured
  config/                    # Static nav, etc.
  contact/                   # Shared channel URLs
  seo/                       # JSON-LD, metadata helpers

collections/                 # Payload collections
globals/                     # Payload globals (singletons)
payload.config.ts
```

---

## Payload ↔ content model map

Logical content shapes in `lib/cms/types.ts` map to Payload as follows:

| Logical type | Payload target | Slug |
| --- | --- | --- |
| `siteSettings` | Global | `site-settings` |
| `homePage` | Global | `home-page` |
| `aboutPage` | Global | `about-page` |
| `contactPage` | Global | `contact-page` |
| `teamMember` | Collection | `team-members` |
| `serviceCategory` | Collection | `service-categories` |
| `service` | Collection | `services` |
| `product` | Collection | `products` |
| `caseStudy` | Collection | `case-studies` |
| `communityItem` | Collection | `community-items` |
| media assets | Collection | `media` |
| admin users | Collection | `users` |

Adapters in `lib/cms/adapters/` map Payload documents → public `lib/cms` types (Lexical → `PortableTextBlock[]`, relationships → slug arrays, media → `CmsImage.url`).

---

## CMS Content Model

All collections support a `isPlaceholder` boolean (or equivalent draft state) so the app can distinguish stub entries from published canon content.

### `siteSettings` (global `site-settings`)

Global site configuration.

| Field | Type | Notes |
| --- | --- | --- |
| `siteName` | string | "Kamiyon Studio" |
| `tagline` | string | From messaging.md |
| `publicEmail` | string | `kamiyonstudio@gmail.com` (operator-provided) |
| `socialLinks` | array | `{ platform, url, label, isPlaceholder }` — Facebook, LinkedIn wired |
| `defaultSeo` | object | `{ title, description, ogImage }` |
| `globalCtas` | array | `{ label, href, variant }` |
| `footerText` | text | Optional |

**Section:** global / Contact

### `homePage` (global `home-page`) + `homeBlock` (embedded array)

| Block type | Fields | Notes |
| --- | --- | --- |
| `hero` | headline, subheadline, ctaLabel, ctaHref, image | Positioning from messaging |
| `mission` | title, body | Canon mission text |
| `featuredWork` | references → caseStudy or product | Placeholder refs OK |
| `highlights` | array of `{ title, description, icon }` | Expertise areas |
| `ctaBanner` | title, body, ctaLabel, ctaHref | |

**Section:** Home

### `aboutPage` (global `about-page`)

| Field | Type | Notes |
| --- | --- | --- |
| `storySections` | array | `{ title, body }` — from founder-story |
| `mission` | text | Canon |
| `vision` | text | Label as **Vision** in UI |
| `motto` | string | "Create. Play. Inspire." |
| `values` | array | `{ name, description }` — five core values |
| `cultureSummary` | text | From culture.md |
| `teamIntro` | text | Optional intro above team grid |

**Section:** About

### `teamMember` (collection `team-members`)

| Field | Type | Notes |
| --- | --- | --- |
| `name` | string | Canon from overview |
| `role` | string | Canon |
| `bio` | text | Placeholder until written |
| `photo` | image | Placeholder asset |
| `order` | number | Display sort |
| `isPlaceholder` | boolean | true for stub bios/photos |

**Canon seed (names/roles only):**

| Role | Member |
| --- | --- |
| CEO | Sherwin Limosnero |
| CTO | Christian Jude Villaber |
| CMO | Ken Cabingas |
| Lead 3D Artist | Luis Cabrido III |
| Community Growth Manager | Lucky Guevarra |
| Programmer | Yushua Dapilaga |

> **Source:** [`docs/company/overview.md`](../docs/company/overview.md)

**Section:** About

### `serviceCategory` (collection `service-categories`)

| Field | Type |
| --- | --- |
| `title` | string |
| `slug` | slug |
| `description` | text |
| `order` | number |

**Seed categories (canon):** Interactive Experience Development, Software Development, Creative & Design Services, Consulting & Technical Advisory

### `service` (collection `services`)

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | e.g. Game Development |
| `slug` | slug | |
| `category` | reference → serviceCategory | |
| `summary` | text | Outcome-focused |
| `body` | Lexical rich text (adapted to portable-text blocks for UI) | Detail page |
| `outcomes` | array of strings | What clients gain |
| `relatedIndustries` | array of strings | Optional |
| `icon` | string / image | |
| `order` | number | |
| `isPlaceholder` | boolean | |

**Website-guidelines service list:** Game Development, MVP Development, Gamification, Web Development, Mobile Development, UI/UX Design, AI Integration, Blockchain Solutions, Consultation, Creative Services

> **Source:** [`docs/services/services.md`](../docs/services/services.md), [`docs/marketing/website-guidelines.md`](../docs/marketing/website-guidelines.md)

**Section:** Services

### `product` (collection `products`)

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | |
| `slug` | slug | |
| `tagline` | string | |
| `genre` | string | |
| `status` | enum | `original-ip` (canon default); `development-status` TBD |
| `developmentStatus` | enum | `in-development`, `prototype`, `released`, `tbd` — default `tbd` |
| `overview` | text | |
| `goals` | array of strings | |
| `features` | array of strings | |
| `platforms` | array of strings | e.g. PC for Eclipse |
| `media` | array | `{ type: image\|video, asset, alt, caption }` — placeholders |
| `trailerUrl` | url | Optional, when available |
| `isPlaceholder` | boolean | true for stub media |
| `order` | number | |

**Canon products:** Eclipse, Vocabu Wildlife Edition, Afterschool Cleanup

> **Source:** [`docs/products/future-ip.md`](../docs/products/future-ip.md), individual product docs

**Section:** Products

### `caseStudy` (collection `case-studies`)

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | |
| `slug` | slug | |
| `clientName` | string | **Placeholder only** — no canon clients |
| `industry` | string | |
| `challenge` | text | |
| `solution` | text | |
| `impact` | text | |
| `lessonsLearned` | text | Optional |
| `coverImage` | image | Placeholder |
| `gallery` | array of images | |
| `featured` | boolean | Home featured work |
| `isPlaceholder` | boolean | **true for all v1 entries** |
| `publishedAt` | date | Optional |

**Section:** Portfolio

### `communityItem` (collection `community-items`)

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | |
| `slug` | slug | |
| `type` | enum | `workshop`, `hackathon`, `game-jam`, `speaking`, `education`, `partnership`, `other` |
| `summary` | text | |
| `body` | blocks | |
| `date` | date | Optional |
| `location` | string | Optional |
| `coverImage` | image | Placeholder |
| `externalUrl` | url | Optional |
| `isPlaceholder` | boolean | **true for all v1 entries** |

> **Source:** [`docs/marketing/website-guidelines.md`](../docs/marketing/website-guidelines.md) Community section

**Section:** Community

### `contactPage` (global `contact-page`)

| Field | Type | Notes |
| --- | --- | --- |
| `headline` | string | |
| `intro` | text | Welcoming, simple |
| `channels` | array | `{ type: facebook\|linkedin\|email, label, value/url }` |
| `ctaNote` | text | e.g. "We typically respond within…" — only if canon-backed |

Links resolve from `siteSettings` where possible. No form fields.

**Section:** Contact

### `seoMetadata` (per route or embedded)

| Field | Type |
| --- | --- |
| `title` | string |
| `description` | string |
| `ogImage` | image |
| `noIndex` | boolean |

---

## Data Fetching Strategy

| Page type | Strategy | Revalidate |
| --- | --- | --- |
| Home, About, Contact, listing pages | SSG + ISR | `revalidate: 3600` (1 hour) |
| Service / Product / CaseStudy detail | SSG + `generateStaticParams` from CMS slugs | `revalidate: 3600` |
| CMS preview (future) | Draft mode + SSR | On-demand |

Prefer static generation for performance per website-guidelines. Use SSR only for preview or truly dynamic needs.

---

## Placeholder / Fallback Strategy

1. **Typed fallbacks** in `lib/cms/fallbacks/` mirror CMS shapes exactly.
2. **Resolution order:** published CMS entry → fallback stub (never inline strings in components).
3. **`isPlaceholder: true`** on CMS documents marks content awaiting real data.
4. **Canon facts** (mission, team names/roles, product titles) may appear in fallbacks only when copied verbatim from `docs/`.
5. **Never fabricate:** client names, awards, testimonials, release dates, or metrics.
6. **Vision content** (roadmap divisions, "globally recognized") rendered with visual or copy label: *Long-term vision*.
7. **Empty CMS:** app renders full site from fallbacks so development is unblocked.

```typescript
// Pattern (illustrative)
const home = resolveWithFallback(await getHomePage(), homePageFallback);
```

---

## Invariants

1. **No hardcoded company facts in components** — copy flows from CMS or typed fallbacks sourced from canon.
2. **No public contact forms or visitor auth** for v1 — Payload `/admin` is for editors only.
3. **Canon vs Vision** — aspirations from roadmap/vision docs are never stated as current achievements.
4. **Motto** — use **Create. Play. Inspire.** (README motto conflict flagged for canon update).
5. **Contact** — Facebook + LinkedIn + mailto only; overrides website-guidelines "Book a consultation" CTAs for v1.
6. **Images** — use placeholders until real assets uploaded to Payload media; brand assets live in `docs/assets/` for reference.
7. **Immutability** — content transformations return new objects; do not mutate fetched CMS data in place.

---

## Non-Functional Requirements

From [`docs/marketing/website-guidelines.md`](../docs/marketing/website-guidelines.md):

- Fast loading, responsive layouts, accessible navigation
- Descriptive page titles and heading hierarchy for SEO
- Optimized media (next/image, appropriate formats)
- WCAG-minded contrast using brand color roles
- Mobile-friendly navigation

---

## Deployment

**Target: Vercel** (confirmed). Document `DATABASE_URL`, `PAYLOAD_SECRET`, and `NEXT_PUBLIC_SITE_URL` at deploy time.
