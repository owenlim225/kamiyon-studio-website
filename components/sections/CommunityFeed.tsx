"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { CommunityCard } from "@/components/ui/CommunityCard";
import { TypeFilter } from "@/components/ui/TypeFilter";
import { filterCommunityItemsByType, getAvailableTypes } from "@/lib/community/filter-by-type";
import type { CommunityItem, CommunityItemType } from "@/lib/cms/types";
import { EmptyState } from "./EmptyState";

type CommunityFeedProps = {
  items: CommunityItem[];
};

export function CommunityFeed({ items }: CommunityFeedProps) {
  const availableTypes = useMemo(() => getAvailableTypes(items), [items]);
  const [activeType, setActiveType] = useState<CommunityItemType | "all">("all");
  const filteredItems = useMemo(
    () => filterCommunityItemsByType(items, activeType),
    [items, activeType]
  );

  return (
    <section className="bg-[var(--bg-primary)] py-16 md:py-24">
      <Container>
        <div className="max-w-[680px]">
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            Community
          </h1>
          <p className="mt-4 text-base text-[var(--text-secondary)] md:text-lg">
            Kamiyon gives back through mentorship, workshops, hackathons, game
            jams, speaking engagements, educational initiatives, and
            partnerships with organizations that share our values.
          </p>
        </div>

        {availableTypes.length > 0 ? (
          <div className="mt-8">
            <TypeFilter
              types={availableTypes}
              activeType={activeType}
              onSelect={setActiveType}
            />
          </div>
        ) : null}

        {filteredItems.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <CommunityCard key={item.slug.current} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState
              message="No community updates match this filter yet."
              backHref="/"
              backLabel="Back to home"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
