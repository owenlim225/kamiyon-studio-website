# Page Singletons — Home, About, Contact

Three singleton documents plus embedded home page blocks.

---

## Shared embedded objects (About / Contact)

### `storySection` (object)

| Field | Type | TS | Notes |
| --- | --- | --- | --- |
| `title` | `string` | `StorySection.title` | Section heading |
| `body` | `text` | `StorySection.body` | From `docs/company/founder-story.md` |

### `coreValue` (object)

| Field | Type | TS | Notes |
| --- | --- | --- | --- |
| `name` | `string` | `CoreValue.name` | Five canon values |
| `description` | `text` | `CoreValue.description` | Short description |

### `contactChannel` (object)

| Field | Type | TS | Notes |
| --- | --- | --- | --- |
| `type` | `string` | `ContactChannel.type` | `facebook` \| `linkedin` \| `email` |
| `label` | `string` | `ContactChannel.label` | Display label |
| `value` | `string` | `ContactChannel.value` | URL or email address |
| `isPlaceholder` | `boolean` | `ContactChannel.isPlaceholder` | Default `true`; disables link in UI |

### `faqItem` (object)

| Field | Type | TS | Notes |
| --- | --- | --- | --- |
| `question` | `string` | `FaqItem.question` | From `docs/ai/faq.md` |
| `answer` | `text` | `FaqItem.answer` | Verbatim canon copy |

> **Schema extension (Phase 7):** `contactPage.faq` is not in the original `architecture.md` table but is implemented and seeded from canon FAQ.

---

## `homePage` (document, singleton)

| | |
| --- | --- |
| **Sanity name** | `homePage` |
| **TS type** | `HomePage` |
| **Seed `_id`** | `homePage` |
| **Route** | `/` |
| **Query** | `getHomePage()` |
| **Fallback** | `lib/cms/fallbacks/home.ts` → `homePageFallback` |

### Top-level fields

| Field | Type | Notes |
| --- | --- | --- |
| `title` | `string` | Studio label (e.g. "Home") |
| `blocks` | `array` | Ordered page blocks (see below) |
| `seo` | `seoMetadata` | `generateMetadata` on `app/page.tsx` |

### Block types (`blocks[]`)

Each array member is an inline `object` with implicit `_type` from member `name`.

#### `hero`

| Field | Type | TS (`HomeHero`) | Notes |
| --- | --- | --- | --- |
| `headline` | `string` | ✓ | Positioning from messaging |
| `subheadline` | `text` | ✓ | Supporting line |
| `ctaLabel` | `string` | ✓ | Primary CTA |
| `ctaHref` | `string` | ✓ | Usually `/services` |
| `image` | `image` | ✓ | Hero LCP; placeholder until uploaded |

**Component:** `components/sections/Hero.tsx`

#### `mission`

| Field | Type | TS (`HomeMission`) |
| --- | --- | --- |
| `title` | `string` | ✓ |
| `body` | `text` | ✓ — canon mission text |

**Component:** `components/sections/Mission.tsx`

#### `featuredWork`

| Field | Type | Schema storage | TS projection | Notes |
| --- | --- | --- | --- | --- |
| `title` | `string` | ✓ | ✓ | Section heading |
| `body` | `text` | ✓ | ✓ | Intro copy |
| `featuredProducts` | `reference[]` → `product` | CMS | `featuredProductSlugs: string[]` | GROQ dereferences slugs |
| `featuredCaseStudies` | `reference[]` → `caseStudy` | CMS | `featuredCaseStudySlugs: string[]` | Resolved at render in `FeaturedWork` |

**Architecture note:** Canon describes "references → caseStudy or product". Implementation stores references in Sanity; app receives slug arrays via GROQ and resolves against `getProducts()` / `getCaseStudies()` at render time (per progress-tracker decision).

**Component:** `components/sections/FeaturedWork.tsx`

#### `highlights`

| Field | Type | TS (`HomeHighlights`) |
| --- | --- | --- |
| `title` | `string` | ✓ |
| `items[]` | `{ title, description, icon? }` | `HomeHighlight[]` |

**Component:** `components/sections/Highlights.tsx`

#### `ctaBanner`

| Field | Type | TS (`HomeCtaBanner`) |
| --- | --- | --- |
| `title`, `body`, `ctaLabel`, `ctaHref` | strings/text | ✓ |

**Component:** `components/sections/ContactCTA.tsx`

### `isPlaceholder`

N/A at page level. Referenced products/case studies carry their own `isPlaceholder`.

### Do not fabricate

Featured work must reference real seeded slugs or stay empty — no fake client logos or award copy. Secondary nav links in `Hero` are static UI (not CMS).

---

## `aboutPage` (document, singleton)

| | |
| --- | --- |
| **Sanity name** | `aboutPage` |
| **TS type** | `AboutPage` |
| **Seed `_id`** | `aboutPage` |
| **Route** | `/about` |
| **Query** | `getAboutPage()` |
| **Fallback** | `lib/cms/fallbacks/about.ts` |

### Fields

| Field | Type | Validation | Notes |
| --- | --- | --- | --- |
| `title` | `string` | — | Page label |
| `storySections` | `storySection[]` | — | Founder/company story |
| `mission` | `text` | — | Canon mission |
| `vision` | `text` | — | Rendered with Vision label in UI |
| `motto` | `string` | — | "Create. Play. Inspire." |
| `values` | `coreValue[]` | — | Five core values |
| `cultureSummary` | `text` | — | From culture doc |
| `teamIntro` | `text` | optional | Above team grid |
| `seo` | `seoMetadata` | — | Per-route metadata |

### References

Embeds `storySection`, `coreValue`, `seoMetadata`. Team members are a separate collection (`teamMember`).

### Related query

`getTeamMembers()` — separate collection, not embedded.

### Components

`AboutHero`, `OurStory`, `VisionBand`, `ValuesGrid`, `TeamGrid`, `CultureClosing`

### Do not fabricate

Vision must stay labeled. Team names/roles from canon only.

---

## `contactPage` (document, singleton)

| | |
| --- | --- |
| **Sanity name** | `contactPage` |
| **TS type** | `ContactPage` |
| **Seed `_id`** | `contactPage` |
| **Route** | `/contact` |
| **Query** | `getContactPage()` |
| **Fallback** | `lib/cms/fallbacks/contact.ts` |

### Fields

| Field | Type | Notes |
| --- | --- | --- |
| `headline` | `string` | Welcoming headline |
| `intro` | `text` | Short intro |
| `channels` | `contactChannel[]` | Facebook, LinkedIn, email — **no form fields** |
| `ctaNote` | `text` | optional; only if canon-backed |
| `faq` | `faqItem[]` | Canon Q&A from `docs/ai/faq.md` |
| `seo` | `seoMetadata` | Per-route metadata |

### References

May mirror `siteSettings` social/email when wired; channels are self-contained in v1.

### `isPlaceholder`

Per-channel via `contactChannel.isPlaceholder`. All v1 seed channels are placeholder (`value: "#"`).

### Components

`ContactHero`, `ContactMethods`, `ContactSidebar`, `ContactFAQ`

### Do not fabricate

**Do not** add form fields, Calendly, or real contact URLs until canon provides them. Placeholder channels render as disabled cards, not fake links.

---

## Verify in Studio

1. `npm run studio`
2. Desk: **Pages → Home Page / About Page / Contact Page** (singletons)
3. Home blocks: add/reorder hero → mission → featuredWork → highlights → ctaBanner
4. Featured work: pick references from seeded `product` and `caseStudy` documents
