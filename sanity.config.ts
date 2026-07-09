import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./sanity/schemaTypes";

function getStudioProjectId(): string {
  if (process.env.CMS_PROJECT_ID) {
    return process.env.CMS_PROJECT_ID;
  }

  if (process.argv.some((argument) => argument.includes("sanity"))) {
    throw new Error("CMS_PROJECT_ID is required to run Sanity Studio.");
  }

  return "missing-project-id";
}

const studioProjectId = getStudioProjectId();
const studioDataset = process.env.CMS_DATASET ?? "production";

export default defineConfig({
  name: "kamiyon-studio",
  title: "Kamiyon Studio",
  projectId: studioProjectId,
  dataset: studioDataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
