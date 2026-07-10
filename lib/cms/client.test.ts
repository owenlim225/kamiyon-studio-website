import { afterEach, describe, expect, it, vi } from "vitest";

const getPayloadMock = vi.fn();

vi.mock("payload", () => ({
  getPayload: getPayloadMock,
}));

vi.mock("@payload-config", () => ({
  default: Promise.resolve({}),
}));

describe("CMS client", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
    getPayloadMock.mockReset();
  });

  it("isPayloadConfigured is false and getPayloadClient returns null when env vars are unset", async () => {
    const { isPayloadConfigured, getPayloadClient } = await import("./client");

    expect(isPayloadConfigured).toBe(false);
    await expect(getPayloadClient()).resolves.toBeNull();
    expect(getPayloadMock).not.toHaveBeenCalled();
  });

  it("isPayloadConfigured is true and getPayloadClient builds a client when env vars are set", async () => {
    vi.stubEnv("DATABASE_URL", "postgres://localhost/test");
    vi.stubEnv("PAYLOAD_SECRET", "test-secret");
    getPayloadMock.mockResolvedValueOnce({ find: vi.fn() });
    vi.resetModules();

    const { isPayloadConfigured, getPayloadClient } = await import("./client");

    expect(isPayloadConfigured).toBe(true);
    await expect(getPayloadClient()).resolves.not.toBeNull();
    expect(getPayloadMock).toHaveBeenCalledWith({ config: expect.anything() });
  });

  it("memoizes the client instance across repeated calls", async () => {
    vi.stubEnv("DATABASE_URL", "postgres://localhost/test");
    vi.stubEnv("PAYLOAD_SECRET", "test-secret");
    getPayloadMock.mockResolvedValueOnce({ find: vi.fn() });
    vi.resetModules();

    const { getPayloadClient } = await import("./client");

    const first = await getPayloadClient();
    const second = await getPayloadClient();

    expect(first).toBe(second);
    expect(getPayloadMock).toHaveBeenCalledTimes(1);
  });

  it("exposes deprecated Sanity aliases for transitional callers", async () => {
    const { isSanityConfigured, getSanityClient } = await import("./client");

    expect(isSanityConfigured).toBe(false);
    await expect(getSanityClient()).resolves.toBeNull();
  });
});
