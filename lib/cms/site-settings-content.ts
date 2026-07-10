import { resolveWithFallback, siteSettingsFallback } from "@/lib/cms/fallbacks";
import { getSiteSettings } from "@/lib/cms/queries";
import type { SiteSettings } from "@/lib/cms/types";

export async function getSiteSettingsContent(): Promise<SiteSettings> {
  return resolveWithFallback(await getSiteSettings(), siteSettingsFallback);
}
