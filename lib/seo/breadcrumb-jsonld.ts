export type BreadcrumbItem = {
  name: string;
  href: string;
};

/** Internal route breadcrumbs only — no fabricated absolute domain (deployment target is still TBD). */
export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href,
    })),
  };
}
