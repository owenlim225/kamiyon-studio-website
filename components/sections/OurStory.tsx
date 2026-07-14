import { Container } from "@/components/ui/Container";
import { TiltedCard, marketingCardTiltProps } from "@/components/ui/TiltedCard";
import type { StorySection } from "@/lib/cms/types";

type OurStoryProps = {
  storySections: StorySection[];
};

export function OurStory({ storySections }: OurStoryProps) {
  if (storySections.length === 0) {
    return null;
  }

  return (
    <section className="bg-[var(--bg-secondary)] py-16 md:py-24">
      <Container className="max-w-[820px]">
        <h2 className="text-center font-display text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          Our story
        </h2>

        <div className="mt-10 space-y-8">
          {storySections.map((section, index) => (
            <TiltedCard
              key={section.title}
              {...marketingCardTiltProps}
              className={index % 2 === 1 ? "md:ml-10" : "md:mr-10"}
            >
              <div className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-sm)] md:p-8">
                <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                  {section.title}
                </h3>
                <p className="mt-3 text-base text-[var(--text-secondary)]">{section.body}</p>
              </div>
            </TiltedCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
