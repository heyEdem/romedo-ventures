import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src');

function readFile(relativePath: string): string {
  return readFileSync(join(srcDir, relativePath), 'utf-8');
}

describe('BranchCardTest', () => {
  it('rendersBranchDetails: branch card shows branch name', () => {
    const page = readFile('components/branch-card.tsx');
    expect(page).toContain('branch.name');
  });

  it('rendersBranchDetails: branch card shows general location when present', () => {
    const page = readFile('components/branch-card.tsx');
    expect(page).toContain('branch.generalLocation');
  });

  it('rendersBranchDetails: branch card shows opening hours when present', () => {
    const page = readFile('components/branch-card.tsx');
    expect(page).toContain('branch.openingHours');
  });

  it('omitsAbsentValues: branch card omits phone when empty', () => {
    const page = readFile('components/branch-card.tsx');
    expect(page).toContain('hasPhone');
  });

  it('omitsAbsentValues: branch card omits whatsapp when empty', () => {
    const page = readFile('components/branch-card.tsx');
    expect(page).toContain('hasWhatsapp');
  });

  it('omitsAbsentValues: branch card omits map link when empty', () => {
    const page = readFile('components/branch-card.tsx');
    expect(page).toContain('hasMapUrl');
  });

  it('usesContactUtilities: branch card builds WhatsApp URL', () => {
    const page = readFile('components/branch-card.tsx');
    expect(page).toContain('wa.me');
  });

  it('usesContactUtilities: branch card uses buildTelUrl', () => {
    const page = readFile('components/branch-card.tsx');
    expect(page).toContain('buildTelUrl');
  });

  it('aboutPageUsesBranchCard: about page imports BranchCard', () => {
    const page = readFile('app/about/page.tsx');
    expect(page).toContain("import BranchCard from '@/components/branch-card'");
  });

  it('aboutPageUsesBranchCard: about page renders BranchCard components', () => {
    const page = readFile('app/about/page.tsx');
    expect(page).toContain('<BranchCard');
  });

  it('contactPageUsesBranchCard: contact page imports BranchCard', () => {
    const page = readFile('app/contact/page.tsx');
    expect(page).toContain("import BranchCard from '@/components/branch-card'");
  });

  it('contactPageUsesBranchCard: contact page renders BranchCard components', () => {
    const page = readFile('app/contact/page.tsx');
    expect(page).toContain('<BranchCard');
  });
});
