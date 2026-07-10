import { describe, expect, it } from "vitest";

import { siteSettingsFallback } from "@/lib/cms/fallbacks/site-settings";
import type { SiteSettings } from "@/lib/cms/types";

import {
  buildShellNavProps,
  getContactCtaFromSettings,
  getFooterMotto,
  mapSocialLinksForShell,
} from "./shell-props";

describe("buildShellNavProps", () => {
  it("maps CMS site settings to header/footer shell props", () => {
    const settings: SiteSettings = {
      ...siteSettingsFallback,
      siteName: "Kamiyon Studio CMS",
      footerText: "Create. Play. Inspire.",
      globalCtas: [
        { label: "Explore our services", href: "/services", variant: "primary" },
        { label: "Contact us", href: "/contact", variant: "secondary" },
      ],
      socialLinks: [
        {
          platform: "facebook",
          url: "https://facebook.com/kamiyon",
          label: "Facebook",
          isPlaceholder: false,
        },
      ],
    };

    const props = buildShellNavProps(settings);

    expect(props.siteName).toBe("Kamiyon Studio CMS");
    expect(props.footerMotto).toBe("Create. Play. Inspire.");
    expect(props.contactCta).toEqual({ label: "Contact us", href: "/contact" });
    expect(props.socialLinks[0]).toEqual({
      label: "Facebook",
      href: "https://facebook.com/kamiyon",
      comingSoon: false,
      platform: "facebook",
    });
  });

  it("falls back to static contact CTA when no /contact href exists", () => {
    expect(
      getContactCtaFromSettings([
        { label: "Explore our services", href: "/services", variant: "primary" },
      ])
    ).toEqual({ label: "Get in touch", href: "/contact" });
  });

  it("prefers footerText over tagline for the footer motto", () => {
    expect(
      getFooterMotto({
        ...siteSettingsFallback,
        footerText: "Create. Play. Inspire.",
        tagline: "Tagline copy",
      })
    ).toBe("Create. Play. Inspire.");
  });

  it("maps placeholder social links as coming soon", () => {
    expect(mapSocialLinksForShell(siteSettingsFallback.socialLinks)[0]).toEqual({
      label: "Facebook",
      href: "#",
      comingSoon: true,
      platform: "facebook",
    });
  });
});
