import { describe, expect, it, vi } from "vitest";

import { buildPageMetadata } from "./metadata";

describe("buildPageMetadata", () => {
  it("builds title/description/canonical/OpenGraph/Twitter fields from route data", () => {
    const metadata = buildPageMetadata({
      title: "Services | Kamiyon Studio",
      description: "Our service categories.",
      path: "/services",
    });

    expect(metadata.title).toBe("Services | Kamiyon Studio");
    expect(metadata.description).toBe("Our service categories.");
    expect(metadata.alternates).toEqual({ canonical: "/services" });
    expect(metadata.robots).toBeUndefined();
    expect(metadata.openGraph).toMatchObject({
      title: "Services | Kamiyon Studio",
      description: "Our service categories.",
      url: "/services",
      siteName: "Kamiyon Studio",
      type: "website",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Services | Kamiyon Studio",
      description: "Our service categories.",
    });
  });

  it("falls back to the site-wide generated OG/Twitter images when no CMS ogImage is set", () => {
    const metadata = buildPageMetadata({
      title: "Home",
      description: "Home page.",
      path: "/",
    });

    expect(metadata.openGraph?.images).toEqual([{ url: "/opengraph-image" }]);
    expect(metadata.twitter?.images).toEqual(["/twitter-image"]);
  });

  it("sets robots noindex when noIndex is true (e.g. the 404 page)", () => {
    const metadata = buildPageMetadata({
      title: "Page not found",
      description: "Not found.",
      path: "/this-does-not-exist",
      noIndex: true,
    });

    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("resolves a CMS ogImage into the OpenGraph/Twitter image URLs when configured", async () => {
    vi.stubEnv("CMS_PROJECT_ID", "test-project");
    vi.stubEnv("CMS_DATASET", "production");
    vi.doMock("@sanity/image-url", () => ({
      createImageUrlBuilder: () => ({
        image: () => ({ url: () => "https://cdn.sanity.io/images/test-project/og.png" }),
      }),
    }));
    vi.resetModules();

    const { buildPageMetadata: buildPageMetadataWithCms } = await import("./metadata");

    const metadata = buildPageMetadataWithCms({
      title: "Case Study",
      description: "A case study.",
      path: "/portfolio/sample",
      ogImage: { asset: { _ref: "image-abc-100x100-png", _type: "reference" } },
    });

    expect(metadata.openGraph?.images).toEqual([
      { url: "https://cdn.sanity.io/images/test-project/og.png" },
    ]);
    expect(metadata.twitter?.images).toEqual([
      "https://cdn.sanity.io/images/test-project/og.png",
    ]);

    vi.unstubAllEnvs();
    vi.doUnmock("@sanity/image-url");
    vi.resetModules();
  });
});
