import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { HomeHighlights } from "@/lib/cms/types";
import { Highlights } from "./Highlights";

describe("Highlights", () => {
  it("renders the section title and one card per highlight item", () => {
    const highlights: HomeHighlights = {
      _type: "highlights",
      title: "Why Kamiyon",
      items: [
        { title: "Education first", description: "We explain clearly." },
        { title: "Long-term thinking", description: "We build to last." },
      ],
    };

    render(<Highlights highlights={highlights} />);

    expect(screen.getByRole("heading", { name: "Why Kamiyon" })).toBeInTheDocument();
    expect(screen.getByText("Education first")).toBeInTheDocument();
    expect(screen.getByText("We explain clearly.")).toBeInTheDocument();
    expect(screen.getByText("Long-term thinking")).toBeInTheDocument();
    expect(screen.getByText("We build to last.")).toBeInTheDocument();
  });

  it("renders no cards when there are no highlight items", () => {
    const highlights: HomeHighlights = { _type: "highlights", title: "Why Kamiyon", items: [] };

    render(<Highlights highlights={highlights} />);

    expect(screen.getByRole("heading", { name: "Why Kamiyon" })).toBeInTheDocument();
  });
});
