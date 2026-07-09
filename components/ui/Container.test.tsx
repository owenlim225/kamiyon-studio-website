import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Container } from "./Container";

describe("Container", () => {
  it("renders children inside a div by default", () => {
    render(<Container>Content</Container>);

    const container = screen.getByText("Content");
    expect(container.tagName).toBe("DIV");
  });

  it("renders as the given semantic element when 'as' is provided", () => {
    render(<Container as="section">Section content</Container>);

    expect(screen.getByText("Section content").tagName).toBe("SECTION");
  });

  it("merges a custom className with the base container classes", () => {
    render(<Container className="text-center">Content</Container>);

    expect(screen.getByText("Content").className).toContain("text-center");
    expect(screen.getByText("Content").className).toContain("max-w-7xl");
  });
});
