import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("framer-motion", () => ({
  motion: {
    span: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
    }) => <span {...props}>{children}</span>,
  },
  useReducedMotion: () => false,
}));

import { MotionButton } from "./MotionButton";

describe("MotionButton", () => {
  it("renders the underlying Button link", () => {
    render(<MotionButton href="/contact">Talk with Kamiyon</MotionButton>);

    expect(
      screen.getByRole("link", { name: "Talk with Kamiyon" }),
    ).toHaveAttribute("href", "/contact");
  });
});
