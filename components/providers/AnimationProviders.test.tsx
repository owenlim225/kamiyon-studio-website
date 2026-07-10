import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("lenis/react", () => ({
  ReactLenis: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useLenis: () => undefined,
}));

vi.mock("lenis/dist/lenis.css", () => ({}));

import { AnimationProviders } from "./AnimationProviders";

describe("AnimationProviders", () => {
  it("mounts children without throwing", () => {
    render(
      <AnimationProviders>
        <p>Provider child</p>
      </AnimationProviders>,
    );

    expect(screen.getByText("Provider child")).toBeInTheDocument();
  });
});
