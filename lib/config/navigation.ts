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

/** Placeholder social links until canon provides real URLs. */
export const SOCIAL_LINKS: readonly NavSocialLink[] = [
  { label: "Facebook", href: "#", comingSoon: true, platform: "facebook" },
  { label: "LinkedIn", href: "#", comingSoon: true, platform: "linkedin" },
  { label: "Email", href: "#", comingSoon: true, platform: "email" },
] as const;
