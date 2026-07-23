export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-21'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

export function isSanityConfigured(): boolean {
  const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()
  const ds = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim()
  return Boolean(pid && ds)
}
