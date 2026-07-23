import { getMediaUrl } from "./media";
import type { CmsImage } from "./types";

/** Resolves a CMS image reference to a servable URL, or null when unavailable. */
export function getCmsImageUrl(image: CmsImage | undefined | null): string | null {
  return getMediaUrl(image);
}
