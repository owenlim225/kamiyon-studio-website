/**
 * Canonical site URL for metadata, OG images, sitemap, and robots.
 * Production: set `NEXT_PUBLIC_SITE_URL=https://kamiyonstudio.com` (no trailing slash).
 * Falls back to localhost for local dev/build — see `.env.example`.
 */

export const PRODUCTION_CANONICAL_HOST = "kamiyonstudio.com";
export const PRODUCTION_CANONICAL_ORIGIN = `https://${PRODUCTION_CANONICAL_HOST}`;

const DEFAULT_DEV_SITE_URL = "http://localhost:3000";

/** Trim and strip a trailing slash so absolute URL joins stay predictable. */
export function normalizeSiteUrl(raw: string): string {
  return raw.trim().replace(/\/+$/, "");
}

/**
 * True only for the live apex origin (HTTPS + exact host).
 * Preview, localhost, www, http, and legacy domains are non-production.
 */
export function isProductionCanonicalSiteUrl(siteUrl: string): boolean {
  try {
    const url = new URL(normalizeSiteUrl(siteUrl));
    return (
      url.protocol === "https:" &&
      url.hostname.toLowerCase() === PRODUCTION_CANONICAL_HOST
    );
  } catch {
    return false;
  }
}

/**
 * True only when both the canonical production origin and a production
 * deployment are confirmed. Preview/development Vercel envs are never
 * crawlable — even if they inherit Production `NEXT_PUBLIC_SITE_URL`.
 * When `vercelEnv` is unset (local), the SITE_URL check alone applies.
 */
export function isCrawlableProduction(
  siteUrl: string,
  vercelEnv?: string | null
): boolean {
  if (!isProductionCanonicalSiteUrl(siteUrl)) {
    return false;
  }

  return (
    vercelEnv === undefined ||
    vercelEnv === null ||
    vercelEnv === "" ||
    vercelEnv === "production"
  );
}

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const SITE_URL = normalizeSiteUrl(rawSiteUrl?.trim() || DEFAULT_DEV_SITE_URL);
