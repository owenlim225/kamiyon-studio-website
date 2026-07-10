import type { GlobalConfig } from "payload";

import { anyone, authenticated } from "../access/authenticated";
import { seoFieldGroup } from "../fields/seo";
import { contactChannelFields, faqItemFields } from "../fields/shared";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact Page",
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    { name: "headline", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
    {
      name: "channels",
      type: "array",
      fields: contactChannelFields,
    },
    { name: "ctaNote", type: "textarea" },
    {
      name: "faq",
      type: "array",
      fields: faqItemFields,
    },
    seoFieldGroup,
  ],
};
