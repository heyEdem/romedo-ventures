import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';
import Link from 'next/link';

export default function CategoriesPage() {
  const adapter = createContentAdapter(seedStore);
  const categories = adapter.getPublishedCategories();

  return (
    <section>
      <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
        Categories
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
        Explore products by category.
      </p>

      {categories.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)' }}>No categories available yet.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              style={{
                display: 'block',
                padding: 'var(--space-6)',
                background: 'var(--color-surface-raised)',
                borderRadius: 'var(--radius-xl)',
                textDecoration: 'none',
                color: 'var(--color-text)',
              }}
            >
              <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                {cat.name}
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
