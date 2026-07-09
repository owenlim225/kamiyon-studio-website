import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/lib/cms/types";
import { EmptyState } from "./EmptyState";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="bg-[var(--bg-primary)] py-16 md:py-24">
      <Container>
        <div className="max-w-[680px]">
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            Products
          </h1>
          <p className="mt-4 text-base text-[var(--text-secondary)] md:text-lg">
            Original intellectual property from Kamiyon Studio — games and
            interactive experiences built to educate, inspire, and make a
            lasting impact.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug.current} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              message="Products coming soon."
              backHref="/"
              backLabel="Back to home"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
