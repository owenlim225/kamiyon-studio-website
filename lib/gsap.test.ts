import { describe, expect, it } from "vitest";

import { createScrollTriggerDefaults } from "@/lib/gsap";

describe("createScrollTriggerDefaults", () => {
  it("sets markers false and a sensible start", () => {
    const defaults = createScrollTriggerDefaults();
    expect(defaults.markers).toBe(false);
    expect(defaults.start).toBe("top 85%");
    expect(defaults.toggleActions).toBe("play none none none");
  });

  it("omits toggleActions when scrub is provided", () => {
    const defaults = createScrollTriggerDefaults({ scrub: true });
    expect(defaults.scrub).toBe(true);
    expect(defaults.toggleActions).toBeUndefined();
  });

  it("merges options immutably without forcing pin", () => {
    const defaults = createScrollTriggerDefaults({ once: true, start: "top 70%" });
    expect(defaults.once).toBe(true);
    expect(defaults.start).toBe("top 70%");
    expect(defaults.pin).toBeUndefined();
  });
});
