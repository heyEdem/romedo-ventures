import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';
import Link from 'next/link';
import ProductCard from '@/components/product-card';

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
      <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-2)' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
          <Link href="/categories" style={{ color: 'var(--color-primary)' }}>Categories</Link>
          {' / '}
          <span aria-current="page">{category.name}</span>
        </p>
      </nav>

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
