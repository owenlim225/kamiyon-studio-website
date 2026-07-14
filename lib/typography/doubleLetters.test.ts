import { describe, expect, it } from "vitest";

import { doubleLetters } from "./doubleLetters";

describe("doubleLetters", () => {
  it("duplicates each non-whitespace character", () => {
    expect(doubleLetters("menu")).toBe("mmeennuu");
    expect(doubleLetters("contacts")).toBe("ccoonnttaaccttss");
  });

  it("preserves whitespace without doubling it", () => {
    expect(doubleLetters("get in")).toBe("ggeett iinn");
  });

  it("returns an empty string for empty input", () => {
    expect(doubleLetters("")).toBe("");
  });
});
