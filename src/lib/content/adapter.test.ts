import { describe, expect, it } from 'vitest';
import { createContentAdapter } from './adapter';
import type { ContentStore } from './adapter';

const mixedStore: ContentStore = {
  products: [
    {
      name: 'Published Phone',
      slug: 'published-phone',
      category: 'phones',
      brand: 'BrandA',
      shortDescription: 'A published phone',
      description: 'Full description',
      images: [],
      specifications: {},
      featured: false,
      published: 'published',
      verificationStatus: 'demo',
    },
    {
      name: 'Draft Phone',
      slug: 'draft-phone',
      category: 'phones',
      brand: 'BrandB',
      shortDescription: 'A draft phone',
      description: 'Full description',
      images: [],
      specifications: {},
      featured: false,
      published: 'draft',
      verificationStatus: 'demo',
    },
  ],
  categories: [
    {
      name: 'Published Category',
      slug: 'published-category',
      description: 'A published category',
      image: '',
      displayOrder: 1,
      published: 'published',
      verificationStatus: 'demo',
    },
    {
      name: 'Draft Category',
      slug: 'draft-category',
      description: 'A draft category',
      image: '',
      displayOrder: 2,
      published: 'draft',
      verificationStatus: 'demo',
    },
  ],
  branches: [
    {
      name: 'Main Branch',
      generalLocation: 'Accra',
      phone: '+233123456789',
      whatsapp: '+233123456789',
      openingHours: 'Mon-Fri 9-5',
      mapUrl: '',
      verificationStatus: 'demo',
    },
  ],
  contact: {
    whatsapp: '+233123456789',
    phone: '+233123456789',
    defaultMessage: 'Hello Romedo Ventures',
  },
};

describe('ContentAdapterTest', () => {
  it('returns only published products', () => {
    const adapter = createContentAdapter(mixedStore);
    const products = adapter.getPublishedProducts();

    expect(products).toHaveLength(1);
    expect(products[0].slug).toBe('published-phone');
  });

  it('returns only published categories', () => {
    const adapter = createContentAdapter(mixedStore);
    const categories = adapter.getPublishedCategories();

    expect(categories).toHaveLength(1);
    expect(categories[0].slug).toBe('published-category');
  });

  it('returns all branches', () => {
    const adapter = createContentAdapter(mixedStore);
    const branches = adapter.getBranches();

    expect(branches).toHaveLength(1);
    expect(branches[0].name).toBe('Main Branch');
  });

  it('returns the contact configuration', () => {
    const adapter = createContentAdapter(mixedStore);
    const contact = adapter.getContactConfig();

    expect(contact.whatsapp).toBe('+233123456789');
    expect(contact.phone).toBe('+233123456789');
  });

  it('getProductBySlug returns published product', () => {
    const adapter = createContentAdapter(mixedStore);
    const product = adapter.getProductBySlug('published-phone');
    expect(product).toBeDefined();
    expect(product!.name).toBe('Published Phone');
  });

  it('getProductBySlug returns undefined for draft', () => {
    const adapter = createContentAdapter(mixedStore);
    const product = adapter.getProductBySlug('draft-phone');
    expect(product).toBeUndefined();
  });

  it('getProductBySlug returns undefined for unknown slug', () => {
    const adapter = createContentAdapter(mixedStore);
    const product = adapter.getProductBySlug('nonexistent');
    expect(product).toBeUndefined();
  });

  it('getRelatedProducts returns same-category products', () => {
    const storeWithMany: ContentStore = {
      ...mixedStore,
      products: [
        ...mixedStore.products,
        {
          name: 'Another Phone',
          slug: 'another-phone',
          category: 'phones',
          brand: 'BrandC',
          shortDescription: 'Another published phone',
          description: 'Full description',
          images: [],
          specifications: {},
          featured: false,
          published: 'published',
          verificationStatus: 'demo',
        },
      ],
    };
    const adapter = createContentAdapter(storeWithMany);
    const related = adapter.getRelatedProducts('published-phone');
    expect(related).toHaveLength(1);
    expect(related[0].slug).toBe('another-phone');
  });

  it('getRelatedProducts excludes the product itself', () => {
    const adapter = createContentAdapter(mixedStore);
    const related = adapter.getRelatedProducts('published-phone');
    expect(related.every((p) => p.slug !== 'published-phone')).toBe(true);
  });

  it('getRelatedProducts excludes draft products', () => {
    const adapter = createContentAdapter(mixedStore);
    const related = adapter.getRelatedProducts('published-phone');
    expect(related.every((p) => p.published === 'published')).toBe(true);
  });

  it('getRelatedProducts returns empty for unknown slug', () => {
    const adapter = createContentAdapter(mixedStore);
    const related = adapter.getRelatedProducts('nonexistent');
    expect(related).toHaveLength(0);
  });

  it('getCategoryBySlug returns published category', () => {
    const adapter = createContentAdapter(mixedStore);
    const category = adapter.getCategoryBySlug('published-category');
    expect(category).toBeDefined();
    expect(category!.name).toBe('Published Category');
  });

  it('getCategoryBySlug returns undefined for draft', () => {
    const adapter = createContentAdapter(mixedStore);
    const category = adapter.getCategoryBySlug('draft-category');
    expect(category).toBeUndefined();
  });
});

describe('ArchitectureBoundaryTest', () => {
  it('frontend has no custom backend or payment dependency', () => {
    const forbidden = [
      'auth',
      'login',
      'checkout',
      'cart',
      'payment',
      'order',
      'inventory',
      'stock',
      'stripe',
      'paypal',
    ];

    const storeKeys = Object.keys(mixedStore);
    const adapter = createContentAdapter(mixedStore);
    const adapterMethods = Object.keys(adapter);

    const allTerms = [...storeKeys, ...adapterMethods].join(' ').toLowerCase();

    for (const term of forbidden) {
      expect(allTerms).not.toContain(term);
    }
  });
});
