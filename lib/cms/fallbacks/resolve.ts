export function resolveWithFallback<T>(content: T | null | undefined, fallback: T): T {
  return content ?? fallback;
}
