import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animation/AnimatedSection";
import { Hero } from "@/components/sections/Hero";
import { HomeContact } from "@/components/sections/HomeContact";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { ProjectsBento } from "@/components/sections/ProjectsBento";
import {
  ServicesStack,
  type ServiceStackSlide,
} from "@/components/sections/ServicesStack";
import {
  caseStudiesFallback,
  homePageFallback,
  productsFallback,
  resolveWithFallback,
  serviceCategoriesFallback,
} from "@/lib/cms/fallbacks";
import {
  getCaseStudies,
  getHomePage,
  getProducts,
  getServiceCategories,
} from "@/lib/cms/queries";
import { buildOpeningItems } from "@/lib/home/opening-items";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type {
  HomeCtaBanner,
  HomeFeaturedWork,
  HomeHero,
  ServiceCategory,
} from "@/lib/cms/types";

async function getHomePageContent() {
  const [home, caseStudies, products, serviceCategories] = await Promise.all([
    getHomePage(),
    getCaseStudies(),
    getProducts(),
    getServiceCategories(),
  ]);

  return {
    home: resolveWithFallback(home, homePageFallback),
    caseStudies: resolveWithFallback(caseStudies, caseStudiesFallback),
    products: resolveWithFallback(products, productsFallback),
    serviceCategories: resolveWithFallback(
      serviceCategories,
      serviceCategoriesFallback
    ),
  };
}

function toServiceStackSlides(
  categories: ServiceCategory[]
): ServiceStackSlide[] {
  return categories.map((category) => ({
    id: category.slug.current,
    eyebrow: "Services",
    title: category.title,
    summary: category.description,
    exploreHref: "/services",
  }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { home } = await getHomePageContent();

  return buildPageMetadata({
    title: home.seo.title,
    description: home.seo.description,
    path: "/",
    ogImage: home.seo.ogImage,
    noIndex: home.seo.noIndex,
  });
}

export default async function Home() {
  const { home, caseStudies, products, serviceCategories } =
    await getHomePageContent();

  const hero = home.blocks.find((block) => block._type === "hero") as
    | HomeHero
    | undefined;
  const featuredWork = home.blocks.find(
    (block) => block._type === "featuredWork"
  ) as HomeFeaturedWork | undefined;
  const ctaBanner = home.blocks.find((block) => block._type === "ctaBanner") as
    | HomeCtaBanner
    | undefined;

  const contactDefaults = homePageFallback.blocks.find(
    (block) => block._type === "ctaBanner"
  ) as HomeCtaBanner;

  const contact = ctaBanner ?? contactDefaults;
  const openingItems = buildOpeningItems({
    caseStudies,
    products,
    featuredCaseStudySlugs: featuredWork?.featuredCaseStudySlugs,
    featuredProductSlugs: featuredWork?.featuredProductSlugs,
  });

  return (
    <>
      {/* Il Capo–inspired opening uses its own GSAP entrance; reveals continue below. */}
      {hero ? <Hero hero={hero} openingItems={openingItems} /> : null}
      <AnimatedSection as="div" distance={28}>
        <PartnersMarquee eyebrow="Partners" />
      </AnimatedSection>
      <AnimatedSection as="div" distance={32}>
        <ProjectsBento caseStudies={caseStudies} />
      </AnimatedSection>
      {/* ScrollStack pins against window scroll — skip AnimatedSection wrapper. */}
      <ServicesStack slides={toServiceStackSlides(serviceCategories)} />
      <AnimatedSection as="div" distance={28}>
        <HomeContact
          heading={contact.title}
          body={contact.body}
          ctaLabel={contact.ctaLabel}
          ctaHref={contact.ctaHref}
        />
      </AnimatedSection>
    </>
  );
}
