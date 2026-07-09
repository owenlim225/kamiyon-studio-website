import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Service } from "@/lib/cms/types";
import { ServiceIndustries } from "./ServiceIndustries";

function makeService(overrides: Partial<Service>): Service {
  return {
    _type: "service",
    title: "Service",
    slug: { current: "service" },
    categorySlug: "category",
    summary: "",
    body: [],
    outcomes: [],
    relatedIndustries: [],
    order: 1,
    isPlaceholder: false,
    seo: { title: "", description: "" },
    ...overrides,
  };
}

describe("ServiceIndustries", () => {
  it("renders deduplicated industries across all services", () => {
    render(
      <ServiceIndustries
        services={[
          makeService({ relatedIndustries: ["Education", "Web3"] }),
          makeService({ relatedIndustries: ["Education", "Gamification"] }),
        ]}
      />
    );

    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Web3")).toBeInTheDocument();
    expect(screen.getByText("Gamification")).toBeInTheDocument();
  });

  it("renders nothing when no services have related industries", () => {
    const { container } = render(<ServiceIndustries services={[makeService({})]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
