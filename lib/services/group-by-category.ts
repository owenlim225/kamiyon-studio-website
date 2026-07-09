import type { Service, ServiceCategory } from "@/lib/cms/types";

export type ServiceCategoryGroup = {
  category: ServiceCategory;
  services: Service[];
};

/** Groups services under their category, both ordered by their own `order` field. */
export function groupServicesByCategory(
  categories: ServiceCategory[],
  services: Service[]
): ServiceCategoryGroup[] {
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  return sortedCategories.map((category) => ({
    category,
    services: services
      .filter((service) => service.categorySlug === category.slug.current)
      .sort((a, b) => a.order - b.order),
  }));
}
