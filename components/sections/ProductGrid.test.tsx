import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { Product } from "@/lib/cms/types";
import { ProductGrid } from "./ProductGrid";

vi.mock("@/lib/cms/image", () => ({
  getCmsImageUrl: vi.fn(() => null),
}));

const product: Product = {
  _type: "product",
  title: "Eclipse",
  slug: { current: "eclipse" },
  tagline: "A 2D platformer about light and shadow.",
  genre: "2D Platformer",
  status: "original-ip",
  developmentStatus: "tbd",
  overview: "",
  goals: [],
  features: [],
  platforms: [],
  media: [],
  isPlaceholder: true,
  order: 1,
  seo: { title: "", description: "" },
};

describe("ProductGrid", () => {
  it("renders a ProductCard per product", () => {
    render(<ProductGrid products={[product]} />);

    expect(screen.getByRole("link", { name: /Eclipse/ })).toHaveAttribute(
      "href",
      "/products/eclipse"
    );
  });

  it("renders the EmptyState when there are no products", () => {
    render(<ProductGrid products={[]} />);

    expect(screen.getByText("Products coming soon.")).toBeInTheDocument();
  });
});
