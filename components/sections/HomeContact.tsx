import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const DEFAULT_VISUAL_SRC = "/assets/background.png";

export type HomeContactProps = {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  visualSrc?: string;
};

export function HomeContact({
  heading,
  body,
  ctaLabel,
  ctaHref,
  visualSrc = DEFAULT_VISUAL_SRC,
}: HomeContactProps) {
  return (
    <section
      aria-labelledby="home-contact-heading"
      className="bg-[var(--bg-primary)] py-16 md:py-24"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <span className="text-3xl" aria-hidden="true">
            🌸
          </span>
          <h2
            id="home-contact-heading"
            className="mt-4 font-display text-2xl font-bold text-[var(--text-primary)] md:text-3xl lg:text-4xl"
          >
            {heading}
          </h2>
          <p className="mt-4 max-w-[36rem] text-base text-[var(--text-secondary)] md:text-lg">
            {body}
          </p>
          <div className="mt-8">
            <Button href={ctaHref} variant="ghost">
              {ctaLabel}
            </Button>
          </div>
        </div>

        <div className="relative min-h-[16rem] overflow-hidden rounded-[var(--radius-card-lg)] shadow-[var(--shadow-lg)] md:min-h-[20rem] lg:min-h-[24rem]">
          <Image
            src={visualSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[var(--color-charcoal)]/35 via-transparent to-sakura/20"
            aria-hidden="true"
          />
        </div>
      </Container>
    </section>
  );
}
