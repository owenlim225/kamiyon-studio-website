import { BentoProjectCard } from "@/components/ui/BentoProjectCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { partitionBentoLayout } from "@/lib/home/bento-layout";
import type { CaseStudy } from "@/lib/cms/types";

type ProjectsBentoProps = {
  caseStudies: CaseStudy[];
};

function chunkSlots<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }

  return rows;
}

export function ProjectsBento({ caseStudies }: ProjectsBentoProps) {
  const { large, small } = partitionBentoLayout(caseStudies);
  const smallRows = chunkSlots(small, 3);

  return (
    <section className="bg-[var(--bg-primary)] py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[680px]">
            <p className="text-sm font-semibold uppercase tracking-wide text-sakura-ink">
              Portfolio
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
              Recent Projects
            </h2>
          </div>
          <Button href="/portfolio" variant="ghost">
            View portfolio
          </Button>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2" data-bento-row="large">
            {large.map((slot, index) => (
              <BentoProjectCard
                key={slot?.slug.current ?? `large-placeholder-${index}`}
                caseStudy={slot}
                size="large"
              />
            ))}
          </div>

          {smallRows.map((row, rowIndex) => (
            <div
              key={`small-row-${rowIndex}`}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              data-bento-row="small"
            >
              {row.map((slot, index) => (
                <BentoProjectCard
                  key={slot?.slug.current ?? `small-placeholder-${rowIndex}-${index}`}
                  caseStudy={slot}
                  size="small"
                />
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
