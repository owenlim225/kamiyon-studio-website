import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { HomeHero } from "@/lib/cms/types";
import type { OpeningItem } from "@/lib/home/opening-items";
import { Hero } from "./Hero";

vi.mock("@/hooks/useOpeningAnimation", () => ({
  useOpeningAnimation: () => ({ current: null }),
}));

const baseHero: HomeHero = {
  _type: "hero",
  headline: "Create. Play. Inspire.",
  subheadline: "A multidisciplinary interactive experience studio.",
  ctaLabel: "Get in touch",
  ctaHref: "/contact",
};

const openingItems: OpeningItem[] = [
  {
    id: "product-eclipse",
    title: "Eclipse",
    subtitle: "2D Movement Platformer",
    href: "/products/eclipse",
    imageSrc: "/assets/background.png",
    imageAlt: "Eclipse preview",
  },
];

describe("Hero", () => {
  it("renders the Kamiyon brand eyebrow, headline, subheadline, and primary CTA", () => {
    render(<Hero hero={baseHero} openingItems={openingItems} />);

    expect(screen.getByText("Kamiyon")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: baseHero.headline })).toBeInTheDocument();
    expect(screen.getByText(baseHero.subheadline)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "/contact");
  });

  it("does not render secondary quick links including the products link", () => {
    render(<Hero hero={baseHero} openingItems={openingItems} />);

    expect(screen.queryByRole("link", { name: "View products" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "See our portfolio" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Contact us" })).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Quick links" })).not.toBeInTheDocument();
  });

  it("uses a full-bleed stage image instead of a CMS inset card", () => {
    const { container } = render(<Hero hero={baseHero} openingItems={openingItems} />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("relative");

    const background = container.querySelector('img[src*="background.png"]');
    expect(background).toBeInTheDocument();

    expect(container.querySelector('[class*="rounded-[var(--radius-card-lg)]"]')).not.toBeInTheDocument();
    expect(screen.queryByText("🌸")).not.toBeInTheDocument();
  });

  it("layers gradient scrims for text readability over the background", () => {
    const { container } = render(<Hero hero={baseHero} openingItems={openingItems} />);
    expect(container.querySelector(".bg-gradient-to-b")).toBeInTheDocument();
    expect(container.querySelector(".bg-gradient-to-r")).toBeInTheDocument();
  });

  it("applies motion-safe animation classes with reduced-motion fallbacks", () => {
    const { container } = render(<Hero hero={baseHero} openingItems={openingItems} />);

    const background = container.querySelector('img[src*="background.png"]');
    expect(background?.className).toMatch(/animate-hero-ken-burns/);
    expect(background?.className).toMatch(/motion-reduce:animate-none/);
    expect(container.querySelector("[data-opening-curtain]")).toBeInTheDocument();
  });
});
