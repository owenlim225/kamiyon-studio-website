# Sanity Schema Plan — Introduction & Conventions

> **Read first:** `context/project-overview.md` → `context/architecture.md` (§ CMS Content Model) → `context/ui-context.md` → `context/code-standards.md` → `context/progress-tracker.md`

This series documents the Kamiyon Studio v1 Sanity content model. It is the operational companion to `context/architecture.md` — architecture defines *what*; these docs define *how* to implement, register, seed, and verify in Studio.

**Do not use** the Sanity tutorial `post` document type. Kamiyon v1 has no blog, news, or press routes.

---

## Three-step workflow (every type)

1. **Define schema** — `sanity/schemaTypes/documents.ts` (documents) or `objects.ts` (embedded objects)
2. **Register in index** — `sanity/schemaTypes/index.ts` (objects before documents that reference them)
3. **Verify in Studio** — `npm run studio` → confirm type appears; cross-check `lib/cms/types.ts`, `lib/cms/queries.ts`, and `lib/cms/fallbacks/**`

---

## Document vs object split

| Kind | Sanity `type` | Examples | Studio behavior |
| --- | --- | --- | --- |
| **Singleton document** | `document` | `siteSettings`, `homePage`, `aboutPage`, `contactPage` | One canonical doc per type; fixed `_id` in seed (`siteSettings`, `homePage`, …) |
| **Collection document** | `document` | `teamMember`, `service`, `product`, `caseStudy`, `communityItem` | Many entries; slug or stable name-based `_id` in seed |
| **Embedded object** | `object` | `seoMetadata`, `cta`, `socialLink`, `homeBlock` fields, `contactChannel` | Never queried standalone; nested in parent documents |

**Rule:** If content is reused across documents or needs its own Studio list → `document`. If it only exists inside one parent → `object` or inline `object` in an array.

---

## Singleton conventions

| Document | Fixed seed `_id` | Route(s) | Query |
| --- | --- | --- | --- |
| `siteSettings` | `siteSettings` | Global shell (future wiring) | `getSiteSettings()` |
| `homePage` | `homePage` | `/` | `getHomePage()` |
| `aboutPage` | `aboutPage` | `/about` | `getAboutPage()` |
| `contactPage` | `contactPage` | `/contact` | `getContactPage()` |

Singletons are fetched with `*[_type == "<type>"][0]`. Do not create duplicate singleton documents in Studio.

---

## `isPlaceholder` behavior

| Applies to | Default | UI behavior | Content rules |
| --- | --- | --- | --- |
| `teamMember` | `true` | Initials avatar + optional dev badge | Names/roles from canon; bios/photos placeholder |
| `service` | `true` | "Placeholder" badge on cards | Canon service titles; detail copy placeholder OK |
| `product` | `true` | "Coming soon" media state | Canon IP titles; `developmentStatus` defaults `tbd` |
| `caseStudy` | `true` | "Placeholder" badge | **Never** real client names — generic labels only |
| `communityItem` | `true` | "Coming soon" badge | **Never** fabricated events, dates, or URLs |
| `socialLink` | `true` | Footer/shell "Coming soon" | URLs TBD until canon provides them |
| `contactChannel` | `true` | `ContactCard` disabled state | No fake `mailto:` or social URLs |

`isPlaceholder: true` means *content is structurally valid but not publication-ready*. The app still renders it; badges/disabled states signal honesty.

---

## Portable text subset (v1)

Only one renderer exists: `components/ui/PortableText.tsx` (used for `service.body`; `communityItem.body` is fetched but not rendered on a detail route in v1).

**Supported in schema and renderer:**

| Feature | Schema (`portableBody`) | Renderer |
| --- | --- | --- |
| Normal paragraph | `normal` | `<p>` |
| Headings | `h2`, `h3` | `<h2>`, `<h3>` |
| Strong / emphasis | `strong`, `em` decorators | `<strong>`, `<em>` |

**Not supported (do not add to CMS copy expecting render):** lists, links, images, `h1`/`h4`, `blockquote`, custom annotations.

---

## TypeScript mirror (`lib/cms/types.ts`)

- Field names match Sanity schema exactly (camelCase)
- GROQ projections may *reshape* references into slugs (e.g. `featuredProductSlugs`, `categorySlug`) — documented per type in later files
- Fallbacks in `lib/cms/fallbacks/**` must satisfy the same types
- Resolution: `(await getX()) ?? xFallback` via `resolveWithFallback`

---

## Canon compliance (all types)

1. **Never fabricate:** client names, awards, testimonials, release dates, metrics, community event specifics, or contact URLs
2. **Canon facts** in fallbacks/seed: copy verbatim from `docs/` with source comment
3. **Vision content:** label in UI, never state as current achievement
4. **Contact v1:** external links only — no form fields in schema
5. **Out of scope:** `post`, `/news`, `/pres`, auth, Calendly, contact forms

---

## File map

| File | Purpose |
| --- | --- |
| `02-site-settings-and-seo.md` | `siteSettings`, `seoMetadata`, `socialLink`, `cta` |
| `03-page-singletons.md` | `homePage` blocks, `aboutPage`, `contactPage` |
| `04-collections-team-services.md` | `teamMember`, `serviceCategory`, `service` |
| `05-collections-products-portfolio-community.md` | `product`, `caseStudy`, `communityItem` |
| `06-registration-and-studio-structure.md` | Index order, desk structure, drift matrix |
| `07-seed-and-provisioning.md` | Env vars, dataset, CORS, `npm run studio:seed` |

---

## Verify checklist (per change)

- [ ] Schema field added/updated in `documents.ts` or `objects.ts`
- [ ] Registered in `schemaTypes/index.ts`
- [ ] Type mirrored in `lib/cms/types.ts`
- [ ] GROQ projection updated in `lib/cms/queries.ts` (if fetched)
- [ ] Fallback updated in `lib/cms/fallbacks/**` (if app consumes field)
- [ ] Seed doc updated in `sanity/seed/placeholder-docs.ts` (if seeded)
- [ ] `npm run build` · `npm run lint` · `npm run test`
