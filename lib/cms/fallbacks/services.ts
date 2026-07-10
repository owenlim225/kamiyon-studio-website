import type { PortableTextBlock, Service, ServiceCategory } from "../types";

type SpanInput = {
  text: string;
  marks?: string[];
};

function span(text: string, marks?: string[]): SpanInput {
  return marks ? { text, marks } : { text };
}

function block(
  style: "normal" | "h2" | "h3",
  children: SpanInput[]
): PortableTextBlock {
  return {
    _type: "block",
    style,
    children: children.map((child) => ({
      _type: "span" as const,
      text: child.text,
      ...(child.marks ? { marks: child.marks } : {}),
    })),
    markDefs: [],
  };
}

/** Canon-backed portable text for service bodies (normal/h2/h3 + strong/em only). */
function serviceBody(blocks: PortableTextBlock[]): PortableTextBlock[] {
  return blocks;
}

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
    body: serviceBody([
      block("normal", [
        span(
          "Interactive experiences are the foundation of Kamiyon Studio. We build playable games that combine technology, storytelling, design, and engagement to educate, entertain, or solve real-world challenges."
        ),
      ]),
      block("h2", [span("What we deliver")]),
      block("normal", [
        span("Typical deliverables include "),
        span("playable applications", ["strong"]),
        span(", cross-platform games, interactive learning experiences, and "),
        span("functional prototypes", ["em"]),
        span(" shaped around clear player goals."),
      ]),
      block("h3", [span("How we work")]),
      block("normal", [
        span(
          "Every engagement prioritizes long-term value over a short-term deliverable. Our role is to become a trusted creative and technical partner."
        ),
      ]),
    ]),
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
    body: serviceBody([
      block("normal", [
        span(
          "Kamiyon helps teams validate ideas through focused prototypes and minimum viable products that prioritize learning, usability, and durable technical foundations."
        ),
      ]),
      block("h2", [span("What we deliver")]),
      block("normal", [
        span("Engagements typically produce "),
        span("functional prototypes", ["strong"]),
        span(", technical validation, and product learning that inform the next build decision."),
      ]),
      block("h3", [span("Engagement approach")]),
      block("normal", [
        span("MVP work may be scoped as a fixed engagement or as part of a longer partnership, always selected based on what best supports the client's objectives."),
      ]),
    ]),
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
    body: serviceBody([
      block("normal", [
        span(
          "We design gamification systems that make learning, participation, and behavior change more engaging—without treating game mechanics as decoration."
        ),
      ]),
      block("h2", [span("What we deliver")]),
      block("normal", [
        span("Work often includes "),
        span("engagement loops", ["strong"]),
        span(", learning mechanics, progress systems, and gamified business or education solutions."),
      ]),
      block("h3", [span("Where it fits")]),
      block("normal", [
        span(
          "Gamification is especially valuable in education, community programs, and products where "
        ),
        span("meaningful engagement", ["em"]),
        span(" creates measurable value."),
      ]),
    ]),
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
    body: serviceBody([
      block("normal", [
        span(
          "Beyond games, Kamiyon develops modern web products that prioritize usability, maintainability, and long-term scalability."
        ),
      ]),
      block("h2", [span("What we deliver")]),
      block("normal", [
        span("Typical deliverables include "),
        span("web applications", ["strong"]),
        span(", customer-facing platforms, internal management systems, and scalable digital solutions."),
      ]),
      block("h3", [span("Technical focus")]),
      block("normal", [
        span(
          "Capabilities span full-stack application development, API integration, database design, and cloud deployment when they serve the product."
        ),
      ]),
    ]),
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
    body: serviceBody([
      block("normal", [
        span(
          "Kamiyon builds mobile applications shaped around approachable user experiences and durable technical foundations."
        ),
      ]),
      block("h2", [span("What we deliver")]),
      block("normal", [
        span("Engagements typically produce "),
        span("mobile applications", ["strong"]),
        span(", user-centered flows, and cross-platform planning grounded in real product goals."),
      ]),
      block("h3", [span("Design principle")]),
      block("normal", [
        span("We collaborate to solve problems through thoughtful design and technology—not simply to ship software."),
      ]),
    ]),
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
    body: serviceBody([
      block("normal", [
        span(
          "Great products require thoughtful design. Kamiyon provides UI/UX design that makes digital products easier to understand, use, and trust."
        ),
      ]),
      block("h2", [span("What we deliver")]),
      block("normal", [
        span("Typical deliverables include "),
        span("user interface systems", ["strong"]),
        span(", user flows, and product usability improvements that complement engineering work."),
      ]),
      block("h3", [span("Multidisciplinary approach")]),
      block("normal", [
        span(
          "Design is integrated with game design principles, education, and technical execution so experiences feel both "
        ),
        span("functional and engaging", ["em"]),
        span("."),
      ]),
    ]),
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
    body: serviceBody([
      block("normal", [
        span(
          "Kamiyon explores artificial intelligence when it provides meaningful value to users and clients—not as a trend for its own sake."
        ),
      ]),
      block("h2", [span("What we deliver")]),
      block("normal", [
        span("Support includes "),
        span("AI strategy", ["strong"]),
        span(", prototype workflows, and purpose-driven integration planning."),
      ]),
      block("h3", [span("Advisory principle")]),
      block("normal", [
        span(
          "Our goal is to help clients make informed decisions rather than simply recommending technology."
        ),
      ]),
    ]),
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
    body: serviceBody([
      block("normal", [
        span(
          "Kamiyon supports blockchain strategy and implementation when the technology provides practical value, with a particular interest in education-aligned use cases."
        ),
      ]),
      block("h2", [span("What we deliver")]),
      block("normal", [
        span("Typical outcomes include "),
        span("feasibility guidance", ["strong"]),
        span(", education-first strategy, and technical planning across foundations such as Ethereum, Solana, Base, Morph, and Avalanche when relevant."),
      ]),
      block("h3", [span("Adoption rule")]),
      block("normal", [
        span("These technologies are adopted when they provide "),
        span("meaningful value", ["em"]),
        span(" to users and clients."),
      ]),
    ]),
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
    body: serviceBody([
      block("normal", [
        span(
          "Kamiyon supports organizations that need strategic guidance before or during product development. We begin by understanding the client's goals before recommending technologies or implementation strategies."
        ),
      ]),
      block("h2", [span("What we deliver")]),
      block("normal", [
        span("Consultation may produce "),
        span("strategic recommendations", ["strong"]),
        span(", technical roadmaps, product planning documents, architecture guidance, and feasibility reports."),
      ]),
      block("h3", [span("Service principles")]),
      block("normal", [
        span(
          "We communicate openly, prioritize long-term value, educate clients throughout the process, and build relationships—not just transactions."
        ),
      ]),
    ]),
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
    body: serviceBody([
      block("normal", [
        span(
          "Kamiyon provides multidisciplinary creative services that complement both internal and client projects—from branding assets to production-ready art."
        ),
      ]),
      block("h2", [span("What we deliver")]),
      block("normal", [
        span("Typical deliverables include "),
        span("brand assets", ["strong"]),
        span(", marketing materials, digital illustrations, publication materials, and production-ready art assets."),
      ]),
      block("h3", [span("Capabilities")]),
      block("normal", [
        span(
          "Support may include graphic design, branding assets, presentation design, 2D illustration, 3D modeling, and asset production."
        ),
      ]),
    ]),
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
