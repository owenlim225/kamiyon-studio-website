import { afterEach, describe, expect, it, vi } from "vitest";

import { getMediaUrl, mapR2AssetToCmsImage } from "./media";

describe("getMediaUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns null for missing asset", () => {
    expect(getMediaUrl(null)).toBeNull();
    expect(getMediaUrl(undefined)).toBeNull();
  });

  it("prefers an explicit public url", () => {
    expect(getMediaUrl({ url: "https://cdn.example.com/hero.png", key: "ignored" })).toBe(
      "https://cdn.example.com/hero.png",
    );
  });

  it("builds a url from key + NEXT_PUBLIC_R2_PUBLIC_BASE_URL", () => {
    vi.stubEnv("NEXT_PUBLIC_R2_PUBLIC_BASE_URL", "https://cdn.example.com/");
    expect(getMediaUrl({ key: "/media/hero.png" })).toBe("https://cdn.example.com/media/hero.png");
  });

  it("returns null when only key is set without a public base url", () => {
    vi.stubEnv("NEXT_PUBLIC_R2_PUBLIC_BASE_URL", "");
    expect(getMediaUrl({ key: "media/hero.png" })).toBeNull();
  });
});

describe("mapR2AssetToCmsImage", () => {
  it("returns undefined for empty input", () => {
    expect(mapR2AssetToCmsImage(null)).toBeUndefined();
    expect(mapR2AssetToCmsImage({})).toBeUndefined();
  });

  it("maps url, alt, and caption", () => {
    expect(
      mapR2AssetToCmsImage({
        url: "https://cdn.example.com/a.png",
        alt: "Alt",
        caption: "Caption",
        _key: "k1",
      }),
    ).toEqual({
      _key: "k1",
      url: "https://cdn.example.com/a.png",
      alt: "Alt",
      caption: "Caption",
    });
  });
});
