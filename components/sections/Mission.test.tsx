import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { HomeMission } from "@/lib/cms/types";
import { Mission } from "./Mission";

describe("Mission", () => {
  it("renders the mission title and body", () => {
    const mission: HomeMission = {
      _type: "mission",
      title: "Our mission",
      body: "Create, play, and inspire through interactive experiences.",
    };

    render(<Mission mission={mission} />);

    expect(screen.getByRole("heading", { name: "Our mission" })).toBeInTheDocument();
    expect(screen.getByText(mission.body)).toBeInTheDocument();
  });
});
