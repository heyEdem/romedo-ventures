import { describe, expect, it } from 'vitest';
import {
  validateProduct,
  validateCategory,
  validateBranch,
  validateUniqueSlugs,
  validateProductCategoryRelationships,
} from './schemas';
import {
  seedProducts,
  seedCategories,
  seedBranches,
  seedStore,
} from './seed';
import { createContentAdapter } from './adapter';

describe('TruthfulnessRenderingTest', () => {
  it('every published seed product carries a verificationStatus', () => {
    const published = seedProducts.filter((p) => p.published === 'published');
    for (const product of published) {
      expect(product.verificationStatus).toBeDefined();
      expect(['verified', 'demo', 'placeholder']).toContain(
        product.verificationStatus,
      );
    }
  });

  it('every seed category carries a verificationStatus', () => {
    for (const category of seedCategories) {
      expect(category.verificationStatus).toBeDefined();
      expect(['verified', 'demo', 'placeholder']).toContain(
        category.verificationStatus,
      );
    }
  });

  it('every seed branch carries a verificationStatus', () => {
    for (const branch of seedBranches) {
      expect(branch.verificationStatus).toBeDefined();
      expect(['verified', 'demo', 'placeholder']).toContain(
        branch.verificationStatus,
      );
    }
  });

  it('no seed product is marked as verified', () => {
    for (const product of seedProducts) {
      expect(product.verificationStatus).not.toBe('verified');
    }
  });

  it('no seed branch is marked as verified', () => {
    for (const branch of seedBranches) {
      expect(branch.verificationStatus).not.toBe('verified');
    }
  });

  it('placeholder branches include a verification note', () => {
    const placeholders = seedBranches.filter(
      (b) => b.verificationStatus === 'placeholder',
    );
    for (const branch of placeholders) {
      expect(branch.verificationNote).toBeDefined();
      expect(branch.verificationNote!.length).toBeGreaterThan(0);
    }
  });

  it('demo products include a verification note', () => {
    const demos = seedProducts.filter(
      (p) => p.verificationStatus === 'demo',
    );
    for (const product of demos) {
      expect(product.verificationNote).toBeDefined();
      expect(product.verificationNote!.length).toBeGreaterThan(0);
    }
  });

  it('seed contact uses placeholder phone numbers', () => {
    const { contact } = seedStore;
    expect(contact.whatsapp).toContain('XXX');
    expect(contact.phone).toContain('XXX');
  });
});

describe('SeedDataValidationTest', () => {
  it('all seed products pass validation', () => {
    for (const product of seedProducts) {
      const result = validateProduct(product);
      expect(result.ok).toBe(true);
    }
  });

  it('all seed categories pass validation', () => {
    for (const category of seedCategories) {
      const result = validateCategory(category);
      expect(result.ok).toBe(true);
    }
  });

  it('all seed branches pass validation', () => {
    for (const branch of seedBranches) {
      const result = validateBranch(branch);
      expect(result.ok).toBe(true);
    }
  });

  it('seed products have unique slugs', () => {
    const errors = validateUniqueSlugs(seedProducts, 'product');
    expect(errors).toHaveLength(0);
  });

  it('seed categories have unique slugs', () => {
    const errors = validateUniqueSlugs(seedCategories, 'category');
    expect(errors).toHaveLength(0);
  });

  it('seed products reference existing categories', () => {
    const errors = validateProductCategoryRelationships(
      seedProducts,
      seedCategories,
    );
    expect(errors).toHaveLength(0);
  });

  it('seed store adapter excludes draft products', () => {
    const adapter = createContentAdapter(seedStore);
    const products = adapter.getPublishedProducts();
    const drafts = products.filter((p) => p.published === 'draft');
    expect(drafts).toHaveLength(0);
  });

  it('seed store adapter excludes draft categories', () => {
    const adapter = createContentAdapter(seedStore);
    const categories = adapter.getPublishedCategories();
    const drafts = categories.filter((c) => c.published === 'draft');
    expect(drafts).toHaveLength(0);
  });

  it('seed store adapter returns all branches', () => {
    const adapter = createContentAdapter(seedStore);
    const branches = adapter.getBranches();
    expect(branches.length).toBe(seedBranches.length);
  });
});
