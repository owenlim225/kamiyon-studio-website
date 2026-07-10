import { describe, expect, it } from "vitest";

import { PRIMARY_NAV_ITEMS } from "./navigation";

const EXPECTED_PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

describe("PRIMARY_NAV_ITEMS", () => {
  it("lists exactly six primary nav links in the redesign order", () => {
    expect(PRIMARY_NAV_ITEMS).toHaveLength(6);
    expect([...PRIMARY_NAV_ITEMS]).toEqual([...EXPECTED_PRIMARY_NAV]);
  });

  it("excludes Products and Community from primary navigation", () => {
    const labels = PRIMARY_NAV_ITEMS.map((item) => item.label);
    const hrefs = PRIMARY_NAV_ITEMS.map((item) => item.href);

    expect(labels).not.toContain("Products");
    expect(labels).not.toContain("Community");
    expect(hrefs).not.toContain("/products");
    expect(hrefs).not.toContain("/community");
  });
});
