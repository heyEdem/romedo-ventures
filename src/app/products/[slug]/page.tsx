import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';
import Link from 'next/link';

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const adapter = createContentAdapter(seedStore);
  const products = adapter.getPublishedProducts();
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <section>
        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
          Product not found
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          The product you are looking for does not exist or is not published.
        </p>
        <Link href="/products" style={{ color: 'var(--color-primary)' }}>
          Back to products
        </Link>
      </section>
    );
  }

  return (
    <section>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
        <Link href="/products" style={{ color: 'var(--color-primary)' }}>Products</Link>
        {' / '}
        <Link href={`/categories/${product.category}`} style={{ color: 'var(--color-primary)' }}>
          {product.category}
        </Link>
      </p>

      <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
        {product.name}
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
        {product.shortDescription}
      </p>

      <div
        style={{
          padding: 'var(--space-8)',
          background: 'var(--color-surface-raised)',
          borderRadius: 'var(--radius-xl)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
          Product image placeholder
        </p>
      </div>

      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>
          Description
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
          {product.description}
        </p>
      </div>

      {Object.keys(product.specifications).length > 0 && (
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>
            Specifications
          </h2>
          <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--space-2) var(--space-4)' }}>
            {Object.entries(product.specifications).map(([key, value]) => (
              <Fragment key={key}>
                <dt style={{ fontWeight: 'var(--weight-medium)', color: 'var(--color-text)' }}>
                  {key}
                </dt>
                <dd style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                  {value}
                </dd>
              </Fragment>
            ))}
          </dl>
        </div>
      )}

      {product.priceLabel && (
        <p style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--space-6)' }}>
          {product.priceLabel}
        </p>
      )}

      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' }}>
        Price and availability may vary by location. Contact us to confirm.
      </p>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <a
          href={`https://wa.me/${seedStore.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi Romedo Ventures, I'm interested in the ${product.name}. Is it currently available?`)}`}
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
          Ask about this product
        </a>
        <a
          href={`tel:${seedStore.contact.phone}`}
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
          Call us
        </a>
      </div>
    </section>
  );
}

import { Fragment } from 'react';
