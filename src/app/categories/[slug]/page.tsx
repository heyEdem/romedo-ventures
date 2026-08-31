import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';
import Link from 'next/link';

export default function CategoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const adapter = createContentAdapter(seedStore);
  const categories = adapter.getPublishedCategories();
  const category = categories.find((c) => c.slug === params.slug);
  const products = adapter
    .getPublishedProducts()
    .filter((p) => p.category === params.slug);

  if (!category) {
    return (
      <section>
        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
          Category not found
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          The category you are looking for does not exist or is not published.
        </p>
        <Link href="/categories" style={{ color: 'var(--color-primary)' }}>
          Back to categories
        </Link>
      </section>
    );
  }

  return (
    <section>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
        <Link href="/categories" style={{ color: 'var(--color-primary)' }}>Categories</Link>
        {' / '}
        {category.name}
      </p>

      <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
        {category.name}
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
        {category.description}
      </p>

      {products.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)' }}>
          No products in this category yet.
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
