import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import type { FaqItem } from "@/lib/cms/types";

type ContactFAQProps = {
  faq: FaqItem[];
};

export function ContactFAQ({ faq }: ContactFAQProps) {
  if (faq.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="bg-[var(--bg-secondary)] py-16 md:py-24">
      <Container className="mx-auto max-w-[720px]">
        <h2 className="text-center font-display text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-8">
          <Accordion items={faq} />
        </div>
      </Container>
    </section>
  );
}
