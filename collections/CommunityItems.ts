import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { seoFieldGroup } from "../fields/seo";

export const CommunityItems: CollectionConfig = {
  slug: "community-items",
  labels: { singular: "Community Item", plural: "Community Items" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "date", "isPlaceholder"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Workshop", value: "workshop" },
        { label: "Hackathon", value: "hackathon" },
        { label: "Game jam", value: "game-jam" },
        { label: "Speaking", value: "speaking" },
        { label: "Education", value: "education" },
        { label: "Partnership", value: "partnership" },
        { label: "Other", value: "other" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "summary", type: "textarea", required: true },
    {
      name: "body",
      type: "richText",
      required: true,
    },
    {
      name: "date",
      type: "date",
      admin: { position: "sidebar" },
    },
    { name: "location", type: "text" },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    { name: "externalUrl", type: "text" },
    {
      name: "isPlaceholder",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
    seoFieldGroup,
  ],
};
