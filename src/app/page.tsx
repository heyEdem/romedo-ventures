import Link from 'next/link';
import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';
import SearchBar from '@/components/search-bar';
import CategoryCard from '@/components/category-card';
import ProductCard from '@/components/product-card';
import type { Metadata } from 'next';

export const prototypeName = 'Romedo Ventures';

export const metadata: Metadata = {
  title: 'Romedo Ventures — Technology for everyday life',
  description:
    'Browse smartphones, laptops, tablets, and accessories from leading brands. Fast delivery across Ghana via WhatsApp or phone.',
  openGraph: {
    title: 'Romedo Ventures',
    description: 'Technology for everyday life.',
    type: 'website',
  },
};

export default function Home() {
  const adapter = createContentAdapter(seedStore);
  const categories = adapter.getPublishedCategories();
  const products = adapter.getPublishedProducts();
  const featured = products.filter((p) => p.featured);
  const branches = adapter.getBranches();
  const { whatsapp, phone } = adapter.getContactConfig();

  function productCount(categorySlug: string): number {
    return products.filter((p) => p.category === categorySlug).length;
  }

  return (
    <>
      <section style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
        <h1
          style={{
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--weight-bold)',
            marginBottom: 'var(--space-4)',
          }}
        >
          {prototypeName}
        </h1>
        <p
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            maxWidth: '32rem',
            margin: '0 auto var(--space-6)',
          }}
        >
          Technology for everyday life.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: 'var(--space-3) var(--space-6)',
              background: 'var(--color-primary)',
              color: 'var(--color-text-inverse)',
              borderRadius: 'var(--radius-lg)',
              fontWeight: 'var(--weight-medium)',
              textDecoration: 'none',
            }}
          >
            Explore Products
          </Link>
          <a
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: 'var(--space-3) var(--space-6)',
              background: 'var(--color-accent)',
              color: 'var(--color-text-inverse)',
              borderRadius: 'var(--radius-lg)',
              fontWeight: 'var(--weight-medium)',
              textDecoration: 'none',
            }}
          >
            WhatsApp Us
          </a>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--space-12)' }}>
        <SearchBar />
      </section>

      {categories.length > 0 && (
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--weight-semibold)',
              marginBottom: 'var(--space-6)',
            }}
          >
            Categories
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {categories.map((cat) => (
              <CategoryCard
                key={cat.slug}
                slug={cat.slug}
                name={cat.name}
                description={cat.description}
                image={cat.image}
                productCount={productCount(cat.slug)}
              />
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--weight-semibold)',
              marginBottom: 'var(--space-6)',
            }}
          >
            Featured Products
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {featured.map((product) => (
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
        </section>
      )}

      {branches.length > 0 && (
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--weight-semibold)',
              marginBottom: 'var(--space-6)',
            }}
          >
            Find Us
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {branches.map((branch) => (
              <div
                key={branch.name}
                style={{
                  padding: 'var(--space-6)',
                  background: 'var(--color-surface-raised)',
                  borderRadius: 'var(--radius-xl)',
                }}
              >
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                  {branch.name}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                  {branch.generalLocation}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  {branch.openingHours}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section
        style={{
          textAlign: 'center',
          padding: 'var(--space-10) var(--space-4)',
          background: 'var(--color-surface-raised)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
          Ready to get in touch?
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          Reach out via WhatsApp or give us a call.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: 'var(--space-3) var(--space-6)',
              background: 'var(--color-accent)',
              color: 'var(--color-text-inverse)',
              borderRadius: 'var(--radius-lg)',
              fontWeight: 'var(--weight-medium)',
              textDecoration: 'none',
            }}
          >
            WhatsApp Us
          </a>
          <a
            href={`tel:${phone}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: 'var(--space-3) var(--space-6)',
              background: 'var(--color-primary)',
              color: 'var(--color-text-inverse)',
              borderRadius: 'var(--radius-lg)',
              fontWeight: 'var(--weight-medium)',
              textDecoration: 'none',
            }}
          >
            Call Us
          </a>
        </div>
      </section>
    </>
  );
}
