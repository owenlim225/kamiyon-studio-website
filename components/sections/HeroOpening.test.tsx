import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { HomeHero } from "@/lib/cms/types";
import type { OpeningItem } from "@/lib/home/opening-items";
import { HeroOpening } from "./HeroOpening";

vi.mock("@/hooks/useOpeningAnimation", () => ({
  useOpeningAnimation: () => ({ current: null }),
}));

const baseHero: HomeHero = {
  _type: "hero",
  headline: "Meaningful interactive experiences, built with purpose.",
  subheadline: "A multidisciplinary interactive experience studio.",
  ctaLabel: "Explore our services",
  ctaHref: "/services",
};

const items: OpeningItem[] = [
  {
    id: "product-eclipse",
    title: "Eclipse",
    subtitle: "2D Movement Platformer",
    href: "/products/eclipse",
    imageSrc: "/assets/background.png",
    imageAlt: "Eclipse preview",
  },
  {
    id: "case-sample",
    title: "Sample Client Project",
    subtitle: "Client name coming soon",
    href: "/portfolio/sample-client-project-placeholder",
    imageSrc: "/assets/background.png",
    imageAlt: "Sample cover",
  },
];

describe("HeroOpening", () => {
  it("renders brand, headline, support, CTA, and Il Capo-style corner labels", () => {
    render(<HeroOpening hero={baseHero} items={items} />);

    expect(screen.getByText("Kamiyon")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: baseHero.headline }),
    ).toBeInTheDocument();
    expect(screen.getByText(baseHero.subheadline)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore our services" }),
    ).toHaveAttribute("href", "/services");

    expect(screen.getByRole("link", { name: "Contacts" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByRole("link", { name: "Portfolio" })).toHaveAttribute(
      "href",
      "/portfolio",
    );
    expect(screen.getByText("ccoonnttaaccttss")).toBeInTheDocument();
    expect(screen.getByText("ppoorrttffoolliioo")).toBeInTheDocument();
  });

  it("lists featured opening rows with padded indexes and destinations", () => {
    render(<HeroOpening hero={baseHero} items={items} />);

    expect(screen.getByRole("navigation", { name: "Featured work" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Eclipse/i })).toHaveAttribute(
      "href",
      "/products/eclipse",
    );
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
  });

  it("swaps the stage image source when a row is hovered", async () => {
    const user = userEvent.setup();
    const mixedItems: OpeningItem[] = [
      {
        ...items[0]!,
        imageSrc: "/assets/background.png",
      },
      {
        ...items[1]!,
        imageSrc: "/assets/logo.png",
      },
    ];
    const { container } = render(
      <HeroOpening hero={baseHero} items={mixedItems} />,
    );

    expect(container.querySelector('img[src*="background.png"]')).toBeInTheDocument();

    await user.hover(screen.getByRole("link", { name: /Sample Client Project/i }));

    expect(container.querySelector('img[src*="logo.png"]')).toBeInTheDocument();
  });

  it("includes a curtain layer and reduced-motion-safe ken burns class", () => {
    const { container } = render(<HeroOpening hero={baseHero} items={items} />);

    expect(container.querySelector("[data-opening-curtain]")).toBeInTheDocument();
    const stage = container.querySelector('img[src*="background.png"]');
    expect(stage?.className).toMatch(/animate-hero-ken-burns/);
    expect(stage?.className).toMatch(/motion-reduce:animate-none/);
  });
});
