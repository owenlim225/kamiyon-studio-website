import type { Cta, SiteSettings, SocialLink } from "@/lib/cms/types";
import {
  CONTACT_CTA,
  PRIMARY_NAV_ITEMS,
  type NavItem,
  type NavSocialLink,
} from "@/lib/config/navigation";
import { SITE_MOTTO, SITE_NAME } from "@/lib/seo/constants";

export type ShellNavProps = {
  navItems: readonly NavItem[];
  contactCta: NavItem;
  siteName: string;
  footerMotto: string;
  socialLinks: readonly NavSocialLink[];
};

const PLATFORM_LABELS: Record<SocialLink["platform"], string> = {
  facebook: "Facebook",
  linkedin: "LinkedIn",
  email: "Email",
};

export function getContactCtaFromSettings(globalCtas: Cta[]): NavItem {
  const contactCta = globalCtas.find((cta) => cta.href === "/contact");

  if (contactCta) {
    return {
      label: contactCta.label,
      href: contactCta.href,
    };
  }

  return CONTACT_CTA;
}

export function mapSocialLinksForShell(socialLinks: SocialLink[]): NavSocialLink[] {
  return socialLinks.map((link) => ({
    label: PLATFORM_LABELS[link.platform] ?? link.label,
    href: link.url,
    comingSoon: Boolean(link.isPlaceholder),
    platform: link.platform,
  }));
}

export function getFooterMotto(settings: SiteSettings): string {
  return settings.footerText?.trim() || settings.tagline?.trim() || SITE_MOTTO;
}

export function buildShellNavProps(settings: SiteSettings): ShellNavProps {
  return {
    navItems: PRIMARY_NAV_ITEMS,
    contactCta: getContactCtaFromSettings(settings.globalCtas),
    siteName: settings.siteName.trim() || SITE_NAME,
    footerMotto: getFooterMotto(settings),
    socialLinks: mapSocialLinksForShell(settings.socialLinks),
  };
}
