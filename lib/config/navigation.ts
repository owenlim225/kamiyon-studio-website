import {
  FACEBOOK_PAGE_URL,
  LINKEDIN_COMPANY_URL,
  PUBLIC_EMAIL,
} from "@/lib/contact/channels";

export type NavItem = {
  label: string;
  href: string;
};

/** Static nav config for Phase 2. CMS wiring deferred to Phase 3+. */
export const PRIMARY_NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Community", href: "/community" },
  { label: "Contact", href: "/contact" },
] as const;

export const CONTACT_CTA: NavItem = {
  label: "Get in touch",
  href: "/contact",
};

export type NavSocialLink = {
  label: string;
  href: string;
  comingSoon?: boolean;
  platform?: "facebook" | "linkedin" | "email";
};

/** Static social links (shell prefers CMS `siteSettings.socialLinks`). */
export const SOCIAL_LINKS: readonly NavSocialLink[] = [
  { label: "Facebook", href: FACEBOOK_PAGE_URL, platform: "facebook" },
  { label: "LinkedIn", href: LINKEDIN_COMPANY_URL, platform: "linkedin" },
  { label: "Email", href: `mailto:${PUBLIC_EMAIL}`, platform: "email" },
] as const;
