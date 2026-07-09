# Architecture Context

## Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Next.js 16.2 (App Router) + TypeScript | Routing, SSR/SSG, metadata |
| UI | React 19 + Tailwind CSS 4 | Components and styling |
| Content | Headless CMS (Sanity recommended — see below) | All page copy, media references, structured entries |
| Fonts | Poppins, Montserrat (Google Fonts or self-hosted) | UI and marketing typography per visual identity |
| Deployment | TBD | Hosting and CI not yet defined in canon |

No database, auth, or API backend for v1. Contact is external links only.

> **Source:** Repo `package.json`, [`docs/technology/engineering-principles.md`](../docs/technology/engineering-principles.md)

---

## CMS Recommendation

**Recommended: Sanity** (final choice is an open question)

| Criterion | Sanity | Contentful | Strapi |
| --- | --- | --- | --- |
| Next.js integration | Excellent (`next-sanity`) | Good | Good |
| Draft / placeholder workflow | Built-in drafts | Built-in | Built-in |
| Image CDN | Included | Included | Self-managed |
| Ops burden | Low (hosted Studio) | Low | Higher (self-host) |
| Fit for marketing blocks | Strong (portable text, objects) | Strong | Strong |

Rationale: Marketing site with modular page blocks, separate admin UI, and placeholder drafts aligns well with Sanity's content model and Next.js ecosystem. Document final choice in `progress-tracker.md` when decided.

---

## System Boundaries

- `app/` — Routes and page-level composition only; no hardcoded company facts
- `components/` — Presentational and section components; receive typed content props
- `lib/cms/` — CMS client, GROQ/fetch queries, TypeScript types, fallback stubs
- `docs/` — Company canon (read-only for website repo unless explicitly asked)
- `context/` — Build-time instructions for developers and AI agents
- CMS Studio — Separate admin; not embedded in this app

---

## App Router Structure

```
app/
  layout.tsx                 # Root layout, fonts, default metadata
  page.tsx                   # Home
  about/page.tsx
  services/page.tsx
  services/[slug]/page.tsx
  products/page.tsx
  products/[slug]/page.tsx
  portfolio/page.tsx
  portfolio/[slug]/page.tsx
  community/page.tsx
  contact/page.tsx

components/
  layout/                    # Header, Footer, Nav, PageShell
  sections/                  # Hero, ServiceGrid, ProductCard, CaseStudy, etc.
  ui/                        # Buttons, cards, typography primitives

lib/
  cms/
    client.ts                # CMS SDK client
    queries.ts               # Per-page/collection queries
    types.ts                 # Shared content types
    fallbacks/               # Placeholder content when CMS empty
      home.ts
      about.ts
      services.ts
      products.ts
      portfolio.ts
      community.ts
      contact.ts
      site-settings.ts
```

---

## CMS Content Model

All collections support a `isPlaceholder` boolean (or equivalent draft state) so the app can distinguish stub entries from published canon content.

### `siteSettings` (singleton)

Global site configuration.

| Field | Type | Notes |
| --- | --- | --- |
| `siteName` | string | "Kamiyon Studio" |
| `tagline` | string | From messaging.md |
| `publicEmail` | string | mailto target — **TBD** until provided |
| `socialLinks` | array | `{ platform, url, label }` — Facebook, LinkedIn — **URLs TBD** |
| `defaultSeo` | object | `{ title, description, ogImage }` |
| `globalCtas` | array | `{ label, href, variant }` |
| `footerText` | text | Optional |

**Section:** global / Contact

### `homePage` (singleton) + `homeBlock` (embedded array)

| Block type | Fields | Notes |
| --- | --- | --- |
| `hero` | headline, subheadline, ctaLabel, ctaHref, image | Positioning from messaging |
| `mission` | title, body | Canon mission text |
| `featuredWork` | references → caseStudy or product | Placeholder refs OK |
| `highlights` | array of `{ title, description, icon }` | Expertise areas |
| `ctaBanner` | title, body, ctaLabel, ctaHref | |

**Section:** Home

### `aboutPage` (singleton)

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

### `teamMember`

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

### `serviceCategory`

| Field | Type |
| --- | --- |
| `title` | string |
| `slug` | slug |
| `description` | text |
| `order` | number |

**Seed categories (canon):** Interactive Experience Development, Software Development, Creative & Design Services, Consulting & Technical Advisory

### `service`

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | e.g. Game Development |
| `slug` | slug | |
| `category` | reference → serviceCategory | |
| `summary` | text | Outcome-focused |
| `body` | portable text / blocks | Detail page |
| `outcomes` | array of strings | What clients gain |
| `relatedIndustries` | array of strings | Optional |
| `icon` | string / image | |
| `order` | number | |
| `isPlaceholder` | boolean | |

**Website-guidelines service list:** Game Development, MVP Development, Gamification, Web Development, Mobile Development, UI/UX Design, AI Integration, Blockchain Solutions, Consultation, Creative Services

> **Source:** [`docs/services/services.md`](../docs/services/services.md), [`docs/marketing/website-guidelines.md`](../docs/marketing/website-guidelines.md)

**Section:** Services

### `product`

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

### `caseStudy`

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

### `communityItem`

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

### `contactPage` (singleton)

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
const home = (await fetchHomePage()) ?? homeFallback;
```

---

## Invariants

1. **No hardcoded company facts in components** — copy flows from CMS or typed fallbacks sourced from canon.
2. **No contact forms, auth, or in-app admin** for v1.
3. **Canon vs Vision** — aspirations from roadmap/vision docs are never stated as current achievements.
4. **Motto** — use **Create. Play. Inspire.** (README motto conflict flagged for canon update).
5. **Contact** — Facebook + LinkedIn + mailto only; overrides website-guidelines "Book a consultation" CTAs for v1.
6. **Images** — use placeholders until real assets uploaded to CMS; brand assets live in `docs/assets/` for reference.
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

**Target: TBD.** Document host (likely Vercel for Next.js), environment variables (`CMS_*`), and preview URLs when decided.
