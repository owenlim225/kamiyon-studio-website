import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { HomeHero } from "@/lib/cms/types";

type HeroProps = {
  hero: HomeHero;
};

export function Hero({ hero }: HeroProps) {
  const heroSrc = "/assets/background.png";
  // #region agent log
  const allowedLocalPatterns = ["/api/media/file/**", "/assets/**"];
  const matchesAllowed = allowedLocalPatterns.some((p) => {
    const prefix = p.replace("/**", "/");
    return p.endsWith("/**")
      ? heroSrc.startsWith(prefix) || heroSrc.startsWith(p.slice(0, -3))
      : heroSrc === p;
  });
  fetch("http://127.0.0.1:7808/ingest/5870b4a9-8a44-420f-bfd4-f6f4bc6fae2d", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "c8674a",
    },
    body: JSON.stringify({
      sessionId: "c8674a",
      runId: "post-fix",
      hypothesisId: "A",
      location: "Hero.tsx:render",
      message: "Hero Image src vs localPatterns whitelist",
      data: {
        heroSrc,
        allowedLocalPatterns,
        matchesAllowed,
        fileExpectedAt: "public/assets/background.png",
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
  return (
    <section className="relative min-h-[min(100svh,52rem)] overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={heroSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%] motion-safe:animate-hero-ken-burns motion-reduce:animate-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-charcoal)]/65 via-[var(--color-charcoal)]/25 to-transparent" />
      </div>

      <Container className="relative z-10 flex min-h-[min(100svh,52rem)] items-center py-16 md:py-24">
        <div
          data-hero-copy
          className="max-w-2xl motion-safe:animate-hero-fade-rise motion-reduce:animate-none"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-sakura)]">
            Kamiyon
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-[var(--color-ivory)] md:text-5xl lg:text-[var(--font-size-hero)]">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-[680px] text-base text-[var(--color-ivory)]/90 md:text-lg">
            {hero.subheadline}
          </p>
          <div className="mt-8">
            <Button href={hero.ctaHref} variant="primary">
              {hero.ctaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
