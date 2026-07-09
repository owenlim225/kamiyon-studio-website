import type { Product } from "../types";

// Sources: docs/products/future-ip.md, docs/products/eclipse.md, docs/products/vocabu.md, docs/products/afterschool-cleanup.md
export const productsFallback: Product[] = [
  {
    _type: "product",
    title: "Eclipse",
    slug: { current: "eclipse" },
    tagline:
      "A high-speed 2D movement-platformer centered around a dual-state world-swapping mechanic.",
    genre: "2D Movement Platformer",
    status: "original-ip",
    developmentStatus: "tbd",
    overview:
      "Eclipse aims to deliver an exhilarating movement-focused platforming experience where mastery comes from skill, precision, and experimentation.",
    goals: [
      "Deliver satisfying movement mechanics.",
      "Reward mastery, experimentation, and curiosity.",
      "Strengthen Kamiyon Studio's original IP portfolio.",
    ],
    features: [
      "Precision movement",
      "Dual-state world swapping",
      "Exploration and discovery",
    ],
    platforms: ["PC"],
    media: [
      {
        type: "image",
        alt: "Eclipse media coming soon",
        caption: "Media coming soon.",
      },
    ],
    isPlaceholder: true,
    order: 1,
    seo: {
      title: "Eclipse",
      description:
        "Eclipse is Kamiyon Studio's original 2D movement-platformer IP.",
    },
  },
  {
    _type: "product",
    title: "Vocabu Wildlife Edition",
    slug: { current: "vocabu-wildlife-edition" },
    tagline:
      "An educational card-based word puzzle game designed to make vocabulary learning engaging through play.",
    genre: "Educational Card-Based Word Puzzle",
    status: "original-ip",
    developmentStatus: "tbd",
    overview:
      "Vocabu Wildlife Edition challenges players to strengthen their vocabulary through the fascinating world of the animal kingdom.",
    goals: [
      "Make vocabulary learning enjoyable.",
      "Encourage repeated practice.",
      "Demonstrate the effectiveness of gamified learning.",
    ],
    features: [
      "Learn through play",
      "Short, replayable sessions",
      "Wildlife-themed vocabulary challenges",
    ],
    platforms: [],
    media: [
      {
        type: "image",
        alt: "Vocabu Wildlife Edition media coming soon",
        caption: "Media coming soon.",
      },
    ],
    isPlaceholder: true,
    order: 2,
    seo: {
      title: "Vocabu Wildlife Edition",
      description:
        "Vocabu Wildlife Edition is Kamiyon Studio's educational card-based word puzzle IP.",
    },
  },
  {
    _type: "product",
    title: "Afterschool Cleanup",
    slug: { current: "afterschool-cleanup" },
    tagline:
      "A first-person thriller cleaning simulator that combines satisfying routine gameplay with psychological suspense and environmental storytelling.",
    genre: "First-Person Thriller Cleaning Simulator",
    status: "original-ip",
    developmentStatus: "tbd",
    overview:
      "Afterschool Cleanup transforms an ordinary after-school cleaning routine into an unsettling psychological thriller.",
    goals: [
      "Create memorable psychological tension.",
      "Encourage exploration and observation.",
      "Combine simulation and thriller mechanics with purpose.",
    ],
    features: [
      "Relaxing cleaning routine",
      "Psychological suspense",
      "Environmental storytelling",
    ],
    platforms: [],
    media: [
      {
        type: "image",
        alt: "Afterschool Cleanup media coming soon",
        caption: "Media coming soon.",
      },
    ],
    isPlaceholder: true,
    order: 3,
    seo: {
      title: "Afterschool Cleanup",
      description:
        "Afterschool Cleanup is Kamiyon Studio's first-person thriller cleaning simulator IP.",
    },
  },
];
