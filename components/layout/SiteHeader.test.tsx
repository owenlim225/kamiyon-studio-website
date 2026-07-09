import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("renders the logo and a primary nav landmark", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "Kamiyon Studio — Home" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
  });

  it("renders the mobile menu toggle collapsed by default", () => {
    render(<SiteHeader />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the mobile drawer nav when the toggle is clicked", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getAllByRole("navigation", { name: "Primary" })).toHaveLength(2);
  });

  it("closes the mobile drawer on Escape", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("renders the Contact CTA linking to /contact", () => {
    render(<SiteHeader />);

    expect(screen.getAllByRole("link", { name: "Get in touch" })[0]).toHaveAttribute(
      "href",
      "/contact"
    );
  });
});
