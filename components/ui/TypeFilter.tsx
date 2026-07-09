import { getCommunityTypeLabel } from "@/lib/community/type-labels";
import type { CommunityItemType } from "@/lib/cms/types";

type TypeFilterValue = CommunityItemType | "all";

type TypeFilterProps = {
  types: CommunityItemType[];
  activeType: TypeFilterValue;
  onSelect: (type: TypeFilterValue) => void;
};

function chipClasses(isActive: boolean): string {
  const base =
    "inline-flex min-h-11 items-center rounded-[var(--radius-pill)] border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-offset-2";

  return isActive
    ? `${base} border-sakura bg-sakura text-[var(--text-on-accent)]`
    : `${base} border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]`;
}

/** Presentational filter chips; state lives in the client-component parent (CommunityFeed). */
export function TypeFilter({ types, activeType, onSelect }: TypeFilterProps) {
  return (
    <div role="group" aria-label="Filter community updates by type" className="flex flex-wrap gap-2">
      <button
        type="button"
        aria-pressed={activeType === "all"}
        onClick={() => onSelect("all")}
        className={chipClasses(activeType === "all")}
      >
        All
      </button>
      {types.map((type) => (
        <button
          key={type}
          type="button"
          aria-pressed={activeType === type}
          onClick={() => onSelect(type)}
          className={chipClasses(activeType === type)}
        >
          {getCommunityTypeLabel(type)}
        </button>
      ))}
    </div>
  );
}
