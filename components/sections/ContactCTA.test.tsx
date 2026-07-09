import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { HomeCtaBanner } from "@/lib/cms/types";
import { ContactCTA } from "./ContactCTA";

describe("ContactCTA", () => {
  it("renders title, body, CTA button, and secondary link", () => {
    const ctaBanner: HomeCtaBanner = {
      _type: "ctaBanner",
      title: "Let's build something",
      body: "Reach out to discuss your next project.",
      ctaLabel: "Contact us",
      ctaHref: "/contact",
    };

    render(<ContactCTA ctaBanner={ctaBanner} />);

    expect(screen.getByRole("heading", { name: ctaBanner.title })).toBeInTheDocument();
    expect(screen.getByText(ctaBanner.body)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact us" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "View our work" })).toHaveAttribute(
      "href",
      "/portfolio"
    );
  });
});
