export type {
  Branch,
  Category,
  ContactConfig,
  Product,
  VerificationStatus,
  Visibility,
} from './types';

export { createContentAdapter } from './adapter';
export type { ContentAdapter, ContentStore } from './adapter';

export {
  validateProduct,
  validateCategory,
  validateBranch,
  validateUniqueSlugs,
  validateProductCategoryRelationships,
} from './schemas';
export type { ValidationError, ValidationResult } from './schemas';

export { seedStore } from './seed';
