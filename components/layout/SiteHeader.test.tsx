import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SiteHeader } from "./SiteHeader";
import { testShellProps } from "./test-shell-props";

const { usePathnameMock } = vi.hoisted(() => ({
  usePathnameMock: vi.fn(() => "/about"),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => usePathnameMock(),
}));

vi.mock("@/lib/gsap", () => {
  let onReverseComplete: (() => void) | null = null;

  const timeline = {
    to: vi.fn().mockReturnThis(),
    play: vi.fn().mockReturnThis(),
    reverse: vi.fn(() => {
      onReverseComplete?.();
      return timeline;
    }),
    kill: vi.fn(),
    progress: vi.fn().mockReturnThis(),
    eventCallback: vi.fn((name: string, cb?: (() => void) | null) => {
      if (name === "onReverseComplete") {
        onReverseComplete = cb ?? null;
      }
      return timeline;
    }),
  };

  return {
    gsap: {
      set: vi.fn(),
      timeline: vi.fn(() => timeline),
    },
  };
});

describe("SiteHeader", () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue("/about");
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the logo and a primary nav landmark", () => {
    render(
      <SiteHeader
        navItems={testShellProps.navItems}
        contactCta={testShellProps.contactCta}
        siteName={testShellProps.siteName}
        socialLinks={testShellProps.socialLinks}
      />,
    );

    expect(
      screen.getByRole("link", { name: "Kamiyon Studio — Home" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
  });

  it("renders the menu toggle collapsed by default", () => {
    render(
      <SiteHeader
        navItems={testShellProps.navItems}
        contactCta={testShellProps.contactCta}
        siteName={testShellProps.siteName}
        socialLinks={testShellProps.socialLinks}
      />,
    );

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the card menu when the toggle is clicked", async () => {
    const user = userEvent.setup();
    render(
      <SiteHeader
        navItems={testShellProps.navItems}
        contactCta={testShellProps.contactCta}
        siteName={testShellProps.siteName}
        socialLinks={testShellProps.socialLinks}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("closes the card menu on Escape", async () => {
    const user = userEvent.setup();
    render(
      <SiteHeader
        navItems={testShellProps.navItems}
        contactCta={testShellProps.contactCta}
        siteName={testShellProps.siteName}
        socialLinks={testShellProps.socialLinks}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("renders primary routes inside the card menu", async () => {
    const user = userEvent.setup();
    render(
      <SiteHeader
        navItems={testShellProps.navItems}
        contactCta={testShellProps.contactCta}
        siteName={testShellProps.siteName}
        socialLinks={testShellProps.socialLinks}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const label of ["Home", "Studio", "Services", "Portfolio", "Blog"]) {
      expect(within(nav).getByRole("link", { name: label })).toBeInTheDocument();
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
        socialLinks={testShellProps.socialLinks}
      />,
    );

    expect(
      screen.getAllByRole("link", { name: "Get in touch" })[0],
    ).toHaveAttribute("href", "/contact");
  });

  it("collapses the home header spacer and uses transparent CardNav on /", () => {
    usePathnameMock.mockReturnValue("/");
    const { container } = render(
      <SiteHeader
        navItems={testShellProps.navItems}
        contactCta={testShellProps.contactCta}
        siteName={testShellProps.siteName}
        socialLinks={testShellProps.socialLinks}
      />,
    );

    const spacer = container.querySelector("header > div[aria-hidden='true']");
    expect(spacer).toHaveClass("h-0");
    expect(container.querySelector(".card-nav--transparent")).toBeInTheDocument();
  });
});
