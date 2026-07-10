import { getCliClient } from "sanity/cli";

import { placeholderDocuments } from "../seed/placeholder-docs";

const apiVersion = "2026-07-09";

async function seedPlaceholderDocuments(): Promise<void> {
  const client = getCliClient({ apiVersion });
  const transaction = client.transaction();

  for (const document of placeholderDocuments) {
    transaction.createOrReplace(document);
  }

  await transaction.commit();
  console.log(`Seeded ${placeholderDocuments.length} placeholder documents to Sanity.`);
}

seedPlaceholderDocuments().catch((error: unknown) => {
  console.error("Failed to seed placeholder documents:", error);
  process.exit(1);
});
