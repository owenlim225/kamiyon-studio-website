import { describe, expect, it } from "vitest";

import { getInitials } from "./initials";

describe("getInitials", () => {
  it("returns first and last initials for a two-word name", () => {
    expect(getInitials("Sherwin Limosnero")).toBe("SL");
  });

  it("returns first and last initials for a three-word name", () => {
    expect(getInitials("Luis Cabrido III")).toBe("LI");
  });

  it("returns a single initial for a one-word name", () => {
    expect(getInitials("Kamiyon")).toBe("K");
  });

  it("returns an empty string for an empty name", () => {
    expect(getInitials("")).toBe("");
  });

  it("ignores extra whitespace between name parts", () => {
    expect(getInitials("  Ken   Cabingas  ")).toBe("KC");
  });
});
