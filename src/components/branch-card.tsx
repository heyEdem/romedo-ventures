import type { Branch } from '@/lib/content/types';
import { buildTelUrl } from '@/lib/contact';

interface BranchCardProps {
  branch: Branch;
}

export default function BranchCard({ branch }: BranchCardProps) {
  const hasPhone = Boolean(branch.phone);
  const hasWhatsapp = Boolean(branch.whatsapp);
  const hasMapUrl = Boolean(branch.mapUrl);

  const whatsappDigits = branch.whatsapp?.replace(/[^0-9]/g, '') ?? '';
  const whatsappUrl = hasWhatsapp
    ? `https://wa.me/${whatsappDigits}`
    : undefined;
  const telUrl = hasPhone ? buildTelUrl(branch.phone) : undefined;

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{branch.name}</h3>
        {branch.generalLocation && (
          <p className="card-description">{branch.generalLocation}</p>
        )}
        {branch.openingHours && (
          <p className="card-meta">{branch.openingHours}</p>
        )}
        {(hasPhone || hasWhatsapp) && (
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)', flexWrap: 'wrap' }}>
            {hasWhatsapp && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="product-action product-action-whatsapp"
                style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-2) var(--space-4)' }}
              >
                WhatsApp
              </a>
            )}
            {hasPhone && (
              <a
                href={telUrl}
                className="product-action product-action-call"
                style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-2) var(--space-4)' }}
              >
                Call
              </a>
            )}
          </div>
        )}
        {hasMapUrl && (
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
    </div>
  );
}
