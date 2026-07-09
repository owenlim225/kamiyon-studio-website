import type { Metadata } from "next";

import { ServicesListing } from "@/components/sections/ServicesListing";
import {
  resolveWithFallback,
  serviceCategoriesFallback,
  servicesFallback,
} from "@/lib/cms/fallbacks";
import { getServiceCategories, getServices } from "@/lib/cms/queries";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Services",
  description:
    "Explore Kamiyon Studio's services across interactive experience development, software development, creative & design, and consulting & technical advisory.",
  path: "/services",
});

export default async function ServicesPage() {
  const [categories, services] = await Promise.all([
    getServiceCategories(),
    getServices(),
  ]);

  return (
    <ServicesListing
      categories={resolveWithFallback(categories, serviceCategoriesFallback)}
      services={resolveWithFallback(services, servicesFallback)}
    />
  );
}
