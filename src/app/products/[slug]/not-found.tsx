import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <section className="empty-state">
      <div className="empty-state-icon">
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
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </div>
      <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>
        Product not found
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
        The product you are looking for does not exist or is not published.
      </p>
      <Link href="/products" className="retry-button">
        Browse products
      </Link>
    </section>
  );
}
