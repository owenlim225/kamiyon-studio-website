# Registration, Studio Structure & Drift Matrix

Schema registration order, desk structure, preview URLs (future), and architecture ↔ code parity audit.

---

## Registration (`sanity/schemaTypes/index.ts`)

**Rule:** Register embedded objects before documents that reference them.

```typescript
export const schemaTypes = [
  // 1. Shared objects (no dependencies)
  seoMetadata,
  cta,
  socialLink,
  storySection,
  coreValue,
  productMedia,
  contactChannel,
  faqItem,
  // 2. Singleton documents
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  // 3. Collection documents
  teamMember,
  serviceCategory,
  service,
  product,
  caseStudy,
  communityItem,
];
```

### Verify registration

```bash
npm run studio          # types appear in Studio sidebar
npm run studio:schema   # deploy schema to Sanity project (when provisioned)
```

---

## Desk structure (`sanity/structure.ts`)

Custom structure groups singletons under **Settings** and **Pages**, collections under **Collections**.

| Desk item | Schema | Document ID |
| --- | --- | --- |
| Site Settings | `siteSettings` | `siteSettings` |
| Home Page | `homePage` | `homePage` |
| About Page | `aboutPage` | `aboutPage` |
| Contact Page | `contactPage` | `contactPage` |
| Team Members | `teamMember` | (many) |
| Service Categories | `serviceCategory` | (many) |
| Services | `service` | (many) |
| Products | `product` | (many) |
| Case Studies | `caseStudy` | (many) |
| Community Items | `communityItem` | (many) |

Wired in `sanity.config.ts` via `structureTool({ structure })`.

---

## Preview URLs (future)

Not implemented in v1. Planned pattern when `CMS_PREVIEW_SECRET` and deployment URL exist:

| Type | Preview path |
| --- | --- |
| `homePage` | `/` |
| `aboutPage` | `/about` |
| `contactPage` | `/contact` |
| `service` | `/services/{slug}` |
| `product` | `/products/{slug}` |
| `caseStudy` | `/portfolio/{slug}` |
| `communityItem` | `/community` (feed only) |

Requires Sanity presentation tool or custom `productionUrl` resolver — deferred to post-provisioning.

---

## Drift matrix

Legend: **PASS** = matches architecture + code; **FIXED** = drift found and reconciled this session; **N/A** = not applicable or intentional extension.

### Shared objects

| Architecture field | Schema field | TS type | Query | Fallback | Status |
| --- | --- | --- | --- | --- | --- |
| `seoMetadata.title` | `title` | `SeoMetadata.title` | `seoProjection` | per-parent | PASS |
| `seoMetadata.description` | `description` | `SeoMetadata.description` | `seoProjection` | per-parent | PASS |
| `seoMetadata.ogImage` | `ogImage` | `SeoMetadata.ogImage` | `seoProjection` | optional | PASS |
| `seoMetadata.noIndex` | `noIndex` | `SeoMetadata.noIndex` | `seoProjection` | `not-found` | PASS |
| `globalCtas[].label/href/variant` | `cta` object | `Cta` | `getSiteSettings` | `site-settings.ts` | PASS |
| `socialLinks[].platform/url/label` | `socialLink` | `SocialLink` | `getSiteSettings` | `site-settings.ts` | PASS |
| — | `socialLink.isPlaceholder` | `SocialLink.isPlaceholder` | `getSiteSettings` | `site-settings.ts` | PASS (extension) |

### `siteSettings`

| Architecture field | Schema | TS | Query | Fallback | Status |
| --- | --- | --- | --- | --- | --- |
| `siteName` | ✓ | ✓ | `getSiteSettings` | ✓ | PASS |
| `tagline` | ✓ | ✓ | ✓ | ✓ | PASS |
| `publicEmail` | ✓ | ✓ | ✓ | `undefined` | PASS |
| `socialLinks` | ✓ | ✓ | ✓ | placeholder | PASS |
| `defaultSeo` | ✓ | ✓ | ✓ | ✓ | PASS |
| `globalCtas` | ✓ | ✓ | ✓ | ✓ | PASS |
| `footerText` | ✓ | ✓ | ✓ | ✓ | PASS |

### `homePage` + blocks

| Architecture field | Schema | TS | Query | Fallback | Status |
| --- | --- | --- | --- | --- | --- |
| `hero.*` | inline object | `HomeHero` | `getHomePage` | ✓ | PASS |
| `mission.*` | inline object | `HomeMission` | ✓ | ✓ | PASS |
| `featuredWork` refs | `featuredProducts`/`featuredCaseStudies` | `featuredProductSlugs`/`featuredCaseStudySlugs` | GROQ slug projection | seed refs | PASS |
| `highlights.*` | inline object | `HomeHighlights` | ✓ | ✓ | PASS |
| `ctaBanner.*` | inline object | `HomeCtaBanner` | ✓ | ✓ | PASS |
| per-route SEO | `seo` | `HomePage.seo` | ✓ | ✓ | PASS |
| — | `title` | `HomePage.title` | ✓ | ✓ | PASS (convenience) |

