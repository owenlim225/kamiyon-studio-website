import type { MetadataRoute } from "next";

import { productsFallback, servicesFallback, caseStudiesFallback } from "@/lib/cms/fallbacks";
import { getCaseStudies, getProducts, getServices } from "@/lib/cms/queries";
import { buildPublicSitemapEntries } from "@/lib/seo/sitemap-entries";
import { SITE_URL } from "@/lib/seo/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, services, caseStudies] = await Promise.all([
    getProducts(),
    getServices(),
    getCaseStudies(),
  ]);

  return buildPublicSitemapEntries({
    siteUrl: SITE_URL,
    products: products ?? productsFallback,
    services: services ?? servicesFallback,
    caseStudies: caseStudies ?? caseStudiesFallback,
    vercelEnv: process.env.VERCEL_ENV,
  });
}
