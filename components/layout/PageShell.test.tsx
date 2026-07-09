import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageShell } from "./PageShell";

describe("PageShell", () => {
  it("renders a skip-to-content link targeting the main landmark", () => {
    render(
      <PageShell>
        <p>Page content</p>
      </PageShell>
    );

    const skipLink = screen.getByRole("link", { name: "Skip to content" });
    expect(skipLink).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  it("renders children inside the main landmark", () => {
    render(
      <PageShell>
        <p>Page content</p>
      </PageShell>
    );

    expect(screen.getByRole("main")).toContainElement(screen.getByText("Page content"));
  });

  it("renders the site header and footer around the content", () => {
    render(
      <PageShell>
        <p>Page content</p>
      </PageShell>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
