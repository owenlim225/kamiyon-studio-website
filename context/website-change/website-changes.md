Create a full comprehensive implementation plan (then stop for approval before coding) for redesigning the Kamiyon Studio homepage and primary navigation.

## Project context (detected)
- Repo: kamiyon-studio-website
- Stack: Next.js 16.2, React 19, TypeScript, Tailwind CSS 4, Payload + Sanity CMS, Vitest, Playwright
- Read `node_modules/next/dist/docs/` before any Next.js API usage (AGENTS.md)
- Brand/canon: do NOT invent client names, logos, awards, partnerships, or blog posts
- Existing home: `app/(frontend)/page.tsx` currently renders Hero, Mission, FeaturedWork, Highlights, ContactCTA
- Nav config: `lib/config/navigation.ts` → PRIMARY_NAV_ITEMS
- Hero background asset: `public/assets/background.png` (full-bleed cinematic magenta/purple landscape with pagoda)
- Visual references attached in chat:
  1) Hero background = background.png
  2) Projects = bento grid (2 large top, then 3+3 smaller; title + category under image; “View portfolio” CTA)
  3) Services = full-bleed image carousel with category tabs/progress + side arrow + Explore CTA
  4) Contact = simple left copy + ghost CTA over atmospheric right visual (no complex form on home)

## Goals

### A) Header / primary nav
Visible items ONLY (in this order):
1. Home → `/`
2. About → `/about`
3. Services → `/services`
4. Portfolio → `/portfolio`
5. Blog → `/blog`  [ASSUMPTION unless overridden: stub “Coming soon” page; do not invent posts]
6. Contact → `/contact`

Hide for now (remove from header AND footer nav lists):
- Products
- Community

ASSUMPTION: Keep `/products` and `/community` routes working if hit directly; only hide from shell nav. Update `SiteHeader` / `SiteFooter` / `MainNav` tests and `e2e/smoke.spec.ts` nav expectations accordingly. Do not delete product/community pages in this effort.

### B) Home page composition (`/`)
Home must contain ONLY, in this order:
1. Header (via existing PageShell)
2. Hero — full-bleed using `/assets/background.png` (not inset media card). Brand-first first viewport: Kamiyon as hero-level signal, one headline, one short supporting line, one CTA group. Clean text zone center/left over sky/mountains. Preserve Kamiyon design tokens; adapt cinematic mood from the asset (avoid generic purple-gradient AI look beyond what the art already provides). At least 2–3 intentional motions (e.g. subtle fade/rise of copy, gentle parallax or ken-burns on bg, CTA hover).
3. Partners/Clients — infinite horizontal loop/marquee. ASSUMPTION: labeled placeholder logo slots only (“Partner placeholder”); never fabricate real client names/logos. Respect `prefers-reduced-motion`.
4. Projects — bento like reference image 2: row of 2 large equal cards, then rows of 3; image-forward cards; title + uppercase category under image; section eyebrow + “Recent Projects” + “View portfolio” ghost button → `/portfolio`. Source from existing case studies / portfolio CMS data + fallbacks; no fake metrics.
5. Services — carousel like reference image 3: full-bleed slide per service category (or featured services), large title, short eyebrow, Explore CTA, bottom tab/progress indicators, side next control. Keyboard + screen-reader accessible. Data from existing services CMS/fallbacks.
6. Contact — simple like reference image 4: left column (icon optional, heading, short paragraph, “Get in touch” ghost button → `/contact`); atmospheric right/background visual. No full contact form on home.
7. Footer (via existing PageShell)

Remove from home (do not render on `/`): Mission, FeaturedWork (as currently composed), Highlights, and any other sections not listed above. Prefer extracting reusable section components under `components/sections/`.

## Design constraints
- Follow existing Kamiyon tokens/components (`Button`, `Container`, CSS variables) where possible
- Match reference LAYOUT/INTERACTION patterns, not Pixel Mafia branding
- Responsive: desktop + mobile; hero crop should keep horizon/pagoda readable on small screens
- Accessibility: focus states, carousel semantics, marquee pause on hover/focus, reduced motion
- Frontend design rules: one job per section; no card clutter in hero; full-bleed hero only

## Workflow (mandatory)
1. Use planner agent + `/plan` to produce:
   - File-by-file change map
   - Component API sketches
   - CMS/fallback data needs
   - Phased delivery (Nav → Hero → Partners → Projects bento → Services carousel → Contact → tests/e2e)
   - Risks (blog stub, placeholder partners, motion a11y)
2. Do NOT implement until the plan is approved in-chat
3. After approval: `/tdd` per phase (failing tests first), then implement
4. `/code-review` (and react-reviewer for TSX)
5. `/verify`: `npm test`, relevant Playwright smoke, lint; coverage 80%+ on new/changed units

## Acceptance criteria
- Primary nav shows exactly: Home, About, Services, Portfolio, Blog, Contact
- Products & Community absent from header and footer nav
- `/` section order matches the list above; old home sections gone
- Hero uses `public/assets/background.png` full-bleed
- Partners marquee loops infinitely with placeholders + reduced-motion safe behavior
- Projects bento matches 2-then-3 grid pattern and links sensibly to portfolio items
- Services carousel is operable via tabs, arrow, keyboard; Explore links to service detail or `/services`
- Home contact is simple CTA (not a form)
- Existing `/products` and `/community` still resolve (hidden, not deleted)
- Unit tests updated/added; e2e nav smoke updated; no invented canon content

## Out of scope / do not
- Do not redesign About/Services/Portfolio/Contact full pages (except shared nav)
- Do not build a real blog CMS/content system beyond a stub (unless Blog decision says otherwise)
- Do not fabricate partners, clients, testimonials, or case study metrics
- Do not remove Products/Community routes or CMS collections
- Do not add new dependencies without checking existing ones first
- Do not commit or open a PR unless explicitly asked

## Deliverable for this prompt
Output a comprehensive plan only: architecture, phases, file list, data sources, test plan, open questions, and recommended sequence. Wait for approval before writing code.