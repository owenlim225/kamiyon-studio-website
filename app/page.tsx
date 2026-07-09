import type { Metadata } from "next";

import { ContactCTA } from "@/components/sections/ContactCTA";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { Mission } from "@/components/sections/Mission";
import {
  caseStudiesFallback,
  homePageFallback,
  productsFallback,
  resolveWithFallback,
} from "@/lib/cms/fallbacks";
import { getCaseStudies, getHomePage, getProducts } from "@/lib/cms/queries";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type {
  HomeCtaBanner,
  HomeFeaturedWork,
  HomeHero,
  HomeHighlights,
  HomeMission,
} from "@/lib/cms/types";

async function getHomePageContent() {
  const [home, products, caseStudies] = await Promise.all([
    getHomePage(),
    getProducts(),
    getCaseStudies(),
  ]);

  return {
    home: resolveWithFallback(home, homePageFallback),
    products: resolveWithFallback(products, productsFallback),
    caseStudies: resolveWithFallback(caseStudies, caseStudiesFallback),
  };
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
  const { home, products, caseStudies } = await getHomePageContent();

  const hero = home.blocks.find((block) => block._type === "hero") as
    | HomeHero
    | undefined;
  const mission = home.blocks.find((block) => block._type === "mission") as
    | HomeMission
    | undefined;
  const featuredWork = home.blocks.find(
    (block) => block._type === "featuredWork"
  ) as HomeFeaturedWork | undefined;
  const highlights = home.blocks.find((block) => block._type === "highlights") as
    | HomeHighlights
    | undefined;
  const ctaBanner = home.blocks.find((block) => block._type === "ctaBanner") as
    | HomeCtaBanner
    | undefined;

  return (
    <>
      {hero ? <Hero hero={hero} /> : null}
      {mission ? <Mission mission={mission} /> : null}
      {featuredWork ? (
        <FeaturedWork
          featuredWork={featuredWork}
          products={products}
          caseStudies={caseStudies}
        />
      ) : null}
      {highlights ? <Highlights highlights={highlights} /> : null}
      {ctaBanner ? <ContactCTA ctaBanner={ctaBanner} /> : null}
    </>
  );
}
