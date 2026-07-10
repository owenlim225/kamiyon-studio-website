import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PageShell } from "./PageShell";

vi.mock("@/lib/cms/site-settings-content", () => ({
  getSiteSettingsContent: vi.fn(async () => ({
    _type: "siteSettings",
    siteName: "Kamiyon Studio",
    tagline: "Tagline",
    socialLinks: [],
    defaultSeo: {
      title: "Kamiyon Studio",
      description: "Description",
    },
    globalCtas: [{ label: "Get in touch", href: "/contact", variant: "secondary" }],
    footerText: "Create. Play. Inspire.",
  })),
}));

describe("PageShell", () => {
  it("renders a skip-to-content link targeting the main landmark", async () => {
    render(await PageShell({ children: <p>Page content</p> }));

    const skipLink = screen.getByRole("link", { name: "Skip to content" });
    expect(skipLink).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  it("renders children inside the main landmark", async () => {
    render(await PageShell({ children: <p>Page content</p> }));

    expect(screen.getByRole("main")).toContainElement(screen.getByText("Page content"));
  });

  it("renders the site header and footer around the content", async () => {
    render(await PageShell({ children: <p>Page content</p> }));

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
