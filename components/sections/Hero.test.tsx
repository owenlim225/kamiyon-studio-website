import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { HomeHero } from "@/lib/cms/types";
import { Hero } from "./Hero";

vi.mock("@/lib/cms/image", () => ({
  getCmsImageUrl: vi.fn(),
}));

const baseHero: HomeHero = {
  _type: "hero",
  headline: "Create. Play. Inspire.",
  subheadline: "A multidisciplinary interactive experience studio.",
  ctaLabel: "Get in touch",
  ctaHref: "/contact",
};

describe("Hero", () => {
  it("renders the headline, subheadline, and primary CTA", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue(null);

    render(<Hero hero={baseHero} />);

    expect(screen.getByRole("heading", { level: 1, name: baseHero.headline })).toBeInTheDocument();
    expect(screen.getByText(baseHero.subheadline)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "/contact");
  });

  it("renders the secondary quick-link row (Products / Portfolio / Contact)", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue(null);

    render(<Hero hero={baseHero} />);

    expect(screen.getByRole("link", { name: "View products" })).toHaveAttribute(
      "href",
      "/products"
    );
    expect(screen.getByRole("link", { name: "See our portfolio" })).toHaveAttribute(
      "href",
      "/portfolio"
    );
  });

  it("shows the branded placeholder panel when no hero image resolves", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue(null);

    render(<Hero hero={baseHero} />);

    expect(screen.getByText("🌸")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders the CMS hero image when a URL resolves", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue("https://cdn.sanity.io/images/test/hero.png");

    render(<Hero hero={{ ...baseHero, image: { alt: "Studio team" } }} />);

    expect(screen.getByRole("img")).toHaveAttribute("alt", "Studio team");
  });

  it("falls back to an empty alt when the CMS image has no alt text", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue("https://cdn.sanity.io/images/test/hero.png");

    const { container } = render(<Hero hero={{ ...baseHero, image: {} }} />);

    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });
});
