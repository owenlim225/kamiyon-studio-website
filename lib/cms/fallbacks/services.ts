import type { Service, ServiceCategory } from "../types";

const placeholderBody = (text: string) => [
  {
    _type: "block" as const,
    style: "normal",
    children: [
      {
        _type: "span" as const,
        text,
      },
    ],
    markDefs: [],
  },
];

// Source: docs/services/services.md
export const serviceCategoriesFallback: ServiceCategory[] = [
  {
    _type: "serviceCategory",
    title: "Interactive Experience Development",
    slug: { current: "interactive-experience-development" },
    description:
      "Games, learning experiences, simulations, gamification systems, and prototypes that combine technology, storytelling, design, and engagement.",
    order: 1,
  },
  {
    _type: "serviceCategory",
    title: "Software Development",
    slug: { current: "software-development" },
    description:
      "Modern digital products that prioritize usability, maintainability, and long-term scalability.",
    order: 2,
  },
  {
    _type: "serviceCategory",
    title: "Creative & Design Services",
    slug: { current: "creative-design-services" },
    description:
      "Multidisciplinary creative services that support thoughtful products and strong visual communication.",
    order: 3,
  },
  {
    _type: "serviceCategory",
    title: "Consulting & Technical Advisory",
    slug: { current: "consulting-technical-advisory" },
    description:
      "Strategic guidance that helps organizations make informed product, design, and technology decisions.",
    order: 4,
  },
];

