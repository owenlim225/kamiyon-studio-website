import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "./SiteHeader";
import { testShellProps } from "./test-shell-props";

describe("SiteHeader", () => {
  it("renders the logo and a primary nav landmark", () => {
    render(
      <SiteHeader
        navItems={testShellProps.navItems}
        contactCta={testShellProps.contactCta}
        siteName={testShellProps.siteName}
      />
    );

    expect(screen.getByRole("link", { name: "Kamiyon Studio — Home" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
  });

  it("renders the mobile menu toggle collapsed by default", () => {
    render(
      <SiteHeader
        navItems={testShellProps.navItems}
        contactCta={testShellProps.contactCta}
        siteName={testShellProps.siteName}
      />
    );

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the mobile drawer nav when the toggle is clicked", async () => {
    const user = userEvent.setup();
    render(
      <SiteHeader
        navItems={testShellProps.navItems}
        contactCta={testShellProps.contactCta}
        siteName={testShellProps.siteName}
      />
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getAllByRole("navigation", { name: "Primary" })).toHaveLength(2);
  });

  it("closes the mobile drawer on Escape", async () => {
    const user = userEvent.setup();
    render(
      <SiteHeader
        navItems={testShellProps.navItems}
        contactCta={testShellProps.contactCta}
        siteName={testShellProps.siteName}
      />
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("renders the six primary nav links and excludes hidden sections", () => {
    render(
      <SiteHeader
        navItems={testShellProps.navItems}
        contactCta={testShellProps.contactCta}
        siteName={testShellProps.siteName}
      />
    );

    for (const label of ["Home", "About", "Services", "Portfolio", "Blog", "Contact"]) {
      expect(screen.getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    }

    expect(screen.queryByRole("link", { name: "Products" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Community" })).not.toBeInTheDocument();
  });

  it("renders the Contact CTA linking to /contact", () => {
    render(
      <SiteHeader
        navItems={testShellProps.navItems}
        contactCta={testShellProps.contactCta}
        siteName={testShellProps.siteName}
      />
    );

    expect(screen.getAllByRole("link", { name: "Get in touch" })[0]).toHaveAttribute(
      "href",
      "/contact"
    );
  });
});
