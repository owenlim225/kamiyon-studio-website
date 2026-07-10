import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description: "News and updates from Kamiyon Studio — coming soon.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <section className="bg-[var(--bg-primary)] py-16 md:py-24">
      <Container>
        <div className="max-w-[680px]">
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            Blog
          </h1>
          <p className="mt-4 text-base text-[var(--text-secondary)] md:text-lg">
            Coming soon
          </p>
        </div>
      </Container>
    </section>
  );
}
