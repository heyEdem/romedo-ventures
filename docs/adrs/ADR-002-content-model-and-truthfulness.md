# ADR-002: Content Model and Truthfulness

**Date:** 2026-08-31  
**Status:** Accepted  
**Deciders:** Project maintainers

## Context

The catalogue needs maintainable products, categories, and branches while the PRD explicitly prohibits invented business facts and unverified inventory claims.

## Decision

Model Product, Category, and Branch as CMS-managed records with stable unique slugs where applicable, draft/published visibility for products and categories, optional display-only price labels, and explicit demo/unverified handling in seed content.

## Invariants

- Draft content is never public.
- Slugs are stable and unique.
- Content never implies exact stock unless verified data is later introduced.

## Consequences

Content editors can maintain the catalogue without code, but seeded demo data needs a verification pass before public release.

