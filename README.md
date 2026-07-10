# Kamiyon Studio Official Website

The official marketing site for Kamiyon Studio — a Filipino creative technology studio building games and interactive experiences that educate, inspire, and make a lasting impact.

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build
npm start

# Run tests
npm test          # single run
npm run test:watch    # watch mode
npm run test:coverage # coverage report

# E2E tests
npm run test:e2e
```

## Stack

| Layer | Technology | Role |
|---|---|---|
| Framework | Next.js 16.2 (App Router) + TypeScript | Routing, SSG/ISR, metadata |
| UI | React 19 + Tailwind CSS 4 | Components and styling |
| Content | Sanity (headless CMS) | Page copy, media, structured entries |
| Fonts | Poppins (UI), Montserrat (headlines) | Marketing typography |
| Deployment | TBD | Hosting and CI not yet defined |

**No database, auth, or contact forms for v1. Contact is external links only (Facebook, LinkedIn, email).**

## Repository Structure

```
app/                       # Next.js App Router pages
├── page.tsx              # Home
├── about/page.tsx
├── services/page.tsx
├── services/[slug]/page.tsx
├── products/page.tsx
├── products/[slug]/page.tsx
├── portfolio/page.tsx
├── portfolio/[slug]/page.tsx
├── community/page.tsx
└── contact/page.tsx

components/
├── layout/               # Header, footer, page shell
├── sections/             # Hero, Service grid, Product detail, etc.
└── ui/                   # Button, Badge, Card, primitives

lib/
├── cms/                  # Sanity client, queries, types
│   ├── client.ts
│   ├── queries.ts
│   ├── types.ts
│   └── fallbacks/        # Placeholder content (no CMS env)
├── config/               # Static nav, SEO constants
├── services/             # Business logic (grouping, filtering, etc.)
└── seo/                  # JSON-LD builders, metadata helpers

context/                  # Build specifications for developers
├── project-overview.md   # Website goals, scope, features
├── architecture.md       # System design, CMS model, data flow
├── ui-context.md         # Design tokens, typography, component rules
├── code-standards.md     # Implementation rules, patterns
├── ai-workflow-rules.md  # Workflow, scoping, delivery approach
├── progress-tracker.md   # Active phase, next steps, open questions, architecture decisions
└── completed-work.md     # Archived Phase 0–10 milestones and session notes

docs/                     # Kamiyon canon (read-only)
└── See `context/CLAUDE.md` for reading order
```

## Setup

### 1. Clone and install

```bash
git clone https://github.com/kamiyon-studio/kamiyon-studio-website.git
cd kamiyon-studio-website
npm install
```

### 2. Environment variables

Create a `.env.local` file:

```bash
# Sanity CMS (optional; site renders with fallback content if unset)
CMS_PROJECT_ID=your_sanity_project_id
CMS_DATASET=production
CMS_API_TOKEN=optional_api_token_for_draft_preview

# SEO / OG images (optional; localhost:3000 is default)
NEXT_PUBLIC_SITE_URL=https://kamiyon.studio
```

See `.env.example` for all options.

### 3. Run dev server

```bash
npm run dev
```

Visit `http://localhost:3000`. The site will render with **fallback content** if CMS env vars are unset.

## Environment Variables

| Variable | Required | Purpose | Default |
|---|---|---|---|
| `CMS_PROJECT_ID` | ✓ | Sanity project ID | — |
| `CMS_DATASET` | ✓ | Sanity dataset (e.g. `production`) | — |
| `CMS_API_TOKEN` | ✗ | Sanity API token for draft preview | — |
| `NEXT_PUBLIC_SITE_URL` | ✗ | Canonical site URL for OG images, sitemap | `http://localhost:3000` |

