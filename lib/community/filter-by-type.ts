import type { CommunityItem, CommunityItemType } from "@/lib/cms/types";

/** Deduplicated, first-seen-order list of types actually present in the given items. */
export function getAvailableTypes(items: CommunityItem[]): CommunityItemType[] {
  const seen = new Set<CommunityItemType>();
  const types: CommunityItemType[] = [];

  for (const item of items) {
    if (!seen.has(item.type)) {
      seen.add(item.type);
      types.push(item.type);
    }
  }

  return types;
}

/** Filters items by type; "all" is a pass-through (used as the default filter state). */
export function filterCommunityItemsByType(
  items: CommunityItem[],
  type: CommunityItemType | "all"
): CommunityItem[] {
  if (type === "all") {
    return items;
  }

  return items.filter((item) => item.type === type);
}
