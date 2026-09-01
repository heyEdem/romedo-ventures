'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

interface FilterBarProps {
  categories: { name: string; slug: string }[];
  brands: string[];
  activeCategory?: string;
  activeBrand?: string;
}

export default function FilterBar({
  categories,
  brands,
  activeCategory,
  activeBrand,
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `/products?${qs}` : '/products');
    });
  }

  function clearAll() {
    const q = searchParams.get('q');
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `/products?${qs}` : '/products');
    });
  }

  const hasActiveFilters = !!activeCategory || !!activeBrand;

  return (
    <div className="filter-bar" role="group" aria-label="Filter products">
      <div className="filter-bar-group">
        <label htmlFor="filter-category" className="filter-label">
          Category
        </label>
        <select
          id="filter-category"
          className="filter-select"
          value={activeCategory ?? ''}
          onChange={(e) => updateFilter('category', e.target.value)}
          disabled={isPending}
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-bar-group">
        <label htmlFor="filter-brand" className="filter-label">
          Brand
        </label>
        <select
          id="filter-brand"
          className="filter-select"
          value={activeBrand ?? ''}
          onChange={(e) => updateFilter('brand', e.target.value)}
          disabled={isPending}
        >
          <option value="">All brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          className="filter-clear"
          onClick={clearAll}
          disabled={isPending}
          type="button"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
