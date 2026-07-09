import type { SiteSettings } from "../types";

// Sources: docs/company/overview.md, docs/branding/messaging.md, docs/marketing/positioning.md
export const siteSettingsFallback: SiteSettings = {
  _type: "siteSettings",
  siteName: "Kamiyon Studio",
  tagline:
    "Kamiyon Studio creates games and interactive experiences that educate, inspire, and make a lasting impact.",
  publicEmail: undefined,
  socialLinks: [
    {
      platform: "facebook",
      url: "#",
      label: "Facebook coming soon",
      isPlaceholder: true,
    },
    {
      platform: "linkedin",
      url: "#",
      label: "LinkedIn coming soon",
      isPlaceholder: true,
    },
    {
      platform: "email",
      url: "#",
      label: "Public email coming soon",
      isPlaceholder: true,
    },
  ],
  defaultSeo: {
    title: "Kamiyon Studio",
    description:
      "Kamiyon Studio is a multidisciplinary interactive experience studio that develops games, educational technologies, gamified platforms, and digital solutions that combine creativity, technology, and thoughtful design to create meaningful impact.",
  },
  globalCtas: [
    {
      label: "Explore our services",
      href: "/services",
      variant: "primary",
    },
    {
      label: "Get in touch",
      href: "/contact",
      variant: "secondary",
    },
  ],
  footerText: "Create. Play. Inspire.",
};
