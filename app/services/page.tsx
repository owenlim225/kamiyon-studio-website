import type { Metadata } from "next";

import { ServicesListing } from "@/components/sections/ServicesListing";
import {
  resolveWithFallback,
  serviceCategoriesFallback,
  servicesFallback,
} from "@/lib/cms/fallbacks";
import { getServiceCategories, getServices } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Kamiyon Studio's services across interactive experience development, software development, creative & design, and consulting & technical advisory.",
};

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
