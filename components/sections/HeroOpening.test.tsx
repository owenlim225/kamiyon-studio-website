import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HeroOpening } from "./HeroOpening";

vi.mock("@/hooks/useOpeningAnimation", () => ({
  useOpeningAnimation: () => ({ current: null }),
}));

vi.mock("@/hooks/useParallax", () => ({
  useParallax: () => ({ current: null }),
}));

vi.mock("@/components/ui/SplitText", () => ({
  SplitText: ({
    text,
    tag: Tag = "p",
    className,
  }: {
    text: string;
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
    className?: string;
  }) => <Tag className={className}>{text}</Tag>,
}));

describe("HeroOpening", () => {
  it("renders only the KAMIYON STUDIO title", () => {
    render(<HeroOpening />);

    expect(
      screen.getByRole("heading", { level: 1, name: "KAMIYON STUDIO" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Kamiyon")).not.toBeInTheDocument();
    expect(screen.queryByText(/Meaningful interactive/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /services/i })).not.toBeInTheDocument();
  });

  it("does not render doubled corner labels or featured work list", () => {
    render(<HeroOpening />);

    expect(screen.queryByText("ccoonnttaaccttss")).not.toBeInTheDocument();
    expect(screen.queryByText("ppoorrttffoolliioo")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Contacts" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Portfolio" })).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Featured work" })).not.toBeInTheDocument();
    expect(screen.queryByText("Eclipse")).not.toBeInTheDocument();
  });

  it("includes a curtain layer and parallax background wrapper", () => {
    const { container } = render(<HeroOpening />);

    expect(container.querySelector("[data-opening-curtain]")).toBeInTheDocument();

    const stage = container.querySelector('img[src*="background.png"]');
    expect(stage).toBeInTheDocument();
    expect(stage?.className).not.toMatch(/animate-hero-ken-burns/);

    const parallaxWrapper = stage?.parentElement;
    expect(parallaxWrapper).toHaveClass("will-change-transform");
    expect(parallaxWrapper?.className).toMatch(/inset-\[-20%\]/);
  });
});
