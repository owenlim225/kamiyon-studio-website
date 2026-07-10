import { afterEach, describe, expect, it, vi } from "vitest";

const findGlobalMock = vi.fn();
const findMock = vi.fn();
const getPayloadClientMock = vi.fn();

vi.mock("next/cache", () => ({
  unstable_cache: (loader: () => Promise<unknown>) => loader,
}));

vi.mock("./client", () => ({
  getPayloadClient: getPayloadClientMock,
}));

describe("CMS query functions", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("returns null without calling Payload when CMS is not configured", async () => {
    getPayloadClientMock.mockResolvedValue(null);

    const { getHomePage } = await import("./queries");
    const result = await getHomePage();

    expect(result).toBeNull();
    expect(findGlobalMock).not.toHaveBeenCalled();
  });

  it("returns the typed CMS result when Payload resolves successfully", async () => {
    getPayloadClientMock.mockResolvedValue({
      findGlobal: findGlobalMock,
      find: findMock,
    });
    findGlobalMock.mockResolvedValueOnce({
      title: "Home",
      blocks: [
        {
          blockType: "hero",
          headline: "Create. Play. Inspire.",
          subheadline: "Studio",
          ctaLabel: "Contact",
          ctaHref: "/contact",
        },
      ],
      seo: { title: "Home", description: "Home page" },
    });

    const { getHomePage } = await import("./queries");
    const result = await getHomePage();

    expect(result?._type).toBe("homePage");
    expect(result?.blocks[0]?._type).toBe("hero");
    expect(findGlobalMock).toHaveBeenCalledWith({
      slug: "home-page",
      depth: 2,
    });
  });

  it("passes the slug through to Payload for slug-based lookups", async () => {
    getPayloadClientMock.mockResolvedValue({
      findGlobal: findGlobalMock,
      find: findMock,
    });
    findMock.mockResolvedValueOnce({ docs: [] });

    const { getServiceBySlug } = await import("./queries");
    await getServiceBySlug("game-development");

    expect(findMock).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: "services",
        where: {
          slug: {
            equals: "game-development",
          },
        },
      })
    );
  });

  it("swallows CMS fetch errors and returns null instead of throwing", async () => {
    getPayloadClientMock.mockResolvedValue({
      findGlobal: findGlobalMock,
      find: findMock,
    });
    findMock.mockRejectedValueOnce(new Error("database unavailable"));
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const { getCaseStudies } = await import("./queries");
    const result = await getCaseStudies();

    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("resolves every collection query function to null when unconfigured (never throws)", async () => {
    getPayloadClientMock.mockResolvedValue(null);

    const queries = await import("./queries");

    await expect(queries.getSiteSettings()).resolves.toBeNull();
    await expect(queries.getHomePage()).resolves.toBeNull();
    await expect(queries.getAboutPage()).resolves.toBeNull();
    await expect(queries.getTeamMembers()).resolves.toBeNull();
    await expect(queries.getServiceCategories()).resolves.toBeNull();
    await expect(queries.getServices()).resolves.toBeNull();
    await expect(queries.getServiceBySlug("x")).resolves.toBeNull();
    await expect(queries.getProducts()).resolves.toBeNull();
    await expect(queries.getProductBySlug("x")).resolves.toBeNull();
    await expect(queries.getCaseStudies()).resolves.toBeNull();
    await expect(queries.getCaseStudyBySlug("x")).resolves.toBeNull();
    await expect(queries.getCommunityItems()).resolves.toBeNull();
    await expect(queries.getContactPage()).resolves.toBeNull();
  });

  it("returns null for empty collections so typed fallbacks still apply", async () => {
    getPayloadClientMock.mockResolvedValue({
      findGlobal: findGlobalMock,
      find: findMock,
    });
    findMock.mockResolvedValueOnce({ docs: [] });

    const { getProducts } = await import("./queries");
    const result = await getProducts();

    expect(result).toBeNull();
  });
});
