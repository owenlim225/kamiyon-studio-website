import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { homePageFallback } from "@/lib/cms/fallbacks/home";
import { HomeContact } from "./HomeContact";

const ctaBanner = homePageFallback.blocks.find((block) => block._type === "ctaBanner");

if (!ctaBanner || ctaBanner._type !== "ctaBanner") {
  throw new Error("Expected homePageFallback to include a ctaBanner block");
}

const defaultProps = {
  heading: ctaBanner.title,
  body: ctaBanner.body,
  ctaLabel: ctaBanner.ctaLabel,
  ctaHref: ctaBanner.ctaHref,
};

describe("HomeContact", () => {
  it("renders the heading, body, and ghost CTA link", () => {
    render(<HomeContact {...defaultProps} />);

    expect(screen.getByRole("heading", { name: defaultProps.heading })).toBeInTheDocument();
    expect(screen.getByText(defaultProps.body)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: defaultProps.ctaLabel })).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("does not render a contact form or input fields", () => {
    render(<HomeContact {...defaultProps} />);

    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /submit/i })).not.toBeInTheDocument();
  });

  it("renders the default atmospheric visual when visualSrc is omitted", () => {
    const { container } = render(<HomeContact {...defaultProps} />);

    expect(container.querySelector("img")?.getAttribute("src")).toContain("background.png");
  });

  it("renders a custom atmospheric visual when visualSrc is provided", () => {
    const { container } = render(
      <HomeContact {...defaultProps} visualSrc="/assets/youtube-banner.png" />
    );

    expect(container.querySelector("img")?.getAttribute("src")).toContain("youtube-banner.png");
  });

  it("exposes an accessible section landmark", () => {
    render(<HomeContact {...defaultProps} />);

    expect(screen.getByRole("region", { name: defaultProps.heading })).toBeInTheDocument();
  });
});
