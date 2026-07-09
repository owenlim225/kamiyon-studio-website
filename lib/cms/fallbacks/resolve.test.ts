import { describe, expect, it } from "vitest";

import { resolveWithFallback } from "./resolve";

type TestContent = {
  title?: string;
};

describe("resolveWithFallback", () => {
  const fallback: TestContent = {
    title: "Fallback title",
  };

  it("returns CMS content when a non-null value is provided", () => {
    const content: TestContent = {
      title: "CMS title",
    };

    expect(resolveWithFallback(content, fallback)).toBe(content);
  });

  it("returns fallback content when CMS content is null", () => {
    expect(resolveWithFallback(null, fallback)).toBe(fallback);
  });

  it("returns fallback content when CMS content is undefined", () => {
    expect(resolveWithFallback(undefined, fallback)).toBe(fallback);
  });

  it("preserves an empty CMS object as intentional content", () => {
    const content: TestContent = {};

    expect(resolveWithFallback(content, fallback)).toBe(content);
  });

  it("preserves falsy primitive CMS content", () => {
    expect(resolveWithFallback(0, 1)).toBe(0);
  });
});
