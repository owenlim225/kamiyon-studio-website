import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { LineSidebar } from "./LineSidebar";

describe("LineSidebar", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn(() => 1)
    );
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders numbered section labels", () => {
    render(<LineSidebar items={["Hero", "Partners"]} defaultActive={0} />);

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Hero")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("Partners")).toBeInTheDocument();
  });

  it("calls onItemClick with index and label", async () => {
    const user = userEvent.setup();
    const onItemClick = vi.fn();

    render(
      <LineSidebar
        items={["Hero", "Partners"]}
        defaultActive={0}
        onItemClick={onItemClick}
      />
    );

    await user.click(screen.getByText("Partners"));

    expect(onItemClick).toHaveBeenCalledWith(1, "Partners");
  });

  it("marks the active item with aria-current", () => {
    render(
      <LineSidebar items={["Hero", "Partners"]} activeIndex={1} showIndex />
    );

    const partnersItem = screen.getByText("Partners").closest("li");
    expect(partnersItem).toHaveAttribute("aria-current", "true");
  });
});
