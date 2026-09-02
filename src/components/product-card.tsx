'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  priceLabel?: string;
  brand?: string;
}

export default function ProductCard({
  slug,
  name,
  shortDescription,
  image,
  priceLabel,
  brand,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/products/${slug}`}
      className="card"
    >
      <div className="card-image">
        {imgError ? (
          <div className="card-image-fallback">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        ) : (
          <Image
            src={image}
            alt={name}
            width={400}
            height={300}
            loading="lazy"
            className="card-image-img"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="card-body">
        {brand && <p className="card-brand">{brand}</p>}
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{shortDescription}</p>
        {priceLabel && (
          <p className="card-price">{priceLabel}</p>
        )}
      </div>
    </Link>
  );
}
