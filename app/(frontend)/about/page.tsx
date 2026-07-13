import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animation/AnimatedSection";
import { AboutHero } from "@/components/sections/AboutHero";
import { CultureClosing } from "@/components/sections/CultureClosing";
import { OurStory } from "@/components/sections/OurStory";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { VisionBand } from "@/components/sections/VisionBand";
import {
  aboutPageFallback,
  resolveWithFallback,
  teamMembersFallback,
} from "@/lib/cms/fallbacks";
import { getAboutPage, getTeamMembers } from "@/lib/cms/queries";
import { buildPageMetadata } from "@/lib/seo/metadata";

async function getAboutPageContent() {
  const [aboutPage, teamMembers] = await Promise.all([
    getAboutPage(),
    getTeamMembers(),
  ]);

  return {
    aboutPage: resolveWithFallback(aboutPage, aboutPageFallback),
    teamMembers: resolveWithFallback(teamMembers, teamMembersFallback),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { aboutPage } = await getAboutPageContent();

  return buildPageMetadata({
    title: aboutPage.seo.title,
    description: aboutPage.seo.description,
    path: "/about",
    ogImage: aboutPage.seo.ogImage,
    noIndex: aboutPage.seo.noIndex,
  });
}

export default async function AboutPage() {
  const { aboutPage, teamMembers } = await getAboutPageContent();

  return (
    <>
      {/* AboutHero keeps first-viewport presentation; GSAP reveals start below the fold. */}
      <AboutHero aboutPage={aboutPage} />
      <AnimatedSection as="div" distance={28}>
        <OurStory storySections={aboutPage.storySections} />
      </AnimatedSection>
      <AnimatedSection as="div" distance={32}>
        <VisionBand vision={aboutPage.vision} />
      </AnimatedSection>
      <AnimatedSection as="div" distance={32}>
        <ValuesGrid values={aboutPage.values} />
      </AnimatedSection>
      <AnimatedSection as="div" distance={28}>
        <TeamGrid teamIntro={aboutPage.teamIntro} teamMembers={teamMembers} />
      </AnimatedSection>
      <AnimatedSection as="div" distance={32}>
        <CultureClosing cultureSummary={aboutPage.cultureSummary} />
      </AnimatedSection>
    </>
  );
}
