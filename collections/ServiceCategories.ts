import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { anyone, authenticated } from "../access/authenticated";

export const ServiceCategories: CollectionConfig = {
  slug: "service-categories",
  labels: { singular: "Service Category", plural: "Service Categories" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "order"],
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
    { name: "description", type: "textarea", required: true },
    { name: "order", type: "number", required: true },
  ],
};
