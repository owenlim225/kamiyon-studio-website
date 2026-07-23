import { afterEach, describe, expect, it, vi } from "vitest";

import { getCmsImageUrl } from "./image";

describe("getCmsImageUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns null when the image has no url or key", () => {
    expect(getCmsImageUrl({ alt: "no url" })).toBeNull();
  });

  it("returns null when the image is null or undefined", () => {
    expect(getCmsImageUrl(null)).toBeNull();
    expect(getCmsImageUrl(undefined)).toBeNull();
  });

  it("returns the public R2 url when present", () => {
    expect(getCmsImageUrl({ url: "https://cdn.example.com/hero.png", alt: "Hero" })).toBe(
      "https://cdn.example.com/hero.png",
    );
  });

  it("resolves key via NEXT_PUBLIC_R2_PUBLIC_BASE_URL", () => {
    vi.stubEnv("NEXT_PUBLIC_R2_PUBLIC_BASE_URL", "https://cdn.example.com");
    expect(getCmsImageUrl({ key: "media/hero.png", alt: "Hero" })).toBe(
      "https://cdn.example.com/media/hero.png",
    );
  });
});
