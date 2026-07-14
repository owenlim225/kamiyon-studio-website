import { Container } from "@/components/ui/Container";
import {
  PARTNER_PLACEHOLDERS,
  type PartnerPlaceholder,
} from "@/lib/home/partner-placeholders";

type PartnersMarqueeEyebrow = "Partners" | "Clients";

type PartnersMarqueeProps = {
  eyebrow?: PartnersMarqueeEyebrow;
  partners?: PartnerPlaceholder[];
  /** `overlay` sits on dark hero media with a transparent section background. */
  variant?: "default" | "overlay";
};

function PartnerSlotList({
  partners,
  ariaHidden = false,
  variant = "default",
}: {
  partners: PartnerPlaceholder[];
  ariaHidden?: boolean;
  variant?: "default" | "overlay";
}) {
  const slotClassName =
    variant === "overlay"
      ? "inline-flex min-h-14 min-w-[10rem] items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-ivory)]/25 bg-[var(--color-ivory)]/10 px-6 py-3 text-sm font-medium uppercase tracking-wide text-[var(--color-ivory)]/80 backdrop-blur-sm md:min-w-[12rem]"
      : "inline-flex min-h-16 min-w-[10rem] items-center justify-center rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-4 text-sm font-medium uppercase tracking-wide text-[var(--text-muted)] shadow-[var(--shadow-sm)] md:min-w-[12rem]";

  return (
    <ul
      role="list"
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-6 md:gap-10"
    >
      {partners.map((partner) => (
        <li key={`${ariaHidden ? "duplicate-" : ""}${partner.id}`}>
          <span className={slotClassName} aria-label={partner.label}>
            {partner.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function PartnersMarquee({
  eyebrow,
  partners = PARTNER_PLACEHOLDERS,
  variant = "default",
}: PartnersMarqueeProps) {
  const sectionLabel = eyebrow ?? "Partner logos";
  const isOverlay = variant === "overlay";

  return (
    <section
      data-hero-partners={isOverlay ? "" : undefined}
      className={
        isOverlay
          ? "bg-transparent py-8 md:py-10"
          : "bg-[var(--bg-secondary)] py-12 md:py-16"
      }
      aria-label={sectionLabel}
    >
      <Container>
        {eyebrow ? (
          <p
            id="partners-marquee-eyebrow"
            className={
              isOverlay
                ? "text-center text-sm font-semibold uppercase tracking-wide text-[var(--color-ivory)]/70"
                : "text-center text-sm font-semibold uppercase tracking-wide text-sakura-ink"
            }
          >
            {eyebrow}
          </p>
        ) : null}

        <div
          className={`partners-marquee ${eyebrow ? "mt-6" : ""}`}
          data-testid="partners-marquee-track"
          tabIndex={0}
          aria-label="Scrolling partner logos. Hover or focus to pause."
        >
          <div className="partners-marquee__viewport overflow-hidden">
            <div className="partners-marquee__track flex w-max">
              <PartnerSlotList partners={partners} variant={variant} />
              <PartnerSlotList
                partners={partners}
                ariaHidden
                variant={variant}
              />
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .partners-marquee__track {
          animation: partners-marquee-scroll 40s linear infinite;
        }

        .partners-marquee:hover .partners-marquee__track,
        .partners-marquee:focus-within .partners-marquee__track {
          animation-play-state: paused;
        }

        @keyframes partners-marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .partners-marquee__track {
            animation: none;
            flex-wrap: nowrap;
            justify-content: center;
            width: 100%;
            max-width: 100%;
            overflow-x: auto;
          }

          .partners-marquee__viewport {
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}
