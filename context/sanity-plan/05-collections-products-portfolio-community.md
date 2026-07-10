# Collections — Products, Portfolio, Community

Collection documents for Products, Portfolio case studies, and Community feed.

---

## `productMedia` (object)

| Field | Type | TS (`ProductMedia`) | Notes |
| --- | --- | --- | --- |
| `type` | `string` | ✓ | `image` \| `video` |
| `asset` | `image` | ✓ | Sanity image ref |
| `alt` | `string` | optional | Accessibility |
| `caption` | `string` | optional | Shown in coming-soon placeholder |

---

## `product` (document, collection)

| | |
| --- | --- |
| **Sanity name** | `product` |
| **TS type** | `Product` |
| **Routes** | `/products`, `/products/[slug]` |
| **Queries** | `getProducts()`, `getProductBySlug(slug)` |
| **Fallback** | `lib/cms/fallbacks/products.ts` → `productsFallback` |

### Fields

| Field | Sanity type | Validation | Notes |
| --- | --- | --- | --- |
| `title` | `string` | — | Canon IP title |
| `slug` | `slug` | — | Detail route |
| `tagline` | `string` | — | Short hook |
| `genre` | `string` | — | e.g. "2D platformer" |
| `status` | `string` | list: `original-ip` | Canon default |
| `developmentStatus` | `string` | list: `in-development`, `prototype`, `released`, `tbd` | **Default `tbd`** |
| `overview` | `text` | — | Product summary |
| `goals` | `string[]` | — | Project goals |
| `features` | `string[]` | — | Key features |
| `platforms` | `string[]` | — | e.g. `PC` |
| `media` | `productMedia[]` | — | Placeholder until assets uploaded |
| `trailerUrl` | `url` | optional | Only when real trailer exists |
| `isPlaceholder` | `boolean` | default `true` | Stub media/status |
| `order` | `number` | — | Grid sort |
| `seo` | `seoMetadata` | — | Per-product metadata |

### Canon products

| Title | Slug (seed) |
| --- | --- |
| Eclipse | `eclipse` |
| Vocabu Wildlife Edition | `vocabu-wildlife-edition` |
| Afterschool Cleanup | `afterschool-cleanup` |

> Source: `docs/products/future-ip.md`

### References

None. May be referenced from `homePage.blocks[featuredWork].featuredProducts`.

### Seed `_id` pattern

`product.{slug.current}`

### Components

`ProductGrid`, `ProductCard`, `ProductDetail`, `ProductMedia`

### Do not fabricate

**Do not** set `developmentStatus` to `released` without canon proof. **Do not** use fake screenshots or trailer URLs.

---

## `caseStudy` (document, collection)

| | |
| --- | --- |
| **Sanity name** | `caseStudy` |
| **TS type** | `CaseStudy` |
| **Routes** | `/portfolio`, `/portfolio/[slug]` |
| **Queries** | `getCaseStudies()`, `getCaseStudyBySlug(slug)` |
| **Fallback** | `lib/cms/fallbacks/portfolio.ts` → `caseStudiesFallback` |

### Fields

| Field | Sanity type | Notes |
| --- | --- | --- |
| `title` | `string` | Project title |
| `slug` | `slug` | Detail route |
| `clientName` | `string` | **Placeholder only** — generic label |
| `industry` | `string` | **Free text** (not 6-discipline enum) |
| `challenge` | `text` | Story section |
| `solution` | `text` | Story section |
| `impact` | `text` | Story section |
| `lessonsLearned` | `text` | optional |
| `coverImage` | `image` | Placeholder |
| `gallery` | `image[]` (+ alt, caption) | Placeholder |
| `featured` | `boolean` | default `false`; home featured work |
| `isPlaceholder` | `boolean` | **default `true` for all v1** |
| `publishedAt` | `date` | optional |
| `seo` | `seoMetadata` | Per-case-study metadata |

### References

May be referenced from `homePage.blocks[featuredWork].featuredCaseStudies`.

### Seed content rules

The v1 seed contains exactly **one** generic placeholder:

- Title: "Sample Client Project — Placeholder"
- `clientName`: "Client name coming soon"
- `isPlaceholder`: `true`
- No real client names, logos, or metrics

### Components

`PortfolioListing`, `ProjectCard`, `CaseStudy`, `ProjectGallery`, `ProjectSidebar`

### Do not fabricate (CRITICAL)

**Never** publish:

- Real or plausible client/company names
- Client logos or testimonials
- Specific metrics, awards, or release claims
- Named partnerships presented as portfolio work

All v1 portfolio entries must keep `isPlaceholder: true` until client-approved content exists.

---

## `communityItem` (document, collection)

| | |
| --- | --- |
| **Sanity name** | `communityItem` |
| **TS type** | `CommunityItem` |
| **Route** | `/community` (feed only — no `[slug]` route) |
| **Query** | `getCommunityItems()` |
| **Fallback** | `lib/cms/fallbacks/community.ts` → `communityItemsFallback` |

### Fields

| Field | Sanity type | Notes |
| --- | --- | --- |
| `title` | `string` | Event/initiative title |
| `slug` | `slug` | Stable ID; no detail route in v1 |
| `type` | `string` | enum: `workshop`, `hackathon`, `game-jam`, `speaking`, `education`, `partnership`, `other` |
| `summary` | `text` | Card excerpt |
| `body` | `array` (`portableBody`) | Fetched; not rendered on feed-only route |
| `date` | `date` | optional |
| `location` | `string` | optional |
| `coverImage` | `image` | Placeholder |
| `externalUrl` | `url` | optional; card links externally when set |
| `isPlaceholder` | `boolean` | **default `true` for all v1** |
| `seo` | `seoMetadata` | Metadata (listing-level future use) |

### Seed content rules

V1 seed has **two** generic placeholders:

1. "Workshop — Details coming soon" (`workshop`)
2. "Partnership — Details coming soon" (`partnership`)

Summaries quote canon philosophy from culture/partnerships docs — not specific dated events.

### Components

`CommunityFeed`, `CommunityCard`, `TypeFilter`

### Do not fabricate (CRITICAL)

**Never** publish:

- Specific workshop dates, venues, or attendance numbers
- Named partner organizations unless documented in canon
- Fake event photos implying real gatherings
- `externalUrl` pointing to invented announcements

Keep `isPlaceholder: true` until real events are documented and approved.

---

## Cross-collection: featured work

`homePage` featured block references `product` and `caseStudy` by document reference. GROQ projects to slug arrays; `FeaturedWork` resolves at render time against parallel fetches.

---

## Verify in Studio

1. Desk: **Collections → Products / Case Studies / Community Items**
2. Confirm product `developmentStatus` defaults to `tbd`
3. Confirm case study and community seeds show `isPlaceholder: true`
4. Visit `/products`, `/portfolio/sample-client-project-placeholder`, `/community`
