import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { anyone, authenticated } from "../access/authenticated";
import { seoFieldGroup } from "../fields/seo";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  labels: { singular: "Case Study", plural: "Case Studies" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "clientName", "featured", "isPlaceholder"],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    { name: "clientName", type: "text", required: true },
    { name: "industry", type: "text", required: true },
    { name: "challenge", type: "textarea", required: true },
    { name: "solution", type: "textarea", required: true },
    { name: "impact", type: "textarea", required: true },
    { name: "lessonsLearned", type: "textarea" },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        { name: "alt", type: "text" },
        { name: "caption", type: "text" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "isPlaceholder",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: { position: "sidebar" },
    },
    seoFieldGroup,
  ],
};
