import type { Service } from "@/lib/cms/types";

/** Deduplicated, first-seen-order list of industries referenced across services. */
export function getUniqueIndustries(services: Service[]): string[] {
  const seen = new Set<string>();
  const industries: string[] = [];

  for (const service of services) {
    for (const industry of service.relatedIndustries) {
      if (!seen.has(industry)) {
        seen.add(industry);
        industries.push(industry);
      }
    }
  }

  return industries;
}
