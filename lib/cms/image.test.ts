import { afterEach, describe, expect, it, vi } from "vitest";

describe("getCmsImageUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.doUnmock("@sanity/image-url");
    vi.resetModules();
  });

  it("returns null when the image has no asset reference", async () => {
    const { getCmsImageUrl } = await import("./image");

    expect(getCmsImageUrl({ alt: "no asset" })).toBeNull();
  });

  it("returns null when the image is null or undefined", async () => {
    const { getCmsImageUrl } = await import("./image");

    expect(getCmsImageUrl(null)).toBeNull();
    expect(getCmsImageUrl(undefined)).toBeNull();
  });

  it("returns null when CMS_PROJECT_ID / CMS_DATASET are not configured", async () => {
    const { getCmsImageUrl } = await import("./image");

    expect(
      getCmsImageUrl({ asset: { _ref: "image-abc-100x100-png", _type: "reference" } })
    ).toBeNull();
  });

  it("builds a servable URL when CMS env vars are configured", async () => {
    vi.stubEnv("CMS_PROJECT_ID", "test-project");
    vi.stubEnv("CMS_DATASET", "production");
    vi.doMock("@sanity/image-url", () => ({
      createImageUrlBuilder: () => ({
        image: () => ({ url: () => "https://cdn.sanity.io/images/test-project/test.png" }),
      }),
    }));
    vi.resetModules();

    const { getCmsImageUrl } = await import("./image");

    expect(
      getCmsImageUrl({ asset: { _ref: "image-abc-100x100-png", _type: "reference" } })
    ).toBe("https://cdn.sanity.io/images/test-project/test.png");
  });
});
