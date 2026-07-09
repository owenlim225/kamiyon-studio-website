import type { Metadata } from "next";

import { CommunityFeed } from "@/components/sections/CommunityFeed";
import { communityItemsFallback, resolveWithFallback } from "@/lib/cms/fallbacks";
import { getCommunityItems } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Community",
  description:
    "See how Kamiyon Studio gives back through workshops, hackathons, game jams, speaking engagements, educational initiatives, and partnerships.",
};

export default async function CommunityPage() {
  const items = resolveWithFallback(await getCommunityItems(), communityItemsFallback);

  return <CommunityFeed items={items} />;
}
