import type { Branch, Category, Product } from './types';

export interface ValidationError {
  field: string;
  message: string;
}

export type ValidationResult =
  | { ok: true }
  | { ok: false; errors: ValidationError[] };

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function validateSlug(slug: string): ValidationError | null {
  if (!slug || slug.trim().length === 0) {
    return { field: 'slug', message: 'Slug is required' };
  }
  if (!SLUG_PATTERN.test(slug)) {
    return {
      field: 'slug',
      message: 'Slug must contain only lowercase letters, numbers, and hyphens',
    };
  }
  return null;
}

function validateRequired(
  value: string | undefined | null,
  field: string,
): ValidationError | null {
  if (!value || value.trim().length === 0) {
    return { field, message: `${field} is required` };
  }
  return null;
}

function validateVisibility(
  value: unknown,
): ValidationError | null {
  if (value !== 'draft' && value !== 'published') {
    return {
      field: 'published',
      message: 'Visibility must be "draft" or "published"',
    };
  }
  return null;
}

function collectErrors(...errors: (ValidationError | null)[]): ValidationError[] {
  return errors.filter((e): e is ValidationError => e !== null);
}

export function validateProduct(product: Product): ValidationResult {
  const errors = collectErrors(
    validateRequired(product.name, 'name'),
    validateSlug(product.slug),
    validateRequired(product.category, 'category'),
    validateRequired(product.brand, 'brand'),
    validateRequired(product.shortDescription, 'shortDescription'),
    validateRequired(product.description, 'description'),
    validateVisibility(product.published),
  );

  if (product.images.length === 0) {
    errors.push({ field: 'images', message: 'At least one image is required' });
  }

  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}

export function validateCategory(category: Category): ValidationResult {
  const errors = collectErrors(
    validateRequired(category.name, 'name'),
    validateSlug(category.slug),
    validateRequired(category.description, 'description'),
    validateRequired(category.image, 'image'),
    validateVisibility(category.published),
  );

  if (category.displayOrder < 0) {
    errors.push({
      field: 'displayOrder',
      message: 'displayOrder must be non-negative',
    });
  }

  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}

export function validateBranch(branch: Branch): ValidationResult {
  const errors = collectErrors(
    validateRequired(branch.name, 'name'),
    validateRequired(branch.generalLocation, 'generalLocation'),
    validateRequired(branch.phone, 'phone'),
    validateRequired(branch.whatsapp, 'whatsapp'),
    validateRequired(branch.openingHours, 'openingHours'),
  );

  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}

export function validateUniqueSlugs<T extends { slug: string }>(
  items: T[],
  label: string,
): ValidationError[] {
  const seen = new Map<string, number>();
  const errors: ValidationError[] = [];

  items.forEach((item, index) => {
    const existing = seen.get(item.slug);
    if (existing !== undefined) {
      errors.push({
        field: 'slug',
        message: `Duplicate ${label} slug "${item.slug}" at positions ${existing + 1} and ${index + 1}`,
      });
    } else {
      seen.set(item.slug, index);
    }
  });

  return errors;
}

export function validateProductCategoryRelationships(
  products: Product[],
  categories: Category[],
): ValidationError[] {
  const categorySlugs = new Set(categories.map((c) => c.slug));
  const errors: ValidationError[] = [];

  products.forEach((product) => {
    if (!categorySlugs.has(product.category)) {
      errors.push({
        field: 'category',
        message: `Product "${product.name}" references unknown category "${product.category}"`,
      });
    }
  });

  return errors;
}
