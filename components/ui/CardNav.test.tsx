import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CardNav } from "./CardNav";
import { buildCardNavItems } from "@/lib/config/card-nav";
import { CONTACT_CTA } from "@/lib/config/navigation";

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

vi.mock("@/lib/gsap", () => ({
  gsap: {
    set: vi.fn(),
    timeline: vi.fn(() => timeline),
  },
}));

const items = buildCardNavItems(CONTACT_CTA);

describe("CardNav", () => {
  beforeEach(() => {
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

  it("renders logo, CTA, and menu toggle", () => {
    const { container } = render(
      <CardNav
        logo="/logo.svg"
        logoAlt="Kamiyon Studio"
        items={items}
        ctaLabel="Get in touch"
        ctaHref="/contact"
      />,
    );

    expect(
      screen.getByRole("link", { name: "Kamiyon Studio — Home" }),
    ).toHaveAttribute("href", "/");
    expect(container.querySelector(".card-nav-cta-button")).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("plays the GSAP timeline when opening the menu", async () => {
    const user = userEvent.setup();
    render(
      <CardNav logo="/logo.svg" logoAlt="Kamiyon Studio" items={items} />,
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(timeline.play).toHaveBeenCalledWith(0);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("limits visible cards to three items", () => {
    const manyItems = [
      ...items,
      {
        label: "Extra",
        bgColor: "#000",
        textColor: "#fff",
        links: [{ label: "X", href: "/x", ariaLabel: "X" }],
      },
    ];

    render(
      <CardNav logo="/logo.svg" logoAlt="Kamiyon Studio" items={manyItems} />,
    );

    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.queryByText("Extra")).not.toBeInTheDocument();
  });

  it("closed chrome shows logo and burger without primary route links or CTA", () => {
    const { container } = render(
      <CardNav
        logo="/logo.svg"
        logoAlt="Kamiyon Studio"
        items={items}
        ctaLabel="Get in touch"
        ctaHref="/contact"
      />,
    );

    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(nav).not.toHaveClass("open");
    expect(container.querySelector(".card-nav-top")).toHaveClass(
      "card-nav-top--closed",
    );
    expect(container.querySelector(".hamburger-line--long")).toBeInTheDocument();
    expect(container.querySelector(".hamburger-line--short")).toBeInTheDocument();
    expect(container.querySelector(".card-nav-cta-button")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.queryByRole("link", { name: "Studio" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Services" })).not.toBeInTheDocument();
  });

  it("opens a vertically stacked card panel with CTA and restores closed chrome", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <CardNav
        logo="/logo.svg"
        logoAlt="Kamiyon Studio"
        items={items}
        ctaLabel="Get in touch"
        ctaHref="/contact"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(nav).toHaveClass("open");
    expect(container.querySelector(".card-nav-content")).toHaveClass(
      "card-nav-content--stack",
    );
    expect(container.querySelector(".card-nav-container")).toHaveClass(
      "card-nav-container--open",
    );
    expect(container.querySelector(".card-nav-cta-button")).not.toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.getByRole("link", { name: "Studio" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close menu" }));

    expect(nav).not.toHaveClass("open");
    expect(container.querySelector(".card-nav-top")).toHaveClass(
      "card-nav-top--closed",
    );
  });

  it("closes on Escape and keeps focus management hooks", async () => {
    const user = userEvent.setup();
    render(
      <CardNav logo="/logo.svg" logoAlt="Kamiyon Studio" items={items} />,
    );

    const toggle = screen.getByRole("button", { name: "Open menu" });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
