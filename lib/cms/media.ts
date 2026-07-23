import type { CmsImage } from "./types";

export type R2AssetRef = {
  url?: string | null;
  key?: string | null;
  alt?: string | null;
  caption?: string | null;
  _key?: string | null;
};

/** Builds a public R2 CDN URL from an explicit url or key + base env. */
export function getMediaUrl(
  asset: Pick<R2AssetRef, "url" | "key"> | null | undefined,
): string | null {
  if (!asset) {
    return null;
  }

  if (typeof asset.url === "string" && asset.url.trim()) {
    return asset.url.trim();
  }

  const key = typeof asset.key === "string" ? asset.key.trim().replace(/^\//, "") : "";
  if (!key) {
    return null;
  }

  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL?.trim().replace(/\/$/, "");
  if (!base) {
    return null;
  }

  return `${base}/${key}`;
}

/** Maps a Sanity `r2Asset` object into the shared CmsImage shape. */
export function mapR2AssetToCmsImage(
  asset: R2AssetRef | null | undefined,
  overrides?: Partial<Pick<CmsImage, "alt" | "caption" | "_key">>,
): CmsImage | undefined {
  if (!asset || typeof asset !== "object") {
    return undefined;
  }

  const url = getMediaUrl(asset);
  const alt = overrides?.alt ?? asset.alt ?? null;
  const caption = overrides?.caption ?? asset.caption ?? null;
  const key = overrides?._key ?? (typeof asset._key === "string" ? asset._key : undefined);

  if (!url && !alt && !caption && !key) {
    return undefined;
  }

  return {
    ...(key ? { _key: key } : {}),
    ...(url ? { url } : {}),
    ...(typeof asset.key === "string" && asset.key.trim() ? { key: asset.key.trim() } : {}),
    alt,
    caption,
  };
}
