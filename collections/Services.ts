import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { anyone, authenticated } from "../access/authenticated";
import { seoFieldGroup } from "../fields/seo";

export const Services: CollectionConfig = {
  slug: "services",
  labels: { singular: "Service", plural: "Services" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "order", "isPlaceholder"],
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
    {
      name: "category",
      type: "relationship",
      relationTo: "service-categories",
      required: true,
      admin: { position: "sidebar" },
    },
    { name: "summary", type: "textarea", required: true },
    {
      name: "body",
      type: "richText",
      required: true,
    },
    {
      name: "outcomes",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "relatedIndustries",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    { name: "icon", type: "text" },
    { name: "order", type: "number", required: true },
    {
      name: "isPlaceholder",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
    seoFieldGroup,
  ],
};
