import type { MetadataRoute } from "next";

import {
  isCrawlableProduction,
  PRODUCTION_CANONICAL_HOST,
  PRODUCTION_CANONICAL_ORIGIN,
} from "./site-url";

const PRODUCTION_DISALLOW = ["/admin", "/admin/", "/api/", "/studio", "/studio/"] as const;

/**
 * Security-first robots policy:
 * - Crawlable production (canonical SITE_URL + production/unset VERCEL_ENV):
 *   allow public pages; never allow /admin or /api/
 * - Preview/dev Vercel envs or any non-canonical host: disallow all; no sitemap ad
 */
export function buildRobotsPolicy(
  siteUrl: string,
  vercelEnv?: string | null
): MetadataRoute.Robots {
  if (!isCrawlableProduction(siteUrl, vercelEnv)) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...PRODUCTION_DISALLOW],
    },
    sitemap: `${PRODUCTION_CANONICAL_ORIGIN}/sitemap.xml`,
    host: PRODUCTION_CANONICAL_HOST,
  };
}
