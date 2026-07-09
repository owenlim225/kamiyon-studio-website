import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContactSidebar } from "./ContactSidebar";

describe("ContactSidebar", () => {
  it("renders only canon studio facts (founded year and location)", () => {
    render(<ContactSidebar />);

    expect(screen.getByText("Founded")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Based in")).toBeInTheDocument();
    expect(screen.getByText("Biñan City, Laguna, Philippines")).toBeInTheDocument();
  });
});
