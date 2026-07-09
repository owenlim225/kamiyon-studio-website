import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CultureClosing } from "./CultureClosing";

describe("CultureClosing", () => {
  it("renders the culture summary and a contact CTA", () => {
    render(<CultureClosing cultureSummary="We build with curiosity and care." />);

    expect(screen.getByText("We build with curiosity and care.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "/contact");
  });
});
