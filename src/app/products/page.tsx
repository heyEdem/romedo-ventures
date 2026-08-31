import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';
import Link from 'next/link';

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
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              style={{
                display: 'block',
                padding: 'var(--space-6)',
                background: 'var(--color-surface-raised)',
                borderRadius: 'var(--radius-xl)',
                textDecoration: 'none',
                color: 'var(--color-text)',
              }}
            >
              <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                {product.name}
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                {product.shortDescription}
              </p>
              {product.priceLabel && (
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', marginTop: 'var(--space-2)' }}>
                  {product.priceLabel}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
