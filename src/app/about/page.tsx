import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';

export default function AboutPage() {
  const adapter = createContentAdapter(seedStore);
  const branches = adapter.getBranches();

  return (
    <section>
      <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
        About Romedo Ventures
      </h1>
      <p
        style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-6)',
        }}
      >
        Technology for everyday life.
      </p>

      <div style={{ marginBottom: 'var(--space-8)' }}>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
          Romedo Ventures is your trusted technology retailer, offering a wide
          range of smartphones, laptops, tablets, and accessories from leading
          brands.
        </p>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Visit one of our branches to explore products in person and get
          personalised advice from our team.
        </p>
      </div>

      {branches.length > 0 && (
        <div>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
            Our Locations
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {branches.map((branch) => (
              <div
                key={branch.name}
                style={{
                  padding: 'var(--space-6)',
                  background: 'var(--color-surface-raised)',
                  borderRadius: 'var(--radius-xl)',
                }}
              >
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                  {branch.name}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                  {branch.generalLocation}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  {branch.openingHours}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
