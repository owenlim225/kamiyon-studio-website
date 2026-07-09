import { describe, expect, it } from "vitest";

import { getCommunityTypeLabel } from "./type-labels";

describe("getCommunityTypeLabel", () => {
  it("maps every CommunityItemType enum value to a display label", () => {
    expect(getCommunityTypeLabel("workshop")).toBe("Workshop");
    expect(getCommunityTypeLabel("hackathon")).toBe("Hackathon");
    expect(getCommunityTypeLabel("game-jam")).toBe("Game Jam");
    expect(getCommunityTypeLabel("speaking")).toBe("Speaking");
    expect(getCommunityTypeLabel("education")).toBe("Education");
    expect(getCommunityTypeLabel("partnership")).toBe("Partnership");
    expect(getCommunityTypeLabel("other")).toBe("Other");
  });
});
