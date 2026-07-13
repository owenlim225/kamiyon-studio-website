import { describe, expect, it } from "vitest";

import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_STAGGER,
  SCROLL_TRIGGER_START,
} from "@/lib/motion/constants";
import {
  GSAP_ALLOW_MOTION,
  GSAP_REDUCE_MOTION,
  prefersReducedMotion,
  REDUCED_MOTION_QUERY,
} from "@/lib/motion/reduced-motion";

describe("motion constants", () => {
  it("exposes stable duration and distance defaults", () => {
    expect(MOTION_DURATION.base).toBeGreaterThan(0);
    expect(MOTION_DISTANCE.fadeY).toBeGreaterThan(0);
    expect(MOTION_STAGGER.base).toBeGreaterThan(0);
    expect(MOTION_EASE.out).toContain("power");
    expect(SCROLL_TRIGGER_START).toBe("top 85%");
  });
});

describe("reduced-motion helpers", () => {
  it("exports matchMedia query strings for GSAP", () => {
    expect(REDUCED_MOTION_QUERY).toBe("(prefers-reduced-motion: reduce)");
    expect(GSAP_REDUCE_MOTION).toBe(REDUCED_MOTION_QUERY);
    expect(GSAP_ALLOW_MOTION).toContain("no-preference");
  });

  it("returns a boolean from prefersReducedMotion in jsdom", () => {
    expect(typeof prefersReducedMotion()).toBe("boolean");
  });
});
