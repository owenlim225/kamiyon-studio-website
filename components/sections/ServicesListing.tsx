import { Container } from "@/components/ui/Container";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { groupServicesByCategory } from "@/lib/services/group-by-category";
import type { Service, ServiceCategory } from "@/lib/cms/types";
import { ServiceIndustries } from "./ServiceIndustries";

type ServicesListingProps = {
  categories: ServiceCategory[];
  services: Service[];
};

export function ServicesListing({ categories, services }: ServicesListingProps) {
  const groups = groupServicesByCategory(categories, services);

  return (
    <section className="bg-[var(--bg-primary)] py-16 md:py-24">
      <Container>
        <div className="max-w-[680px]">
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            Services
          </h1>
          <p className="mt-4 text-base text-[var(--text-secondary)] md:text-lg">
            Outcome-focused services across interactive experience development,
            software development, creative &amp; design, and consulting &amp;
            technical advisory.
          </p>
        </div>

        <div className="mt-12 space-y-16">
          {groups.map(({ category, services: categoryServices }) => (
            <div key={category.slug.current}>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)] md:text-2xl">
                {category.title}
              </h2>
              <p className="mt-2 max-w-[680px] text-sm text-[var(--text-secondary)] md:text-base">
                {category.description}
              </p>

              {categoryServices.length > 0 ? (
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => (
                    <ServiceCard key={service.slug.current} service={service} />
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-sm text-[var(--text-muted)]">
                  More services coming soon.
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16">
          <ServiceIndustries services={services} />
        </div>
      </Container>
    </section>
  );
}
