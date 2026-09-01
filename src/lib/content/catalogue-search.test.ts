import { describe, expect, it } from 'vitest';
import { createContentAdapter } from './adapter';
import { seedStore } from './seed';

describe('CatalogueSearchTest', () => {
  const adapter = createContentAdapter(seedStore);

  it('findsByNameBrandAndDescription', () => {
    const byName = adapter.searchProducts('Galaxy');
    expect(byName.length).toBeGreaterThanOrEqual(1);
    expect(byName.every((p) => p.published === 'published')).toBe(true);

    const byBrand = adapter.searchProducts('Apple');
    expect(byBrand.length).toBeGreaterThanOrEqual(1);
    expect(byBrand.every((p) => p.brand === 'Apple')).toBe(true);

    const byDescription = adapter.searchProducts('vibrant display');
    expect(byDescription.length).toBeGreaterThanOrEqual(1);
    expect(byDescription.some((p) => p.name === 'Samsung Galaxy A56')).toBe(true);
  });

  it('returns empty for unmatched term', () => {
    const results = adapter.searchProducts('zzz-nonexistent-term');
    expect(results).toHaveLength(0);
  });

  it('returns all published products for empty query', () => {
    const all = adapter.searchProducts('');
    const published = adapter.getPublishedProducts();
    expect(all).toHaveLength(published.length);
  });

  it('excludes draft products from results', () => {
    const results = adapter.searchProducts('Draft');
    expect(results.every((p) => p.published === 'published')).toBe(true);
  });

  it('searches across shortDescription field', () => {
    const results = adapter.searchProducts('portable');
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.some((p) => p.name === 'Samsung Galaxy Tab A9')).toBe(true);
  });

  it('filters by category', () => {
    const laptops = adapter.filterProducts({ category: 'laptops' });
    expect(laptops.length).toBeGreaterThanOrEqual(1);
    expect(laptops.every((p) => p.category === 'laptops')).toBe(true);
  });

  it('filters by brand', () => {
    const samsung = adapter.filterProducts({ brand: 'Samsung' });
    expect(samsung.length).toBeGreaterThanOrEqual(1);
    expect(samsung.every((p) => p.brand === 'Samsung')).toBe(true);
  });

  it('combines query, category, and brand filters', () => {
    const results = adapter.filterProducts({
      query: 'Galaxy',
      category: 'smartphones',
      brand: 'Samsung',
    });
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(
      results.every(
        (p) =>
          p.category === 'smartphones' &&
          p.brand === 'Samsung' &&
          p.name.toLowerCase().includes('galaxy'),
      ),
    ).toBe(true);
  });

  it('returns all published when no filters applied', () => {
    const all = adapter.filterProducts({});
    const published = adapter.getPublishedProducts();
    expect(all).toHaveLength(published.length);
  });

  it('getBrands returns unique sorted brand names', () => {
    const brands = adapter.getBrands();
    expect(brands.length).toBeGreaterThanOrEqual(1);
    expect(brands).toEqual([...new Set(brands)].sort());
  });
});
