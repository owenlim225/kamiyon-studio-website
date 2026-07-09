import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { NavItem } from "@/lib/config/navigation";
import { MainNav } from "./MainNav";

const items: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

describe("MainNav", () => {
  it("renders a link per nav item under a labeled 'Primary' nav landmark", () => {
    render(<MainNav items={items} />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  });

  it("defaults to a vertical list layout", () => {
    render(<MainNav items={items} />);

    expect(screen.getByRole("list").className).toContain("flex-col");
  });

  it("switches to a horizontal list layout when orientation='horizontal'", () => {
    render(<MainNav items={items} orientation="horizontal" />);

    expect(screen.getByRole("list").className).toContain("items-center");
    expect(screen.getByRole("list").className).not.toContain("flex-col");
  });

  it("calls onNavigate when a link is clicked (used to close the mobile drawer)", async () => {
    const onNavigate = vi.fn();
    render(<MainNav items={items} onNavigate={onNavigate} />);

    screen.getByRole("link", { name: "Home" }).click();

    expect(onNavigate).toHaveBeenCalledTimes(1);
  });
});
