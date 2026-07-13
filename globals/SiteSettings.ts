import type { GlobalConfig } from "payload";

import { anyone, authenticated } from "../access/authenticated";
import { ctaFields } from "../fields/cta";
import { seoFields } from "../fields/seo";
import { socialLinkFields } from "../fields/socialLink";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
      defaultValue: "Kamiyon Studio",
    },
    { name: "tagline", type: "textarea", required: true },
    { name: "publicEmail", type: "text" },
    {
      name: "socialLinks",
      type: "array",
      fields: socialLinkFields,
    },
    {
      name: "defaultSeo",
      type: "group",
      fields: seoFields,
    },
    {
      name: "globalCtas",
      type: "array",
      fields: ctaFields,
    },
    { name: "footerText", type: "textarea" },
  ],
};
