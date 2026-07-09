import { describe, expect, it } from "vitest";

import { getBreadcrumbJsonLd } from "./breadcrumb-jsonld";

describe("getBreadcrumbJsonLd", () => {
  it("builds a BreadcrumbList with 1-indexed positions in the given order", () => {
    const jsonLd = getBreadcrumbJsonLd([
      { name: "Home", href: "/" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Sample Project", href: "/portfolio/sample-project" },
    ]);

    expect(jsonLd["@type"]).toBe("BreadcrumbList");
    expect(jsonLd.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: "/portfolio" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Sample Project",
        item: "/portfolio/sample-project",
      },
    ]);
  });

  it("returns an empty itemListElement for an empty breadcrumb trail", () => {
    expect(getBreadcrumbJsonLd([]).itemListElement).toEqual([]);
  });
});
