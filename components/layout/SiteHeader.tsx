"use client";

import { usePathname } from "next/navigation";

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
 * On `/`, overlays the hero with a ghost (transparent) nav so the stage hits y=0.
 * `navItems` kept for API parity with footer / shell builders (cards derive routes).
 */
export function SiteHeader({
  navItems: _navItems,
  contactCta,
  siteName,
  socialLinks,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const overlay = pathname === "/";
  const items = buildCardNavItems(contactCta, socialLinks);

  return (
    <header className={`relative z-50 ${overlay ? "pointer-events-none" : ""}`}>
      {/* Reserve space for fixed CardNav unless overlaying the home hero. */}
      <div
        className={
          overlay
            ? "h-0"
            : "h-[calc(1.2em+60px)] md:h-[calc(2em+60px)]"
        }
        aria-hidden="true"
      />
      <div className={overlay ? "pointer-events-auto" : undefined}>
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
          transparent={overlay}
        />
      </div>
    </header>
  );
}
