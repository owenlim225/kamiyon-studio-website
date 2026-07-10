import { createImageUrlBuilder, type ImageUrlBuilder } from "@sanity/image-url";

import type { CmsImage } from "./types";

const cmsProjectId = process.env.CMS_PROJECT_ID;
const cmsDataset = process.env.CMS_DATASET;

let builder: ImageUrlBuilder | null = null;

function getImageBuilder(): ImageUrlBuilder | null {
  if (!cmsProjectId || !cmsDataset) {
    return null;
  }

  if (!builder) {
    builder = createImageUrlBuilder({ projectId: cmsProjectId, dataset: cmsDataset });
  }

  return builder;
}

/** Resolves a CMS image reference to a servable URL, or null when unconfigured. */
export function getCmsImageUrl(image: CmsImage | undefined | null): string | null {
  if (!image) {
    return null;
  }

  if (image.url) {
    return image.url;
  }

  if (!image.asset) {
    return null;
  }

  const imageBuilder = getImageBuilder();

  if (!imageBuilder) {
    return null;
  }

  return imageBuilder.image(image.asset).url();
}
