# UI Context

## Theme

Kamiyon Studio's website is a **warm, premium marketing site** — not a dark technical workspace. The visual language balances playful creativity with professional craftsmanship: bright Warm Ivory backgrounds, Charcoal typography, Sakura Pink accents, and Deep Indigo for depth in hero sections.

Visitors should feel: professional, creative, approachable, trustworthy, innovative, educational.

> **Source:** [`docs/branding/visual-identity.md`](../docs/branding/visual-identity.md), [`docs/design-system/color-palette.md`](../docs/design-system/color-palette.md), [`docs/marketing/website-guidelines.md`](../docs/marketing/website-guidelines.md)

**Design pillars for this site:** Clarity first, simplicity over density, accessibility by default, playful structure without chaos.

> **Source:** [`docs/design-system/design-philosophy.md`](../docs/design-system/design-philosophy.md)

---

## Colors

Use CSS custom properties for all colors. Components must reference tokens — no ad-hoc hex in components.

### Brand palette

| Role | CSS Variable | Value | Usage |
| --- | --- | --- | --- |
| Sakura Pink | `--color-sakura` | `#f97695` | Primary brand, CTAs, highlights, mascot accents |
| Warm Ivory | `--color-ivory` | TBD | Primary light background (~55% visual weight) |
| Charcoal | `--color-charcoal` | TBD | Body text, navigation (~20%) |
| Deep Indigo | `--color-indigo` | TBD | Hero sections, headers, depth (~8%) |
| Soft Gold | `--color-gold` | TBD | Sparingly: achievements, premium accents (~2%) |

**Confirmed hex:** Sakura Pink `#f97695` extracted from [`docs/assets/svg.svg`](../docs/assets/svg.svg) logo paths.

**TBD hex values:** Warm Ivory, Charcoal, Deep Indigo, and Soft Gold are named in canon but hex codes are not documented in markdown. Extract from [`docs/assets/brand-kit.png`](../docs/assets/brand-kit.png) in a future canon update — do not invent values.

### Semantic UI tokens (map to brand palette)

| Role | CSS Variable | Maps to |
| --- | --- | --- |
| Page background | `--bg-base` | `--color-ivory` |
| Surface / card | `--bg-surface` | white or slightly elevated ivory |
| Primary text | `--text-primary` | `--color-charcoal` |
| Muted text | `--text-muted` | charcoal at reduced opacity |
| Primary accent | `--accent-primary` | `--color-sakura` |
| Accent dark | `--accent-dark` | `--color-indigo` |
| Border | `--border-default` | charcoal ~10–15% opacity |
| Premium highlight | `--accent-premium` | `--color-gold` |

### Color hierarchy (emphasis order)

1. Sakura Pink → 2. Deep Indigo → 3. Charcoal → 4. Warm Ivory → 5. Soft Gold

> **Source:** [`docs/design-system/color-palette.md`](../docs/design-system/color-palette.md)

### Accessibility

- Maintain sufficient contrast for all text/background pairs (WCAG AA minimum).
- Never use color as the only indicator of state or meaning.
- Test Sakura Pink on ivory and indigo backgrounds.

---

## Typography

| Role | Font | CSS Variable | Usage |
| --- | --- | --- | --- |
| UI / body | Poppins | `--font-sans` | Navigation, buttons, body copy, UI labels |
| Marketing headlines | Montserrat | `--font-display` | Section headings, page titles, marketing emphasis |
| Decorative hero | Beaufort for LoL | `--font-brand` | Rare: major hero headlines, campaigns only — never body text |

Load via `next/font/google` (Poppins, Montserrat) or self-hosted equivalents. Beaufort requires license check before production use.

> **Source:** [`docs/branding/visual-identity.md`](../docs/branding/visual-identity.md)

**Note:** [`docs/design-system/typography.md`](../docs/design-system/typography.md) is a duplicate of color-palette.md in the current canon — use visual-identity.md for font rules.

### Type scale (marketing site)

| Element | Font | Weight guidance |
| --- | --- | --- |
| Page title (h1) | Montserrat | 700 |
| Section title (h2) | Montserrat | 600–700 |
| Subsection (h3) | Montserrat or Poppins | 600 |
| Body | Poppins | 400 |
| Small / caption | Poppins | 400, muted color |
| Button | Poppins | 500–600 |

---

## Border Radius

Rounded, friendly geometry — not sharp corporate corners.

| Context | Class / token |
| --- | --- |
| Buttons, inputs | `rounded-lg` (~8px) |
| Cards, panels | `rounded-xl` (~12px) |
| Large hero cards | `rounded-2xl` (~16px) |
| Pills / tags | `rounded-full` |

> **Source:** visual-identity "Personality Through Detail" — rounded corners, gentle curves

---

## Logo

**Primary mark:** Stylized sakura blossom + "Kamiyon Studio" wordmark.

| Rule | Detail |
| --- | --- |
| Use primary logo when space allows | Icon + wordmark in brand colors |
| Minimum size | Switch to icon-only if wordmark illegible |
| Clear space | Preserve empty space around logo; no overlapping elements |
| Backgrounds | Warm ivory, white, deep indigo, charcoal — maintain contrast |
| Prohibited | Stretch, rotate, skew, unofficial colors, heavy shadows/glows |
| Assets | [`docs/assets/logo.png`](../docs/assets/logo.png), [`docs/assets/logo-frame.png`](../docs/assets/logo-frame.png), [`docs/assets/svg.svg`](../docs/assets/svg.svg) |

