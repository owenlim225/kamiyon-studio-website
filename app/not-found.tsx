import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-[var(--bg-primary)] py-20 md:py-28">
      <Container className="text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-sakura-ink">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base text-[var(--text-secondary)]">
          The page you are looking for may have moved or does not exist yet.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" variant="primary">
            Back to home
          </Button>
          <Link
            href="/contact"
            className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-sakura-ink focus-visible:outline-offset-2"
          >
            Get in touch
          </Link>
        </div>
      </Container>
    </section>
  );
}
