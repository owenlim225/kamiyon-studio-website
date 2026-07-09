import { ogImageContentType, ogImageSize, renderDefaultOgImage } from "@/lib/seo/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function TwitterImage() {
  return renderDefaultOgImage();
}
