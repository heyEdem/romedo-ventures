'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const hasImages = images.length > 0;
  const displayImages = hasImages ? images : [];

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        {imgError || !hasImages ? (
          <div className="product-gallery-fallback">
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
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span>Image coming soon</span>
          </div>
        ) : (
          <Image
            src={displayImages[activeIndex]}
            alt={`${name} — image ${activeIndex + 1} of ${displayImages.length}`}
            width={800}
            height={600}
            priority
            className="product-gallery-img"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {displayImages.length > 1 && (
        <div className="product-gallery-thumbs" role="tablist">
          {displayImages.map((img, i) => (
            <button
              key={img}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`View image ${i + 1}`}
              className={`product-gallery-thumb ${i === activeIndex ? 'product-gallery-thumb-active' : ''}`}
              onClick={() => {
                setActiveIndex(i);
                setImgError(false);
              }}
            >
              <Image src={img} alt="" width={56} height={56} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
