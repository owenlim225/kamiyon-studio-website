import { buildShellNavProps } from "@/lib/site-settings/shell-props";
import { siteSettingsFallback } from "@/lib/cms/fallbacks/site-settings";

/** Shared shell props for layout component tests. */
export const testShellProps = buildShellNavProps(siteSettingsFallback);
