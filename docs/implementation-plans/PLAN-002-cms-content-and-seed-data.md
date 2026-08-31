# PLAN-002: CMS Content and Seed Data

**Date:** 2026-08-31  
**Status:** Todo  
**Implements:** ADR-002  
**Estimated complexity:** Medium

## Goal

Configure maintainable CMS schemas and representative seed content without presenting invented facts as verified business information.

## What to build

- Create Product, Category, and Branch schemas matching the PRD.
- Add slug, required-field, visibility, and relationship validation.
- Seed representative products/categories with explicit demo verification markers.
- Map optional display-only price labels and specifications.

## Where the logic lives

| Logic | Location |
|---|---|
| CMS schemas and validation | `cms/` or provider schema directory |
| Seed data | `cms/seed/` |
| Content mapping | `src/lib/content/` |

## Acceptance criteria

- [ ] `ContentSchemaTest.rejectsDuplicateOrInvalidSlugs`: invalid or duplicate slugs fail validation.
- [ ] `PublishedContentQueryTest.excludesDraftProductsAndCategories`: drafts are absent from public results.
- [ ] `TruthfulnessRenderingTest.marksUnverifiedDemoContent`: unverified demo records show the required disclaimer treatment.

## Out of scope

- Exact stock, branch-level inventory, invented company history, or fabricated contact facts.

## Definition of done

- [ ] Owner can add/edit/publish a product without code.
- [ ] Seed data is clearly ready for verification before public release.

