import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { ProductMedia as ProductMediaItem } from "@/lib/cms/types";
import { ProductMedia } from "./ProductMedia";

vi.mock("@/lib/cms/image", () => ({
  getCmsImageUrl: vi.fn(),
}));

describe("ProductMedia", () => {
  it("renders the generic media-coming-soon placeholder when there is no media", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue(null);

    render(<ProductMedia media={[]} />);

    expect(screen.getByText("Media coming soon.")).toBeInTheDocument();
  });

  it("uses the media item's own caption in the placeholder when set", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue(null);

    const media: ProductMediaItem[] = [{ type: "image", caption: "Concept art coming soon." }];
    render(<ProductMedia media={media} />);

    expect(screen.getByText("Concept art coming soon.")).toBeInTheDocument();
  });

  it("renders resolved media images in a grid", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue("/api/media/file/screenshot.png");

    const media: ProductMediaItem[] = [
      { type: "image", asset: { url: "/api/media/file/screenshot.png" }, alt: "Screenshot" },
    ];
    render(<ProductMedia media={media} />);

    expect(screen.getByAltText("Screenshot")).toBeInTheDocument();
  });

  it("falls back to the caption, then an empty string, for alt text when unset", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue("/api/media/file/screenshot.png");

    render(
      <ProductMedia
        media={[
          {
            type: "image",
            asset: { url: "/api/media/file/screenshot.png" },
            caption: "Concept art",
          },
        ]}
      />
    );

    expect(screen.getByAltText("Concept art")).toBeInTheDocument();
  });

  it("renders a trailer link only when trailerUrl is set", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue(null);

    const { rerender } = render(<ProductMedia media={[]} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();

    rerender(<ProductMedia media={[]} trailerUrl="https://youtube.com/watch?v=abc" />);
    expect(screen.getByRole("link", { name: /Watch trailer/ })).toHaveAttribute(
      "href",
      "https://youtube.com/watch?v=abc"
    );
  });
});
