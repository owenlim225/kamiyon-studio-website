import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { HomeContact } from "@/components/sections/HomeContact";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { ProjectsBento } from "@/components/sections/ProjectsBento";
import {
  ServicesCarousel,
  type ServiceCarouselSlide,
} from "@/components/sections/ServicesCarousel";
import {
  caseStudiesFallback,
  homePageFallback,
  resolveWithFallback,
  serviceCategoriesFallback,
} from "@/lib/cms/fallbacks";
import { getCaseStudies, getHomePage, getServiceCategories } from "@/lib/cms/queries";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { HomeCtaBanner, HomeHero, ServiceCategory } from "@/lib/cms/types";

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

function toServiceCarouselSlides(
  categories: ServiceCategory[]
): ServiceCarouselSlide[] {
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
  const { home, caseStudies, serviceCategories } = await getHomePageContent();

  // #region agent log
  const { access, appendFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  const assetPath = join(process.cwd(), "public", "assets", "background.png");
  let assetExists = false;
  try {
    await access(assetPath);
    assetExists = true;
  } catch {
    assetExists = false;
  }
  const debugPayload = {
    sessionId: "c8674a",
    runId: "post-fix",
    hypothesisId: "A",
    location: "page.tsx:Home",
    message: "Home render after localPatterns fix",
    data: {
      assetPath,
      assetExists,
      hasHero: Boolean(home.blocks.find((block) => block._type === "hero")),
      configuredLocalPatterns: ["/api/media/file/**", "/assets/**"],
      heroImageSrc: "/assets/background.png",
    },
    timestamp: Date.now(),
  };
  fetch("http://127.0.0.1:7808/ingest/5870b4a9-8a44-420f-bfd4-f6f4bc6fae2d", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "c8674a",
    },
    body: JSON.stringify(debugPayload),
  }).catch(() => {});
  await appendFile(
    join(process.cwd(), "debug-c8674a.log"),
    `${JSON.stringify(debugPayload)}\n`
  ).catch(() => {});
  // #endregion

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
      {hero ? <Hero hero={hero} /> : null}
      <PartnersMarquee eyebrow="Partners" />
      <ProjectsBento caseStudies={caseStudies} />
      <ServicesCarousel slides={toServiceCarouselSlides(serviceCategories)} />
      <HomeContact
        heading={contact.title}
        body={contact.body}
        ctaLabel={contact.ctaLabel}
        ctaHref={contact.ctaHref}
      />
    </>
  );
}
