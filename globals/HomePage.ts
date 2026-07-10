import type { GlobalConfig } from "payload";

import { anyone, authenticated } from "../access/authenticated";
import { homeBlocks } from "../fields/homeBlocks";
import { seoFieldGroup } from "../fields/seo";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  access: {
    read: anyone,
    update: authenticated,
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
