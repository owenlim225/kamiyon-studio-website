import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { TeamMember } from "@/lib/cms/types";
import { TeamGrid } from "./TeamGrid";

vi.mock("@/lib/cms/image", () => ({
  getCmsImageUrl: vi.fn(() => null),
}));

const members: TeamMember[] = [
  { _type: "teamMember", name: "Jane Dela Cruz", role: "Founder", bio: "", order: 1, isPlaceholder: false },
  { _type: "teamMember", name: "Sam Reyes", role: "Lead Designer", bio: "", order: 2, isPlaceholder: false },
];

describe("TeamGrid", () => {
  it("renders one TeamMemberCard per team member", () => {
    render(<TeamGrid teamMembers={members} />);

    expect(screen.getByText("Jane Dela Cruz")).toBeInTheDocument();
    expect(screen.getByText("Founder")).toBeInTheDocument();
    expect(screen.getByText("Sam Reyes")).toBeInTheDocument();
    expect(screen.getByText("Lead Designer")).toBeInTheDocument();
  });

  it("renders the team intro copy only when provided", () => {
    const { rerender } = render(<TeamGrid teamMembers={members} />);
    expect(screen.queryByText("A word from the team")).not.toBeInTheDocument();

    rerender(<TeamGrid teamMembers={members} teamIntro="A word from the team" />);
    expect(screen.getByText("A word from the team")).toBeInTheDocument();
  });

  it("sets the #team anchor id for in-page navigation", () => {
    const { container } = render(<TeamGrid teamMembers={members} />);

    expect(container.querySelector("#team")).not.toBeNull();
  });
});
