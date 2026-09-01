export default function ProductsLoading() {
  return (
    <section aria-busy="true" aria-label="Loading products">
      <h1
        style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}
      >
        Products
      </h1>

      <div className="filter-bar" aria-hidden="true">
        <div className="filter-bar-group">
          <div className="skeleton skeleton-text" style={{ width: '5rem' }} />
          <div className="skeleton skeleton-input" />
        </div>
        <div className="filter-bar-group">
          <div className="skeleton skeleton-text" style={{ width: '4rem' }} />
          <div className="skeleton skeleton-input" />
        </div>
      </div>

      <div
        className="skeleton skeleton-text"
        style={{ width: '12rem', marginBottom: 'var(--space-6)' }}
      />

      <div className="product-grid-skeleton" role="status">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card skeleton-card">
            <div className="card-image skeleton-image" />
            <div className="card-body">
              <div className="skeleton skeleton-text" style={{ width: '4rem' }} />
              <div className="skeleton skeleton-text" style={{ width: '80%' }} />
              <div className="skeleton skeleton-text" style={{ width: '60%' }} />
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">Loading products, please wait...</span>
    </section>
  );
}
