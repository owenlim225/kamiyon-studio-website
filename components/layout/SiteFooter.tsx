import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { NavItem, NavSocialLink } from "@/lib/config/navigation";
import { STUDIO_LOCATION } from "@/lib/seo/constants";
import { Logo } from "./Logo";

const currentYear = new Date().getFullYear();

type SiteFooterProps = {
  navItems: readonly NavItem[];
  socialLinks: readonly NavSocialLink[];
  siteName: string;
  footerMotto: string;
};

function getSocialHref(link: NavSocialLink): string {
  if (link.platform === "email" && !link.href.startsWith("mailto:")) {
    return `mailto:${link.href.replace(/^mailto:/, "")}`;
  }

  return link.href;
}

export function SiteFooter({
  navItems,
  socialLinks,
  siteName,
  footerMotto,
}: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-secondary)]">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo siteName={siteName} />
            <p className="max-w-xs text-sm text-[var(--text-secondary)]">{footerMotto}</p>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--text-primary)]">
              Explore
            </h2>
            <nav aria-label="Footer" className="mt-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--text-secondary)] transition-colors hover:text-sakura-ink focus-visible:outline-offset-2"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--text-primary)]">
              Connect
            </h2>
            <ul className="mt-4 space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  {link.comingSoon ? (
                    <span className="text-sm text-[var(--text-muted)]">
                      {link.label}{" "}
                      <span className="text-xs">(Coming soon)</span>
                    </span>
                  ) : (
                    <a
                      href={getSocialHref(link)}
                      className="text-sm text-[var(--text-secondary)] transition-colors hover:text-sakura-ink focus-visible:outline-offset-2"
                      rel={link.platform === "email" ? undefined : "noopener noreferrer"}
                      target={link.platform === "email" ? undefined : "_blank"}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--text-primary)]">
              Studio
            </h2>
            <p className="mt-4 text-sm text-[var(--text-secondary)]">
              Multidisciplinary interactive experience studio based in {STUDIO_LOCATION}.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border-default)] pt-6 text-sm text-[var(--text-muted)]">
          © {currentYear} {siteName}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
