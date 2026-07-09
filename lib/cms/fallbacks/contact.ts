import type { ContactPage } from "../types";

// Sources: docs/branding/messaging.md, docs/ai/faq.md
export const contactPageFallback: ContactPage = {
  _type: "contactPage",
  headline: "Let’s build something meaningful.",
  intro:
    "Whether you are exploring a client project, partnership, educational initiative, or original interactive experience, Kamiyon Studio would be glad to hear from you.",
  channels: [
    {
      type: "facebook",
      label: "Facebook",
      value: "#",
      isPlaceholder: true,
    },
    {
      type: "linkedin",
      label: "LinkedIn",
      value: "#",
      isPlaceholder: true,
    },
    {
      type: "email",
      label: "Email",
      value: "#",
      isPlaceholder: true,
    },
  ],
  faq: [
    {
      question: "What is Kamiyon Studio?",
      answer:
        "Kamiyon Studio is a Philippine-based multidisciplinary interactive experience studio founded in 2024.",
    },
    {
      question: "What does Kamiyon Studio do?",
      answer:
        "Kamiyon develops both original products and client solutions, including game development, gamification, web development, mobile development, UI/UX design, AI integration, blockchain integration, MVP development, creative consultation, and interactive educational experiences.",
    },
    {
      question: "Does Kamiyon collaborate with other organizations?",
      answer:
        "Yes. Successful partnerships are built on shared values and long-term collaboration.",
    },
  ],
  seo: {
    title: "Contact Kamiyon Studio",
    description:
      "Contact Kamiyon Studio through external channels for projects, partnerships, and interactive experience work.",
  },
};
