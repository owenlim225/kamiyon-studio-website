import type { ContactPage } from "../types";
import { contactChannels } from "@/lib/contact/channels";

// Sources: docs/branding/messaging.md, docs/ai/faq.md
// Contact URLs: operator-provided 2026-07-10 (lib/contact/channels.ts)
export const contactPageFallback: ContactPage = {
  _type: "contactPage",
  headline: "Let’s build something meaningful.",
  intro:
    "Whether you are exploring a client project, partnership, educational initiative, or original interactive experience, Kamiyon Studio would be glad to hear from you.",
  channels: contactChannels,
  faq: [
    {
      question: "What is Kamiyon Studio?",
      answer:
        "Kamiyon Studio is a Philippine-based multidisciplinary interactive experience studio founded in 2024. We create games, educational technologies, gamified platforms, web applications, mobile applications, MVPs, and creative digital experiences that educate, inspire, and make a lasting impact.",
    },
    {
      question: "What does Kamiyon Studio do?",
      answer:
        "Kamiyon develops both original products and client solutions, including game development, gamification, web development, mobile development, UI/UX design, AI integration, blockchain integration, MVP development, creative consultation, and interactive educational experiences.",
    },
    {
      question: "Does Kamiyon Studio only develop games?",
      answer:
        "No. Game development is one part of our multidisciplinary expertise. We also develop educational platforms, gamified applications, websites, mobile applications, MVPs, interactive digital experiences, and creative technology solutions.",
    },
    {
      question: "What industries does Kamiyon work with?",
      answer:
        "Our primary focus includes education, Web3, startups, businesses, government, and nonprofit organizations. We welcome opportunities from any industry where interactive technology can create meaningful value.",
    },
    {
      question: "Does Kamiyon Studio provide consultation?",
      answer:
        "Yes. Consultation is part of our service offerings. We begin by understanding the client's goals before recommending technologies or implementation strategies.",
    },
    {
      question: "What original products has Kamiyon created?",
      answer:
        "Current original projects include Eclipse, Vocabu Wildlife Edition, and Afterschool Cleanup. Additional products may be added as they become official.",
    },
    {
      question: "Does Kamiyon collaborate with other organizations?",
      answer:
        "Yes. We actively seek partnerships with educational institutions, businesses, communities, nonprofit organizations, Web3 organizations, and technology partners. Successful partnerships are built on shared values and long-term collaboration.",
    },
    {
      question: "How should Kamiyon Studio be described?",
      answer:
        "The preferred description is: a multidisciplinary interactive experience studio. This reflects the breadth of the studio's capabilities more accurately than narrower labels such as \"game studio\" or \"software agency.\"",
    },
  ],
  seo: {
    title: "Contact Kamiyon Studio",
    description:
      "Contact Kamiyon Studio through external channels for projects, partnerships, and interactive experience work.",
  },
};
