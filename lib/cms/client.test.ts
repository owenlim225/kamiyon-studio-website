import { afterEach, describe, expect, it, vi } from "vitest";

const createClientMock = vi.fn(() => ({ fetch: vi.fn() }));

vi.mock("next-sanity", () => ({
  createClient: createClientMock,
}));

describe("CMS client", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
    createClientMock.mockClear();
  });

  it("isSanityConfigured is false and getSanityClient returns null when env vars are unset", async () => {
    const { isSanityConfigured, getSanityClient } = await import("./client");

    expect(isSanityConfigured).toBe(false);
    expect(getSanityClient()).toBeNull();
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it("isSanityConfigured is true and getSanityClient builds a client when env vars are set", async () => {
    vi.stubEnv("CMS_PROJECT_ID", "test-project");
    vi.stubEnv("CMS_DATASET", "production");
    vi.resetModules();

    const { isSanityConfigured, getSanityClient } = await import("./client");

    expect(isSanityConfigured).toBe(true);
    expect(getSanityClient()).not.toBeNull();
    expect(createClientMock).toHaveBeenCalledWith(
      expect.objectContaining({ projectId: "test-project", dataset: "production" })
    );
  });

  it("memoizes the client instance across repeated calls", async () => {
    vi.stubEnv("CMS_PROJECT_ID", "test-project");
    vi.stubEnv("CMS_DATASET", "production");
    vi.resetModules();

    const { getSanityClient } = await import("./client");

    const first = getSanityClient();
    const second = getSanityClient();

    expect(first).toBe(second);
    expect(createClientMock).toHaveBeenCalledTimes(1);
  });

  it("uses the CDN (useCdn: true) when no API token is configured", async () => {
    vi.stubEnv("CMS_PROJECT_ID", "test-project");
    vi.stubEnv("CMS_DATASET", "production");
    vi.resetModules();

    const { getSanityClient } = await import("./client");
    getSanityClient();

    expect(createClientMock).toHaveBeenCalledWith(expect.objectContaining({ useCdn: true }));
  });

  it("disables the CDN (useCdn: false) when an API token is configured", async () => {
    vi.stubEnv("CMS_PROJECT_ID", "test-project");
    vi.stubEnv("CMS_DATASET", "production");
    vi.stubEnv("CMS_API_TOKEN", "secret-token");
    vi.resetModules();

    const { getSanityClient } = await import("./client");
    getSanityClient();

    expect(createClientMock).toHaveBeenCalledWith(
      expect.objectContaining({ useCdn: false, token: "secret-token" })
    );
  });
});
