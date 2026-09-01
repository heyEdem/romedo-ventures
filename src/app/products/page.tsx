import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';
import ProductCard from '@/components/product-card';
import FilterBar from '@/components/filter-bar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | Romedo Ventures',
  description:
    'Browse our catalogue of smartphones, laptops, tablets, and accessories from leading brands.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; brand?: string }>;
}) {
  const { q, category, brand } = await searchParams;
  const adapter = createContentAdapter(seedStore);
  const query = q?.trim() ?? '';
  const products = adapter.filterProducts({
    query: query || undefined,
    category: category || undefined,
    brand: brand || undefined,
  });
  const categories = adapter.getPublishedCategories();
  const brands = adapter.getBrands();

  const activeFilters = [category, brand].filter(Boolean);
  const hasFilters = !!query || activeFilters.length > 0;

  return (
    <section>
      <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
        Products
      </h1>

      <FilterBar
        categories={categories}
        brands={brands}
        activeCategory={category}
        activeBrand={brand}
      />

      {hasFilters ? (
        <p
          style={{
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-6)',
          }}
        >
          {products.length === 0
            ? `No results${query ? ` for "${query}"` : ''}${category ? ` in "${categories.find((c) => c.slug === category)?.name ?? category}"` : ''}${brand ? ` by "${brand}"` : ''}.`
            : `${products.length} result${products.length === 1 ? '' : 's'}${query ? ` for "${query}"` : ''}${category ? ` in "${categories.find((c) => c.slug === category)?.name ?? category}"` : ''}${brand ? ` by "${brand}"` : ''}.`}
        </p>
      ) : (
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          Browse our catalogue of technology products.
        </p>
      )}

      {products.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)' }}>
          {hasFilters
            ? 'Try adjusting your filters or search term.'
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
