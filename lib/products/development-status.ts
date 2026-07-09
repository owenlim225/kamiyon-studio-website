import type { ProductDevelopmentStatus } from "@/lib/cms/types";

const DEVELOPMENT_STATUS_LABELS: Record<ProductDevelopmentStatus, string> = {
  "in-development": "In development",
  prototype: "Prototype",
  released: "Released",
  tbd: "Status: TBD",
};

export function getDevelopmentStatusLabel(status: ProductDevelopmentStatus): string {
  return DEVELOPMENT_STATUS_LABELS[status];
}
