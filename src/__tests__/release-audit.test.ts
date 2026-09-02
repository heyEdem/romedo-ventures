import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import {
  seedProducts,
  seedCategories,
  seedBranches,
  seedContact,
} from '../lib/content/seed';
import { createContentAdapter } from '../lib/content/adapter';
import { seedStore } from '../lib/content/seed';

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
      } else if (
        /\.(tsx?|jsx?)$/.test(entry.name) &&
        !entry.name.endsWith('.test.ts') &&
        !entry.name.endsWith('.test.tsx')
      ) {
        files.push(fullPath);
      }
    }
  }

  walk(srcDir);
  return files;
}

const prohibitedEcommerceLabels = [
  'buy now',
  'add to cart',
  'checkout',
  'purchase',
  'order now',
  'shopping cart',
  'payment',
  'stock:',
  'in stock',
  'out of stock',
  'inventory',
];

describe('ContentReleaseCheck', () => {
  it('every published seed product has a verificationStatus', () => {
    const published = seedProducts.filter((p) => p.published === 'published');
    for (const product of published) {
      expect(product.verificationStatus).toBeDefined();
      expect(['verified', 'demo', 'placeholder']).toContain(
        product.verificationStatus,
      );
    }
  });

  it('every seed category has a verificationStatus', () => {
    for (const category of seedCategories) {
      expect(category.verificationStatus).toBeDefined();
      expect(['verified', 'demo', 'placeholder']).toContain(
        category.verificationStatus,
      );
    }
  });

  it('every seed branch has a verificationStatus', () => {
    for (const branch of seedBranches) {
      expect(branch.verificationStatus).toBeDefined();
      expect(['verified', 'demo', 'placeholder']).toContain(
        branch.verificationStatus,
      );
    }
  });

  it('no seed product or branch is marked verified', () => {
    for (const product of seedProducts) {
      expect(product.verificationStatus).not.toBe('verified');
    }
    for (const branch of seedBranches) {
      expect(branch.verificationStatus).not.toBe('verified');
    }
  });

  it('placeholder branches carry verification notes', () => {
    const placeholders = seedBranches.filter(
      (b) => b.verificationStatus === 'placeholder',
    );
    for (const branch of placeholders) {
      expect(branch.verificationNote).toBeDefined();
      expect(branch.verificationNote!.length).toBeGreaterThan(0);
    }
  });

  it('demo products carry verification notes', () => {
    const demos = seedProducts.filter((p) => p.verificationStatus === 'demo');
    for (const product of demos) {
      expect(product.verificationNote).toBeDefined();
      expect(product.verificationNote!.length).toBeGreaterThan(0);
    }
  });

  it('seed contact uses placeholder phone numbers', () => {
    expect(seedContact.whatsapp).toContain('XXX');
    expect(seedContact.phone).toContain('XXX');
  });

  it('seed branch phones are placeholders', () => {
    for (const branch of seedBranches) {
      expect(branch.phone).toContain('XXX');
      expect(branch.whatsapp).toContain('XXX');
    }
  });

  it('adapter excludes draft products from public view', () => {
    const adapter = createContentAdapter(seedStore);
    const products = adapter.getPublishedProducts();
    const drafts = products.filter((p) => p.published === 'draft');
    expect(drafts).toHaveLength(0);
  });

  it('adapter excludes draft categories from public view', () => {
    const adapter = createContentAdapter(seedStore);
    const categories = adapter.getPublishedCategories();
    const drafts = categories.filter((c) => c.published === 'draft');
    expect(drafts).toHaveLength(0);
  });

  it('all published products have non-empty priceLabel or omit it', () => {
    const published = seedProducts.filter((p) => p.published === 'published');
    for (const product of published) {
      if (product.priceLabel !== undefined) {
        expect(product.priceLabel.length).toBeGreaterThan(0);
      }
    }
  });

  it('no priceLabel contains currency symbols other than GHS', () => {
    const published = seedProducts.filter((p) => p.published === 'published');
    for (const product of published) {
      if (product.priceLabel) {
        const hasForbiddenCurrency = /[$€£¥]/.test(product.priceLabel);
        expect(hasForbiddenCurrency).toBe(false);
      }
    }
  });
});

describe('ScopeAuditTest', () => {
  it('noEcommerceUiExists', () => {
    const files = getSourceFiles();
    const violations: string[] = [];

    for (const file of files) {
      const content = readFileSync(file, 'utf-8').toLowerCase();
      const relativePath = file.replace(srcDir + '/', '');

      for (const label of prohibitedEcommerceLabels) {
        if (content.includes(label)) {
          violations.push(`${relativePath} contains "${label}"`);
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('noPaymentDependenciesExist', () => {
    const pkg = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf-8'),
    );
    const allDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
    };

    const prohibited = [
      'stripe',
      'paypal',
      'shopify',
      'medusa',
      'saleor',
      'snipcart',
    ];
    for (const dep of prohibited) {
      expect(allDeps).not.toHaveProperty(dep);
    }
  });

  it('no cart, checkout, or payment routes exist', () => {
    const files = getSourceFiles();
    const routePatterns = [
      '/cart',
      '/checkout',
      '/payment',
      '/order',
      '/orders',
      '/account',
      '/login',
      '/register',
    ];

    const violations: string[] = [];
    for (const file of files) {
      const content = readFileSync(file, 'utf-8');
      const relativePath = file.replace(srcDir + '/', '');

      for (const pattern of routePatterns) {
        if (
          content.includes(`'${pattern}'`) ||
          content.includes(`"${pattern}"`) ||
          content.includes(`\`${pattern}\``)
        ) {
          violations.push(`${relativePath} references route "${pattern}"`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
