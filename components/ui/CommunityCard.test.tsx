import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { CommunityItem } from "@/lib/cms/types";
import { CommunityCard } from "./CommunityCard";

vi.mock("@/lib/cms/image", () => ({
  getCmsImageUrl: vi.fn(() => null),
}));

const baseItem: CommunityItem = {
  _type: "communityItem",
  title: "Workshop — Details coming soon",
  slug: { current: "workshop-details-coming-soon" },
  type: "workshop",
  summary: "A generic workshop summary.",
  body: [],
  isPlaceholder: true,
  seo: { title: "", description: "" },
};

describe("CommunityCard", () => {
  it("renders the type label, title, and summary", () => {
    render(<CommunityCard item={baseItem} />);

    expect(screen.getByText("Workshop")).toBeInTheDocument();
    expect(screen.getByText(baseItem.title)).toBeInTheDocument();
    expect(screen.getByText(baseItem.summary)).toBeInTheDocument();
  });

  it("shows a Coming soon badge for placeholder items", () => {
    render(<CommunityCard item={baseItem} />);

    expect(screen.getByText("Coming soon")).toBeInTheDocument();
  });

  it("hides the badge for published items", () => {
    render(<CommunityCard item={{ ...baseItem, isPlaceholder: false }} />);

    expect(screen.queryByText("Coming soon")).not.toBeInTheDocument();
  });

  it("formats and displays a valid date", () => {
    render(<CommunityCard item={{ ...baseItem, date: "2026-03-15" }} />);

    expect(screen.getByText(/March 15, 2026/)).toBeInTheDocument();
  });

  it("omits the date entirely when unset", () => {
    render(<CommunityCard item={baseItem} />);

    expect(screen.queryByText(/·/)).not.toBeInTheDocument();
  });

  it("renders the location when present", () => {
    render(<CommunityCard item={{ ...baseItem, location: "Biñan City, Laguna" }} />);

    expect(screen.getByText("Biñan City, Laguna")).toBeInTheDocument();
  });

  it("renders an external link only when externalUrl is set", () => {
    const { rerender } = render(<CommunityCard item={baseItem} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();

    rerender(<CommunityCard item={{ ...baseItem, externalUrl: "https://example.com" }} />);
    expect(screen.getByRole("link", { name: /Learn more/ })).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });
});
