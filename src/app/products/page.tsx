import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';
import ProductCard from '@/components/product-card';

export default function ProductsPage() {
  const adapter = createContentAdapter(seedStore);
  const products = adapter.getPublishedProducts();

  return (
    <section>
      <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
        Products
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
        Browse our catalogue of technology products.
      </p>

      {products.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)' }}>No products available yet.</p>
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
