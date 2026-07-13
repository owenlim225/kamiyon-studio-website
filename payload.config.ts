import { postgresAdapter } from "@payloadcms/db-postgres";
import {
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  lexicalEditor,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { CaseStudies } from "./collections/CaseStudies";
import { CommunityItems } from "./collections/CommunityItems";
import { Media } from "./collections/Media";
import { Products } from "./collections/Products";
import { ServiceCategories } from "./collections/ServiceCategories";
import { Services } from "./collections/Services";
import { TeamMembers } from "./collections/TeamMembers";
import { Users } from "./collections/Users";
import { AboutPage } from "./globals/AboutPage";
import { ContactPage } from "./globals/ContactPage";
import { HomePage } from "./globals/HomePage";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const databaseUrl = process.env.DATABASE_URL ?? "";
const payloadSecret = process.env.PAYLOAD_SECRET ?? "";

if (databaseUrl && !payloadSecret) {
  throw new Error(
    "PAYLOAD_SECRET is required when DATABASE_URL is set. Generate one with: openssl rand -base64 32"
  );
}

/** Lexical subset matching PortableText renderer: p, h2, h3, strong, em */
const bodyEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter(
      (feature) =>
        feature.key !== "unorderedList" &&
        feature.key !== "orderedList" &&
        feature.key !== "link" &&
        feature.key !== "upload"
    ),
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ["h2", "h3"] }),
    BoldFeature(),
    ItalicFeature(),
  ],
});

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    TeamMembers,
    ServiceCategories,
    Services,
    Products,
    CaseStudies,
    CommunityItems,
  ],
  globals: [SiteSettings, HomePage, AboutPage, ContactPage],
  editor: bodyEditor,
  // Placeholder only when CMS is unconfigured (no DATABASE_URL); never empty in production with DB.
  secret: payloadSecret || "unused-when-cms-unconfigured",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
    },
  }),
  sharp,
});
