# GSAP animation foundation + Home adoption (2026-07-11)

**Branch:** `frontend`  
**Plan:** [`.claude/plan/gsap-animation-architecture.md`](../../.claude/plan/gsap-animation-architecture.md)

## Goal

Reusable, SSR-safe GSAP + ScrollTrigger + Lenis architecture for the marketing site; Framer Motion limited to micro-interactions. Payload `/admin` excluded.

## Delivered

### Dependencies
- `gsap`, `lenis`, `framer-motion`

### Core
- `lib/gsap.ts` — ScrollTrigger register once, client-safe
- `lib/motion/{constants,types,reduced-motion}.ts`

### Providers
- `SmoothScrollProvider` + `AnimationProviders` in `app/(frontend)/layout.tsx` only

### Hooks
- `useGsapContext`, `useFadeIn`, `useReveal`, `useStagger`, `useParallax`, `useHeroAnimation`

### Components
- `AnimatedSection`, `AnimatedText`, `AnimatedImage`, `MotionButton` (+ barrel)

### Demo
- `/motion-lab` (noIndex, not in nav) — hero, fade, stagger, image reveal, parallax, scroll timeline, FM CTA

### Quality pass (2026-07-11)
- Skip-link focuses `#main-content`; Lenis anchors work
- `prefers-reduced-motion`: Lenis off; major motion skipped / content visible
- No hydration console errors on `/motion-lab` or `/`
- Scroll hooks: removed `immediateRender: false`; hero uses `gsap.set` then timeline (no flash)

### Marketing adoption
- Home below-fold: Partners, Projects, Services, Contact wrapped in `AnimatedSection`
- Hero unchanged (existing CSS motion)

### Tests
- 13 unit tests passing (motion stack + PageShell); `matchMedia` stub in `vitest.setup.ts`

## Decisions locked
- Smooth scroll: `lenis` (not deprecated `@studio-freight/lenis`)
- Major/scroll motion: GSAP + ScrollTrigger; micro: Framer Motion only
- Cleanup: `gsap.context()` + effect teardown
- Providers: frontend layout only

## Not in this milestone (resume from progress-tracker)
- About `AnimatedSection` adoption
- Plan delivery note (files, usage, recommendations)
- Optional dual-model a11y/UX polish
- Optional `@gsap/react` `useGSAP` evaluation
