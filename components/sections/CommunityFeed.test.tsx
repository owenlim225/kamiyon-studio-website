import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { CommunityItem } from "@/lib/cms/types";
import { CommunityFeed } from "./CommunityFeed";

vi.mock("@/lib/cms/image", () => ({
  getCmsImageUrl: vi.fn(() => null),
}));

const items: CommunityItem[] = [
  {
    _type: "communityItem",
    title: "Workshop — Details coming soon",
    slug: { current: "workshop-details-coming-soon" },
    type: "workshop",
    summary: "A generic workshop summary.",
    body: [],
    isPlaceholder: true,
    seo: { title: "", description: "" },
  },
  {
    _type: "communityItem",
    title: "Partnership — Details coming soon",
    slug: { current: "partnership-details-coming-soon" },
    type: "partnership",
    summary: "A generic partnership summary.",
    body: [],
    isPlaceholder: true,
    seo: { title: "", description: "" },
  },
];

describe("CommunityFeed", () => {
  it("renders every item under the 'all' filter by default", () => {
    render(<CommunityFeed items={items} />);

    expect(screen.getByText("Workshop — Details coming soon")).toBeInTheDocument();
    expect(screen.getByText("Partnership — Details coming soon")).toBeInTheDocument();
  });

  it("filters the visible cards when a type chip is clicked", async () => {
    const user = userEvent.setup();
    render(<CommunityFeed items={items} />);

    await user.click(screen.getByRole("button", { name: "Workshop" }));

    expect(screen.getByText("Workshop — Details coming soon")).toBeInTheDocument();
    expect(screen.queryByText("Partnership — Details coming soon")).not.toBeInTheDocument();
  });

  it("marks the clicked filter chip as active and switches back to All", async () => {
    const user = userEvent.setup();
    render(<CommunityFeed items={items} />);

    await user.click(screen.getByRole("button", { name: "Partnership" }));
    expect(screen.getByRole("button", { name: "Partnership" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    await user.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByText("Workshop — Details coming soon")).toBeInTheDocument();
    expect(screen.getByText("Partnership — Details coming soon")).toBeInTheDocument();
  });

  it("hides the type filter entirely when there are no items", () => {
    render(<CommunityFeed items={[]} />);

    expect(screen.queryByRole("group")).not.toBeInTheDocument();
    expect(screen.getByText("No community updates match this filter yet.")).toBeInTheDocument();
  });
});
