import { defineDocuments, presentationTool } from "sanity/presentation";

function getPreviewOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
}

export const presentation = presentationTool({
  previewUrl: {
    initial: getPreviewOrigin(),
    previewMode: {
      enable: "/api/draft-mode/enable",
    },
  },
  resolve: {
    mainDocuments: defineDocuments([
      {
        route: "/",
        filter: `_type == "homePage"`,
      },
      {
        route: "/about",
        filter: `_type == "aboutPage"`,
      },
      {
        route: "/contact",
        filter: `_type == "contactPage"`,
      },
      {
        route: "/services/:slug",
        filter: ({ params }) =>
          `_type == "service" && slug.current == "${params.slug}"`,
      },
      {
        route: "/products/:slug",
        filter: ({ params }) =>
          `_type == "product" && slug.current == "${params.slug}"`,
      },
      {
        route: "/portfolio/:slug",
        filter: ({ params }) =>
          `_type == "caseStudy" && slug.current == "${params.slug}"`,
      },
      {
        route: "/community",
        filter: `_type == "communityItem"`,
      },
    ]),
  },
});
