import type { Field } from "payload";

export const socialLinkFields: Field[] = [
  {
    name: "platform",
    type: "select",
    required: true,
    options: [
      { label: "Facebook", value: "facebook" },
      { label: "LinkedIn", value: "linkedin" },
      { label: "Email", value: "email" },
    ],
  },
  {
    name: "url",
    type: "text",
    required: true,
  },
  {
    name: "label",
    type: "text",
    required: true,
  },
  {
    name: "isPlaceholder",
    type: "checkbox",
    defaultValue: true,
  },
];
