import type { ContactConfig } from './content/types';

export function buildWhatsAppUrl(
  phone: string,
  productName: string,
): string {
  const digits = phone.replace(/[^0-9]/g, '');
  const message = `Hi Romedo Ventures, I'm interested in the ${productName}. Is it currently available?`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildTelUrl(phone: string): string {
  return `tel:${phone}`;
}

export function buildGeneralWhatsAppUrl(contact: ContactConfig): string {
  const digits = contact.whatsapp.replace(/[^0-9]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(contact.defaultMessage)}`;
}
