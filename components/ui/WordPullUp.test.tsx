import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@gsap/react", () => ({
  useGSAP: () => undefined,
}));

vi.mock("@/lib/gsap", () => ({
  gsap: { set: vi.fn(), to: vi.fn(() => ({ play: vi.fn() })) },
  ScrollTrigger: { create: vi.fn() },
}));

vi.mock("@/lib/motion/reduced-motion", () => ({
  prefersReducedMotion: () => true,
}));

import { WordPullUp } from "./WordPullUp";

describe("WordPullUp", () => {
  it("renders each word from the heading string", () => {
    render(
      <WordPullUp
        as="h2"
        words="Recent Projects"
        className="text-2xl"
      />,
    );

    const heading = screen.getByRole("heading", {
      level: 2,
      name: /Recent Projects/,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-2xl");
  });

  it("forwards id for aria-labelledby targets", () => {
    render(<WordPullUp as="h2" id="section-heading" words="What we build" />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute(
      "id",
      "section-heading",
    );
  });

  it("preserves word spacing in heading text", () => {
    render(<WordPullUp as="h1" words="Create  Play" startOnView={false} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toMatch(/Create\s+Play/);
  });
});
