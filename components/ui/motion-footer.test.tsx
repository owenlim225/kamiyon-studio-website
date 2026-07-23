import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { testShellProps } from "@/components/layout/test-shell-props";

vi.mock("@/lib/motion/reduced-motion", () => ({
  prefersReducedMotion: vi.fn(() => false),
}));

vi.mock("@/lib/gsap", () => {
  return {
    ensureGsapPlugins: vi.fn(),
    GSAP_ALLOW_MOTION: "(prefers-reduced-motion: no-preference)",
    GSAP_REDUCE_MOTION: "(prefers-reduced-motion: reduce)",
    gsap: {
      context: vi.fn((fn: () => void | (() => void)) => {
        const cleanup = fn();
        return {
          revert: vi.fn(() => {
            if (typeof cleanup === "function") cleanup();
          }),
        };
      }),
      fromTo: vi.fn(),
      to: vi.fn(),
      set: vi.fn(),
      matchMedia: vi.fn(() => ({
        add: vi.fn(
          (
            query: string,
            callback: () => void | (() => void),
          ) => {
            if (query.includes("no-preference")) {
              return callback();
            }
            return undefined;
          },
        ),
        revert: vi.fn(),
      })),
    },
    ScrollTrigger: {
      create: vi.fn(),
      update: vi.fn(),
      refresh: vi.fn(),
    },
  };
});

import { prefersReducedMotion } from "@/lib/motion/reduced-motion";

import { CinematicFooter } from "./motion-footer";

beforeEach(() => {
  vi.mocked(prefersReducedMotion).mockReturnValue(false);
});

describe("CinematicFooter", () => {
  it("renders a contentinfo landmark", () => {
    render(
      <CinematicFooter
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
        navItems={testShellProps.navItems}
        socialLinks={testShellProps.socialLinks}
        contactCta={testShellProps.contactCta}
      />,
    );

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders the primary nav links under a Footer nav landmark", () => {
    render(
      <CinematicFooter
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
        navItems={testShellProps.navItems}
        socialLinks={testShellProps.socialLinks}
        contactCta={testShellProps.contactCta}
      />,
    );

    const nav = screen.getByRole("navigation", { name: "Footer" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "/services",
    );
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(screen.getByRole("link", { name: "Community" })).toHaveAttribute(
      "href",
      "/community",
    );
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/blog",
    );
  });

  it("renders live social links as external anchors", () => {
    render(
      <CinematicFooter
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
        navItems={testShellProps.navItems}
        socialLinks={testShellProps.socialLinks}
        contactCta={testShellProps.contactCta}
      />,
    );

    expect(screen.queryByText("(Coming soon)")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      "https://www.facebook.com/kamiyonstudio",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/105066188/",
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:kamiyonstudio@gmail.com",
    );
  });

  it("still renders placeholder social links as Coming soon text when flagged", () => {
    render(
      <CinematicFooter
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
        navItems={testShellProps.navItems}
        socialLinks={[
          {
            label: "Facebook",
            href: "#",
            comingSoon: true,
            platform: "facebook",
          },
        ]}
        contactCta={testShellProps.contactCta}
      />,
    );

    expect(screen.getByText("(Coming soon)")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Facebook/ }),
    ).not.toBeInTheDocument();
  });

  it("renders the studio motto accessibly and location in credits", () => {
    render(
      <CinematicFooter
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
        navItems={testShellProps.navItems}
        socialLinks={testShellProps.socialLinks}
        contactCta={testShellProps.contactCta}
      />,
    );

    const motto = screen.getByText("Create. Play. Inspire.", {
      selector: "p",
    });
    expect(motto).toBeInTheDocument();
    expect(motto.closest("[aria-hidden='true']")).toBeNull();
    expect(
      screen.getByText(/Biñan City, Laguna, Philippines/),
    ).toBeInTheDocument();
  });

  it("renders the current year in the copyright line", () => {
    render(
      <CinematicFooter
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
        navItems={testShellProps.navItems}
        socialLinks={testShellProps.socialLinks}
        contactCta={testShellProps.contactCta}
      />,
    );

    expect(
      screen.getByText(
        new RegExp(`© ${new Date().getFullYear()} Kamiyon Studio`),
      ),
    ).toBeInTheDocument();
  });

  it("renders contact and portfolio primary CTAs", () => {
    render(
      <CinematicFooter
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
        navItems={testShellProps.navItems}
        socialLinks={testShellProps.socialLinks}
        contactCta={testShellProps.contactCta}
      />,
    );

    expect(
      screen.getByRole("link", { name: testShellProps.contactCta.label }),
    ).toHaveAttribute("href", testShellProps.contactCta.href);
    expect(screen.getByRole("link", { name: "View portfolio" })).toHaveAttribute(
      "href",
      "/portfolio",
    );
  });

  it("scrolls to top when the back-to-top control is activated", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    vi.stubGlobal("scrollTo", scrollTo);

    render(
      <CinematicFooter
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
        navItems={testShellProps.navItems}
        socialLinks={testShellProps.socialLinks}
        contactCta={testShellProps.contactCta}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Back to top" }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("uses instant scroll when prefers-reduced-motion is set", async () => {
    vi.mocked(prefersReducedMotion).mockReturnValue(true);
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    vi.stubGlobal("scrollTo", scrollTo);

    render(
      <CinematicFooter
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
        navItems={testShellProps.navItems}
        socialLinks={testShellProps.socialLinks}
        contactCta={testShellProps.contactCta}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Back to top" }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });

  it("exposes a Connect landmark for social links", () => {
    render(
      <CinematicFooter
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
        navItems={testShellProps.navItems}
        socialLinks={testShellProps.socialLinks}
        contactCta={testShellProps.contactCta}
      />,
    );

    expect(
      screen.getByRole("navigation", { name: "Connect" }),
    ).toBeInTheDocument();
  });
});
