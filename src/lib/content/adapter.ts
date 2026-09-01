import type {
  Branch,
  Category,
  ContactConfig,
  Product,
  Visibility,
} from './types';

export interface ProductFilters {
  query?: string;
  category?: string;
  brand?: string;
}

export interface ContentAdapter {
  getPublishedProducts(): Product[];
  searchProducts(query: string): Product[];
  filterProducts(filters: ProductFilters): Product[];
  getBrands(): string[];
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
    filterProducts({ query, category, brand }) {
      let results = filterPublished(store.products);
      if (query?.trim()) {
        results = results.filter((product) => matchesQuery(product, query));
      }
      if (category) {
        results = results.filter((product) => product.category === category);
      }
      if (brand) {
        results = results.filter((product) => product.brand === brand);
      }
      return results;
    },
    getPublishedCategories() {
      return filterPublished(store.categories);
    },
    getBrands() {
      const published = filterPublished(store.products);
      return [...new Set(published.map((p) => p.brand))].sort();
    },
    getBranches() {
      return store.branches;
    },
    getContactConfig() {
      return store.contact;
    },
  };
}
