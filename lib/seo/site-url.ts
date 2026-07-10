/**
 * Deployment target is still an open question in `context/progress-tracker.md`
 * (Vercel assumed, not confirmed). Rather than fabricate a production domain,
 * this reads from `NEXT_PUBLIC_SITE_URL` and falls back to localhost for local
 * dev/build. Set `NEXT_PUBLIC_SITE_URL` in the production environment before
 * launch — see `.env.example`.
 */
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// #region agent log
fetch("http://127.0.0.1:7808/ingest/5870b4a9-8a44-420f-bfd4-f6f4bc6fae2d", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Debug-Session-Id": "0db153",
  },
  body: JSON.stringify({
    sessionId: "0db153",
    runId: "post-fix",
    hypothesisId: "H1",
    location: "lib/seo/site-url.ts:module",
    message: "SITE_URL env resolution",
    data: {
      rawType: typeof rawSiteUrl,
      rawLength: rawSiteUrl?.length ?? null,
      rawIsEmpty: rawSiteUrl === "",
      rawIsUndefined: rawSiteUrl === undefined,
      nullishCoalesceWouldFallback: rawSiteUrl == null,
      trimOrFallbackWouldUseDefault: !rawSiteUrl?.trim(),
    },
    timestamp: Date.now(),
  }),
}).catch(() => {});
// #endregion

export const SITE_URL = rawSiteUrl?.trim() || "http://localhost:3000";

// #region agent log
fetch("http://127.0.0.1:7808/ingest/5870b4a9-8a44-420f-bfd4-f6f4bc6fae2d", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Debug-Session-Id": "0db153",
  },
  body: JSON.stringify({
    sessionId: "0db153",
    runId: "post-fix",
    hypothesisId: "H1",
    location: "lib/seo/site-url.ts:module",
    message: "SITE_URL resolved value",
    data: {
      siteUrl: SITE_URL,
      siteUrlLength: SITE_URL.length,
      urlConstructorWouldFail: SITE_URL.length === 0,
    },
    timestamp: Date.now(),
  }),
}).catch(() => {});
// #endregion
