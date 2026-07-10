# Seed & Provisioning

Environment setup, Sanity project provisioning, CORS, tokens, and placeholder-first seed rules.

---

## Environment variables

| Variable | Required | Used by | Notes |
| --- | --- | --- | --- |
| `CMS_PROJECT_ID` | Studio + live fetches | `lib/cms/client.ts`, `sanity.config.ts`, `sanity.cli.ts` | Sanity project ID |
| `CMS_DATASET` | Recommended | Same | Default `production` when unset |
| `CMS_API_TOKEN` | Optional (read) | `lib/cms/client.ts` | Read token for server fetches; omit for public dataset |
| `NEXT_PUBLIC_SITE_URL` | Optional | `lib/seo/site-url.ts` | Production URL for sitemap/OG canonical |

Copy template:

```bash
# .env.local (never commit)
CMS_PROJECT_ID=your_project_id
CMS_DATASET=production
CMS_API_TOKEN=your_read_token   # optional for published content
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Reference: `.env.example` in repo root.

` sanity/load-env.ts` loads `.env` then `.env.local` (override) for Studio and seed scripts.

---

## Sanity project provisioning (checklist)

### 1. Create project

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Create project (e.g. "Kamiyon Studio Website")
3. Note **Project ID** → `CMS_PROJECT_ID`
4. Use dataset `production` (or create `development` for staging)

### 2. CORS origins

In Sanity Manage → API → CORS origins, add:

| Origin | Purpose |
| --- | --- |
| `http://localhost:3333` | `npm run studio` (default Sanity dev port) |
| `http://localhost:3000` | Next.js dev (if using live API from browser) |
| Production domain | When deployment target confirmed |

### 3. API tokens

| Token type | Use |
| --- | --- |
| **Viewer** (read) | `CMS_API_TOKEN` in Next.js server — optional for public datasets |
| **Editor** | `npm run studio:seed` via `--with-user-token` (logged-in CLI user) |

Never commit tokens. Rotate if exposed.

### 4. Local env

```bash
cp .env.example .env.local
# Fill CMS_PROJECT_ID and CMS_DATASET
```

### 5. Verify Studio

```bash
npm run studio
```

Confirm desk shows: Site Settings, Pages (3 singletons), Collections (6 types). If `CMS_PROJECT_ID` is missing, Studio throws a clear error.

### 6. Deploy schema (optional)

```bash
npm run studio:schema
```

### 7. Seed placeholder documents

```bash
npm run studio:seed
```

Runs `sanity exec sanity/scripts/seed-placeholder-docs.ts --with-user-token` — upserts all documents from `sanity/seed/placeholder-docs.ts`.

---

## Seed rules (placeholder-first)

### Source of truth

Seed data is generated from `lib/cms/fallbacks/**` — same shapes the app uses when CMS is empty. **Single source:** edit fallbacks, seed re-exports them.

### Stable document IDs

| Pattern | Example |
| --- | --- |
| Singletons | `siteSettings`, `homePage`, `aboutPage`, `contactPage` |
| Slugged collections | `{type}.{slug.current}` e.g. `product.eclipse` |
| Team members | `teamMember.{slugified-name}` |

IDs ensure idempotent `createOrReplace` on re-seed.

### Reference wiring

- `service.category` → `serviceCategory.{slug}`
- `homePage.featuredWork` → product/case study refs by slug ID

### `withArrayKeys`

Seed pipeline adds stable `_key` to all array items for Sanity validation.

### Placeholder flags

| Document | `isPlaceholder` in seed |
| --- | --- |
| All `teamMember` | `true` |
| All `service` | `true` |
| All `product` | `true` |
| All `caseStudy` | `true` |
| All `communityItem` | `true` |
| `socialLink` / `contactChannel` | `true` |

### Do not fabricate (seed)

| Content | Rule |
| --- | --- |
| Portfolio `clientName` | Generic only — "Client name coming soon" |
| Community events | Generic titles — "Workshop — Details coming soon" |
| Contact URLs | `value: "#"` with `isPlaceholder: true` |
| Social URLs | `url: "#"` with `isPlaceholder: true` |
| Product media | Empty `asset` — honest coming-soon UI |
| `developmentStatus` | `tbd` for all canon products |
| `publicEmail` | Omitted / undefined |

### Canon content (allowed in seed)

- Company name, mission, vision, motto, values
- Team names and roles (6 members)
- Service categories and 10 service titles
- Three product titles and genres from `future-ip.md`
- FAQ answers from `docs/ai/faq.md`

---

## Seed document count

After seed, expect **~30 documents**:

- 4 singletons
- 6 team members
- 4 service categories
- 10 services
- 3 products
- 1 case study
- 2 community items

Exact count: `placeholderDocuments.length` logged by seed script.

---

## App behavior after seed

| CMS state | App behavior |
| --- | --- |
| No `CMS_PROJECT_ID` | Full site from fallbacks |
| Project configured, empty dataset | Fallbacks (queries return null) |
| After `studio:seed` | CMS content replaces fallbacks where published |
| Fetch error | Logged server-side; fallbacks used |

ISR: `revalidate: 3600` on all CMS fetches.

---

## Troubleshooting

| Issue | Fix |
| --- | --- |
| Studio won't start | Set `CMS_PROJECT_ID` in `.env.local` |
| Seed auth error | Run `sanity login` then retry `studio:seed` |
| CORS error in browser | Add origin in Sanity Manage |
| Types missing in Studio | Check `schemaTypes/index.ts` registration |
| Featured work empty | Ensure home seed refs match product/case study IDs |

---

## Next steps after provisioning

1. Upload real brand images to hero/product/team fields — hero: `npm run studio:upload-assets` (uses `docs/assets/youtube-banner.png`; re-run after every `studio:seed`)
2. Replace placeholder contact URLs when canon provides them
3. Set `NEXT_PUBLIC_SITE_URL` when deployment target confirmed
4. Consider Sanity preview / presentation tool (see `06-registration-and-studio-structure.md`)

---

## Verify

```bash
npm run studio:seed
npm run build
npm run dev
# Visit all 7 routes — CMS content should match fallbacks structurally
```
