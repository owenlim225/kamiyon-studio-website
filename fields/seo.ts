import type { Field } from "payload";

export const seoFields: Field[] = [
  {
    name: "title",
    type: "text",
    required: true,
  },
  {
    name: "description",
    type: "textarea",
    required: true,
  },
  {
    name: "ogImage",
    type: "upload",
    relationTo: "media",
  },
  {
    name: "noIndex",
    type: "checkbox",
    defaultValue: false,
  },
];

export const seoFieldGroup: Field = {
  name: "seo",
  type: "group",
  fields: seoFields,
};
