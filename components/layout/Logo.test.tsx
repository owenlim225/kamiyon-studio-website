import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Logo } from "./Logo";

describe("Logo", () => {
  it("links to the homepage with an accessible label", () => {
    render(<Logo />);

    expect(screen.getByRole("link", { name: "Kamiyon Studio — Home" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("renders the studio name as visible text", () => {
    render(<Logo />);

    expect(screen.getByText("Kamiyon Studio")).toBeInTheDocument();
  });
});
