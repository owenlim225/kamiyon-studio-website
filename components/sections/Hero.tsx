import type { HomeHero } from "@/lib/cms/types";

import { HeroOpening } from "./HeroOpening";

type HeroProps = {
  hero: HomeHero;
};

/**
 * Home first viewport — full-bleed brand stage + motto.
 */
export function Hero({ hero }: HeroProps) {
  return <HeroOpening hero={hero} />;
}
