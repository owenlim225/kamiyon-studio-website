import { redirect } from "next/navigation";

import { getHostedStudioUrl } from "@/sanity/studio-url";

/**
 * Embedded NextStudio was removed so the OpenNext Worker stays under the
 * Workers Free 3 MiB gzip limit. Editors use hosted Studio (`sanity deploy`).
 */
export default function StudioRedirectPage() {
  redirect(getHostedStudioUrl());
}
