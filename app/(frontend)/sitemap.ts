import type { MetadataRoute } from "next";

import { productsFallback, servicesFallback, caseStudiesFallback } from "@/lib/cms/fallbacks";
import { getCaseStudies, getProducts, getServices } from "@/lib/cms/queries";
import { SITE_URL } from "@/lib/seo/site-url";

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/products",
  "/portfolio",
  "/community",
  "/contact",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, services, caseStudies] = await Promise.all([
    getProducts(),
    getServices(),
    getCaseStudies(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const productEntries: MetadataRoute.Sitemap = (products ?? productsFallback).map(
    (product) => ({
      url: `${SITE_URL}/products/${product.slug.current}`,
      lastModified: new Date(),
    })
  );

  const serviceEntries: MetadataRoute.Sitemap = (services ?? servicesFallback).map(
    (service) => ({
      url: `${SITE_URL}/services/${service.slug.current}`,
      lastModified: new Date(),
    })
  );

  const caseStudyEntries: MetadataRoute.Sitemap = (caseStudies ?? caseStudiesFallback).map(
    (caseStudy) => ({
      url: `${SITE_URL}/portfolio/${caseStudy.slug.current}`,
      lastModified: caseStudy.publishedAt ? new Date(caseStudy.publishedAt) : new Date(),
    })
  );

  return [...staticEntries, ...productEntries, ...serviceEntries, ...caseStudyEntries];
}