> **Source:** [`docs/design-system/logo-guidelines.md`](../docs/design-system/logo-guidelines.md)

**Header placement:** Logo links to Home; visible on all pages.

---

## Kami-chan (Mascot)

| Attribute | Canon |
| --- | --- |
| Role | Official mascot and brand ambassador — not the company logo |
| Personality | Curious, creative, playful, intelligent |
| Symbol | Sakura blossom |
| Usage | Marketing accents, community tone, optional homepage illustration — complements logo, never replaces it |

Do not use Kami-chan as the sole site identifier. Reference asset: [`docs/assets/kami-chan-concept-art.png`](../docs/assets/kami-chan-concept-art.png)

> **Source:** [`docs/branding/mascot-kami-chan.md`](../docs/branding/mascot-kami-chan.md)

---

## Tone of Voice (UI Copy)

Website tone: **confident, clear, welcoming.**

- Prefer: build, explore, learn, create, discover, collaborate
- Avoid overuse: revolutionary, disruptive, game-changing, best-in-class, cutting-edge
- CTAs invite participation: "Explore our services", "Learn more", "Get in touch" — not aggressive sales language
- Educate before selling; honest communication; no exaggerated claims

> **Source:** [`docs/branding/tone-of-voice.md`](../docs/branding/tone-of-voice.md)

Microcopy (buttons, empty states, errors) follows the same voice.

---

## Visual Motifs (use sparingly)

- Sakura petals, rounded geometric shapes, soft gradients
- Subtle Filipino textile / sampaguita accents
- Layered paper-inspired compositions
- Motifs complement content — they do not overpower readability

> **Source:** [`docs/branding/visual-identity.md`](../docs/branding/visual-identity.md)

---

## Layout Patterns

Marketing site patterns — full-width heroes, constrained content columns.

### Global shell

- **Header:** Sticky or static top nav; logo left; 7 section links; primary CTA (Contact) right; mobile hamburger menu
- **Footer:** Logo, nav repeat, social links (Facebook, LinkedIn, email), copyright, optional motto
- **Content width:** `max-w-6xl` or `max-w-7xl` centered; generous horizontal padding

### Per page type

| Page | Layout |
| --- | --- |
| Home | Full-width hero (indigo or ivory) → mission band → featured grid → highlights → CTA banner |
| About | Hero → story sections (alternating) → values grid → team grid → culture closing |
| Services | Intro → category groups → service card grid → industries callout → CTA |
| Products | Intro → product card grid → detail: hero media + features + goals |
| Portfolio | Intro → case study cards (story-focused) → detail: challenge / solution / impact |
| Community | Intro → filtered item feed (type tags) → detail optional |
| Contact | Centered intro → channel cards (icon + label + link) — no form |

### Spacing

- Section vertical padding: `py-16` to `py-24` on desktop; `py-12` mobile
- Card internal padding: `p-6` to `p-8`
- Prefer whitespace over density (simplicity first)

---

## Motion

Animations should communicate delight, not distraction:

- Soft fades, gentle page section reveals
- Elastic button hover states (subtle)
- Optional floating sakura petal decoration on hero (performance-safe, `prefers-reduced-motion` respected)
- Avoid fast, harsh, or decorative-only animation

> **Source:** visual-identity Motion Design

Always honor `prefers-reduced-motion: reduce`.

---

## Placeholder Media Guidelines

Until real CMS media exists:

- Use neutral branded placeholders (ivory background, sakura accent, generic illustration silhouette)
- **Never** use fake client logos, stock photos implying specific partnerships, or fabricated award badges
- Product screenshots: "Media coming soon" state with product title and genre
- Team photos: initials avatar or generic silhouette with canon name/role
- Optimize all images via `next/image` with explicit width/height and alt text

---

## Icons

- Stroke-based icon set (e.g. Lucide React) consistent with clean, friendly UI
- Sizes: `h-4 w-4` inline, `h-5 w-5` buttons, `h-6 w-6` feature icons
- Icon color: charcoal default; sakura for interactive emphasis

---

## Responsive Baseline

- Mobile-first breakpoints (Tailwind defaults)
- Touch targets minimum 44×44px
- Navigation collapses to drawer/menu below `md`
- Typography scales down one step on mobile
- Images fluid width; no horizontal scroll

---

## Accessibility Baseline

- Semantic HTML (`header`, `nav`, `main`, `footer`, heading hierarchy)
- Skip-to-content link
- Focus visible styles on all interactive elements
- Alt text on all meaningful images; decorative images `alt=""`
- External links: `rel="noopener noreferrer"` when `target="_blank"`
- Color contrast verified when TBD hex values are finalized

---

## Visual Consistency Checklist

Before shipping a page, verify:

- [ ] Feels unmistakably Kamiyon (warm, playful, professional)
- [ ] Uses design tokens, not hardcoded colors
- [ ] Typography hierarchy is clear
- [ ] Logo and mascot follow usage rules
- [ ] Copy matches tone of voice
- [ ] Placeholders are honest (no fake achievements)
- [ ] Accessible and responsive

> **Source:** visual-identity Visual Consistency Checklist
