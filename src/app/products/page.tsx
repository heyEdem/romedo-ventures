import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';
import ProductCard from '@/components/product-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | Romedo Ventures',
  description:
    'Browse our catalogue of smartphones, laptops, tablets, and accessories from leading brands.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const adapter = createContentAdapter(seedStore);
  const query = q?.trim() ?? '';
  const products = adapter.searchProducts(query);

  return (
    <section>
      <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
        Products
      </h1>

      {query ? (
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
          {products.length === 0
            ? `No results for "${query}".`
            : `${products.length} result${products.length === 1 ? '' : 's'} for "${query}".`}
        </p>
      ) : (
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
          Browse our catalogue of technology products.
        </p>
      )}

      {products.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)' }}>
          {query
            ? 'Try a different search term or browse all products.'
            : 'No products available yet.'}
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              slug={product.slug}
              name={product.name}
              shortDescription={product.shortDescription}
              image={product.images[0] ?? ''}
              priceLabel={product.priceLabel}
              brand={product.brand}
            />
          ))}
        </div>
      )}
    </section>
  );
}
