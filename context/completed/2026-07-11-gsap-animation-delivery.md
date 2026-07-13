# GSAP animation delivery note (2026-07-11)

**Branch:** `frontend`  
**Plan:** [`.claude/plan/gsap-animation-architecture.md`](../../.claude/plan/gsap-animation-architecture.md)  
**Prior foundation:** [`2026-07-11-gsap-animation-foundation.md`](./2026-07-11-gsap-animation-foundation.md)

## Goal

Close the plan acceptance criterion for a delivery note (files, packages, usage, recommendations) and complete light About below-fold `AnimatedSection` adoption, matching Home.

## Packages installed

| Package | Version (range) | Role |
| --- | --- | --- |
| `gsap` | `^3.15.0` | Major / scroll-driven motion + ScrollTrigger |
| `lenis` | `^1.3.25` | Smooth scroll (frontend layout only) |
| `framer-motion` | `^12.42.2` | Micro-interactions only (`MotionButton`) |

Payload `/admin` is not wrapped with Lenis or animation providers.

## Files created (motion stack)

### Core
- `lib/gsap.ts` — ScrollTrigger register-once, client-safe exports
- `lib/motion/constants.ts` — durations, easings, distances
- `lib/motion/types.ts` — shared option types
- `lib/motion/reduced-motion.ts` — `prefers-reduced-motion` helpers
- `lib/motion/reduced-motion.test.ts`
- `lib/motion/hash-reveal.ts` — force-complete ST reveals for in-page hash CTAs (+ test)

### Providers
- `components/providers/SmoothScrollProvider.tsx` — Lenis + ScrollTrigger raf sync
- `components/providers/AnimationProviders.tsx` — composed client boundary
- `components/providers/AnimationProviders.test.tsx`
- Wired in `app/(frontend)/layout.tsx` only

### Hooks
- `hooks/useGsapContext.ts` — shared `gsap.context` + cleanup
- `hooks/useFadeIn.ts`
- `hooks/useReveal.ts`
- `hooks/useStagger.ts`
- `hooks/useParallax.ts`
- `hooks/useHeroAnimation.ts`
- `hooks/index.ts`

### Components
- `components/animation/AnimatedSection.tsx` (+ test)
- `components/animation/AnimatedText.tsx`
- `components/animation/AnimatedImage.tsx`
- `components/animation/MotionButton.tsx` (+ test)
- `components/animation/index.ts`

### Demo
- `app/(frontend)/motion-lab/` — noIndex showcase (hero, fade, stagger, image, parallax, scroll timeline, FM CTA)

### Marketing adoption
- Home (`app/(frontend)/page.tsx`): below-fold Partners / Projects / Services / Contact in `AnimatedSection`; Hero keeps CSS motion
- About (`app/(frontend)/about/page.tsx`): below-fold OurStory / VisionBand / ValuesGrid / TeamGrid / CultureClosing in `AnimatedSection`; AboutHero unchanged

## Hook / component usage examples

### Page-level fade-up (Server Component page, client shell)

```tsx
import { AnimatedSection } from "@/components/animation/AnimatedSection";

{/* First viewport: keep existing hero motion — do not wrap */}
<AboutHero aboutPage={aboutPage} />

<AnimatedSection as="div" distance={28}>
  <OurStory storySections={aboutPage.storySections} />
</AnimatedSection>

<AnimatedSection as="div" distance={32}>
  <VisionBand vision={aboutPage.vision} />
</AnimatedSection>
```

Home uses the same `as="div"` + `distance={28|32}` pattern for below-fold sections.

### Hook-level fade-in

```tsx
"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

const ref = useFadeIn<HTMLElement>({
  delay: 0,
  duration: 0.6,
  y: 28,
  once: true,
});

return <section ref={ref}>{children}</section>;
```

### Stagger children

```tsx
"use client";

import { useStagger } from "@/hooks/useStagger";

const ref = useStagger<HTMLUListElement>({ stagger: 0.08, y: 24 });

return (
  <ul ref={ref}>
    {items.map((item) => (
      <li key={item.id}>{item.label}</li>
    ))}
  </ul>
);
```

### Framer Motion micro-interaction (not scroll)

```tsx
import { MotionButton } from "@/components/animation/MotionButton";

<MotionButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
  Contact
</MotionButton>
```

## Decisions locked

- Smooth scroll: `lenis` (not deprecated `@studio-freight/lenis`)
- Major / scroll motion: GSAP + ScrollTrigger; micro: Framer Motion only
- Cleanup: `gsap.context()` + effect teardown
- Providers: `(frontend)` layout only; Payload untouched
- Reduced motion: Lenis off; major GSAP skipped / content remains visible

## Future recommendations (plan out-of-scope follow-ups)

1. **Remaining marketing pages** — Gradually adopt `AnimatedSection` on Services, Portfolio, Contact, etc., keeping first-viewport heroes on existing CSS/GSAP hero patterns.
2. **`@gsap/react` / `useGSAP`** — Evaluate as an alternative to custom `useGsapContext` (license, bundle, team standard); add skill package only if adopted.
3. **Route transitions** — View Transitions API (or similar) as a separate plan; do not bolt onto this stack ad hoc.
4. **Storybook / visual regression for motion** — Post-v1; protect reveal distances and reduced-motion behavior.
5. **Optional dual-model a11y/UX polish** — Skip-link, Lenis anchors, and hydration already passed on motion-lab/Home; re-audit after broader page adoption.

## Quality notes (close-out audit)

- Codex review: **PASS** (About wrappers match Home; `as="div"` avoids nested landmarks)
- Frontend/a11y review: hash CTAs into `autoAlpha:0` wrappers mitigated via `revealScrollTriggeredAncestors` in `focusHashTarget` (About `#values` / `#team`)
- Residual (non-blocking): cold-load `/about#…` deep links may still race ST registration — optional follow-up

- [x] Delivery note covers: files created, packages installed, hook/component usage, future best practices / recommendations
- [x] Light About adoption: below-fold sections wrapped in `AnimatedSection` (AboutHero keeps first-viewport motion)

## Related

- Foundation archive: [`2026-07-11-gsap-animation-foundation.md`](./2026-07-11-gsap-animation-foundation.md)
- Architecture plan: [`.claude/plan/gsap-animation-architecture.md`](../../.claude/plan/gsap-animation-architecture.md)
