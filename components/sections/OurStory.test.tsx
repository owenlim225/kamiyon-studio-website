import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { OurStory } from "./OurStory";

describe("OurStory", () => {
  it("renders one card per story section", () => {
    render(
      <OurStory
        storySections={[
          { title: "How we started", body: "Founded in 2024." },
          { title: "Where we're headed", body: "Building original IP." },
        ]}
      />
    );

    expect(screen.getByText("How we started")).toBeInTheDocument();
    expect(screen.getByText("Founded in 2024.")).toBeInTheDocument();
    expect(screen.getByText("Where we're headed")).toBeInTheDocument();
  });

  it("renders nothing when there are no story sections", () => {
    const { container } = render(<OurStory storySections={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
