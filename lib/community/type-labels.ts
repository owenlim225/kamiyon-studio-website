import type { CommunityItemType } from "@/lib/cms/types";

const COMMUNITY_TYPE_LABELS: Record<CommunityItemType, string> = {
  workshop: "Workshop",
  hackathon: "Hackathon",
  "game-jam": "Game Jam",
  speaking: "Speaking",
  education: "Education",
  partnership: "Partnership",
  other: "Other",
};

export function getCommunityTypeLabel(type: CommunityItemType): string {
  return COMMUNITY_TYPE_LABELS[type];
}
