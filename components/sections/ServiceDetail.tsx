import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/ui/PortableText";
import type { Service, ServiceCategory } from "@/lib/cms/types";
import { ServiceSidebar } from "./ServiceSidebar";

type ServiceDetailProps = {
  service: Service;
  category?: ServiceCategory;
};

export function ServiceDetail({ service, category }: ServiceDetailProps) {
  return (
    <section className="bg-[var(--bg-primary)] py-16 md:py-24">
      <Container>
        {category ? (
          <p className="text-sm font-semibold uppercase tracking-wide text-sakura">
            {category.title}
          </p>
        ) : null}

        {service.isPlaceholder ? (
          <Badge variant="placeholder" className="mt-4">
            Placeholder service
          </Badge>
        ) : null}

        <h1 className="mt-4 font-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
          {service.title}
        </h1>
        <p className="mt-4 max-w-[680px] text-base text-[var(--text-secondary)] md:text-lg">
          {service.summary}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <PortableText blocks={service.body} />
          <ServiceSidebar service={service} />
        </div>
      </Container>
    </section>
  );
}
