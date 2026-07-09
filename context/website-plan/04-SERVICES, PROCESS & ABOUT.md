# PART 4 — ABOUT, NEWS & PRESS KIT

Kamiyon Studio Website Specification v2.0

> **Note:** v1 has no separate Services or Process pages. Service summaries live on the homepage; full capability proof lives in the portfolio. This document covers About, News, and Press (`/pres`).

---

## ABOUT PAGE (`/about`)

### Objective

Build emotional trust. Visitors should feel they are hiring real people with clear values — not reading a corporate brochure.

### Page flow

```
Hero
    ↓
Our Story
    ↓
Mission / Vision / Values
    ↓
Team
    ↓
Kami-chan (optional)
    ↓
CTA → Contact
```

---

### Hero

- Optional: studio photograph or landscape art with light overlay
- Headline: "We're building experiences that matter." (finalize from canon)
- Supporting copy: 1–2 sentences from `docs/company/overview.md`

---

### Our Story

- Editorial layout: text + optional timeline
- Key beats from `docs/company/founder-story.md`:
  - Founded 2024, Biñan City, Laguna, Philippines
  - Growth milestones (canon only)
- Timeline format: vertical or horizontal, minimal text per node
- Avoid long paragraphs

---

### Mission, Vision, Values

**Mission** — one sentence + short supporting line

> Source: `docs/company/mission-vision.md`

**Vision** — labeled "Vision"; inspiring but realistic

**Motto** — **Create. Play. Inspire.** (confirmed for website)

**Values** — card grid from `docs/company/core-values.md`:

| Value | Short explanation |
| --- | --- |
| Curiosity | |
| Education | |
| Innovation | |
| Accessibility | |
| Long-Term Thinking | |

Each card: icon, title, 1–2 lines. Light card on white or ivory section.

---

### Team

- Headline: "Meet the team" or "The people behind Kamiyon"
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- 6 team members from `docs/company/organizational-structure.md`
- Each card:
  - Photo (placeholder OK, labeled)
  - Name
  - Role
  - Optional: specialty, LinkedIn link
- Rounded rectangle photos (not circles) — professional but warm

**No separate Team page** — this section is the team destination.

---

### Kami-chan (optional section)

- Headline: "Meet Kami-chan"
- Short copy from `docs/branding/mascot-kami-chan.md`: studio mascot, curiosity, creativity
- 3D mascot illustration
- Keep brief — one screenful max

---

### Stats row (optional)

- Founded · Projects · Awards · Team size
- Canon values only

---

### CTA

- "Interested in working together?"
- Button: Discuss Your Project → `/contact`

---

## NEWS PAGE (`/news`)

### Objective

Curate external announcements — **not** host full blog posts on-site.

### Critical rule

- **No on-site article bodies**
- **No `/news/[slug]` detail pages**
- Every item links to an external URL (`target="_blank"`, `rel="noopener noreferrer"`)

### Layout (Sakura internet reference)

- Page title: "News" with pink accent label (e.g. small "NEWS" in sakura above title)
- Optional category filter pills:
  - All | Announcement | Press | Event | (extend as needed)
  - Active pill: pink filled, white text
  - Inactive: gray text

### News list item

| Field | Display |
| --- | --- |
| Date | Left column or above title |
| Category | Pink tag pill |
| Title | Bold, clickable → external URL |
| Excerpt | Optional, 1 line muted text |
| Icon | External link indicator |

### Footer of list

- "View more" or pagination if many items
- No RSS required for v1

### Content model

```typescript
type NewsItem = {
  id: string
  date: string
  category: 'Announcement' | 'Press' | 'Event' | string
  title: string
  excerpt?: string
  externalUrl: string  // required
}
```

### Empty state

- "News coming soon."
- Optional Kami-chan accent

---

## PRESS KIT PAGE (`/pres`)

### Objective

Give media and partners everything needed to write about Kamiyon — logos, facts, assets.

### Page flow

```
Hero
    ↓
Logo downloads
    ↓
Brand guidelines summary
    ↓
Studio fact sheet
    ↓
Screenshots & media assets
    ↓
Press contact
```

---

### Hero

- Headline: "Press Kit"
- Supporting: "Resources for media, partners, and press inquiries."

---

### Logo downloads

| Asset | Format | Source |
| --- | --- | --- |
| Primary logo | PNG, SVG | `docs/assets/logo.png`, `docs/assets/svg.svg` |
| Logo on dark (if provided) | PNG | `docs/assets/` |
| Logo frame / banner | PNG | `docs/assets/logo-frame.png` |

- Clear download buttons per asset
- Brief usage note: "Do not alter colors or proportions."

---

### Brand guidelines summary

Compact on-page reference (not a full PDF unless provided):

| Topic | Content source |
| --- | --- |
| Colors | Sakura `#f97695`, ivory, charcoal — `docs/design-system/color-palette.md` |
| Typography | Poppins, Montserrat — `docs/branding/visual-identity.md` |
| Logo rules | `docs/design-system/logo-guidelines.md` |
| Mascot | Kami-chan usage summary — `docs/branding/mascot-kami-chan.md` |

---

### Studio fact sheet

Bullet facts from canon only:

- **Company:** Kamiyon Studio
- **Founded:** 2024
- **Location:** Biñan City, Laguna, Philippines
- **Focus:** Games, interactive experiences, design, illustration, branding, 3D & motion, web
- **Mission:** (one sentence from mission-vision.md)
- **Team size:** 6 (from organizational structure)
- **Website:** (production URL when live)
- **Contact email:** (from canon when available)

---

### Screenshots & media assets

- Grid of downloadable images: game screenshots, brand visuals, mascot renders
- Placeholder cards labeled until assets are ready
- Optional: link to YouTube banner or social headers from `docs/assets/`

---

### Press contact

- Headline: "Media inquiries"
- Mailto link
- LinkedIn, Facebook
- Note: response time expectation (e.g. 1–2 business days)

---

### Content model

```typescript
type PressAsset = {
  id: string
  label: string
  description?: string
  fileUrl: string
  type: 'logo' | 'screenshot' | 'document' | 'image'
  format?: string
}
```

---

## SERVICES & PROCESS (homepage only)

v1 does **not** include `/services` or `/process` routes.

| Topic | Where it lives |
| --- | --- |
| What we offer | Home → Services summary cards |
| How we work | About → story/values; Portfolio → project detail shows process implicitly |
| Engagement models | Contact form project-type field; discovery via Google Form |
| FAQ | Optional on Contact page only (3–5 questions) |

If a dedicated Services page is needed later, it can be added without changing portfolio IA.

---

## ACCEPTANCE CRITERIA

### About

- [ ] Mission, vision, motto, values from canon
- [ ] Team grid with 6 members (photos placeholder OK)
- [ ] CTA to contact

### News

- [ ] List renders external links only
- [ ] Category filters work client-side
- [ ] No on-site article routes exist

### Press kit

- [ ] Logo downloads work
- [ ] Fact sheet uses canon facts only
- [ ] Press contact links present

---

## COMPONENT HIERARCHY

```
AboutPage
 ├── AboutHero
 ├── OurStory
 ├── MissionVisionValues
 ├── TeamGrid
 ├── KamiChanSection (optional)
 └── AboutCTA

NewsPage
 ├── NewsHeader
 ├── CategoryFilters
 ├── NewsList
 └── NewsListItem

PressKitPage
 ├── PressHero
 ├── LogoDownloads
 ├── BrandSummary
 ├── FactSheet
 ├── MediaAssets
 └── PressContact
```
