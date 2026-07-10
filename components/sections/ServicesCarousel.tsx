"use client";

import { useCallback, useState, type KeyboardEvent } from "react";

import { Button } from "@/components/ui/Button";
import {
  formatCarouselSlideLabel,
  getRovingTabIndex,
  wrapCarouselIndex,
} from "@/lib/home/carousel-a11y";

export type ServiceCarouselSlide = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  exploreHref: string;
};

type ServicesCarouselProps = {
  slides: ServiceCarouselSlide[];
};

const sectionId = "services-carousel-heading";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      {direction === "left" ? (
        <path d="M12.5 4.5 7.5 10l5 5.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M7.5 4.5 12.5 10l-5 5.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export function ServicesCarousel({ slides }: ServicesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (total === 0) {
        return;
      }

      setActiveIndex(wrapCarouselIndex(index, 0, total));
    },
    [total]
  );

  const goNext = useCallback(() => {
    setActiveIndex((current) => wrapCarouselIndex(current, 1, total));
  }, [total]);

  const goPrevious = useCallback(() => {
    setActiveIndex((current) => wrapCarouselIndex(current, -1, total));
  }, [total]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }
    },
    [goNext, goPrevious]
  );

  if (total === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby={sectionId}
      className="bg-[var(--bg-primary)] py-16 md:py-24"
    >
      <h2 id={sectionId} className="sr-only">
        Services
      </h2>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Service categories"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative w-full outline-none focus-visible:ring-2 focus-visible:ring-sakura-ink focus-visible:ring-offset-2"
      >
        <div className="relative min-h-[28rem] w-full overflow-hidden md:min-h-[32rem]">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={slide.id}
                id={`services-carousel-panel-${slide.id}`}
                role="tabpanel"
                aria-roledescription="slide"
                aria-label={formatCarouselSlideLabel(index, total, slide.title)}
                aria-hidden={!isActive}
                hidden={!isActive}
                className={`absolute inset-0 flex w-full items-end bg-gradient-to-br from-[var(--color-charcoal)] via-sakura-ink/50 to-sakura-ink/80 px-6 py-12 transition-opacity duration-500 motion-reduce:transition-none md:px-12 md:py-16 ${
                  isActive ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div className="mx-auto w-full max-w-[1200px]">
                  <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-gold)]">
                    {slide.eyebrow}
                  </p>
                  <h2 className="mt-3 max-w-[18ch] font-display text-3xl font-bold leading-tight text-[var(--color-ivory)] md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h2>
                  <p className="mt-4 max-w-[42rem] text-base text-[var(--color-ivory)]/90 md:text-lg">
                    {slide.summary}
                  </p>
                  {isActive ? (
                    <div className="mt-8">
                      <Button href={slide.exploreHref} variant="ghost" className="text-[var(--color-ivory)] hover:bg-white/10 hover:text-[var(--color-ivory)]">
                        Explore
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}

        </div>

        <div className="mt-6 flex flex-col items-center gap-4 px-6 md:px-12">
          <div
            role="tablist"
            aria-label="Service category slides"
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                id={`services-carousel-tab-${slide.id}`}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-controls={`services-carousel-panel-${slide.id}`}
                tabIndex={getRovingTabIndex(activeIndex, index)}
                onClick={() => goToSlide(index)}
                className={`inline-flex min-h-11 items-center rounded-[var(--radius-pill)] border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-offset-2 motion-reduce:transition-none ${
                  index === activeIndex
                    ? "border-sakura bg-sakura text-[var(--text-on-accent)]"
                    : "border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                {slide.title}
              </button>
            ))}
          </div>

          <div
            className="flex items-center gap-2 md:hidden"
            aria-hidden="true"
          >
            {slides.map((slide, index) => (
              <span
                key={slide.id}
                className={`h-1.5 rounded-full transition-all motion-reduce:transition-none ${
                  index === activeIndex
                    ? "w-8 bg-sakura"
                    : "w-1.5 bg-[var(--border-default)]"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous service category"
              onClick={goPrevious}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] focus-visible:outline-offset-2 motion-reduce:transition-none md:absolute md:right-4 md:top-1/2 md:-translate-y-[calc(50%+1.75rem)] md:border-white/30 md:bg-black/20 md:text-[var(--color-ivory)] md:backdrop-blur-sm md:hover:bg-black/40"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next service category"
              onClick={goNext}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] focus-visible:outline-offset-2 motion-reduce:transition-none md:absolute md:right-4 md:top-1/2 md:translate-y-[0.75rem] md:border-white/30 md:bg-black/20 md:text-[var(--color-ivory)] md:backdrop-blur-sm md:hover:bg-black/40"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
