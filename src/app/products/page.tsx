import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';
import ProductCard from '@/components/product-card';
import FilterBar from '@/components/filter-bar';
import Pagination from '@/components/pagination';
import type { Metadata } from 'next';

const PRODUCTS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: 'Products | Romedo Ventures',
  description:
    'Browse our catalogue of smartphones, laptops, tablets, and accessories from leading brands.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; brand?: string; page?: string }>;
}) {
  const { q, category, brand, page } = await searchParams;
  const adapter = createContentAdapter(seedStore);
  const query = q?.trim() ?? '';
  const currentPage = Math.max(1, parseInt(page ?? '1', 10) || 1);

  const allFilteredProducts = adapter.filterProducts({
    query: query || undefined,
    category: category || undefined,
    brand: brand || undefined,
  });

  const categories = adapter.getPublishedCategories();
  const brands = adapter.getBrands();
  const totalProducts = allFilteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PRODUCTS_PER_PAGE;
  const products = allFilteredProducts.slice(start, start + PRODUCTS_PER_PAGE);

  const activeFilters = [category, brand].filter(Boolean);
  const hasFilters = !!query || activeFilters.length > 0;

  const categoryName = category
    ? categories.find((c) => c.slug === category)?.name ?? category
    : null;

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
          {totalProducts === 0
            ? `No results${query ? ` for "${query}"` : ''}${categoryName ? ` in "${categoryName}"` : ''}${brand ? ` by "${brand}"` : ''}.`
            : `Showing ${start + 1}–${Math.min(start + PRODUCTS_PER_PAGE, totalProducts)} of ${totalProducts} result${totalProducts === 1 ? '' : 's'}${query ? ` for "${query}"` : ''}${categoryName ? ` in "${categoryName}"` : ''}${brand ? ` by "${brand}"` : ''}.`}
        </p>
      ) : (
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          {totalProducts === 0
            ? 'No products available yet.'
            : `Showing ${start + 1}–${Math.min(start + PRODUCTS_PER_PAGE, totalProducts)} of ${totalProducts} products.`}
        </p>
      )}

      {totalProducts === 0 ? (
        <div className="empty-state" role="status">
          <div className="empty-state-icon" aria-hidden="true">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          <h2
            id="empty-heading"
            style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}
          >
            {hasFilters ? 'No matching products' : 'No products yet'}
          </h2>

          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', maxWidth: '28rem', marginInline: 'auto' }}>
            {hasFilters
              ? 'We could not find any products matching your search or filters. Try adjusting your criteria.'
              : 'The product catalogue is being set up. Check back soon or contact us directly.'}
          </p>

          {hasFilters && (
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href="/products"
                className="retry-button"
              >
                Clear all filters
              </a>
              <a
                href="/"
                className="retry-button retry-button-secondary"
              >
                Return to homepage
              </a>
            </div>
          )}

          {!hasFilters && (
            <a
              href="/"
              className="retry-button"
            >
              Return to homepage
            </a>
          )}
        </div>
      ) : (
        <>
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

          {totalPages > 1 && (
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              basePath="/products"
              searchParams={searchParams}
            />
          )}
        </>
      )}
    </section>
  );
}
