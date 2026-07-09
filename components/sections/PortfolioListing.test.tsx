import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { CaseStudy } from "@/lib/cms/types";
import { PortfolioListing } from "./PortfolioListing";

vi.mock("@/lib/cms/image", () => ({
  getCmsImageUrl: vi.fn(() => null),
}));

const caseStudy: CaseStudy = {
  _type: "caseStudy",
  title: "Sample Client Project — Placeholder",
  slug: { current: "sample-client-project-placeholder" },
  clientName: "TBD",
  industry: "Education",
  challenge: "",
  solution: "",
  impact: "",
  gallery: [],
  featured: false,
  isPlaceholder: true,
  seo: { title: "", description: "" },
};

describe("PortfolioListing", () => {
  it("renders a ProjectCard per case study", () => {
    render(<PortfolioListing caseStudies={[caseStudy]} />);

    expect(screen.getByRole("link", { name: /Sample Client Project/ })).toHaveAttribute(
      "href",
      "/portfolio/sample-client-project-placeholder"
    );
  });

  it("renders the EmptyState when there are no case studies", () => {
    render(<PortfolioListing caseStudies={[]} />);

    expect(screen.getByText("Projects coming soon.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
  });
});
