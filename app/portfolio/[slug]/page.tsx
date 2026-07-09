import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/sections/CaseStudy";
import { caseStudiesFallback } from "@/lib/cms/fallbacks";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/cms/queries";
import { getBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

async function getCaseStudyContent(slug: string) {
  const cmsCaseStudy = await getCaseStudyBySlug(slug);

  if (cmsCaseStudy) {
    return cmsCaseStudy;
  }

  return caseStudiesFallback.find((caseStudy) => caseStudy.slug.current === slug) ?? null;
}

export async function generateStaticParams() {
  const caseStudies = (await getCaseStudies()) ?? caseStudiesFallback;

  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug.current }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyContent(slug);

  if (!caseStudy) {
    return {};
  }

  return buildPageMetadata({
    title: caseStudy.seo.title,
    description: caseStudy.seo.description,
    path: `/portfolio/${caseStudy.slug.current}`,
    ogImage: caseStudy.seo.ogImage ?? caseStudy.coverImage,
    noIndex: caseStudy.seo.noIndex,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyContent(slug);

  if (!caseStudy) {
    notFound();
  }

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: caseStudy.title, href: `/portfolio/${caseStudy.slug.current}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CaseStudy caseStudy={caseStudy} />
    </>
  );
}
