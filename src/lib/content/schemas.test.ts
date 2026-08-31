import { describe, expect, it } from 'vitest';
import {
  validateProduct,
  validateCategory,
  validateBranch,
  validateUniqueSlugs,
  validateProductCategoryRelationships,
} from './schemas';
import type { Branch, Category, Product } from './types';

function validProduct(overrides: Partial<Product> = {}): Product {
  return {
    name: 'Samsung Galaxy A56',
    slug: 'samsung-galaxy-a56',
    category: 'smartphones',
    brand: 'Samsung',
    shortDescription: 'A reliable smartphone',
    description: 'Full description of the Samsung Galaxy A56',
    images: ['/images/galaxy-a56.jpg'],
    specifications: { Storage: '128GB', RAM: '6GB' },
    priceLabel: 'GHS 2,500',
    featured: false,
    published: 'published',
    ...overrides,
  };
}

function validCategory(overrides: Partial<Category> = {}): Category {
  return {
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Browse our smartphone catalogue',
    image: '/images/smartphones.jpg',
    displayOrder: 1,
    published: 'published',
    ...overrides,
  };
}

function validBranch(overrides: Partial<Branch> = {}): Branch {
  return {
    name: 'Accra Main',
    generalLocation: 'Oxford Street, Osu, Accra',
    phone: '+233123456789',
    whatsapp: '+233123456789',
    openingHours: 'Mon-Sat 9:00-18:00',
    mapUrl: 'https://maps.example.com/accra-main',
    ...overrides,
  };
}

describe('ContentSchemaTest', () => {
  describe('validates products', () => {
    it('accepts a valid product', () => {
      const result = validateProduct(validProduct());
      expect(result.ok).toBe(true);
    });

    it('rejects empty name', () => {
      const result = validateProduct(validProduct({ name: '' }));
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.errors).toContainEqual(
          expect.objectContaining({ field: 'name' }),
        );
      }
    });

    it('rejects invalid slug format', () => {
      const result = validateProduct(validProduct({ slug: 'Invalid Slug!' }));
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.errors).toContainEqual(
          expect.objectContaining({ field: 'slug' }),
        );
      }
    });

    it('rejects empty slug', () => {
      const result = validateProduct(validProduct({ slug: '' }));
      expect(result.ok).toBe(false);
    });

    it('rejects invalid visibility', () => {
      const result = validateProduct(
        validProduct({ published: 'unlisted' as never }),
      );
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.errors).toContainEqual(
          expect.objectContaining({ field: 'published' }),
        );
      }
    });

    it('rejects empty images array', () => {
      const result = validateProduct(validProduct({ images: [] }));
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.errors).toContainEqual(
          expect.objectContaining({ field: 'images' }),
        );
      }
    });
  });

  describe('validates categories', () => {
    it('accepts a valid category', () => {
      const result = validateCategory(validCategory());
      expect(result.ok).toBe(true);
    });

    it('rejects empty name', () => {
      const result = validateCategory(validCategory({ name: '' }));
      expect(result.ok).toBe(false);
    });

    it('rejects invalid slug', () => {
      const result = validateCategory(validCategory({ slug: 'UPPER' }));
      expect(result.ok).toBe(false);
    });

    it('rejects negative displayOrder', () => {
      const result = validateCategory(validCategory({ displayOrder: -1 }));
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.errors).toContainEqual(
          expect.objectContaining({ field: 'displayOrder' }),
        );
      }
    });

    it('accepts zero displayOrder', () => {
      const result = validateCategory(validCategory({ displayOrder: 0 }));
      expect(result.ok).toBe(true);
    });
  });

  describe('validates branches', () => {
    it('accepts a valid branch', () => {
      const result = validateBranch(validBranch());
      expect(result.ok).toBe(true);
    });

    it('rejects empty name', () => {
      const result = validateBranch(validBranch({ name: '' }));
      expect(result.ok).toBe(false);
    });

    it('rejects missing phone', () => {
      const result = validateBranch(validBranch({ phone: '' }));
      expect(result.ok).toBe(false);
    });
  });

  describe('rejects duplicate or invalid slugs', () => {
    it('detects duplicate product slugs', () => {
      const products = [
        validProduct({ slug: 'galaxy-a56' }),
        validProduct({ slug: 'galaxy-a56', name: 'Another Phone' }),
      ];
      const errors = validateUniqueSlugs(products, 'product');
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe('slug');
    });

    it('detects duplicate category slugs', () => {
      const categories = [
        validCategory({ slug: 'phones' }),
        validCategory({ slug: 'phones', name: 'Handsets' }),
      ];
      const errors = validateUniqueSlugs(categories, 'category');
      expect(errors.length).toBe(1);
    });

    it('allows unique slugs', () => {
      const products = [
        validProduct({ slug: 'galaxy-a56' }),
        validProduct({ slug: 'iphone-16', name: 'iPhone 16' }),
      ];
      const errors = validateUniqueSlugs(products, 'product');
      expect(errors).toHaveLength(0);
    });
  });

  describe('validates product-category relationships', () => {
    it('accepts products with valid category references', () => {
      const categories = [validCategory({ slug: 'smartphones' })];
      const products = [validProduct({ category: 'smartphones' })];
      const errors = validateProductCategoryRelationships(products, categories);
      expect(errors).toHaveLength(0);
    });

    it('rejects products with unknown category references', () => {
      const categories = [validCategory({ slug: 'smartphones' })];
      const products = [validProduct({ category: 'laptops' })];
      const errors = validateProductCategoryRelationships(products, categories);
      expect(errors.length).toBe(1);
      expect(errors[0].field).toBe('category');
      expect(errors[0].message).toContain('laptops');
    });

    it('reports multiple invalid category references', () => {
      const categories = [validCategory({ slug: 'smartphones' })];
      const products = [
        validProduct({ category: 'laptops' }),
        validProduct({ category: 'tablets', name: 'Tablet' }),
      ];
      const errors = validateProductCategoryRelationships(products, categories);
      expect(errors.length).toBe(2);
    });
  });
});
