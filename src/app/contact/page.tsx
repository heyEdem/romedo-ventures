import { seedStore } from '@/lib/content/seed';
import { createContentAdapter } from '@/lib/content/adapter';
import { buildGeneralWhatsAppUrl, buildTelUrl } from '@/lib/contact';
import BranchCard from '@/components/branch-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Romedo Ventures',
  description:
    'Get in touch with Romedo Ventures via WhatsApp or phone. Visit our branches across Ghana.',
  openGraph: {
    title: 'Contact Romedo Ventures',
    description: 'Get in touch via WhatsApp or phone.',
    type: 'website',
  },
};

export default function ContactPage() {
  const adapter = createContentAdapter(seedStore);
  const contactConfig = adapter.getContactConfig();
  const branches = adapter.getBranches();
  const whatsappUrl = buildGeneralWhatsAppUrl(contactConfig);
  const telUrl = buildTelUrl(contactConfig.phone);

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
          href={whatsappUrl}
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
          href={telUrl}
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
            {contactConfig.phone}
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
              <BranchCard key={branch.name} branch={branch} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
