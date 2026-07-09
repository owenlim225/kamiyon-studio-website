import { Container } from "@/components/ui/Container";
import type { CoreValue } from "@/lib/cms/types";

type ValuesGridProps = {
  values: CoreValue[];
};

export function ValuesGrid({ values }: ValuesGridProps) {
  return (
    <section id="values" className="bg-[var(--bg-primary)] py-16 md:py-24">
      <Container>
        <h2 className="text-center font-display text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          What we value
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.name}
              className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-sm)]"
            >
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-accent)] text-sakura-ink"
                aria-hidden="true"
              >
                ✦
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-[var(--text-primary)]">
                {value.name}
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
