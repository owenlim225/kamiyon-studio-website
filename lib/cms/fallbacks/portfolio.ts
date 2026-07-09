import type { CaseStudy } from "../types";

export const caseStudiesFallback: CaseStudy[] = [
  {
    _type: "caseStudy",
    title: "Sample Client Project — Placeholder",
    slug: { current: "sample-client-project-placeholder" },
    clientName: "Client name coming soon",
    industry: "Interactive Experience",
    challenge:
      "This placeholder case study reserves the structure for future approved client work.",
    solution:
      "Published case studies will describe Kamiyon Studio's actual approach once client-approved content is available.",
    impact:
      "Impact details will be added only when real outcomes are documented and approved for publication.",
    lessonsLearned:
      "Lessons learned will be replaced with project-specific insights when a real case study is published.",
    gallery: [],
    featured: true,
    isPlaceholder: true,
    seo: {
      title: "Sample Client Project — Placeholder",
      description:
        "A placeholder case study structure for future Kamiyon Studio portfolio work.",
    },
  },
];
