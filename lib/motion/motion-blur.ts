/**
 * Scroll-linked motion blur helpers.
 * Velocity units match ScrollTrigger.getVelocity() (px/second).
 */

export const MOTION_BLUR = {
  /** Starting blur during fade/reveal entrance (clears as tween settles). */
  enter: 8,
  /** Max blur applied from scroll speed while the element is on-screen. */
  velocityMax: 6,
  /** |velocity| / scale → blur px (before clamp). */
  velocityScale: 450,
  /** Ignore tiny scroll jitter below this |velocity|. */
  velocityDeadzone: 80,
  /** Smooth velocity blur catch-up (seconds). */
  lag: 0.12,
} as const;

export type VelocityBlurOptions = {
  max?: number;
  scale?: number;
  deadzone?: number;
};

/**
 * Map scroll velocity to a soft isotropic blur amount.
 * Returns 0 when idle so callers can drop the filter cost.
 */
export function velocityToBlurPx(
  velocityPxPerSec: number,
  options: VelocityBlurOptions = {},
): number {
  const max = options.max ?? MOTION_BLUR.velocityMax;
  const scale = options.scale ?? MOTION_BLUR.velocityScale;
  const deadzone = options.deadzone ?? MOTION_BLUR.velocityDeadzone;
  const abs = Math.abs(velocityPxPerSec);

  if (abs < deadzone) {
    return 0;
  }

  return Math.min(max, abs / scale);
}

/** CSS `filter` value for a given blur radius. */
export function formatBlurFilter(blurPx: number): string {
  const amount = blurPx < 0.05 ? 0 : blurPx;
  return `blur(${amount}px)`;
}
