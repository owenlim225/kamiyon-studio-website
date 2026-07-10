import type { GlobalConfig } from "payload";

import { homeBlocks } from "../fields/homeBlocks";
import { seoFieldGroup } from "../fields/seo";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "blocks",
      type: "blocks",
      blocks: [...homeBlocks],
    },
    seoFieldGroup,
  ],
};
