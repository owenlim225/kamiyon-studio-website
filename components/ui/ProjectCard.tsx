import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { getCmsImageUrl } from "@/lib/cms/image";
import type { CaseStudy } from "@/lib/cms/types";

type ProjectCardProps = {
  caseStudy: CaseStudy;
};

export function ProjectCard({ caseStudy }: ProjectCardProps) {
  const coverImageUrl = getCmsImageUrl(caseStudy.coverImage);

  return (
    <Link
      href={`/portfolio/${caseStudy.slug.current}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card-lg)] border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)] focus-visible:outline-offset-2"
    >
      <div className="relative aspect-[16/9] bg-[var(--bg-accent)]">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={caseStudy.coverImage?.alt ?? ""}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-4xl"
            aria-hidden="true"
          >
            🌸
          </div>
        )}
        {caseStudy.isPlaceholder ? (
          <Badge variant="placeholder" className="absolute left-4 top-4">
            Placeholder
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-medium uppercase tracking-wide text-sakura">
          {caseStudy.industry}
        </p>
        <h3 className="mt-2 line-clamp-2 font-display text-lg font-semibold text-[var(--text-primary)]">
          {caseStudy.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-[var(--text-secondary)]">
          {caseStudy.challenge}
        </p>
        <span className="mt-4 text-sm font-medium text-sakura transition-colors group-hover:opacity-80">
          View case study →
        </span>
      </div>
    </Link>
  );
}
