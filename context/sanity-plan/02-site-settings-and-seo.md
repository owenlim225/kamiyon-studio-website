# Site Settings & Shared Objects

Global configuration and reusable embedded objects used across singletons and collections.

---

## `seoMetadata` (object)

| | |
| --- | --- |
| **Sanity name** | `seoMetadata` |
| **Title** | SEO Metadata |
| **Type** | `object` |
| **TS type** | `SeoMetadata` in `lib/cms/types.ts` |

### Fields

| Field | Sanity type | Validation | Notes |
| --- | --- | --- | --- |
| `title` | `string` | required | Page/document title for `<title>` and OG |
| `description` | `text` | required | Meta description; from canon positioning where possible |
| `ogImage` | `image` (+ `alt`, `caption`) | optional | Falls back to `app/opengraph-image.tsx` when unset |
| `noIndex` | `boolean` | optional, default `false` | Used for 404 and draft-like pages |

### References

None (embedded only).

### `isPlaceholder`

N/A — SEO fields are always required when the parent document is published.

### Routes & queries

Embedded in: `siteSettings.defaultSeo`, `homePage.seo`, `aboutPage.seo`, `contactPage.seo`, and per-collection `seo` on `service`, `product`, `caseStudy`, `communityItem`.

GROQ fragment: `seoProjection` in `lib/cms/queries.ts`.

### Do not fabricate

Descriptions must trace to canon messaging/positioning or honest page summaries — no inflated claims.

---

## `cta` (object)

| | |
| --- | --- |
| **Sanity name** | `cta` |
| **Title** | CTA |
| **Type** | `object` |
| **TS type** | `Cta` |

### Fields

| Field | Sanity type | Validation | Notes |
| --- | --- | --- | --- |
| `label` | `string` | required | Button/link label; tone per `ui-context.md` |
| `href` | `string` | required | Internal path (`/contact`) or external URL |
| `variant` | `string` | optional | `primary` \| `secondary` \| `ghost`; default `primary` |

### References

None.

### `isPlaceholder`

N/A.

### Routes & queries

Used in `siteSettings.globalCtas`. Query: `getSiteSettings()` (not yet wired to shell — static nav in `lib/config/navigation.ts` for v1).

### Do not fabricate

N/A — CTAs point to real site routes or TBD external URLs only.

---

## `socialLink` (object)

| | |
| --- | --- |
| **Sanity name** | `socialLink` |
| **Title** | Social Link |
| **Type** | `object` |
| **TS type** | `SocialLink` |

### Fields

| Field | Sanity type | Validation | Notes |
| --- | --- | --- | --- |
| `platform` | `string` | required | `facebook` \| `linkedin` \| `email` |
| `url` | `string` | required | Full URL or `mailto:` target |
| `label` | `string` | required | Accessible label |
| `isPlaceholder` | `boolean` | optional, default `true` | When `true`, shell renders "Coming soon" |

### References

None.

### Routes & queries

`siteSettings.socialLinks[]` via `getSiteSettings()`. Footer currently uses `lib/config/navigation.ts` placeholders until CMS wiring.

### Do not fabricate

**Do not** invent Facebook, LinkedIn, or public email URLs. Seed uses `#` with `isPlaceholder: true` until canon provides real values.

---

## `siteSettings` (document, singleton)

| | |
| --- | --- |
| **Sanity name** | `siteSettings` |
| **Title** | Site Settings |
| **Type** | `document` |
| **TS type** | `SiteSettings` |
| **Seed `_id`** | `siteSettings` |

### Fields

| Field | Sanity type | Validation | Notes |
| --- | --- | --- | --- |
| `siteName` | `string` | — | Default: "Kamiyon Studio" |
| `tagline` | `text` | — | From `docs/branding/messaging.md` |
| `publicEmail` | `string` | — | mailto target; **TBD** in canon |
| `socialLinks` | `array` of `socialLink` | — | Facebook, LinkedIn, email |
| `defaultSeo` | `seoMetadata` | — | Site-wide default metadata |
| `globalCtas` | `array` of `cta` | — | Reusable CTAs (header/footer future) |
| `footerText` | `text` | optional | e.g. motto "Create. Play. Inspire." |

### References

Embeds: `seoMetadata`, `cta`, `socialLink`.

### `isPlaceholder`

N/A at document level; `socialLinks[].isPlaceholder` governs channel honesty.

### Routes & queries

| Route | Query | Fallback |
| --- | --- | --- |
| Global (future) | `getSiteSettings()` | `siteSettingsFallback` in `lib/cms/fallbacks/site-settings.ts` |

### Do not fabricate

No invented email or social URLs. `publicEmail` may be omitted until provided.

---

## Registration & verify

1. Objects in `sanity/schemaTypes/objects.ts`: `seoMetadata`, `cta`, `socialLink`
2. Document in `sanity/schemaTypes/documents.ts`: `siteSettings`
3. Index order: objects before `siteSettings` (see `06-registration-and-studio-structure.md`)
4. Studio: **Settings → Site Settings** singleton appears in desk structure
