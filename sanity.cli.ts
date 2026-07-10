import "./sanity/load-env";

import { defineCliConfig } from "sanity/cli";

function getEnvValue(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function getStudioProjectId(): string {
  const projectId = getEnvValue("CMS_PROJECT_ID");

  if (projectId) {
    return projectId;
  }

  if (process.argv.some((argument) => argument.includes("sanity"))) {
    throw new Error("CMS_PROJECT_ID is required to run Sanity CLI commands.");
  }

  return "missing-project-id";
}

const studioProjectId = getStudioProjectId();
const studioDataset = getEnvValue("CMS_DATASET") ?? "production";

export default defineCliConfig({
  api: {
    projectId: studioProjectId,
    dataset: studioDataset,
  },
});
