import Image from "next/image";
import { getCmsImageUrl } from "@/lib/cms/image";
import type { CmsImage } from "@/lib/cms/types";

type ProjectGalleryProps = {
  gallery: CmsImage[];
};

export function ProjectGallery({ gallery }: ProjectGalleryProps) {
  const images = gallery
    .map((image) => ({ image, url: getCmsImageUrl(image) }))
    .filter((entry): entry is { image: CmsImage; url: string } => Boolean(entry.url));

  if (images.length === 0) {
    return (
      <div
        className="flex aspect-[4/3] items-center justify-center rounded-[var(--radius-card-lg)] border border-dashed border-[var(--border-default)] bg-[var(--bg-secondary)] text-sm text-[var(--text-muted)]"
        aria-hidden="true"
      >
        Gallery coming soon.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map(({ image, url }, index) => (
        <div
          key={image._key ?? `${url}-${index}`}
          className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-sm)]"
        >
          <Image src={url} alt={image.alt ?? ""} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
