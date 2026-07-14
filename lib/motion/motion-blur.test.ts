import { describe, expect, it } from "vitest";

import {
  MOTION_BLUR,
  formatBlurFilter,
  velocityToBlurPx,
} from "./motion-blur";

describe("velocityToBlurPx", () => {
  it("returns 0 under the deadzone", () => {
    expect(velocityToBlurPx(0)).toBe(0);
    expect(velocityToBlurPx(MOTION_BLUR.velocityDeadzone - 1)).toBe(0);
    expect(velocityToBlurPx(-(MOTION_BLUR.velocityDeadzone - 1))).toBe(0);
  });

  it("maps absolute velocity past the deadzone into blur px", () => {
    const blur = velocityToBlurPx(MOTION_BLUR.velocityScale);
    expect(blur).toBeCloseTo(1, 5);
  });

  it("clamps to velocityMax", () => {
    expect(velocityToBlurPx(50_000)).toBe(MOTION_BLUR.velocityMax);
  });

  it("treats negative velocity the same as positive", () => {
    expect(velocityToBlurPx(-800)).toBe(velocityToBlurPx(800));
  });
});

describe("formatBlurFilter", () => {
  it("formats a CSS filter string", () => {
    expect(formatBlurFilter(0)).toBe("blur(0px)");
    expect(formatBlurFilter(4.5)).toBe("blur(4.5px)");
  });

  it("floors tiny values to 0 for cheap idle paints", () => {
    expect(formatBlurFilter(0.04)).toBe("blur(0px)");
  });
});
