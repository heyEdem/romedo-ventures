import type {
  Branch,
  Category,
  ContactConfig,
  Product,
  Visibility,
} from './types';

export interface ContentAdapter {
  getPublishedProducts(): Product[];
  searchProducts(query: string): Product[];
  getPublishedCategories(): Category[];
  getBranches(): Branch[];
  getContactConfig(): ContactConfig;
}

export interface ContentStore {
  products: Product[];
  categories: Category[];
  branches: Branch[];
  contact: ContactConfig;
}

function filterPublished<T extends { published: Visibility }>(
  items: T[],
): T[] {
  return items.filter((item) => item.published === 'published');
}

function matchesQuery(product: Product, query: string): boolean {
  const term = query.toLowerCase();
  const fields = [
    product.name,
    product.brand,
    product.shortDescription,
    product.description,
  ];
  return fields.some((field) => field.toLowerCase().includes(term));
}

export function createContentAdapter(store: ContentStore): ContentAdapter {
  return {
    getPublishedProducts() {
      return filterPublished(store.products);
    },
    searchProducts(query: string) {
      const published = filterPublished(store.products);
      if (!query.trim()) return published;
      return published.filter((product) => matchesQuery(product, query));
    },
    getPublishedCategories() {
      return filterPublished(store.categories);
    },
    getBranches() {
      return store.branches;
    },
    getContactConfig() {
      return store.contact;
    },
  };
}
