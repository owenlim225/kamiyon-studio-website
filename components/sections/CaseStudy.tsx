import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { getCmsImageUrl } from "@/lib/cms/image";
import type { CaseStudy as CaseStudyType } from "@/lib/cms/types";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectSidebar } from "./ProjectSidebar";

type CaseStudySection = {
  heading: string;
  body: string;
};

function getSections(caseStudy: CaseStudyType): CaseStudySection[] {
  const sections: CaseStudySection[] = [
    { heading: "Challenge", body: caseStudy.challenge },
    { heading: "Solution", body: caseStudy.solution },
    { heading: "Impact", body: caseStudy.impact },
  ];

  if (caseStudy.lessonsLearned) {
    sections.push({ heading: "Lessons learned", body: caseStudy.lessonsLearned });
  }

  return sections;
}

type CaseStudyProps = {
  caseStudy: CaseStudyType;
};

export function CaseStudy({ caseStudy }: CaseStudyProps) {
  const coverImageUrl = getCmsImageUrl(caseStudy.coverImage);
  const sections = getSections(caseStudy);

  return (
    <>
      <div className="relative aspect-[16/7] w-full bg-[var(--bg-accent)]">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={caseStudy.coverImage?.alt ?? ""}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-6xl"
            aria-hidden="true"
          >
            🌸
          </div>
        )}
      </div>

      <Container className="py-12 md:py-16">
        {caseStudy.isPlaceholder ? (
          <Badge variant="placeholder" className="mb-4">
            Placeholder case study
          </Badge>
        ) : null}
        <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
          {caseStudy.title}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                  {section.heading}
                </h2>
                <p className="mt-3 text-base text-[var(--text-secondary)]">{section.body}</p>
              </div>
            ))}

            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                Gallery
              </h2>
              <div className="mt-3">
                <ProjectGallery gallery={caseStudy.gallery} />
              </div>
            </div>
          </div>

          <ProjectSidebar caseStudy={caseStudy} />
        </div>
      </Container>
    </>
  );
}
