import { describe, expect, it } from "vitest";

import { getOrganizationJsonLd } from "./organization-jsonld";

describe("getOrganizationJsonLd", () => {
  it("returns canon-only Organization JSON-LD with no fabricated URL or contact details", () => {
    const jsonLd = getOrganizationJsonLd();

    expect(jsonLd).toEqual({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Kamiyon Studio",
      description: expect.stringContaining("Kamiyon Studio"),
      foundingDate: "2024",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Biñan City",
        addressRegion: "Laguna",
        addressCountry: "PH",
      },
    });
    expect(jsonLd).not.toHaveProperty("url");
    expect(jsonLd).not.toHaveProperty("email");
  });
});
