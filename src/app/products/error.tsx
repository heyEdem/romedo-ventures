'use client';

import { useEffect } from 'react';

interface ProductsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductsError({ error, reset }: ProductsErrorProps) {
  useEffect(() => {
    console.error('Products page error:', error);
  }, [error]);

  return (
    <section role="alert" aria-labelledby="products-error-heading">
      <h1
        id="products-error-heading"
        style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}
      >
        Something went wrong
      </h1>

      <div className="error-state">
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
          We could not load the product catalogue. This might be a temporary issue.
        </p>

        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)' }}>
          You can try again, or contact us directly if the problem persists.
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={reset}
            className="retry-button"
          >
            Try again
          </button>

          <a
            href="/"
            className="retry-button retry-button-secondary"
          >
            Return to homepage
          </a>
        </div>
      </div>
    </section>
  );
}
