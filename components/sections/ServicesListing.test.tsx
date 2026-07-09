import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Service, ServiceCategory } from "@/lib/cms/types";
import { ServicesListing } from "./ServicesListing";

const categories: ServiceCategory[] = [
  {
    _type: "serviceCategory",
    title: "Interactive Experience Development",
    slug: { current: "interactive-experience-development" },
    description: "Games and interactive experiences.",
    order: 1,
  },
  {
    _type: "serviceCategory",
    title: "Software Development",
    slug: { current: "software-development" },
    description: "Web and mobile apps.",
    order: 2,
  },
];

const services: Service[] = [
  {
    _type: "service",
    title: "Game Development",
    slug: { current: "game-development" },
    categorySlug: "interactive-experience-development",
    summary: "Full-cycle game development.",
    body: [],
    outcomes: [],
    relatedIndustries: ["Education"],
    order: 1,
    isPlaceholder: false,
    seo: { title: "", description: "" },
  },
];

describe("ServicesListing", () => {
  it("renders every category, even ones with zero matching services", () => {
    render(<ServicesListing categories={categories} services={services} />);

    expect(screen.getByText("Interactive Experience Development")).toBeInTheDocument();
    expect(screen.getByText("Software Development")).toBeInTheDocument();
    expect(screen.getByText("More services coming soon.")).toBeInTheDocument();
  });

  it("renders a service card for services matching a category", () => {
    render(<ServicesListing categories={categories} services={services} />);

    expect(screen.getByText("Game Development")).toBeInTheDocument();
  });

  it("renders the global industries callout from all services", () => {
    render(<ServicesListing categories={categories} services={services} />);

    expect(screen.getByText("Industries we work with")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
  });
});
