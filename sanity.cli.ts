import { defineCliConfig } from "sanity/cli";

function getStudioProjectId(): string {
  if (process.env.CMS_PROJECT_ID) {
    return process.env.CMS_PROJECT_ID;
  }

  if (process.argv.some((argument) => argument.includes("sanity"))) {
    throw new Error("CMS_PROJECT_ID is required to run Sanity CLI commands.");
  }

  return "missing-project-id";
}

const studioProjectId = getStudioProjectId();
const studioDataset = process.env.CMS_DATASET ?? "production";

export default defineCliConfig({
  api: {
    projectId: studioProjectId,
    dataset: studioDataset,
  },
});
