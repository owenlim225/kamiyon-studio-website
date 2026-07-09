import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ValuesGrid } from "./ValuesGrid";

describe("ValuesGrid", () => {
  it("renders one card per core value with an anchor id for in-page navigation", () => {
    const { container } = render(
      <ValuesGrid
        values={[
          { name: "Curiosity", description: "We ask questions." },
          { name: "Education", description: "We explain clearly." },
        ]}
      />
    );

    expect(screen.getByText("Curiosity")).toBeInTheDocument();
    expect(screen.getByText("We ask questions.")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(container.querySelector("#values")).not.toBeNull();
  });
});
