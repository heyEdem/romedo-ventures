import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';

export default function ContactPage() {
  const adapter = createContentAdapter(seedStore);
  const { whatsapp, phone, defaultMessage } = adapter.getContactConfig();
  const branches = adapter.getBranches();

  return (
    <section>
      <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>
        Contact Us
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
        Get in touch via WhatsApp or phone. We are happy to help.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)',
        }}
      >
        <a
          href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 'var(--space-8) var(--space-6)',
            background: 'var(--color-accent)',
            color: 'var(--color-text-inverse)',
            borderRadius: 'var(--radius-xl)',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--space-2)' }}>
            WhatsApp
          </span>
          <span style={{ fontSize: 'var(--text-sm)', opacity: 0.9 }}>
            Send us a message
          </span>
        </a>

        <a
          href={`tel:${phone}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 'var(--space-8) var(--space-6)',
            background: 'var(--color-primary)',
            color: 'var(--color-text-inverse)',
            borderRadius: 'var(--radius-xl)',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--space-2)' }}>
            Call Us
          </span>
          <span style={{ fontSize: 'var(--text-sm)', opacity: 0.9 }}>
            {phone}
          </span>
        </a>
      </div>

      {branches.length > 0 && (
        <div>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
            Visit a Branch
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
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}>
                  {branch.generalLocation}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  {branch.openingHours}
                </p>
                {branch.mapUrl && (
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      marginTop: 'var(--space-3)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    View on map
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
