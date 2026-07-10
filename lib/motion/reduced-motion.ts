export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** GSAP matchMedia condition key for reduced-motion handlers. */
export const GSAP_REDUCE_MOTION = "(prefers-reduced-motion: reduce)";

/** GSAP matchMedia condition key when motion is allowed. */
export const GSAP_ALLOW_MOTION = "(prefers-reduced-motion: no-preference)";

/**
 * Client-only check. Returns false during SSR so server HTML stays fully visible
 * (progressive enhancement); effects re-evaluate after mount.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
