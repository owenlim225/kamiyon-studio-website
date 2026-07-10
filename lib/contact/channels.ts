import type { ContactChannel, SocialLink } from "@/lib/cms/types";

/** Operator-provided 2026-07-10 — not yet mirrored in canon docs. */
export const PUBLIC_EMAIL = "kamiyonstudio@gmail.com";

/** Operator-provided Facebook page. */
export const FACEBOOK_PAGE_URL = "https://www.facebook.com/kamiyonstudio";

/**
 * Public LinkedIn company page derived from operator company ID `105066188`.
 * Operator supplied the admin dashboard URL; visitors need the public company path.
 */
export const LINKEDIN_COMPANY_URL =
  "https://www.linkedin.com/company/105066188/";

export const contactChannels: ContactChannel[] = [
  {
    type: "facebook",
    label: "Facebook",
    value: FACEBOOK_PAGE_URL,
    isPlaceholder: false,
  },
  {
    type: "linkedin",
    label: "LinkedIn",
    value: LINKEDIN_COMPANY_URL,
    isPlaceholder: false,
  },
  {
    type: "email",
    label: "Email",
    value: PUBLIC_EMAIL,
    isPlaceholder: false,
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "facebook",
    url: FACEBOOK_PAGE_URL,
    label: "Facebook",
    isPlaceholder: false,
  },
  {
    platform: "linkedin",
    url: LINKEDIN_COMPANY_URL,
    label: "LinkedIn",
    isPlaceholder: false,
  },
  {
    platform: "email",
    url: `mailto:${PUBLIC_EMAIL}`,
    label: "Email",
    isPlaceholder: false,
  },
];
