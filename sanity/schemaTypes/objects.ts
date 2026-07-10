import { defineArrayMember, defineField, defineType } from "sanity";

export const seoMetadata = defineType({
  name: "seoMetadata",
  title: "SEO Metadata",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineField({
      name: "noIndex",
      title: "No index",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const cta = defineType({
  name: "cta",
  title: "CTA",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Href",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: ["primary", "secondary", "ghost"],
      },
      initialValue: "primary",
    }),
  ],
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: { list: ["facebook", "linkedin", "email"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isPlaceholder",
      title: "Placeholder",
      type: "boolean",
      initialValue: true,
    }),
  ],
});

export const storySection = defineType({
  name: "storySection",
  title: "Story Section",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
  ],
});

export const coreValue = defineType({
  name: "coreValue",
  title: "Core Value",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
  ],
});

export const productMedia = defineType({
  name: "productMedia",
  title: "Product Media",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: ["image", "video"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "asset",
      title: "Asset",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "alt", title: "Alt text", type: "string" }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
});

export const contactChannel = defineType({
  name: "contactChannel",
  title: "Contact Channel",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: ["facebook", "linkedin", "email"] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "value", title: "Value", type: "string" }),
    defineField({
      name: "isPlaceholder",
      title: "Placeholder",
      type: "boolean",
      initialValue: true,
    }),
  ],
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "object",
  fields: [
    defineField({ name: "question", title: "Question", type: "string" }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4 }),
  ],
});

/** Minimal portable text subset — matches components/ui/PortableText.tsx */
export const portableBody = [
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "Heading", value: "h2" },
      { title: "Subheading", value: "h3" },
    ],
    lists: [],
    marks: {
      decorators: [
        { title: "Strong", value: "strong" },
        { title: "Emphasis", value: "em" },
      ],
      annotations: [],
    },
  }),
];
