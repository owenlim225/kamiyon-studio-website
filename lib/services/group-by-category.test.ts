import { describe, expect, it } from "vitest";

import type { Service, ServiceCategory } from "@/lib/cms/types";
import { groupServicesByCategory } from "./group-by-category";

function makeCategory(overrides: Partial<ServiceCategory>): ServiceCategory {
  return {
    _type: "serviceCategory",
    title: "Category",
    slug: { current: "category" },
    description: "",
    order: 0,
    ...overrides,
  };
}

function makeService(overrides: Partial<Service>): Service {
  return {
    _type: "service",
    title: "Service",
    slug: { current: "service" },
    categorySlug: "category",
    summary: "",
    body: [],
    outcomes: [],
    relatedIndustries: [],
    order: 0,
    isPlaceholder: true,
    seo: { title: "Service", description: "" },
    ...overrides,
  };
}

describe("groupServicesByCategory", () => {
  it("orders categories by their order field", () => {
    const categories = [
      makeCategory({ title: "Second", slug: { current: "second" }, order: 2 }),
      makeCategory({ title: "First", slug: { current: "first" }, order: 1 }),
    ];

    const groups = groupServicesByCategory(categories, []);

    expect(groups.map((group) => group.category.title)).toEqual(["First", "Second"]);
  });

  it("assigns each service to its matching category by categorySlug", () => {
    const categories = [
      makeCategory({ slug: { current: "software" }, order: 1 }),
      makeCategory({ slug: { current: "creative" }, order: 2 }),
    ];
    const services = [
      makeService({ title: "Web Development", categorySlug: "software" }),
      makeService({ title: "Branding", categorySlug: "creative" }),
    ];

    const groups = groupServicesByCategory(categories, services);

    expect(groups[0]?.services.map((service) => service.title)).toEqual(["Web Development"]);
    expect(groups[1]?.services.map((service) => service.title)).toEqual(["Branding"]);
  });

  it("orders services within a category by their order field", () => {
    const categories = [makeCategory({ slug: { current: "software" }, order: 1 })];
    const services = [
      makeService({ title: "Second", categorySlug: "software", order: 2 }),
      makeService({ title: "First", categorySlug: "software", order: 1 }),
    ];

    const groups = groupServicesByCategory(categories, services);

    expect(groups[0]?.services.map((service) => service.title)).toEqual(["First", "Second"]);
  });

  it("returns an empty services array for a category with no matches", () => {
    const categories = [makeCategory({ slug: { current: "empty" } })];

    const groups = groupServicesByCategory(categories, [
      makeService({ categorySlug: "other" }),
    ]);

    expect(groups[0]?.services).toEqual([]);
  });
});
