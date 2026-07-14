import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HOME_SECTION_NAV } from "@/lib/home/section-nav";

import { HomeLineSidebar } from "./HomeLineSidebar";

vi.mock("@/components/ui/LineSidebar", () => ({
  LineSidebar: ({
    items,
    activeIndex,
    onItemClick,
  }: {
    items: readonly string[];
    activeIndex?: number | null;
    onItemClick?: (index: number, label: string) => void;
  }) => (
    <nav aria-label="Mock line sidebar">
      {items.map((label, index) => (
        <button
          key={label}
          type="button"
          aria-current={activeIndex === index ? "true" : undefined}
          onClick={() => onItemClick?.(index, label)}
        >
          {label}
        </button>
      ))}
    </nav>
  ),
}));

class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

describe("HomeLineSidebar", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

    document.body.innerHTML = HOME_SECTION_NAV.map(
      ({ id }) => `<section id="${id}"></section>`
    ).join("");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders section navigation labels", () => {
    render(<HomeLineSidebar />);

    for (const { label } of HOME_SECTION_NAV) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    }
  });

  it("scrolls to the matching section on click", async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.fn();

    const servicesSection = document.getElementById("home-services");
    expect(servicesSection).not.toBeNull();
    servicesSection!.scrollIntoView = scrollIntoView;

    render(<HomeLineSidebar />);

    await user.click(screen.getByRole("button", { name: "Services" }));

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });
});
