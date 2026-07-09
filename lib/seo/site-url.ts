/**
 * Deployment target is still an open question in `context/progress-tracker.md`
 * (Vercel assumed, not confirmed). Rather than fabricate a production domain,
 * this reads from `NEXT_PUBLIC_SITE_URL` and falls back to localhost for local
 * dev/build. Set `NEXT_PUBLIC_SITE_URL` in the production environment before
 * launch — see `.env.example`.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
