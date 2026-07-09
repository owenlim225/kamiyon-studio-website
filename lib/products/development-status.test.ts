import { describe, expect, it } from "vitest";

import { getDevelopmentStatusLabel } from "./development-status";

describe("getDevelopmentStatusLabel", () => {
  it("maps every ProductDevelopmentStatus enum value to a display label", () => {
    expect(getDevelopmentStatusLabel("in-development")).toBe("In development");
    expect(getDevelopmentStatusLabel("prototype")).toBe("Prototype");
    expect(getDevelopmentStatusLabel("released")).toBe("Released");
    expect(getDevelopmentStatusLabel("tbd")).toBe("Status: TBD");
  });
});
