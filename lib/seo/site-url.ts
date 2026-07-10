/**
 * Reads `NEXT_PUBLIC_SITE_URL` for canonical/OG URLs; falls back to localhost
 * for local dev/build. Set `NEXT_PUBLIC_SITE_URL` in production (Vercel) —
 * see `.env.example`.
 */
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const SITE_URL = rawSiteUrl?.trim() || "http://localhost:3000";
