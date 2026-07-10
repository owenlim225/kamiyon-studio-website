import { createClient } from "next-sanity";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

const projectId = process.env.CMS_PROJECT_ID;
const dataset = process.env.CMS_DATASET;
const token = process.env.CMS_API_TOKEN;

const previewClient =
  projectId && dataset && token
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2026-07-09",
        useCdn: false,
        token,
      })
    : null;

export const { GET } = previewClient
  ? defineEnableDraftMode({
      client: previewClient,
    })
  : {
      GET: async () =>
        new Response(
          "Draft preview is not configured. Set CMS_PROJECT_ID, CMS_DATASET, and CMS_API_TOKEN.",
          { status: 503 }
        ),
    };
