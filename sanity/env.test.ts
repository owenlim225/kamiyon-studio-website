import { afterEach, describe, expect, it, vi } from "vitest";

describe("isSanityConfigured", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("returns false when project id is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");

    const { isSanityConfigured } = await import("./env");
    expect(isSanityConfigured()).toBe(false);
  });

  it("returns false when dataset is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "abc123");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "");

    const { isSanityConfigured } = await import("./env");
    expect(isSanityConfigured()).toBe(false);
  });

  it("returns true when project id and dataset are set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "abc123");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");

    const { isSanityConfigured } = await import("./env");
    expect(isSanityConfigured()).toBe(true);
  });
});

describe("dataset default", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("defaults dataset to production", async () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", undefined);

    const { dataset } = await import("./env");
    expect(dataset).toBe("production");
  });
});
