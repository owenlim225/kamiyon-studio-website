import type { ReactNode } from "react";

import { getSiteSettingsContent } from "@/lib/cms/site-settings-content";
import { buildShellNavProps } from "@/lib/site-settings/shell-props";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type PageShellProps = {
  children: ReactNode;
};

export async function PageShell({ children }: PageShellProps) {
  const shellProps = buildShellNavProps(await getSiteSettingsContent());

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-button)] focus:bg-[var(--bg-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--text-primary)] focus:shadow-[var(--shadow-md)] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-sakura"
      >
        Skip to content
      </a>
      <SiteHeader
        navItems={shellProps.navItems}
        contactCta={shellProps.contactCta}
        siteName={shellProps.siteName}
      />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter
        navItems={shellProps.navItems}
        socialLinks={shellProps.socialLinks}
        siteName={shellProps.siteName}
        footerMotto={shellProps.footerMotto}
      />
    </>
  );
}
