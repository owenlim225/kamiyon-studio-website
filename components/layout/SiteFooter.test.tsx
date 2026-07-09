import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "./SiteFooter";

describe("SiteFooter", () => {
  it("renders the primary nav links under a 'Footer' nav landmark", () => {
    render(<SiteFooter />);

    const nav = screen.getByRole("navigation", { name: "Footer" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
  });

  it("renders placeholder social links as 'Coming soon' text, never a fake URL", () => {
    render(<SiteFooter />);

    expect(screen.getAllByText("(Coming soon)").length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: /Facebook/ })).not.toBeInTheDocument();
  });

  it("renders the studio motto and location", () => {
    render(<SiteFooter />);

    expect(screen.getByText("Create. Play. Inspire.")).toBeInTheDocument();
    expect(screen.getByText(/Biñan City, Laguna, Philippines/)).toBeInTheDocument();
  });

  it("renders the current year in the copyright line", () => {
    render(<SiteFooter />);

    expect(
      screen.getByText(new RegExp(`© ${new Date().getFullYear()} Kamiyon Studio`))
    ).toBeInTheDocument();
  });
});
