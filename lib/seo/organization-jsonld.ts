import { DEFAULT_DESCRIPTION, SITE_NAME } from "./constants";
import {
  FACEBOOK_PAGE_URL,
  LINKEDIN_COMPANY_URL,
  PUBLIC_EMAIL,
} from "@/lib/contact/channels";

/** Canon facts + operator-provided contact channels (2026-07-10). */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    foundingDate: "2024",
    email: PUBLIC_EMAIL,
    sameAs: [FACEBOOK_PAGE_URL, LINKEDIN_COMPANY_URL],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Biñan City",
      addressRegion: "Laguna",
      addressCountry: "PH",
    },
  };
}
