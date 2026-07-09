import { describe, expect, it } from "vitest";

import type { Service } from "@/lib/cms/types";
import { getUniqueIndustries } from "./related-industries";

function makeService(relatedIndustries: string[]): Service {
  return {
    _type: "service",
    title: "Service",
    slug: { current: "service" },
    categorySlug: "category",
    summary: "",
    body: [],
    outcomes: [],
    relatedIndustries,
    order: 0,
    isPlaceholder: true,
    seo: { title: "Service", description: "" },
  };
}

describe("getUniqueIndustries", () => {
  it("returns an empty array when there are no services", () => {
    expect(getUniqueIndustries([])).toEqual([]);
  });

  it("deduplicates industries repeated across multiple services", () => {
    const services = [makeService(["Education", "Technology"]), makeService(["Education"])];

    expect(getUniqueIndustries(services)).toEqual(["Education", "Technology"]);
  });

  it("preserves first-seen order across services", () => {
    const services = [makeService(["Web3"]), makeService(["Education", "Web3"])];

    expect(getUniqueIndustries(services)).toEqual(["Web3", "Education"]);
  });

  it("ignores services with no related industries", () => {
    expect(getUniqueIndustries([makeService([])])).toEqual([]);
  });
});
