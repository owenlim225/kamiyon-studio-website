import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  labels: { singular: "Team Member", plural: "Team Members" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order", "isPlaceholder"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "bio", type: "textarea", required: true },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    { name: "order", type: "number", required: true },
    {
      name: "isPlaceholder",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
  ],
};
