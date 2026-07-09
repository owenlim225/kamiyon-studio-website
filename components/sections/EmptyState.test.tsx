import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders the message and a back link", () => {
    render(
      <EmptyState
        message="No community updates match this filter yet."
        backHref="/"
        backLabel="Back to home"
      />
    );

    expect(
      screen.getByText("No community updates match this filter yet.")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
  });
});
