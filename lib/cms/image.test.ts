import { describe, expect, it } from "vitest";

import { getCmsImageUrl } from "./image";

describe("getCmsImageUrl", () => {
  it("returns null when the image has no url", () => {
    expect(getCmsImageUrl({ alt: "no url" })).toBeNull();
  });

  it("returns null when the image is null or undefined", () => {
    expect(getCmsImageUrl(null)).toBeNull();
    expect(getCmsImageUrl(undefined)).toBeNull();
  });

  it("returns the Payload media url when present", () => {
    expect(getCmsImageUrl({ url: "/api/media/file/hero.png", alt: "Hero" })).toBe(
      "/api/media/file/hero.png"
    );
  });
});
