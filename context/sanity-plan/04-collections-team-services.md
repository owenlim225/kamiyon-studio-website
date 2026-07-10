# Collections — Team & Services

Collection documents for About team grid and Services section.

---

## `teamMember` (document, collection)

| | |
| --- | --- |
| **Sanity name** | `teamMember` |
| **Title** | Team Member |
| **Type** | `document` |
| **TS type** | `TeamMember` |
| **Route** | `/about` (team grid) |
| **Query** | `getTeamMembers()` |
| **Fallback** | `lib/cms/fallbacks/about.ts` → `teamMembersFallback` |

### Fields

| Field | Sanity type | Validation | Notes |
| --- | --- | --- | --- |
| `name` | `string` | — | **Canon** — see roster below |
| `role` | `string` | — | **Canon** |
| `bio` | `text` | — | Placeholder until written |
| `photo` | `image` | optional | Placeholder asset |
| `order` | `number` | — | Display sort ascending |
| `isPlaceholder` | `boolean` | default `true` | Bios/photos awaiting real content |

### Canon seed roster (names/roles only)

| Role | Member |
| --- | --- |
| CEO | Sherwin Limosnero |
| CTO | Christian Jude Villaber |
| CMO | Ken Cabingas |
| Lead 3D Artist | Luis Cabrido III |
| Community Growth Manager | Lucky Guevarra |
| Programmer | Yushua Dapilaga |

> Source: `docs/company/overview.md`

### References

None.

### Seed `_id` pattern

`teamMember.{slugified-name}` (e.g. `teamMember.sherwin-limosnero`)

### Component

`TeamMemberCard` — initials avatar when `photo` unset; badge when `isPlaceholder`

### Do not fabricate

Names and roles must match canon. Do not invent team size stats or awards.

---

## `serviceCategory` (document, collection)

| | |
| --- | --- |
| **Sanity name** | `serviceCategory` |
| **TS type** | `ServiceCategory` |
| **Route** | `/services` |
| **Query** | `getServiceCategories()` |
| **Fallback** | `lib/cms/fallbacks/services.ts` → `serviceCategoriesFallback` |

### Fields

| Field | Sanity type | Notes |
| --- | --- | --- |
| `title` | `string` | Category name |
| `slug` | `slug` | URL-safe identifier |
| `description` | `text` | Category intro |
| `order` | `number` | Display order |

### Canon seed categories

1. Interactive Experience Development
2. Software Development
3. Creative & Design Services
4. Consulting & Technical Advisory

> Source: `docs/services/services.md`

### References

Referenced by `service.category`.

### Seed `_id` pattern

`serviceCategory.{slug.current}`

### `isPlaceholder`

N/A — categories are canon-defined structure.

---

## `service` (document, collection)

| | |
| --- | --- |
| **Sanity name** | `service` |
| **TS type** | `Service` |
| **Routes** | `/services`, `/services/[slug]` |
| **Queries** | `getServices()`, `getServiceBySlug(slug)` |
| **Fallback** | `lib/cms/fallbacks/services.ts` → `servicesFallback` |

### Fields

| Field | Sanity type | Validation | Notes |
| --- | --- | --- | --- |
| `title` | `string` | — | e.g. Game Development |
| `slug` | `slug` | — | Detail route param |
| `category` | `reference` → `serviceCategory` | **required** | Grouped on listing page |
| `summary` | `text` | — | Outcome-focused card copy |
| `body` | `array` (`portableBody`) | — | Detail page; minimal PT subset |
| `outcomes` | `string[]` | — | What clients gain |
| `relatedIndustries` | `string[]` | optional | Deduped at render for industries band |
| `icon` | `string` | optional | Glyph key (`gamepad`, `rocket`, …) |
| `order` | `number` | — | Sort within category |
| `isPlaceholder` | `boolean` | default `true` | Detail copy awaiting polish |
| `seo` | `seoMetadata` | — | Per-service metadata |

### GROQ projection note

`category` reference → `"categorySlug": category->slug.current` in `lib/cms/types.ts` as `categorySlug: string`.

### Canon service list (10 areas)

Game Development, MVP Development, Gamification, Web Development, Mobile Development, UI/UX Design, AI Integration, Blockchain Solutions, Consultation, Creative Services

> Source: `docs/services/services.md`, `docs/marketing/website-guidelines.md`

### References

→ `serviceCategory`

### Seed `_id` pattern

`service.{slug.current}`

### Components

`ServicesListing`, `ServiceCard`, `ServiceDetail`, `ServiceSidebar`, `PortableText`

### Do not fabricate

Outcome claims must be honest and outcome-focused — no fake client logos or metrics.

---

## Portable text (`service.body`)

See `01-sanity-schema.md` — `portableBody` in `sanity/schemaTypes/objects.ts`.

Rendered by `components/ui/PortableText.tsx`: `normal`, `h2`, `h3`, `strong`, `em` only.

---

## Verify in Studio

1. Desk: **Collections → Team Members / Service Categories / Services**
2. Create service → pick required category reference
3. Run `npm run studio:seed` to load canon structure
4. Visit `/services` and `/services/game-development` (or any seeded slug)
