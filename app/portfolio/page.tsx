import type { Metadata } from "next";

import { PortfolioListing } from "@/components/sections/PortfolioListing";
import { caseStudiesFallback, resolveWithFallback } from "@/lib/cms/fallbacks";
import { getCaseStudies } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore how Kamiyon Studio approaches client work: the challenge each project presented, the solution we built, and the impact it had.",
};

export default async function PortfolioPage() {
  const caseStudies = resolveWithFallback(await getCaseStudies(), caseStudiesFallback);

  return <PortfolioListing caseStudies={caseStudies} />;
}
