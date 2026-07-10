import type { CmsImage } from "../types";

type PayloadMedia = {
  id?: string | number;
  url?: string | null;
  alt?: string | null;
};

function resolveMediaUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    return url;
  }

  return `${siteUrl.replace(/\/$/, "")}${url.startsWith("/") ? url : `/${url}`}`;
}

export function mapMediaToCmsImage(
  media: unknown,
  options: { alt?: string | null; caption?: string | null; key?: string } = {}
): CmsImage | undefined {
  if (!media || typeof media !== "object") {
    return undefined;
  }

  const payloadMedia = media as PayloadMedia;

  if (!payloadMedia.url) {
    return undefined;
  }

  return {
    _key: options.key,
    url: resolveMediaUrl(payloadMedia.url),
    alt: options.alt ?? payloadMedia.alt ?? null,
    caption: options.caption ?? null,
  };
}
