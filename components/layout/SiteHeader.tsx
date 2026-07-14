"use client";

import { CardNav } from "@/components/ui/CardNav";
import { buildCardNavItems } from "@/lib/config/card-nav";
import type { NavItem, NavSocialLink } from "@/lib/config/navigation";

type SiteHeaderProps = {
  navItems: readonly NavItem[];
  contactCta: NavItem;
  siteName: string;
  socialLinks?: readonly NavSocialLink[];
};

/**
 * Site chrome header — React Bits CardNav over shell nav props.
 * `navItems` kept for API parity with footer / shell builders (cards derive routes).
 */
export function SiteHeader({
  navItems: _navItems,
  contactCta,
  siteName,
  socialLinks,
}: SiteHeaderProps) {
  const items = buildCardNavItems(contactCta, socialLinks);

  return (
    <header className="relative z-50">
      {/* Reserve space for fixed CardNav (top offset + 60px bar). */}
      <div
        className="h-[calc(1.2em+60px)] md:h-[calc(2em+60px)]"
        aria-hidden="true"
      />
      <CardNav
        logo="/logo.svg"
        logoAlt={siteName}
        items={items}
        baseColor="var(--bg-surface)"
        menuColor="var(--color-charcoal)"
        buttonBgColor="var(--color-charcoal)"
        buttonTextColor="var(--bg-primary)"
        ctaLabel={contactCta.label}
        ctaHref={contactCta.href}
        ease="power3.out"
      />
    </header>
  );
}
