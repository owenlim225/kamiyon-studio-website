import { defineArrayMember, defineField, defineType } from "sanity";

import { portableBody } from "./objects";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "Kamiyon Studio",
    }),
    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 3 }),
    defineField({ name: "publicEmail", title: "Public Email", type: "string" }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [defineArrayMember({ type: "socialLink" })],
    }),
    defineField({ name: "defaultSeo", title: "Default SEO", type: "seoMetadata" }),
    defineField({
      name: "globalCtas",
      title: "Global CTAs",
      type: "array",
      of: [defineArrayMember({ type: "cta" })],
    }),
    defineField({ name: "footerText", title: "Footer Text", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "siteName", subtitle: "tagline" },
  },
});

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "blocks",
      title: "Blocks",
      type: "array",
      of: [
        defineArrayMember({
          name: "hero",
          title: "Hero",
          type: "object",
          fields: [
            defineField({ name: "headline", title: "Headline", type: "string" }),
            defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 3 }),
            defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
            defineField({ name: "ctaHref", title: "CTA Href", type: "string" }),
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
          ],
        }),
        defineArrayMember({
          name: "mission",
          title: "Mission",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
          ],
        }),
        defineArrayMember({
          name: "featuredWork",
          title: "Featured Work",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
            defineField({
              name: "featuredProducts",
              title: "Featured Products",
              type: "array",
              of: [defineArrayMember({ type: "reference", to: [{ type: "product" }] })],
            }),
            defineField({
              name: "featuredCaseStudies",
              title: "Featured Case Studies",
              type: "array",
              of: [defineArrayMember({ type: "reference", to: [{ type: "caseStudy" }] })],
            }),
          ],
        }),
        defineArrayMember({
          name: "highlights",
          title: "Highlights",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "title", title: "Title", type: "string" }),
                    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
                    defineField({ name: "icon", title: "Icon", type: "string" }),
                  ],
                }),
              ],
            }),
          ],
        }),
        defineArrayMember({
          name: "ctaBanner",
          title: "CTA Banner",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
            defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
            defineField({ name: "ctaHref", title: "CTA Href", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seoMetadata" }),
  ],
  preview: { select: { title: "title" } },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "storySections",
      title: "Story Sections",
      type: "array",
      of: [defineArrayMember({ type: "storySection" })],
    }),
    defineField({ name: "mission", title: "Mission", type: "text", rows: 3 }),
    defineField({ name: "vision", title: "Vision", type: "text", rows: 3 }),
    defineField({ name: "motto", title: "Motto", type: "string" }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [defineArrayMember({ type: "coreValue" })],
    }),
    defineField({ name: "cultureSummary", title: "Culture Summary", type: "text", rows: 3 }),
    defineField({ name: "teamIntro", title: "Team Intro", type: "text", rows: 2 }),
    defineField({ name: "seo", title: "SEO", type: "seoMetadata" }),
  ],
  preview: { select: { title: "title" } },
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "isPlaceholder", title: "Placeholder", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "name", subtitle: "role" } },
});

export const serviceCategory = defineType({
  name: "serviceCategory",
  title: "Service Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: { select: { title: "title" } },
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "serviceCategory" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Body", type: "array", of: portableBody }),
    defineField({
      name: "outcomes",
      title: "Outcomes",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "relatedIndustries",
      title: "Related Industries",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "icon", title: "Icon", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "isPlaceholder", title: "Placeholder", type: "boolean", initialValue: true }),
    defineField({ name: "seo", title: "SEO", type: "seoMetadata" }),
  ],
  preview: { select: { title: "title", subtitle: "summary" } },
});

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "genre", title: "Genre", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["original-ip"] },
      initialValue: "original-ip",
    }),
    defineField({
      name: "developmentStatus",
      title: "Development Status",
      type: "string",
      options: { list: ["in-development", "prototype", "released", "tbd"] },
      initialValue: "tbd",
    }),
    defineField({ name: "overview", title: "Overview", type: "text", rows: 4 }),
    defineField({ name: "goals", title: "Goals", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "features", title: "Features", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "platforms", title: "Platforms", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "media", title: "Media", type: "array", of: [defineArrayMember({ type: "productMedia" })] }),
    defineField({ name: "trailerUrl", title: "Trailer URL", type: "url" }),
    defineField({ name: "isPlaceholder", title: "Placeholder", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "seo", title: "SEO", type: "seoMetadata" }),
  ],
  preview: { select: { title: "title", subtitle: "genre" } },
});

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "clientName", title: "Client Name", type: "string" }),
    defineField({ name: "industry", title: "Industry", type: "string" }),
    defineField({ name: "challenge", title: "Challenge", type: "text", rows: 4 }),
    defineField({ name: "solution", title: "Solution", type: "text", rows: 4 }),
    defineField({ name: "impact", title: "Impact", type: "text", rows: 4 }),
    defineField({ name: "lessonsLearned", title: "Lessons Learned", type: "text", rows: 4 }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "isPlaceholder", title: "Placeholder", type: "boolean", initialValue: true }),
    defineField({ name: "publishedAt", title: "Published At", type: "date" }),
    defineField({ name: "seo", title: "SEO", type: "seoMetadata" }),
  ],
  preview: { select: { title: "title", subtitle: "clientName" } },
});

export const communityItem = defineType({
  name: "communityItem",
  title: "Community Item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: ["workshop", "hackathon", "game-jam", "speaking", "education", "partnership", "other"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Body", type: "array", of: portableBody }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "externalUrl", title: "External URL", type: "url" }),
    defineField({ name: "isPlaceholder", title: "Placeholder", type: "boolean", initialValue: true }),
    defineField({ name: "seo", title: "SEO", type: "seoMetadata" }),
  ],
  preview: { select: { title: "title", subtitle: "type" } },
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 4 }),
    defineField({
      name: "channels",
      title: "Channels",
      type: "array",
      of: [defineArrayMember({ type: "contactChannel" })],
    }),
    defineField({ name: "ctaNote", title: "CTA Note", type: "text", rows: 2 }),
    defineField({ name: "faq", title: "FAQ", type: "array", of: [defineArrayMember({ type: "faqItem" })] }),
    defineField({ name: "seo", title: "SEO", type: "seoMetadata" }),
  ],
  preview: { select: { title: "headline" } },
});
