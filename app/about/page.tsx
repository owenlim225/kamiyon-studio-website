import type { Metadata } from "next";

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

  return {
    title: aboutPage.seo.title,
    description: aboutPage.seo.description,
  };
}

export default async function AboutPage() {
  const { aboutPage, teamMembers } = await getAboutPageContent();

  return (
    <>
      <AboutHero aboutPage={aboutPage} />
      <OurStory storySections={aboutPage.storySections} />
      <VisionBand vision={aboutPage.vision} />
      <ValuesGrid values={aboutPage.values} />
      <TeamGrid teamIntro={aboutPage.teamIntro} teamMembers={teamMembers} />
      <CultureClosing cultureSummary={aboutPage.cultureSummary} />
    </>
  );
}
