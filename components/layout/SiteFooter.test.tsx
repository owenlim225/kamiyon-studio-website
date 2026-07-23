import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "./SiteFooter";
import { testShellProps } from "./test-shell-props";

describe("SiteFooter", () => {
  it("renders the primary nav links under a 'Footer' nav landmark", () => {
    render(
      <SiteFooter
        navItems={testShellProps.navItems}
        socialLinks={testShellProps.socialLinks}
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
      />
    );

    const nav = screen.getByRole("navigation", { name: "Footer" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("href", "/products");
    expect(screen.getByRole("link", { name: "Community" })).toHaveAttribute("href", "/community");
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
  });

  it("renders live social links as external anchors", () => {
    render(
      <SiteFooter
        navItems={testShellProps.navItems}
        socialLinks={testShellProps.socialLinks}
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
      />
    );

    expect(screen.queryByText("(Coming soon)")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      "https://www.facebook.com/kamiyonstudio"
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/105066188/"
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:kamiyonstudio@gmail.com"
    );
  });

  it("still renders placeholder social links as 'Coming soon' text when flagged", () => {
    render(
      <SiteFooter
        navItems={testShellProps.navItems}
        socialLinks={[
          {
            label: "Facebook",
            href: "#",
            comingSoon: true,
            platform: "facebook",
          },
        ]}
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
      />
    );

    expect(screen.getByText("(Coming soon)")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Facebook/ })).not.toBeInTheDocument();
  });

  it("renders the studio motto and location", () => {
    render(
      <SiteFooter
        navItems={testShellProps.navItems}
        socialLinks={testShellProps.socialLinks}
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
      />
    );

    expect(screen.getByText("Create. Play. Inspire.")).toBeInTheDocument();
    expect(screen.getByText(/Biñan City, Laguna, Philippines/)).toBeInTheDocument();
  });

  it("renders the current year in the copyright line", () => {
    render(
      <SiteFooter
        navItems={testShellProps.navItems}
        socialLinks={testShellProps.socialLinks}
        siteName={testShellProps.siteName}
        footerMotto={testShellProps.footerMotto}
      />
    );

    expect(
      screen.getByText(new RegExp(`© ${new Date().getFullYear()} Kamiyon Studio`))
    ).toBeInTheDocument();
  });
});
