import { afterEach, describe, expect, it, vi } from "vitest";

describe("SITE_URL", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("falls back to localhost when NEXT_PUBLIC_SITE_URL is unset", async () => {
    const { SITE_URL } = await import("./site-url");

    expect(SITE_URL).toBe("http://localhost:3000");
  });

  it("uses NEXT_PUBLIC_SITE_URL when configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://kamiyon.studio");
    vi.resetModules();

    const { SITE_URL } = await import("./site-url");

    expect(SITE_URL).toBe("https://kamiyon.studio");
  });

  it("falls back to localhost when NEXT_PUBLIC_SITE_URL is empty", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.resetModules();

    const { SITE_URL } = await import("./site-url");

    expect(SITE_URL).toBe("http://localhost:3000");
  });
});
