import { createClient, type SanityClient } from "next-sanity";

const apiVersion = "2026-07-09";

const cmsProjectId = process.env.CMS_PROJECT_ID;
const cmsDataset = process.env.CMS_DATASET;
const cmsApiToken = process.env.CMS_API_TOKEN;

let missingConfigLogged = false;
let sanityClient: SanityClient | null = null;

export const isSanityConfigured = Boolean(cmsProjectId && cmsDataset);

export function getSanityClient(): SanityClient | null {
  if (!cmsProjectId || !cmsDataset) {
    if (!missingConfigLogged && process.env.NODE_ENV !== "test") {
      missingConfigLogged = true;
      console.warn(
        "Sanity CMS is not configured. Set CMS_PROJECT_ID and CMS_DATASET to enable CMS fetching; typed fallbacks will be used meanwhile."
      );
    }

    return null;
  }

  if (sanityClient) {
    return sanityClient;
  }

  sanityClient = createClient({
    projectId: cmsProjectId,
    dataset: cmsDataset,
    apiVersion,
    useCdn: !cmsApiToken,
    token: cmsApiToken,
    perspective: "published",
    stega: false,
  });

  return sanityClient;
}
