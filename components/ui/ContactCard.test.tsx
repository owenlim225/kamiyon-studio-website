import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContactCard } from "./ContactCard";

describe("ContactCard", () => {
  it("renders a real channel as a mailto link", () => {
    render(
      <ContactCard
        channel={{ type: "email", label: "Email", value: "hello@kamiyon.studio" }}
      />
    );

    const link = screen.getByRole("link", { name: /Email/ });
    expect(link).toHaveAttribute("href", "mailto:hello@kamiyon.studio");
    expect(link).not.toHaveAttribute("target");
  });

  it("renders a real Facebook/LinkedIn channel as an external link with rel/target", () => {
    render(
      <ContactCard
        channel={{ type: "facebook", label: "Facebook", value: "https://facebook.com/kamiyon" }}
      />
    );

    const link = screen.getByRole("link", { name: /Facebook/ });
    expect(link).toHaveAttribute("href", "https://facebook.com/kamiyon");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a placeholder channel as a non-interactive disabled card, never a fake link", () => {
    render(
      <ContactCard
        channel={{ type: "linkedin", label: "LinkedIn", value: "#", isPlaceholder: true }}
      />
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
    const disabledCard = screen.getByText("LinkedIn").closest("[aria-disabled]");
    expect(disabledCard).toHaveAttribute("aria-disabled", "true");
  });

  it("falls back to the channel type label when no label is provided", () => {
    render(<ContactCard channel={{ type: "email", label: "", value: "hi@kamiyon.studio" }} />);

    expect(screen.getByText("Email")).toBeInTheDocument();
  });
});
