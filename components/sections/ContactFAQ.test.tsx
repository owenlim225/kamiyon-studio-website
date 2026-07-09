import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContactFAQ } from "./ContactFAQ";

describe("ContactFAQ", () => {
  it("renders the FAQ heading and accordion items when FAQ content exists", () => {
    render(<ContactFAQ faq={[{ question: "Is Kamiyon a game studio?", answer: "Yes." }]} />);

    expect(
      screen.getByRole("heading", { name: "Frequently asked questions" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Is Kamiyon a game studio?" })).toBeInTheDocument();
  });

  it("renders nothing when there is no FAQ content", () => {
    const { container } = render(<ContactFAQ faq={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
