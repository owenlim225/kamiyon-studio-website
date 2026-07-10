import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useFadeIn", () => ({
  useFadeIn: () => ({ current: null }),
}));

import { AnimatedSection } from "./AnimatedSection";

describe("AnimatedSection", () => {
  it("renders children", () => {
    render(
      <AnimatedSection>
        <p>Fade content</p>
      </AnimatedSection>,
    );

    expect(screen.getByText("Fade content")).toBeInTheDocument();
  });

  it("forwards id for in-page anchors", () => {
    const { container } = render(
      <AnimatedSection id="fade-sections">
        <span>Anchored</span>
      </AnimatedSection>,
    );

    expect(container.querySelector("#fade-sections")).toBeTruthy();
  });
});
