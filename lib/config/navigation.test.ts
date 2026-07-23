import { describe, expect, it } from "vitest";

import { PRIMARY_NAV_ITEMS } from "./navigation";

const EXPECTED_PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Community", href: "/community" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

describe("PRIMARY_NAV_ITEMS", () => {
  it("lists all eight primary nav links in locked order", () => {
    expect(PRIMARY_NAV_ITEMS).toHaveLength(8);
    expect([...PRIMARY_NAV_ITEMS]).toEqual([...EXPECTED_PRIMARY_NAV]);
  });

  it("includes Products and Community", () => {
    const labels = PRIMARY_NAV_ITEMS.map((item) => item.label);
    const hrefs = PRIMARY_NAV_ITEMS.map((item) => item.href);

    expect(labels).toContain("Products");
    expect(labels).toContain("Community");
    expect(hrefs).toContain("/products");
    expect(hrefs).toContain("/community");
  });
});
