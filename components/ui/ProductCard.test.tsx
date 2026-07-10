import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { Product } from "@/lib/cms/types";
import { ProductCard } from "./ProductCard";

vi.mock("@/lib/cms/image", () => ({
  getCmsImageUrl: vi.fn(),
}));

const baseProduct: Product = {
  _type: "product",
  title: "Eclipse",
  slug: { current: "eclipse" },
  tagline: "A 2D platformer about light and shadow.",
  genre: "2D Platformer",
  status: "original-ip",
  developmentStatus: "tbd",
  overview: "Overview copy.",
  goals: [],
  features: [],
  platforms: [],
  media: [{ type: "image" }],
  isPlaceholder: true,
  order: 1,
  seo: { title: "", description: "" },
};

describe("ProductCard", () => {
  it("links to the product detail route", () => {
    render(<ProductCard product={baseProduct} />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/products/eclipse");
  });

  it("shows the media-coming-soon placeholder when no media asset resolves", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue(null);

    render(<ProductCard product={baseProduct} />);

    expect(screen.getByText("Media coming soon")).toBeInTheDocument();
  });

  it("renders the media image when a CMS image URL resolves", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue("/api/media/file/test.png");

    render(<ProductCard product={baseProduct} />);

    expect(screen.getByRole("img")).toHaveAttribute("alt", baseProduct.title);
  });

  it("shows the mapped development-status label as a badge", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue(null);

    render(<ProductCard product={{ ...baseProduct, developmentStatus: "prototype" }} />);

    expect(screen.getByText("Prototype")).toBeInTheDocument();
  });
});
