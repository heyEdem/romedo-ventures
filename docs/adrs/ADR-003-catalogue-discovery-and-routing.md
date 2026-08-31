# ADR-003: Catalogue Discovery and Routing

**Date:** 2026-08-31  
**Status:** Accepted  
**Deciders:** Project maintainers

## Context

Visitors need multiple paths to a product: homepage, category, search, and direct URL. Mobile usability is the primary experience.

## Decision

Use the PRD routes `/`, `/products`, `/products/[slug]`, `/categories`, `/categories/[slug]`, `/about`, and `/contact`. Keep search/filter state in the catalogue feature and resolve product/category identity by stable slugs.

## Invariants

- Any published product is reachable through homepage, category, or search.
- Search and filters have usable loading, empty, error, and clear states.
- Discovery controls do not claim inventory availability.

