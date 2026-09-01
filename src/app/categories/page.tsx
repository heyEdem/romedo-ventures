import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';
import CategoryCard from '@/components/category-card';

export default function CategoriesPage() {
  const adapter = createContentAdapter(seedStore);
  const categories = adapter.getPublishedCategories();
  const products = adapter.getPublishedProducts();

  function productCount(categorySlug: string): number {
    return products.filter((p) => p.category === categorySlug).length;
  }

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
      )}
    </section>
  );
}
