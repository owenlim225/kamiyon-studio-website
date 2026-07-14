"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useOpeningAnimation } from "@/hooks/useOpeningAnimation";
import {
  formatOpeningIndex,
  type OpeningItem,
} from "@/lib/home/opening-items";
import type { HomeHero } from "@/lib/cms/types";
import { doubleLetters } from "@/lib/typography/doubleLetters";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type HeroOpeningProps = {
  hero: HomeHero;
  items: OpeningItem[];
};

const CORNER_LINKS = [
  { label: "Contacts", href: "/contact" },
  { label: "Portfolio", href: "/portfolio" },
] as const;

export function HeroOpening({ hero, items }: HeroOpeningProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const rootRef = useOpeningAnimation<HTMLElement>();

  const activeItem =
    items.find((item) => item.id === activeId) ?? items[0] ?? null;
  const backgroundSrc = activeItem?.imageSrc ?? "/assets/background.png";

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden bg-[var(--color-charcoal)]"
      aria-label="Studio opening"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          key={backgroundSrc}
          src={backgroundSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] opacity-90 motion-safe:animate-hero-ken-burns motion-reduce:animate-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal)]/75 via-[var(--color-charcoal)]/45 to-[var(--color-charcoal)]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-charcoal)]/55 via-transparent to-[var(--color-charcoal)]/40" />
      </div>

      <div
        data-opening-curtain
        className="pointer-events-none absolute inset-0 z-30 -translate-y-full bg-[var(--color-charcoal)] motion-reduce:hidden"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="flex items-start justify-between px-4 pt-6 sm:px-6 lg:px-10">
          {CORNER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-opening-corner
              aria-label={link.label}
              className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-ivory)]/85 transition-colors duration-200 hover:text-[var(--color-sakura)] focus-visible:outline-offset-4 sm:text-xs"
            >
              <span aria-hidden="true">{doubleLetters(link.label.toLowerCase())}</span>
            </Link>
          ))}
        </div>

        <Container className="relative flex flex-1 flex-col justify-center py-10 md:py-14">
          <div data-hero-copy className="max-w-3xl">
            <p
              data-hero-brand
              className="font-display text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-sakura)] md:text-base"
            >
              Kamiyon
            </p>
            <h1
              data-hero-headline
              className="mt-4 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-[var(--color-ivory)]"
            >
              {hero.headline}
            </h1>
            <p
              data-hero-support
              className="mt-4 max-w-[40rem] text-base text-[var(--color-ivory)]/88 md:text-lg"
            >
              {hero.subheadline}
            </p>
            <div data-hero-cta className="mt-7">
              <Button href={hero.ctaHref} variant="primary">
                {hero.ctaLabel}
              </Button>
            </div>
          </div>

          {items.length > 0 ? (
            <nav
              className="mt-10 max-w-5xl border-t border-[var(--color-ivory)]/15 pt-4 md:mt-14 md:pt-5"
              aria-label="Featured work"
            >
              <ul className="flex flex-col">
                {items.map((item, index) => {
                  const isActive = item.id === activeItem?.id;
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        data-opening-row
                        onMouseEnter={() => setActiveId(item.id)}
                        onFocus={() => setActiveId(item.id)}
                        className={`group grid cursor-pointer grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 border-b border-[var(--color-ivory)]/12 py-4 transition-colors duration-200 md:grid-cols-[3.25rem_minmax(0,1fr)_minmax(8rem,14rem)] md:gap-6 md:py-5 ${
                          isActive
                            ? "text-[var(--color-ivory)]"
                            : "text-[var(--color-ivory)]/55 hover:text-[var(--color-ivory)]/90"
                        }`}
                      >
                        <span
                          className={`font-display text-xs tabular-nums tracking-widest md:text-sm ${
                            isActive
                              ? "text-[var(--color-sakura)]"
                              : "text-current"
                          }`}
                        >
                          {formatOpeningIndex(index)}
                        </span>
                        <span className="font-display text-lg font-semibold leading-snug tracking-tight md:text-2xl lg:text-[1.75rem]">
                          {item.title}
                        </span>
                        <span className="hidden text-right text-xs uppercase tracking-[0.18em] md:block md:text-sm">
                          {item.subtitle}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : null}
        </Container>
      </div>
    </section>
  );
}
