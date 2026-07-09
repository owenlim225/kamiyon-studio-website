import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TypeFilter } from "./TypeFilter";

describe("TypeFilter", () => {
  it("renders an 'All' chip plus one chip per available type only (no empty categories)", () => {
    render(
      <TypeFilter types={["workshop", "partnership"]} activeType="all" onSelect={vi.fn()} />
    );

    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Workshop" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Partnership" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Hackathon" })).not.toBeInTheDocument();
  });

  it("marks the active chip with aria-pressed=true and others false", () => {
    render(<TypeFilter types={["workshop"]} activeType="workshop" onSelect={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Workshop" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onSelect with the clicked type", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<TypeFilter types={["workshop"]} activeType="all" onSelect={onSelect} />);

    await user.click(screen.getByRole("button", { name: "Workshop" }));

    expect(onSelect).toHaveBeenCalledWith("workshop");
  });

  it("calls onSelect with 'all' when the All chip is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<TypeFilter types={["workshop"]} activeType="workshop" onSelect={onSelect} />);

    await user.click(screen.getByRole("button", { name: "All" }));

    expect(onSelect).toHaveBeenCalledWith("all");
  });
});
