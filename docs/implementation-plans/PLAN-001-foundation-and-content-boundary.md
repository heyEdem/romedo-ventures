# PLAN-001: Foundation and Content Boundary

**Date:** 2026-08-31  
**Status:** Todo  
**Implements:** ADR-001  
**Estimated complexity:** Medium

## Goal

Create the frontend foundation, route skeleton, environment configuration, typed content adapter, and CMS integration boundary.

## What to build

- Initialize the React/Next.js application and development scripts.
- Define Product, Category, Branch, and Contact configuration types.
- Implement a content adapter that exposes published public content.
- Add route placeholders for every PRD route and document required environment variables.

## Where the logic lives

| Logic | Location |
|---|---|
| Shared content types and adapter | `src/lib/content/` |
| Environment/configuration | `src/lib/config/` |
| Route/page composition | `src/app/` |

## Acceptance criteria

- [ ] `ContentAdapterTest.returnsOnlyPublishedContent`: mixed draft/published records produce published records only.
- [ ] `ArchitectureBoundaryTest.frontendHasNoCustomBackendOrPaymentDependency`: dependency graph has no custom backend, auth, payment, or inventory feature.

## Out of scope

- E-commerce, authentication, custom backend, and inventory systems.
- Direct CMS calls from presentational components.

## Definition of done

- [ ] Tests pass and every PRD route resolves to a deliberate placeholder.
- [ ] ADR invariants are enforced at the adapter boundary.

