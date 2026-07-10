import type { Field } from "payload";

export const ctaFields: Field[] = [
  {
    name: "label",
    type: "text",
    required: true,
  },
  {
    name: "href",
    type: "text",
    required: true,
  },
  {
    name: "variant",
    type: "select",
    options: [
      { label: "Primary", value: "primary" },
      { label: "Secondary", value: "secondary" },
      { label: "Ghost", value: "ghost" },
    ],
    defaultValue: "primary",
  },
];
