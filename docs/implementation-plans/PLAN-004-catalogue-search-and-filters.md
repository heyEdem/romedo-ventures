# PLAN-004: Catalogue Search and Filters

**Date:** 2026-08-31  
**Status:** Todo  
**Implements:** ADR-003  
**Estimated complexity:** Medium

## Goal

Let visitors find published products by text and applicable catalogue filters with clear state feedback.

## What to build

- Implement `/products` search over name, brand, and relevant descriptions.
- Add data-supported brand, price-band, storage, and category filters.
- Add result count, clear-all behavior, loading, empty, and error states.
- Add category page grids and pagination or sensible loading for the prototype dataset.

## Acceptance criteria

- [ ] `CatalogueSearchTest.findsByNameBrandAndDescription`: each supported term returns matching products.
- [ ] `CatalogueFilterTest.appliesAndClearsFilters`: active filters change results and clear restores the full set.
- [ ] `CatalogueStateTest.rendersLoadingEmptyAndFailureStates`: each state has an understandable accessible message.

## Out of scope

- Comparison, reviews, recommendations, complex analytics, or stock claims.

## Definition of done

- [ ] A published product is discoverable from search and category views.