### `aboutPage`

| Architecture field | Schema | TS | Query | Fallback | Status |
| --- | --- | --- | --- | --- | --- |
| `storySections` | `storySection[]` | ✓ | `getAboutPage` | ✓ | PASS |
| `mission` | ✓ | ✓ | ✓ | ✓ | PASS |
| `vision` | ✓ | ✓ | ✓ | ✓ | PASS |
| `motto` | ✓ | ✓ | ✓ | ✓ | PASS |
| `values` | `coreValue[]` | ✓ | ✓ | ✓ | PASS |
| `cultureSummary` | ✓ | ✓ | ✓ | ✓ | PASS |
| `teamIntro` | ✓ | ✓ | ✓ | ✓ | PASS |
| per-route SEO | `seo` | ✓ | ✓ | ✓ | PASS |

### `teamMember`

| Architecture field | Schema | TS | Query | Fallback | Status |
| --- | --- | --- | --- | --- | --- |
| all fields | ✓ | ✓ | `getTeamMembers` | 6 canon members | PASS |
| `isPlaceholder` | ✓ | ✓ | ✓ | `true` | PASS |

### `serviceCategory` / `service`

| Architecture field | Schema | TS | Query | Fallback | Status |
| --- | --- | --- | --- | --- | --- |
| category fields | ✓ | ✓ | `getServiceCategories` | 4 canon | PASS |
| `service.category` ref | ✓ | `categorySlug` projection | `getServices` | ref in seed | PASS |
| `body` portable text | `portableBody` | `PortableTextBlock[]` | ✓ | ✓ | FIXED (PT subset aligned) |
| `isPlaceholder` | ✓ | ✓ | ✓ | `true` | PASS |
| per-doc SEO | `seo` | ✓ | ✓ | ✓ | PASS (extension) |

### `product`

| Architecture field | Schema | TS | Query | Fallback | Status |
| --- | --- | --- | --- | --- | --- |
| all fields | ✓ | ✓ | `getProducts` | 3 canon IP | PASS |
| `status` enum | `original-ip` | ✓ | ✓ | ✓ | PASS |
| `developmentStatus` | 4 values, default `tbd` | ✓ | ✓ | `tbd` | PASS |
| `media[]` | `productMedia` | ✓ | ✓ | empty assets | PASS |
| `isPlaceholder` | ✓ | ✓ | ✓ | `true` | PASS |

### `caseStudy`

| Architecture field | Schema | TS | Query | Fallback | Status |
| --- | --- | --- | --- | --- | --- |
| all fields | ✓ | ✓ | `getCaseStudies` | 1 generic placeholder | PASS |
| `industry` free text | `string` | ✓ | ✓ | ✓ | PASS |
| `isPlaceholder` | default `true` | ✓ | ✓ | `true` | PASS |
| per-doc SEO | `seo` | ✓ | ✓ | ✓ | PASS (extension) |

### `communityItem`

| Architecture field | Schema | TS | Query | Fallback | Status |
| --- | --- | --- | --- | --- | --- |
| all fields | ✓ | ✓ | `getCommunityItems` | 2 generic items | PASS |
| `type` enum (7 values) | ✓ | `CommunityItemType` | ✓ | ✓ | PASS |
| `isPlaceholder` | default `true` | ✓ | ✓ | `true` | PASS |
| detail route | N/A | N/A | body fetched unused | N/A | N/A (feed-only v1) |

### `contactPage`

| Architecture field | Schema | TS | Query | Fallback | Status |
| --- | --- | --- | --- | --- | --- |
| `headline` | ✓ | ✓ | `getContactPage` | ✓ | PASS |
| `intro` | ✓ | ✓ | ✓ | ✓ | PASS |
| `channels` | `contactChannel[]` | ✓ | ✓ | placeholder | PASS |
| `ctaNote` | ✓ | ✓ | ✓ | optional | PASS |
| — | `faq` | `FaqItem[]` | ✓ | 8 canon Q&As | PASS (Phase 7 extension) |
| per-route SEO | `seo` | ✓ | ✓ | ✓ | PASS |

### Studio infrastructure

| Item | Status | Notes |
| --- | --- | --- |
| Desk structure | FIXED | Added `sanity/structure.ts` |
| Preview URLs | N/A | Future — post-provisioning |
| `.env.example` | FIXED | Restored with CMS vars |
| `portableBody` lists | FIXED | Removed — renderer has no list support |

### Drift summary counts

| Status | Count |
| --- | --- |
| PASS | 58 |
| FIXED | 3 |
| N/A | 2 |
| **Total rows** | **63** |

---

## Parity check commands

```bash
npm run build
npm run lint
npm run test
npm run studio    # requires CMS_PROJECT_ID
```

When `CMS_PROJECT_ID` is unset, app builds and renders from fallbacks — expected for local dev without provisioning.
