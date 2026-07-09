import Image from "next/image";
import { getCmsImageUrl } from "@/lib/cms/image";
import type { ProductMedia as ProductMediaItem } from "@/lib/cms/types";

type ProductMediaProps = {
  media: ProductMediaItem[];
  trailerUrl?: string;
};

export function ProductMedia({ media, trailerUrl }: ProductMediaProps) {
  const images = media
    .map((item) => ({ item, url: getCmsImageUrl(item.asset) }))
    .filter(
      (entry): entry is { item: ProductMediaItem; url: string } => Boolean(entry.url)
    );

  return (
    <div>
      {images.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {images.map(({ item, url }, index) => (
            <div
              key={item.asset?._key ?? `${url}-${index}`}
              className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-sm)]"
            >
              <Image src={url} alt={item.alt ?? item.caption ?? ""} fill className="object-cover" />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="flex aspect-[16/9] flex-col items-center justify-center gap-2 rounded-[var(--radius-card-lg)] border border-dashed border-[var(--border-default)] bg-[var(--bg-secondary)] text-center"
          aria-hidden="true"
        >
          <span className="text-4xl">🌸</span>
          <p className="text-sm text-[var(--text-muted)]">
            {media[0]?.caption ?? "Media coming soon."}
          </p>
        </div>
      )}

      {trailerUrl ? (
        <a
          href={trailerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-sm font-medium text-sakura-ink transition-colors hover:opacity-80 focus-visible:outline-offset-2"
        >
          Watch trailer →
        </a>
      ) : null}
    </div>
  );
}
