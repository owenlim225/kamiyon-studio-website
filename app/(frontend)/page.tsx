import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animation/AnimatedSection";
import { Hero } from "@/components/sections/Hero";
import { HomeLineSidebar } from "@/components/sections/HomeLineSidebar";
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
  resolveWithFallback,
  serviceCategoriesFallback,
} from "@/lib/cms/fallbacks";
import {
  getCaseStudies,
  getHomePage,
  getServiceCategories,
} from "@/lib/cms/queries";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type {
  HomeCtaBanner,
  HomeHero,
  ServiceCategory,
} from "@/lib/cms/types";

async function getHomePageContent() {
  const [home, caseStudies, serviceCategories] = await Promise.all([
    getHomePage(),
    getCaseStudies(),
    getServiceCategories(),
  ]);

  return {
    home: resolveWithFallback(home, homePageFallback),
    caseStudies: resolveWithFallback(caseStudies, caseStudiesFallback),
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
  const { home, caseStudies, serviceCategories } =
    await getHomePageContent();

  const hero = home.blocks.find((block) => block._type === "hero") as
    | HomeHero
    | undefined;
  const ctaBanner = home.blocks.find((block) => block._type === "ctaBanner") as
    | HomeCtaBanner
    | undefined;

  const contactDefaults = homePageFallback.blocks.find(
    (block) => block._type === "ctaBanner"
  ) as HomeCtaBanner;

  const contact = ctaBanner ?? contactDefaults;

  return (
    <>
      <HomeLineSidebar />
      {/* Brand-first opening uses its own GSAP entrance; section titles use WordPullUp. */}
      {hero ? <Hero hero={hero} /> : null}
      <AnimatedSection as="div" distance={28}>
        <PartnersMarquee eyebrow="Partners" />
      </AnimatedSection>
      {/* ProjectsBento / HomeContact animate heading (WordPullUp) + body fade in-section. */}
      <ProjectsBento caseStudies={caseStudies} />
      {/* ScrollStack pins against window scroll — skip AnimatedSection wrapper. */}
      <ServicesStack slides={toServiceStackSlides(serviceCategories)} />
      <HomeContact
        heading={contact.title}
        body={contact.body}
        ctaLabel={contact.ctaLabel}
        ctaHref={contact.ctaHref}
      />
    </>
  );
}