import { afterEach, describe, expect, it, vi } from "vitest";

const fetchMock = vi.fn();

vi.mock("./client", () => ({
  getSanityClient: vi.fn(),
}));

describe("CMS query functions", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns null without calling the CMS client when Sanity is not configured", async () => {
    const { getSanityClient } = await import("./client");
    vi.mocked(getSanityClient).mockReturnValue(null);

    const { getHomePage } = await import("./queries");
    const result = await getHomePage();

    expect(result).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns the typed CMS result when the client resolves successfully", async () => {
    const { getSanityClient } = await import("./client");
    const homePagePayload = { _type: "homePage", title: "Home", blocks: [], seo: {} };
    fetchMock.mockResolvedValueOnce(homePagePayload);
    vi.mocked(getSanityClient).mockReturnValue({ fetch: fetchMock } as never);

    const { getHomePage } = await import("./queries");
    const result = await getHomePage();

    expect(result).toEqual(homePagePayload);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("passes the slug param through to the CMS query for slug-based lookups", async () => {
    const { getSanityClient } = await import("./client");
    fetchMock.mockResolvedValueOnce(null);
    vi.mocked(getSanityClient).mockReturnValue({ fetch: fetchMock } as never);

    const { getServiceBySlug } = await import("./queries");
    await getServiceBySlug("game-development");

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      { slug: "game-development" },
      expect.objectContaining({ next: { revalidate: 3600 } })
    );
  });

  it("swallows CMS fetch errors and returns null instead of throwing", async () => {
    const { getSanityClient } = await import("./client");
    fetchMock.mockRejectedValueOnce(new Error("network error"));
    vi.mocked(getSanityClient).mockReturnValue({ fetch: fetchMock } as never);
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const { getCaseStudies } = await import("./queries");
    const result = await getCaseStudies();

    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("resolves every collection query function to null when unconfigured (never throws)", async () => {
    const { getSanityClient } = await import("./client");
    vi.mocked(getSanityClient).mockReturnValue(null);

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
});
