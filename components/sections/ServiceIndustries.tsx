import { getUniqueIndustries } from "@/lib/services/related-industries";
import type { Service } from "@/lib/cms/types";

type ServiceIndustriesProps = {
  services: Service[];
};

export function ServiceIndustries({ services }: ServiceIndustriesProps) {
  const industries = getUniqueIndustries(services);

  if (industries.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[var(--radius-card-lg)] border border-[var(--border-default)] bg-[var(--bg-secondary)] p-8 text-center">
      <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
        Industries we work with
      </h2>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {industries.map((industry) => (
          <span
            key={industry}
            className="rounded-[var(--radius-pill)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-2 text-sm text-[var(--text-secondary)]"
          >
            {industry}
          </span>
        ))}
      </div>
    </div>
  );
}
