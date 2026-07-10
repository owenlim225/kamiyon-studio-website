import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ServicesCarousel, type ServiceCarouselSlide } from "./ServicesCarousel";

const slides: ServiceCarouselSlide[] = [
  {
    id: "interactive",
    eyebrow: "Interactive Experience",
    title: "Interactive Experience Development",
    summary: "Games, learning experiences, simulations, and prototypes.",
    exploreHref: "/services/interactive-experience-development",
  },
  {
    id: "software",
    eyebrow: "Software",
    title: "Software Development",
    summary: "Modern digital products with usability and scalability.",
    exploreHref: "/services/software-development",
  },
  {
    id: "creative",
    eyebrow: "Creative",
    title: "Creative & Design Services",
    summary: "Multidisciplinary creative services for strong visual communication.",
    exploreHref: "/services/creative-design-services",
  },
];

describe("ServicesCarousel", () => {
  it("renders nothing when slides is empty", () => {
    const { container } = render(<ServicesCarousel slides={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders the first slide content and explore CTA by default", () => {
    render(<ServicesCarousel slides={slides} />);

    expect(screen.getByText("Interactive Experience")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: slides[0].title })
    ).toBeInTheDocument();
    expect(screen.getByText(slides[0].summary)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore" })).toHaveAttribute(
      "href",
      slides[0].exploreHref
    );
  });

  it("exposes carousel region semantics with a labelled tab list", () => {
    render(<ServicesCarousel slides={slides} />);

    expect(screen.getByRole("region", { name: "Service categories" })).toBeInTheDocument();
    expect(screen.getByRole("tablist", { name: "Service category slides" })).toBeInTheDocument();
  });

  it("marks the first tab as selected by default", () => {
    render(<ServicesCarousel slides={slides} />);

    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("aria-selected", "false");
    expect(tabs[2]).toHaveAttribute("aria-selected", "false");
  });

  it("switches slides when a tab is clicked", async () => {
    const user = userEvent.setup();
    render(<ServicesCarousel slides={slides} />);

    await user.click(screen.getByRole("tab", { name: slides[1].title }));

    expect(
      screen.getByRole("heading", { level: 2, name: slides[1].title })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore" })).toHaveAttribute(
      "href",
      slides[1].exploreHref
    );
    expect(screen.getByRole("tab", { name: slides[1].title })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("advances to the next slide via the next control", async () => {
    const user = userEvent.setup();
    render(<ServicesCarousel slides={slides} />);

    await user.click(screen.getByRole("button", { name: "Next service category" }));

    expect(
      screen.getByRole("heading", { level: 2, name: slides[1].title })
    ).toBeInTheDocument();
  });

  it("moves to the previous slide via the previous control", async () => {
    const user = userEvent.setup();
    render(<ServicesCarousel slides={slides} />);

    await user.click(screen.getByRole("button", { name: "Previous service category" }));

    expect(
      screen.getByRole("heading", { level: 2, name: slides[2].title })
    ).toBeInTheDocument();
  });

  it("navigates with arrow keys when the carousel is focused", async () => {
    const user = userEvent.setup();
    render(<ServicesCarousel slides={slides} />);

    const carousel = screen.getByRole("region", { name: "Service categories" });
    carousel.focus();

    await user.keyboard("{ArrowRight}");
    expect(
      screen.getByRole("heading", { level: 2, name: slides[1].title })
    ).toBeInTheDocument();

    await user.keyboard("{ArrowLeft}");
    expect(
      screen.getByRole("heading", { level: 2, name: slides[0].title })
    ).toBeInTheDocument();
  });

  it("renders progress indicators for each slide", () => {
    render(<ServicesCarousel slides={slides} />);

    const tablist = screen.getByRole("tablist", { name: "Service category slides" });
    const tabs = within(tablist).getAllByRole("tab");

    expect(tabs).toHaveLength(slides.length);
    slides.forEach((slide) => {
      expect(screen.getByRole("tab", { name: slide.title })).toBeInTheDocument();
    });
  });

  it("applies reduced-motion-safe transition classes on slides", () => {
    render(<ServicesCarousel slides={slides} />);

    const panels = screen.getAllByRole("tabpanel", { hidden: true });
    panels.forEach((panel) => {
      expect(panel.className).toMatch(/motion-reduce:transition-none/);
    });
  });
});
