import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Service, ServiceCategory } from "@/lib/cms/types";
import { ServiceDetail } from "./ServiceDetail";

const category: ServiceCategory = {
  _type: "serviceCategory",
  title: "Interactive Experience Development",
  slug: { current: "interactive-experience-development" },
  description: "",
  order: 1,
};

const baseService: Service = {
  _type: "service",
  title: "Game Development",
  slug: { current: "game-development" },
  categorySlug: category.slug.current,
  summary: "Full-cycle game development services.",
  body: [{ _type: "block", style: "normal", children: [{ _type: "span", text: "Body copy." }] }],
  outcomes: [],
  relatedIndustries: [],
  order: 1,
  isPlaceholder: false,
  seo: { title: "", description: "" },
};

describe("ServiceDetail", () => {
  it("renders the category eyebrow, title, summary, and body", () => {
    render(<ServiceDetail service={baseService} category={category} />);

    expect(screen.getByText(category.title)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: baseService.title })).toBeInTheDocument();
    expect(screen.getByText(baseService.summary)).toBeInTheDocument();
    expect(screen.getByText("Body copy.")).toBeInTheDocument();
  });

  it("omits the category eyebrow when no matching category is found", () => {
    render(<ServiceDetail service={baseService} />);

    expect(screen.queryByText(category.title)).not.toBeInTheDocument();
  });

  it("shows a Placeholder service badge only when isPlaceholder is true", () => {
    render(<ServiceDetail service={{ ...baseService, isPlaceholder: true }} category={category} />);

    expect(screen.getByText("Placeholder service")).toBeInTheDocument();
  });
});
