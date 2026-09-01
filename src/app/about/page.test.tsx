import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src');

function readFile(relativePath: string): string {
  return readFileSync(join(srcDir, relativePath), 'utf-8');
}

describe('BusinessInfoTest', () => {
  it('rendersOnlySuppliedFacts: about page does not contain invented history', () => {
    const page = readFile('app/about/page.tsx');
    expect(page).not.toContain('founded in');
    expect(page).not.toContain('established in');
    expect(page).not.toContain('since 20');
  });

  it('rendersOnlySuppliedFacts: about page uses adapter for business info', () => {
    const page = readFile('app/about/page.tsx');
    expect(page).toContain('getBusinessInfo');
  });

  it('rendersOnlySuppliedFacts: about page shows missing-content fallback when no info', () => {
    const page = readFile('app/about/page.tsx');
    expect(page).toContain('Business information is being verified');
  });
});

describe('ContactPageTest', () => {
  it('exposesWhatsAppAndTelephoneActions: contact page uses utility functions', () => {
    const page = readFile('app/contact/page.tsx');
    expect(page).toContain('buildGeneralWhatsAppUrl');
    expect(page).toContain('buildTelUrl');
  });

  it('exposesWhatsAppAndTelephoneActions: contact page renders WhatsApp action', () => {
    const page = readFile('app/contact/page.tsx');
    expect(page).toContain('WhatsApp');
  });

  it('exposesWhatsAppAndTelephoneActions: contact page renders phone action', () => {
    const page = readFile('app/contact/page.tsx');
    expect(page).toContain('Call Us');
  });
});

describe('ConversionCopyTest', () => {
  const pages = [
    'app/page.tsx',
    'app/about/page.tsx',
    'app/contact/page.tsx',
    'app/products/page.tsx',
    'app/categories/page.tsx',
  ];

  for (const pagePath of pages) {
    it(`${pagePath} containsNoPurchaseCtas`, () => {
      const page = readFile(pagePath);
      expect(page).not.toContain('Buy Now');
      expect(page).not.toContain('Add to Cart');
      expect(page).not.toContain('Purchase');
      expect(page).not.toContain('Checkout');
    });
  }
});
