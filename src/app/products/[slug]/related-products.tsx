'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/content/types';

interface RelatedProductsProps {
  products: Product[];
}

function RelatedCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/products/${product.slug}`} className="card">
      <div className="card-image">
        {imgError || product.images.length === 0 ? (
          <div className="card-image-fallback">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        ) : (
          <img
            src={product.images[0]}
            alt={product.name}
            className="card-image-img"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="card-body">
        <p className="card-brand">{product.brand}</p>
        <h3 className="card-title">{product.name}</h3>
        {product.priceLabel && (
          <p className="card-price">{product.priceLabel}</p>
        )}
      </div>
    </Link>
  );
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="related-grid">
      {products.map((product) => (
        <RelatedCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
