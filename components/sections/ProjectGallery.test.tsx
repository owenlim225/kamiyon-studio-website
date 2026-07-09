import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { CmsImage } from "@/lib/cms/types";
import { ProjectGallery } from "./ProjectGallery";

vi.mock("@/lib/cms/image", () => ({
  getCmsImageUrl: vi.fn(),
}));

describe("ProjectGallery", () => {
  it("renders the coming-soon placeholder when the gallery is empty", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue(null);

    render(<ProjectGallery gallery={[]} />);

    expect(screen.getByText("Gallery coming soon.")).toBeInTheDocument();
  });

  it("renders the placeholder when no gallery image resolves to a URL", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue(null);

    const gallery: CmsImage[] = [{ asset: { _ref: "image-a", _type: "reference" } }];
    render(<ProjectGallery gallery={gallery} />);

    expect(screen.getByText("Gallery coming soon.")).toBeInTheDocument();
  });

  it("renders one image per resolvable gallery entry", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl)
      .mockReturnValueOnce("https://cdn.sanity.io/images/test/a.png")
      .mockReturnValueOnce("https://cdn.sanity.io/images/test/b.png");

    const gallery: CmsImage[] = [
      { _key: "a", asset: { _ref: "image-a", _type: "reference" }, alt: "Gallery image A" },
      { _key: "b", asset: { _ref: "image-b", _type: "reference" }, alt: "Gallery image B" },
    ];
    render(<ProjectGallery gallery={gallery} />);

    expect(screen.getAllByRole("img")).toHaveLength(2);
    expect(screen.getByAltText("Gallery image A")).toBeInTheDocument();
    expect(screen.getByAltText("Gallery image B")).toBeInTheDocument();
  });

  it("falls back to an empty alt and a URL-based key when unset", async () => {
    const { getCmsImageUrl } = await import("@/lib/cms/image");
    vi.mocked(getCmsImageUrl).mockReturnValue("https://cdn.sanity.io/images/test/no-key.png");

    const gallery: CmsImage[] = [{ asset: { _ref: "image-c", _type: "reference" } }];
    const { container } = render(<ProjectGallery gallery={gallery} />);

    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });
});
