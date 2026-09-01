import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';
import { buildWhatsAppUrl, buildTelUrl } from '@/lib/contact';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import type { Metadata } from 'next';
import ProductGallery from './product-gallery';
import RelatedProducts from './related-products';

export function generateStaticParams() {
  const adapter = createContentAdapter(seedStore);
  return adapter.getPublishedProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const adapter = createContentAdapter(seedStore);
  const product = adapter.getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: `${product.name} — Romedo Ventures`,
    description: product.shortDescription,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const adapter = createContentAdapter(seedStore);
  const product = adapter.getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const category = adapter.getCategoryBySlug(product.category);
  const related = adapter.getRelatedProducts(product.slug, 4);
  const contact = adapter.getContactConfig();
  const whatsappUrl = buildWhatsAppUrl(contact.whatsapp, product.name);
  const telUrl = buildTelUrl(contact.phone);

  return (
    <section>
      <nav className="product-breadcrumb" aria-label="Breadcrumb">
        <Link href="/products">Products</Link>
        <span aria-hidden="true">/</span>
        {category && (
          <>
            <Link href={`/categories/${category.slug}`}>{category.name}</Link>
            <span aria-hidden="true">/</span>
          </>
        )}
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="product-detail">
        <div className="product-detail-main">
          <ProductGallery
            images={product.images}
            name={product.name}
          />

          <div className="product-detail-info">
            <p className="product-brand">{product.brand}</p>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-short-desc">{product.shortDescription}</p>

            {product.priceLabel && (
              <p className="product-price">{product.priceLabel}</p>
            )}

            <div className="product-actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="product-action product-action-whatsapp"
                aria-label={`Enquire about ${product.name} on WhatsApp`}
              >
                Ask about this product
              </a>
              <a
                href={telUrl}
                className="product-action product-action-call"
                aria-label={`Call us about ${product.name}`}
              >
                Call us
              </a>
            </div>

            <p className="product-disclaimer">
              Price and availability may vary by location. Contact us to
              confirm.
            </p>
          </div>
        </div>

        <div className="product-detail-body">
          <div className="product-description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          {Object.keys(product.specifications).length > 0 && (
            <div className="product-specs">
              <h2>Specifications</h2>
              <dl>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <Fragment key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </Fragment>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="product-related">
          <h2>Related products</h2>
          <RelatedProducts products={related} />
        </div>
      )}
    </section>
  );
}
