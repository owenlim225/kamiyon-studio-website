import type { Metadata } from "next";

import { ProductGrid } from "@/components/sections/ProductGrid";
import { productsFallback, resolveWithFallback } from "@/lib/cms/fallbacks";
import { getProducts } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Kamiyon Studio's original intellectual property — games and interactive experiences designed to educate, inspire, and make a lasting impact.",
};

export default async function ProductsPage() {
  const products = resolveWithFallback(await getProducts(), productsFallback);

  return <ProductGrid products={products} />;
}
