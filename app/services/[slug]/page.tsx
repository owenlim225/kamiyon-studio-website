import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { serviceCategoriesFallback, servicesFallback } from "@/lib/cms/fallbacks";
import {
  getServiceBySlug,
  getServiceCategories,
  getServices,
} from "@/lib/cms/queries";
import { getBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-jsonld";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

async function getServiceContent(slug: string) {
  const cmsService = await getServiceBySlug(slug);

  if (cmsService) {
    return cmsService;
  }

  return servicesFallback.find((service) => service.slug.current === slug) ?? null;
}

async function getCategoryForService(categorySlug: string) {
  const categories = (await getServiceCategories()) ?? serviceCategoriesFallback;

  return categories.find((category) => category.slug.current === categorySlug);
}

export async function generateStaticParams() {
  const services = (await getServices()) ?? servicesFallback;

  return services.map((service) => ({ slug: service.slug.current }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceContent(slug);

  if (!service) {
    return {};
  }

  return {
    title: service.seo.title,
    description: service.seo.description,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getServiceContent(slug);

  if (!service) {
    notFound();
  }

  const category = await getCategoryForService(service.categorySlug);

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.title, href: `/services/${service.slug.current}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServiceDetail service={service} category={category} />
    </>
  );
}
