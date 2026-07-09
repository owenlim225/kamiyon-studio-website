import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Service } from "@/lib/cms/types";
import { ServiceCard } from "./ServiceCard";

const baseService: Service = {
  _type: "service",
  title: "Game Development",
  slug: { current: "game-development" },
  categorySlug: "interactive-experience-development",
  summary: "Full-cycle game development services.",
  body: [],
  outcomes: [],
  relatedIndustries: [],
  icon: "gamepad",
  order: 1,
  isPlaceholder: false,
  seo: { title: "", description: "" },
};

describe("ServiceCard", () => {
  it("links to the service detail route", () => {
    render(<ServiceCard service={baseService} />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/services/game-development");
  });

  it("renders the mapped icon glyph for a known icon key", () => {
    render(<ServiceCard service={baseService} />);

    expect(screen.getByText("🎮")).toBeInTheDocument();
  });

  it("falls back to a generic glyph for an unrecognized icon key", () => {
    render(<ServiceCard service={{ ...baseService, icon: "not-a-real-icon" }} />);

    expect(screen.getByText("✦")).toBeInTheDocument();
  });

  it("falls back to a generic glyph when no icon is set", () => {
    render(<ServiceCard service={{ ...baseService, icon: undefined }} />);

    expect(screen.getByText("✦")).toBeInTheDocument();
  });

  it("shows a Placeholder badge only when isPlaceholder is true", () => {
    render(<ServiceCard service={{ ...baseService, isPlaceholder: true }} />);

    expect(screen.getByText("Placeholder")).toBeInTheDocument();
  });

  it("renders title and summary", () => {
    render(<ServiceCard service={baseService} />);

    expect(screen.getByText("Game Development")).toBeInTheDocument();
    expect(screen.getByText("Full-cycle game development services.")).toBeInTheDocument();
  });
});
