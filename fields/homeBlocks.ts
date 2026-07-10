import type { Block } from "payload";

export const heroBlock: Block = {
  slug: "hero",
  labels: { singular: "Hero", plural: "Hero Blocks" },
  fields: [
    { name: "headline", type: "text", required: true },
    { name: "subheadline", type: "textarea", required: true },
    { name: "ctaLabel", type: "text", required: true },
    { name: "ctaHref", type: "text", required: true },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
};

export const missionBlock: Block = {
  slug: "mission",
  labels: { singular: "Mission", plural: "Mission Blocks" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
  ],
};

export const featuredWorkBlock: Block = {
  slug: "featuredWork",
  labels: { singular: "Featured Work", plural: "Featured Work Blocks" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
    {
      name: "featuredProducts",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "featuredCaseStudies",
      type: "relationship",
      relationTo: "case-studies",
      hasMany: true,
    },
  ],
};

export const highlightsBlock: Block = {
  slug: "highlights",
  labels: { singular: "Highlights", plural: "Highlights Blocks" },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "icon", type: "text" },
      ],
    },
  ],
};

export const ctaBannerBlock: Block = {
  slug: "ctaBanner",
  labels: { singular: "CTA Banner", plural: "CTA Banner Blocks" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
    { name: "ctaLabel", type: "text", required: true },
    { name: "ctaHref", type: "text", required: true },
  ],
};

export const homeBlocks = [
  heroBlock,
  missionBlock,
  featuredWorkBlock,
  highlightsBlock,
  ctaBannerBlock,
] as const;
