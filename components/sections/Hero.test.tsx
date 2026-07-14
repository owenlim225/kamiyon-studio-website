import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Hero } from "./Hero";

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

describe("Hero", () => {
  it("renders centered KAMIYON STUDIO title only", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { level: 1, name: "KAMIYON STUDIO" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Kamiyon")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Explore/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Featured work" })).not.toBeInTheDocument();
  });

  it("does not render corner portfolio/contact labels", () => {
    render(<Hero />);

    expect(screen.queryByText("ccoonnttaaccttss")).not.toBeInTheDocument();
    expect(screen.queryByText("ppoorrttffoolliioo")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Contacts" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Portfolio" })).not.toBeInTheDocument();
  });

  it("uses a full-bleed stage image instead of a CMS inset card", () => {
    const { container } = render(<Hero />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("relative");

    const background = container.querySelector('img[src*="background.png"]');
    expect(background).toBeInTheDocument();

    expect(container.querySelector('[class*="rounded-[var(--radius-card-lg)]"]')).not.toBeInTheDocument();
  });

  it("layers gradient scrims for text readability over the background", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector(".bg-gradient-to-b")).toBeInTheDocument();
    expect(container.querySelector(".bg-gradient-to-r")).toBeInTheDocument();
  });

  it("layers a parallax background wrapper and opening curtain", () => {
    const { container } = render(<Hero />);

    const background = container.querySelector('img[src*="background.png"]');
    expect(background).toBeInTheDocument();
    expect(background?.className).not.toMatch(/animate-hero-ken-burns/);

    const parallaxWrapper = background?.parentElement;
    expect(parallaxWrapper).toHaveClass("will-change-transform");
    expect(parallaxWrapper?.className).toMatch(/inset-\[-20%\]/);
    expect(container.querySelector("[data-opening-curtain]")).toBeInTheDocument();
  });
});
