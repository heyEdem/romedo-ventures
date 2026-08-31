export type {
  Branch,
  Category,
  ContactConfig,
  Product,
  Visibility,
} from './types';

export { createContentAdapter } from './adapter';
export type { ContentAdapter, ContentStore } from './adapter';

export {
  validateProduct,
  validateCategory,
  validateBranch,
  validateUniqueSlugs,
} from './schemas';
export type { ValidationError, ValidationResult } from './schemas';
