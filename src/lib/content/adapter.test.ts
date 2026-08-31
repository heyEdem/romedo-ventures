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
