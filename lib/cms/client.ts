import configPromise from "@payload-config";
import { getPayload, type Payload } from "payload";

const databaseUrl = process.env.DATABASE_URL;
const payloadSecret = process.env.PAYLOAD_SECRET;

let missingConfigLogged = false;
let payloadClient: Payload | null = null;

export const isPayloadConfigured = Boolean(databaseUrl && payloadSecret);

export async function getPayloadClient(): Promise<Payload | null> {
  if (!isPayloadConfigured) {
    if (!missingConfigLogged && process.env.NODE_ENV !== "test") {
      missingConfigLogged = true;
      console.warn(
        "Payload CMS is not configured. Set DATABASE_URL and PAYLOAD_SECRET to enable CMS fetching; typed fallbacks will be used meanwhile."
      );
    }

    return null;
  }

  if (payloadClient) {
    return payloadClient;
  }

  payloadClient = await getPayload({ config: configPromise });
  return payloadClient;
}
