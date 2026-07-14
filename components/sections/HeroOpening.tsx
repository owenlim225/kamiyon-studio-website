"use client";

import Image from "next/image";

import { SplitText } from "@/components/ui/SplitText";
import { useOpeningAnimation } from "@/hooks/useOpeningAnimation";
import { useParallax } from "@/hooks/useParallax";

const HERO_TITLE = "KAMIYON STUDIO";
const HERO_BACKGROUND = "/assets/background.png";

export function HeroOpening() {
  const rootRef = useOpeningAnimation<HTMLElement>();
  const parallaxRef = useParallax<HTMLDivElement>({ speed: 100 });

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden bg-[var(--color-charcoal)]"
      aria-label="Studio opening"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div
          ref={parallaxRef}
          className="absolute inset-[-20%] will-change-transform"
        >
          <Image
            src={HERO_BACKGROUND}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal)]/75 via-[var(--color-charcoal)]/45 to-[var(--color-charcoal)]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-charcoal)]/55 via-transparent to-[var(--color-charcoal)]/40" />
      </div>

      <div
        data-opening-curtain
        className="pointer-events-none absolute inset-0 z-30 -translate-y-full bg-[var(--color-charcoal)] motion-reduce:hidden"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4">
        <SplitText
          tag="h1"
          text={HERO_TITLE}
          className="font-display text-[clamp(2.5rem,8vw,6rem)] font-bold tracking-tight text-[var(--color-ivory)]"
          delay={80}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      </div>
    </section>
  );
}
