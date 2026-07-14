import type { HomeHero } from "@/lib/cms/types";
import type { OpeningItem } from "@/lib/home/opening-items";

import { HeroOpening } from "./HeroOpening";

type HeroProps = {
  hero: HomeHero;
  openingItems?: OpeningItem[];
};

/**
 * Home first viewport — Il Capo–inspired cinematic opening over Kamiyon brand tokens.
 */
export function Hero({ hero, openingItems = [] }: HeroProps) {
  return <HeroOpening hero={hero} items={openingItems} />;
}
