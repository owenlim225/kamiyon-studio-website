import type { CommunityItem } from "../types";

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

// Sources: docs/company/culture.md, docs/marketing/partnerships.md
export const communityItemsFallback: CommunityItem[] = [
  {
    _type: "communityItem",
    title: "Workshop — Details coming soon",
    slug: { current: "workshop-details-coming-soon" },
    type: "workshop",
    summary:
      "Kamiyon contributes back through mentorship, educational initiatives, workshops, community events, open knowledge sharing, and student engagement.",
    body: placeholderBody(
      "Specific community events will be published once details are documented and approved."
    ),
    isPlaceholder: true,
    seo: {
      title: "Workshop — Details coming soon",
      description:
        "A placeholder community item for Kamiyon Studio workshops and educational initiatives.",
    },
  },
  {
    _type: "communityItem",
    title: "Partnership — Details coming soon",
    slug: { current: "partnership-details-coming-soon" },
    type: "partnership",
    summary:
      "Kamiyon seeks meaningful partnerships with organizations that value education, innovation, creativity, community development, technology, collaboration, and long-term thinking.",
    body: placeholderBody(
      "Specific partnership announcements will be published once details are documented and approved."
    ),
    isPlaceholder: true,
    seo: {
      title: "Partnership — Details coming soon",
      description:
        "A placeholder community item for future Kamiyon Studio partnership updates.",
    },
  },
];
