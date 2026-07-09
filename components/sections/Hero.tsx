import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getCmsImageUrl } from "@/lib/cms/image";
import type { HomeHero } from "@/lib/cms/types";

const SECONDARY_LINKS = [
  { label: "View products", href: "/products" },
  { label: "See our portfolio", href: "/portfolio" },
  { label: "Contact us", href: "/contact" },
] as const;

type HeroProps = {
  hero: HomeHero;
};

export function Hero({ hero }: HeroProps) {
  const heroImageUrl = getCmsImageUrl(hero.image);

  return (
    <section className="overflow-hidden bg-[var(--bg-primary)] py-16 md:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sakura">
            Kamiyon Studio
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl lg:text-[var(--font-size-hero)]">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-[680px] text-base text-[var(--text-secondary)] md:text-lg">
            {hero.subheadline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={hero.ctaHref} variant="primary">
              {hero.ctaLabel}
            </Button>
            <nav aria-label="Quick links" className="flex flex-wrap gap-4">
              {SECONDARY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-sakura focus-visible:outline-offset-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="relative">
          {heroImageUrl ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card-lg)] shadow-[var(--shadow-lg)]">
              <Image
                src={heroImageUrl}
                alt={hero.image?.alt ?? ""}
                fill
                priority
                className="object-cover"
              />
            </div>
          ) : (
            <div
              className="relative flex aspect-[4/3] items-center justify-center rounded-[var(--radius-card-lg)] border border-[var(--border-default)] bg-[var(--bg-accent)] shadow-[var(--shadow-md)]"
              aria-hidden="true"
            >
              <span className="text-6xl" aria-hidden="true">
                🌸
              </span>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
