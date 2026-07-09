import { DEFAULT_DESCRIPTION, SITE_NAME } from "./constants";

/** Canon facts only — no fabricated URLs or contact details. */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Biñan City",
      addressRegion: "Laguna",
      addressCountry: "PH",
    },
  };
}