**Note:** The site is designed to work without CMS credentials during development. Missing env vars trigger fallback-first rendering from `lib/cms/fallbacks/*`. For CMS preview or live content, credentials are required.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server (http://localhost:3000) |
| `npm run build` | Build production bundle |
| `npm start` | Run production server |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:watch` | Watch mode for unit tests |
| `npm run test:coverage` | Coverage report (target: 80%+) |
| `npm run test:e2e` | Run E2E smoke tests (Playwright) |
| `npm run lint` | Lint code (ESLint) |

## Testing

Tests are split into three tiers:

- **Unit tests** (`lib/**/*.test.ts`, `components/ui/*.test.tsx`) — pure logic, components, utilities
- **Component tests** (`components/**/*.test.tsx`) — presentational & section components, CMS vs fallback states
- **E2E tests** (`e2e/smoke.spec.ts`) — critical user flows across all 7 site sections

**Coverage target:** 80%+ on `lib/` + `components/sections/` (enforced via `vitest.config.ts`).

Run coverage report:
```bash
npm run test:coverage
```

## Canon vs CMS Workflow

### What is canon?

**Canon** = authoritative company facts in `docs/` (read-only).

- Team names/roles, mission, vision, values, services, products
- Official messaging, brand guidelines, positioning
- See `context/project-overview.md` → `docs/` link references

### What is CMS?

**CMS** = Sanity headless CMS for page content, media, structured blocks.

- Marketing copy, hero headlines, service descriptions, case studies, community events
- Placeholder-friendly: CMS documents can mark content as `isPlaceholder: true`
- If CMS env vars are unset, the site renders from typed fallbacks in `lib/cms/fallbacks/*`

### Development flow

1. **Read `context/` files first** (in order listed below) before implementing or making architectural decisions.
2. **Pull company facts from `docs/`** — never invent team members, awards, client names, or achievements.
3. **Use fallbacks liberally** during development. When CMS content is needed, seed placeholder documents matching the schema in `context/architecture.md`.
4. **Render with `isPlaceholder` badges** to distinguish stub content from real entries in the UI.

### Update progress

After implementing a feature or phase:
- Update `context/progress-tracker.md` with next steps, open questions, and architecture decisions.
- When closing a phase, append completed work and session notes to `context/completed-work.md`.
- If architecture or scope changes, update the relevant `context/` file.

## First-Time Setup: Reading Order

**Before implementing or making architectural decisions, read these files in order:**

1. **`context/project-overview.md`** — Website goals, features, scope, and success criteria
2. **`context/architecture.md`** — System design, CMS model, data-fetching strategy, and invariants
3. **`context/ui-context.md`** — Design tokens, typography, color palette, and component conventions
4. **`context/code-standards.md`** — Implementation rules, patterns, error handling, immutability
5. **`context/ai-workflow-rules.md`** — Development workflow, scoping rules, and delivery approach
6. **`context/progress-tracker.md`** — Current phase, next steps, open questions, and architecture decisions
7. **`context/completed-work.md`** — Archived completed milestones and session notes (optional; read when tracing history)

## Current Phase

**Sanity Schema Plan & Provisioning** — v1 website implementation (Phase 0–10) is complete. See `context/completed-work.md` for the full phase history.

- ✅ All 7 routes built with CMS + fallbacks
- ✅ Test infrastructure (Vitest + Testing Library + Playwright)
- ✅ 80%+ coverage on `lib/` and `components/sections/`
- ✅ Sanity schema plan documented (`context/sanity-plan/`)

**Status:** Ready for CMS provisioning and seed. See `context/progress-tracker.md` → **Next Up** for the provisioning checklist.

## Open Questions / TBDs

These items are **not blocking v1 launch** (the site renders with fallback content) but should be resolved before production:

| Item | Impact | Status |
|---|---|---|
| **Sanity project provisioning** | CMS credentialing | Pending |
| **Deployment target** | Hosting environment | TBD (likely Vercel) |
| **Facebook page URL** | Contact channels | Not in canon |
| **LinkedIn URL** | Contact channels | Not in canon |
| **Public email address** | Contact channels | Not in canon |
| **Deep Indigo hex** | Design token | Brand kit doesn't show it; others extracted |
| **Product dev status per title** | Product detail badges | Canon says "Original IP"; per-product status defaults to `tbd` |

See `context/progress-tracker.md` **Open Questions** section for the full list and source references.

## Key Design Principles

1. **No hardcoded company facts** — All copy flows from CMS (or typed fallbacks sourced from `docs/`).
2. **Placeholder-first** — Never hide content; always show an honest "Coming soon" state instead.
3. **Canon vs Vision** — Vision content (roadmap aspirations) is visually labeled as long-term, never current fact.
4. **External contact only** — v1 has no forms, Calendly, or auth. Contact is Facebook + LinkedIn + mailto.
5. **Immutability** — Content transformations return new objects; never mutate fetched data in place.
6. **Responsive & accessible** — Tailwind 4, WCAG AA contrast, mobile-first, skip links, semantic HTML.

## Common Workflows

### I'm implementing a new page or section

1. Read the relevant `context/*.md` file and check `context/progress-tracker.md` → **Architecture Decisions** for precedents.
2. Define your CMS types in `lib/cms/types.ts` and fallback stubs in `lib/cms/fallbacks/*`.
3. Write tests first (TDD): unit tests for pure logic in `lib/`, component tests for presentational components.
4. Render from CMS-or-fallback using the `resolveWithFallback` pattern.
5. Add placeholder badges and empty states.
6. Update `context/progress-tracker.md` after merging.

### I'm adding a new npm script or dependency

1. Verify it exists in `package.json`.
2. If adding a new dev dependency, check if it aligns with the test/lint/build stack (Vitest, ESLint, Playwright, Tailwind).
3. Document the purpose in this README under **Scripts**.

### I need to check what's implemented

- `context/completed-work.md` → **Completed (Phase 0–10)** lists all implementation phases with file changes.
- `context/progress-tracker.md` → **Architecture Decisions** documents implementation choices and their rationale.
- Run `npm run build` to see all 29 routes compile successfully.

### I need to understand a decision or pattern

- `context/progress-tracker.md` → **Architecture Decisions** table explains every major choice.
- Search the relevant `context/` file for keywords (e.g. "fallback", "CMS", "placeholder").
- Check the session notes under **Session Notes** in `completed-work.md` for phase-by-phase evolution.

## Troubleshooting

### Build fails
```bash
npm run build
npm run lint  # Check for lint errors
npm run test  # Check for test failures
```

### Dev server won't start
- Ensure `npm install` completed successfully.
- Check for port 3000 already in use: `lsof -i :3000` (or use `npm run dev -- -p 3001`).
- Verify Node.js version: `node --version` (requires 18+).

### Tests failing
- Run `npm run test:watch` to debug interactively.
- Check `context/progress-tracker.md` for known issues or test scope notes.

### Missing CMS content
- The site is designed to render from fallbacks if `CMS_PROJECT_ID` is unset.
- Check `.env.local` for correct env var names (case-sensitive).
- If CMS is provisioned, seed placeholder documents matching `context/architecture.md` → **CMS Content Model**.

## License

Copyright © 2024 Kamiyon Studio. All rights reserved.

## Contributing

For internal team and agent development:
1. Follow the reading order in **First-Time Setup** above.
2. Refer to `context/code-standards.md` and `context/ai-workflow-rules.md` for contribution guidelines.
3. Write tests first (TDD); target 80%+ coverage.
4. Update `context/progress-tracker.md` after each phase; archive completed milestones to `context/completed-work.md`.

---

**Last Updated:** 2026-07-10  
**Current Phase:** Sanity Schema Plan & Provisioning  
**Status:** Ready for CMS provisioning and seed
