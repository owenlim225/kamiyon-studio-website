import { describe, expect, it } from "vitest";

import type { CommunityItem } from "@/lib/cms/types";
import { filterCommunityItemsByType, getAvailableTypes } from "./filter-by-type";

function makeItem(type: CommunityItem["type"]): CommunityItem {
  return {
    _type: "communityItem",
    title: `${type} item`,
    slug: { current: `${type}-item` },
    type,
    summary: "",
    body: [],
    isPlaceholder: true,
    seo: { title: `${type} item`, description: "" },
  };
}

describe("getAvailableTypes", () => {
  it("returns an empty array when there are no items", () => {
    expect(getAvailableTypes([])).toEqual([]);
  });

  it("deduplicates types repeated across multiple items", () => {
    const items = [makeItem("workshop"), makeItem("hackathon"), makeItem("workshop")];

    expect(getAvailableTypes(items)).toEqual(["workshop", "hackathon"]);
  });

  it("preserves first-seen order across items", () => {
    const items = [makeItem("partnership"), makeItem("workshop"), makeItem("partnership")];

    expect(getAvailableTypes(items)).toEqual(["partnership", "workshop"]);
  });
});

describe("filterCommunityItemsByType", () => {
  it("returns all items when the filter is 'all'", () => {
    const items = [makeItem("workshop"), makeItem("hackathon")];

    expect(filterCommunityItemsByType(items, "all")).toEqual(items);
  });

  it("returns only items matching the given type", () => {
    const workshop = makeItem("workshop");
    const hackathon = makeItem("hackathon");

    expect(filterCommunityItemsByType([workshop, hackathon], "workshop")).toEqual([
      workshop,
    ]);
  });

  it("returns an empty array when no items match the type", () => {
    expect(filterCommunityItemsByType([makeItem("workshop")], "game-jam")).toEqual([]);
  });
});
