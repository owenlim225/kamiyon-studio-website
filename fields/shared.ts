import type { Field } from "payload";

export const storySectionFields: Field[] = [
  { name: "title", type: "text", required: true },
  { name: "body", type: "textarea", required: true },
];

export const coreValueFields: Field[] = [
  { name: "name", type: "text", required: true },
  { name: "description", type: "textarea", required: true },
];

export const contactChannelFields: Field[] = [
  {
    name: "type",
    type: "select",
    required: true,
    options: [
      { label: "Facebook", value: "facebook" },
      { label: "LinkedIn", value: "linkedin" },
      { label: "Email", value: "email" },
    ],
  },
  { name: "label", type: "text", required: true },
  { name: "value", type: "text", required: true },
  {
    name: "isPlaceholder",
    type: "checkbox",
    defaultValue: true,
  },
];

export const faqItemFields: Field[] = [
  { name: "question", type: "text", required: true },
  { name: "answer", type: "textarea", required: true },
];

export const productMediaFields: Field[] = [
  {
    name: "type",
    type: "select",
    required: true,
    options: [
      { label: "Image", value: "image" },
      { label: "Video", value: "video" },
    ],
  },
  {
    name: "asset",
    type: "upload",
    relationTo: "media",
  },
  { name: "alt", type: "text" },
  { name: "caption", type: "text" },
];