// Sources: docs/services/services.md, docs/marketing/website-guidelines.md
export const servicesFallback: Service[] = [
  {
    _type: "service",
    title: "Game Development",
    slug: { current: "game-development" },
    categorySlug: "interactive-experience-development",
    summary:
      "Playable games and interactive experiences built around clear goals, thoughtful systems, and engaging player feedback.",
    body: placeholderBody(
      "Detailed service copy is coming soon. This placeholder will be replaced with CMS-managed content."
    ),
    outcomes: ["Playable experiences", "Interactive systems", "Prototype-ready builds"],
    relatedIndustries: ["Education", "K–12 Learning", "Gamified Learning Platforms"],
    icon: "gamepad",
    order: 1,
    isPlaceholder: true,
    seo: {
      title: "Game Development",
      description:
        "Game development services from Kamiyon Studio for meaningful interactive experiences.",
    },
  },
  {
    _type: "service",
    title: "MVP Development",
    slug: { current: "mvp-development" },
    categorySlug: "software-development",
    summary:
      "Focused prototypes and minimum viable products that help teams learn quickly and make confident next decisions.",
    body: placeholderBody(
      "Detailed service copy is coming soon. This placeholder will be replaced with CMS-managed content."
    ),
    outcomes: ["Functional prototypes", "Technical validation", "Product learning"],
    relatedIndustries: ["Startups", "Technology", "Small and Medium Enterprises"],
    icon: "rocket",
    order: 2,
    isPlaceholder: true,
    seo: {
      title: "MVP Development",
      description:
        "MVP development services from Kamiyon Studio for teams validating digital products.",
    },
  },
  {
    _type: "service",
    title: "Gamification",
    slug: { current: "gamification" },
    categorySlug: "interactive-experience-development",
    summary:
      "Gamified systems that make learning, participation, and behavior change more engaging.",
    body: placeholderBody(
      "Detailed service copy is coming soon. This placeholder will be replaced with CMS-managed content."
    ),
    outcomes: ["Engagement loops", "Learning mechanics", "Progress systems"],
    relatedIndustries: ["Education", "Community Programs", "Web3"],
    icon: "sparkles",
    order: 3,
    isPlaceholder: true,
    seo: {
      title: "Gamification",
      description:
        "Gamification services from Kamiyon Studio for education, community, and product engagement.",
    },
  },
  {
    _type: "service",
    title: "Web Development",
    slug: { current: "web-development" },
    categorySlug: "software-development",
    summary:
      "Web applications and digital platforms designed for usability, maintainability, and long-term value.",
    body: placeholderBody(
      "Detailed service copy is coming soon. This placeholder will be replaced with CMS-managed content."
    ),
    outcomes: ["Web applications", "Customer-facing platforms", "Scalable digital solutions"],
    relatedIndustries: ["Technology", "Businesses", "Nonprofit Organizations"],
    icon: "globe",
    order: 4,
    isPlaceholder: true,
    seo: {
      title: "Web Development",
      description:
        "Web development services from Kamiyon Studio for interactive digital products.",
    },
  },
  {
    _type: "service",
    title: "Mobile Development",
    slug: { current: "mobile-development" },
    categorySlug: "software-development",
    summary:
      "Mobile applications shaped around approachable user experiences and durable technical foundations.",
    body: placeholderBody(
      "Detailed service copy is coming soon. This placeholder will be replaced with CMS-managed content."
    ),
    outcomes: ["Mobile applications", "User-centered flows", "Cross-platform planning"],
    relatedIndustries: ["Education", "Technology", "Businesses"],
    icon: "smartphone",
    order: 5,
    isPlaceholder: true,
    seo: {
      title: "Mobile Development",
      description:
        "Mobile development services from Kamiyon Studio for accessible digital experiences.",
    },
  },
  {
    _type: "service",
    title: "UI/UX Design",
    slug: { current: "ui-ux-design" },
    categorySlug: "creative-design-services",
    summary:
      "Interfaces and experience systems that make digital products easier to understand, use, and trust.",
    body: placeholderBody(
      "Detailed service copy is coming soon. This placeholder will be replaced with CMS-managed content."
    ),
    outcomes: ["Interface systems", "User flows", "Product usability improvements"],
    relatedIndustries: ["Education", "Technology", "Creative Industries"],
    icon: "palette",
    order: 6,
    isPlaceholder: true,
    seo: {
      title: "UI/UX Design",
      description:
        "UI/UX design services from Kamiyon Studio for thoughtful digital products.",
    },
  },
  {
    _type: "service",
    title: "AI Integration",
    slug: { current: "ai-integration" },
    categorySlug: "consulting-technical-advisory",
    summary:
      "Responsible AI planning and integration when it improves the product experience or solves a real problem.",
    body: placeholderBody(
      "Detailed service copy is coming soon. This placeholder will be replaced with CMS-managed content."
    ),
    outcomes: ["AI strategy", "Prototype workflows", "Purpose-driven integration"],
    relatedIndustries: ["Education", "Technology", "Startups"],
    icon: "brain",
    order: 7,
    isPlaceholder: true,
    seo: {
      title: "AI Integration",
      description:
        "AI integration services from Kamiyon Studio for meaningful product outcomes.",
    },
  },
  {
    _type: "service",
    title: "Blockchain Solutions",
    slug: { current: "blockchain-solutions" },
    categorySlug: "consulting-technical-advisory",
    summary:
      "Blockchain strategy and implementation support when the technology provides practical value, especially for education.",
    body: placeholderBody(
      "Detailed service copy is coming soon. This placeholder will be replaced with CMS-managed content."
    ),
    outcomes: ["Feasibility guidance", "Education-first strategy", "Technical planning"],
    relatedIndustries: ["Web3", "Education", "Technology"],
    icon: "blocks",
    order: 8,
    isPlaceholder: true,
    seo: {
      title: "Blockchain Solutions",
      description:
        "Blockchain solution planning from Kamiyon Studio with an education-first focus.",
    },
  },
  {
    _type: "service",
    title: "Consultation",
    slug: { current: "consultation" },
    categorySlug: "consulting-technical-advisory",
    summary:
      "Strategic product, design, and technology guidance grounded in the problem an organization needs to solve.",
    body: placeholderBody(
      "Detailed service copy is coming soon. This placeholder will be replaced with CMS-managed content."
    ),
    outcomes: ["Strategic recommendations", "Technical roadmaps", "Feasibility reports"],
    relatedIndustries: ["Education", "Startups", "Businesses"],
    icon: "messages-square",
    order: 9,
    isPlaceholder: true,
    seo: {
      title: "Consultation",
      description:
        "Consultation services from Kamiyon Studio for product, design, and technology decisions.",
    },
  },
  {
    _type: "service",
    title: "Creative Services",
    slug: { current: "creative-services" },
    categorySlug: "creative-design-services",
    summary:
      "Creative assets, visual systems, and production support for digital products and campaigns.",
    body: placeholderBody(
      "Detailed service copy is coming soon. This placeholder will be replaced with CMS-managed content."
    ),
    outcomes: ["Brand assets", "Marketing materials", "Production-ready art assets"],
    relatedIndustries: ["Creative Industries", "Businesses", "Community Programs"],
    icon: "brush",
    order: 10,
    isPlaceholder: true,
    seo: {
      title: "Creative Services",
      description:
        "Creative services from Kamiyon Studio for digital products and visual communication.",
    },
  },
];
