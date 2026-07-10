import type { GlobalConfig } from "payload";

import { seoFieldGroup } from "../fields/seo";
import { coreValueFields, storySectionFields } from "../fields/shared";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About Page",
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "storySections",
      type: "array",
      fields: storySectionFields,
    },
    { name: "mission", type: "textarea", required: true },
    { name: "vision", type: "textarea", required: true },
    { name: "motto", type: "text", required: true },
    {
      name: "values",
      type: "array",
      fields: coreValueFields,
    },
    { name: "cultureSummary", type: "textarea", required: true },
    { name: "teamIntro", type: "textarea" },
    seoFieldGroup,
  ],
};
