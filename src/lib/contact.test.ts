import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl, buildTelUrl, buildGeneralWhatsAppUrl } from './contact';
import type { ContactConfig } from './content/types';

const testContact: ContactConfig = {
  whatsapp: '+233123456789',
  phone: '+233123456789',
  defaultMessage: 'Hello Romedo Ventures',
};

describe('ContactLinkTest', () => {
  it('generatesEncodedProductWhatsAppUrl', () => {
    const url = buildWhatsAppUrl('+233123456789', 'Samsung Galaxy A56');
    expect(url).toBe(
      "https://wa.me/233123456789?text=Hi%20Romedo%20Ventures%2C%20I'm%20interested%20in%20the%20Samsung%20Galaxy%20A56.%20Is%20it%20currently%20available%3F",
    );
  });

  it('usesConfiguredPhoneNumber', () => {
    const url = buildTelUrl('+233123456789');
    expect(url).toBe('tel:+233123456789');
  });

  it('strips non-numeric characters from phone for WhatsApp', () => {
    const url = buildWhatsAppUrl('+233-ABC-123-4567', 'Test Product');
    expect(url).toContain('wa.me/2331234567');
    expect(url).not.toContain('ABC');
    expect(url).not.toContain('-');
  });

  it('encodes special characters in product name', () => {
    const url = buildWhatsAppUrl('+233123456789', 'OReilly & Sons');
    expect(url).toContain(encodeURIComponent('OReilly & Sons'));
  });

  it('builds general WhatsApp url from contact config', () => {
    const url = buildGeneralWhatsAppUrl(testContact);
    expect(url).toBe(
      'https://wa.me/233123456789?text=Hello%20Romedo%20Ventures',
    );
  });
});
