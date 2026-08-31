import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const srcDir = join(process.cwd(), 'src');

function getSourceFiles(): string[] {
  const files: string[] = [];

  function walk(dir: string) {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== '__tests__' && entry.name !== 'test') {
          walk(fullPath);
        }
      } else if (/\.(tsx?|jsx?)$/.test(entry.name) && !entry.name.endsWith('.test.ts') && !entry.name.endsWith('.test.tsx')) {
        files.push(fullPath);
      }
    }
  }

  walk(srcDir);
  return files;
}

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: unknown;
}

function getPackageJson(): PackageJson {
  const pkg = readFileSync(join(process.cwd(), 'package.json'), 'utf-8');
  return JSON.parse(pkg);
}

const prohibitedLabels = [
  'buy now',
  'add to cart',
  'checkout',
  'purchase',
  'order now',
  'shopping cart',
  'payment',
];

const prohibitedDependencies = [
  'stripe',
  'paypal',
  'shopify',
  'medusa',
  'saleor',
];

describe('ArchitectureBoundaryTest', () => {
  it('frontendHasNoCustomBackendOrPaymentDependency', () => {
    const pkg = getPackageJson();
    const allDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
    };

    for (const dep of prohibitedDependencies) {
      expect(allDeps).not.toHaveProperty(dep);
    }
  });

  it('sourceCodeHasNoProhibitedEcommerceLabels', () => {
    const files = getSourceFiles();
    const violations: string[] = [];

    for (const file of files) {
      const content = readFileSync(file, 'utf-8').toLowerCase();
      const relativePath = file.replace(srcDir + '/', '');

      for (const label of prohibitedLabels) {
        if (content.includes(label)) {
          violations.push(`${relativePath} contains "${label}"`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
