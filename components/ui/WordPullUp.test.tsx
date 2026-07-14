import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("framer-motion", () => {
  const Passthrough = ({
    children,
    ...props
  }: {
    children?: React.ReactNode;
    className?: string;
    id?: string;
  }) => (
    <span {...props}>{children}</span>
  );

  return {
    motion: {
      h1: ({
        children,
        ...props
      }: {
        children?: React.ReactNode;
        className?: string;
        id?: string;
      }) => <h1 {...props}>{children}</h1>,
      h2: ({
        children,
        ...props
      }: {
        children?: React.ReactNode;
        className?: string;
        id?: string;
      }) => <h2 {...props}>{children}</h2>,
      span: Passthrough,
    },
    useReducedMotion: () => false,
  };
});

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

  it("preserves empty-word slots so double spaces do not collapse", () => {
    render(<WordPullUp as="h1" words="Create  Play" startOnView={false} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Create");
    expect(heading.textContent).toContain("Play");
    expect(heading.querySelectorAll(":scope > span")).toHaveLength(3);
  });
});
