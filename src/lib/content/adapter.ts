import type {
  Branch,
  Category,
  ContactConfig,
  Product,
  Visibility,
} from './types';

export interface ContentAdapter {
  getPublishedProducts(): Product[];
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

export function createContentAdapter(store: ContentStore): ContentAdapter {
  return {
    getPublishedProducts() {
      return filterPublished(store.products);
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
