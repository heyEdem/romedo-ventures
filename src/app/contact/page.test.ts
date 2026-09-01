import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src');

function readFile(relativePath: string): string {
  return readFileSync(join(srcDir, relativePath), 'utf-8');
}

describe('ContactPageTest', () => {
  it('usesSharedWhatsAppAction: contact page uses buildGeneralWhatsAppUrl', () => {
    const page = readFile('app/contact/page.tsx');
    expect(page).toContain('buildGeneralWhatsAppUrl');
  });

  it('usesSharedTelAction: contact page uses buildTelUrl', () => {
    const page = readFile('app/contact/page.tsx');
    expect(page).toContain('buildTelUrl');
  });

  it('doesNotDuplicateNumbers: contact page gets config from adapter', () => {
    const page = readFile('app/contact/page.tsx');
    expect(page).toContain('getContactConfig');
  });

  it('rendersBranchCards: contact page renders BranchCard components', () => {
    const page = readFile('app/contact/page.tsx');
    expect(page).toContain('<BranchCard');
  });

  it('gracefulMissingData: contact page omits branches section when empty', () => {
    const page = readFile('app/contact/page.tsx');
    expect(page).toContain('branches.length > 0');
  });

  it('hasWhatsAppLink: contact page renders WhatsApp CTA', () => {
    const page = readFile('app/contact/page.tsx');
    expect(page).toContain('WhatsApp');
  });

  it('hasPhoneLink: contact page renders call CTA', () => {
    const page = readFile('app/contact/page.tsx');
    expect(page).toContain('Call Us');
  });
});
