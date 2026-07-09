# Progress Tracker

Update this file after every meaningful implementation change.

---

## Canon Analysis Summary

Analysis of all 43 markdown files under `docs/` (July 2026). Extracts website-relevant canon only. Full detail lives in source docs.

### 1. Company identity

| Element | Value | Source |
| --- | --- | --- |
| Name | Kamiyon Studio | `docs/company/overview.md` |
| Founded | 2024 | overview |
| HQ | Biñan City, Laguna, Philippines | overview |
| Mission | Create games and interactive experiences that educate, inspire, and make a lasting impact | `docs/company/mission-vision.md` |
| Vision | World-class multimedia entertainment company; Filipino creativity globally (**Vision**) | mission-vision |
| Motto | **Create. Play. Inspire.** (confirmed for website) | mission-vision, overview |
| Values | Curiosity, Education, Innovation, Accessibility, Long-Term Thinking | `docs/company/core-values.md` |
| Positioning | Multidisciplinary interactive experience studio | `docs/marketing/positioning.md` |
| Team | 6 members (names/roles canon) | overview, `docs/company/organizational-structure.md` |
| Mascot | Kami-chan | `docs/branding/mascot-kami-chan.md` |

### 2. Website objectives and audiences

**Objectives** (`docs/marketing/website-guidelines.md`): explain who Kamiyon is; showcase products; present services; build credibility; generate leads; highlight expertise; thought leadership; support community; reflect brand.

**Audiences:** prospective clients, partners, educational institutions, Web3 orgs, investors, community orgs, future team members, media, players.

### 3. Page requirements (7 sections)

| Page | Canon content | Placeholder needed |
| --- | --- | --- |
| Home | Value prop, mission, featured work, CTA | Featured work, highlights |
| About | Story, mission/vision/values, team, culture | Team bios, photos |
| Services | 4 categories + 10 service areas | Detail page copy |
| Products | Eclipse, Vocabu, Afterschool Cleanup | Screenshots, trailers, dev status |
| Portfolio | Case study structure | All entries (no canon clients) |
| Community | Event types | All specific events |
| Contact | External channels | Facebook URL, LinkedIn URL, email |

### 4. Brand and design tokens

- **Colors:** Sakura Pink, Warm Ivory, Charcoal, Deep Indigo, Soft Gold — roles in `docs/design-system/color-palette.md`
- **Confirmed hex:** Sakura `#f97695` from `docs/assets/svg.svg`
- **Other hex:** TBD in canon (not in markdown)
- **Fonts:** Poppins (UI), Montserrat (headlines), Beaufort for LoL (decorative hero only) — `docs/branding/visual-identity.md`
- **Logo / mascot:** `docs/design-system/logo-guidelines.md`, `docs/branding/mascot-kami-chan.md`

### 5. Products and services

**Products (canon IP):** Eclipse (2D platformer), Vocabu Wildlife Edition (educational word puzzle), Afterschool Cleanup (thriller cleaning sim) — `docs/products/future-ip.md`

**Services (4 categories):** Interactive Experience Development, Software Development, Creative & Design, Consulting & Technical Advisory — `docs/services/services.md`

### 6. CMS content types

Defined in `context/architecture.md`: siteSettings, homePage, aboutPage, teamMember, serviceCategory, service, product, caseStudy, communityItem, contactPage, seoMetadata.

### 7. Gaps and conflicts (for review)

| Issue | Resolution |
| --- | --- |
| README motto "Play. Question. Create." vs "Create. Play. Inspire." | Website uses **Create. Play. Inspire.**; flag README for canon update |
| `docs/design-system/typography.md` duplicates color-palette.md | Fonts sourced from visual-identity.md only |
| `docs/services/consultation-process.md` duplicates ideal-client.md | No consultation process doc; use services.md |
| No hex for 4/5 colors in markdown | Sakura only; others TBD |
| No social URLs or public email in docs | Open questions below |
| No named portfolio clients or community events | Placeholder-first; never fabricate |
| website-guidelines suggests "Book a consultation" | v1 override: external contact links only |

---

## Current Phase

**Context alignment** — complete (this task)

## Current Goal

Context files populated from docs canon. Ready for CMS selection and implementation.

## Completed

- [x] Read and analyze all 43 `docs/` markdown files
- [x] Produce canon analysis summary (above)
- [x] Populate `context/project-overview.md`
- [x] Populate `context/architecture.md` (stack, CMS model, routes, invariants)
- [x] Populate `context/ui-context.md` (colors, fonts, logo, mascot, layouts)
- [x] Populate `context/code-standards.md` (Next.js, CMS, fallbacks)
- [x] Populate `context/ai-workflow-rules.md` (canon compliance, placeholders)
- [x] Populate `context/progress-tracker.md` (this file)

## In Progress

- None

## Next Up

1. **CMS selection** — confirm Sanity (recommended) or alternative; create project and schemas
2. **Design tokens** — add CSS variables to `app/globals.css` (Sakura `#f97695`; other colors TBD)
3. **Font setup** — Poppins + Montserrat via `next/font`
4. **Layout shell** — Header (7 nav links), Footer (social placeholders), PageShell
5. **CMS client + fallbacks** — `lib/cms/` with typed stubs for all collections
6. **Home page** — first section page wired to CMS/fallbacks
7. **Remaining pages** — About → Services → Products → Portfolio → Community → Contact
8. **Asset migration** — copy logo/mascot from `docs/assets/` to CMS or `public/`
9. **SEO metadata** — per-route from CMS
10. **E2E smoke tests** — all 7 routes render

## Open Questions

- [ ] **CMS final choice** — Sanity recommended; confirm with team
- [ ] **Deployment target** — Vercel assumed for Next.js; confirm
- [ ] **Facebook page URL** — not in canon
- [ ] **LinkedIn URL** — not in canon
- [ ] **Public email address** — not in canon
- [ ] **Remaining brand color hex values** — extract from brand-kit or add to canon
- [ ] **Beaufort for LoL license** — confirm before production use
- [ ] **Product development status** — canon says "Original IP" only; per-product status TBD
- [ ] **README motto conflict** — update canon README to match Create. Play. Inspire.?

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

## Session Notes

- Repo is default Next.js 16.2 template (`app/page.tsx` still stock) — no website implementation yet
- `docs/design-system/typography.md` and `docs/services/consultation-process.md` are erroneous duplicates — do not use as sources
- Brand assets in `docs/assets/`: logo.png, logo-frame.png, svg.svg, kami-chan-concept-art.png, brand-kit.png
- Context files are now the build spec; read `context/CLAUDE.md` order before implementing
- After CMS setup, seed placeholder documents matching schemas in `architecture.md`

---

## Verification (context population pass)

- [x] All 6 context files populated (no `[placeholder]` template brackets)
- [x] Factual claims trace to `docs/` sources
- [x] Canon vs Vision labeled where relevant
- [x] `ui-context.md` has Sakura hex + font names; other hex TBD documented
- [x] `architecture.md` CMS model covers all 7 sections
- [x] Contact approach documented (external links only)
- [x] Placeholder-first strategy documented
- [x] Analysis summary and gaps in this file
- [x] No code implementation in this pass
