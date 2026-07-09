import { Container } from "@/components/ui/Container";
import type { HomeMission } from "@/lib/cms/types";

type MissionProps = {
  mission: HomeMission;
};

export function Mission({ mission }: MissionProps) {
  return (
    <section className="bg-[var(--bg-secondary)] py-16 md:py-24">
      <Container className="text-center">
        <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          {mission.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[680px] text-base text-[var(--text-secondary)] md:text-lg">
          {mission.body}
        </p>
      </Container>
    </section>
  );
}
