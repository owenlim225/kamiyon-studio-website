/**
 * Phase 3 — upload canon brand assets and patch CMS documents.
 *
 * Run after `npm run studio:seed` (createOrReplace wipes image refs).
 *
 * Assets used:
 * - docs/assets/youtube-banner.png → homePage hero.image
 *
 * Not uploaded (no suitable canon assets):
 * - Team photos → keep initials avatars
 * - Product media → keep empty asset / coming-soon UI
 */
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";

import { getCliClient } from "sanity/cli";

const apiVersion = "2026-07-09";

const HERO_ASSET_PATH = path.resolve(
  process.cwd(),
  "docs/assets/youtube-banner.png"
);

async function uploadPhase3Assets(): Promise<void> {
  if (!existsSync(HERO_ASSET_PATH)) {
    throw new Error(`Hero asset not found: ${HERO_ASSET_PATH}`);
  }

  const client = getCliClient({ apiVersion });

  console.log("Uploading hero image:", HERO_ASSET_PATH);
  const asset = await client.assets.upload(
    "image",
    createReadStream(HERO_ASSET_PATH),
    {
      filename: "youtube-banner.png",
      contentType: "image/png",
    }
  );

  const imageField = {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
    alt: "Kamiyon Studio brand banner",
  };

  const homePage = await client.fetch<{
    blocks?: Array<{ _key?: string; _type?: string }>;
  } | null>(`*[_id == "homePage"][0]{ blocks[]{ _key, _type } }`);

  if (!homePage?.blocks?.length) {
    throw new Error(
      "homePage not found or has no blocks. Run `npm run studio:seed` first."
    );
  }

  const heroBlock = homePage.blocks.find((block) => block._type === "hero");

  if (!heroBlock?._key) {
    throw new Error("homePage has no hero block with _key.");
  }

  await client
    .patch("homePage")
    .set({ [`blocks[_key=="${heroBlock._key}"].image`]: imageField })
    .commit();

  console.log(
    `Patched homePage hero image → ${asset._id} (block key ${heroBlock._key}).`
  );
  console.log(
    "Skipped team photos and product media: no canon headshots or product screenshots in docs/assets/."
  );
}

uploadPhase3Assets().catch((error: unknown) => {
  console.error("Failed to upload Phase 3 assets:", error);
  process.exit(1);
});
