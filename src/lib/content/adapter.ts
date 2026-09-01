import type {
  Branch,
  BusinessInfo,
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
  getProductBySlug(slug: string): Product | undefined;
  getRelatedProducts(slug: string, limit?: number): Product[];
  searchProducts(query: string): Product[];
  filterProducts(filters: ProductFilters): Product[];
  getBrands(): string[];
  getPublishedCategories(): Category[];
  getCategoryBySlug(slug: string): Category | undefined;
  getBranches(): Branch[];
  getContactConfig(): ContactConfig;
  getBusinessInfo(): BusinessInfo;
}

export interface ContentStore {
  products: Product[];
  categories: Category[];
  branches: Branch[];
  contact: ContactConfig;
  businessInfo: BusinessInfo;
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
    getProductBySlug(slug: string) {
      return filterPublished(store.products).find((p) => p.slug === slug);
    },
    getRelatedProducts(slug: string, limit = 4) {
      const published = filterPublished(store.products);
      const current = published.find((p) => p.slug === slug);
      if (!current) return [];
      return published
        .filter((p) => p.slug !== slug && p.category === current.category)
        .slice(0, limit);
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
    getCategoryBySlug(slug: string) {
      return filterPublished(store.categories).find((c) => c.slug === slug);
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
    getBusinessInfo() {
      return store.businessInfo;
    },
  };
}
