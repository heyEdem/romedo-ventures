import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';
import BranchCard from '@/components/branch-card';

export default function AboutPage() {
  const adapter = createContentAdapter(seedStore);
  const info = adapter.getBusinessInfo();
  const branches = adapter.getBranches();

  const hasTagline = Boolean(info.tagline);
  const hasDescription = Boolean(info.description);
  const hasMission = Boolean(info.mission);
  const hasAnyInfo = hasTagline || hasDescription || hasMission;

  return (
    <section>
      <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
        About Romedo Ventures
      </h1>

      {hasTagline && (
        <p
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-6)',
          }}
        >
          {info.tagline}
        </p>
      )}

      {hasDescription && (
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            {info.description}
          </p>
        </div>
      )}

      {hasMission && (
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
            Our Mission
          </h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            {info.mission}
          </p>
        </div>
      )}

      {!hasAnyInfo && (
        <p
          style={{
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-8)',
          }}
        >
          Business information is being verified and will be available soon.
        </p>
      )}

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
              <BranchCard key={branch.name} branch={branch} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
