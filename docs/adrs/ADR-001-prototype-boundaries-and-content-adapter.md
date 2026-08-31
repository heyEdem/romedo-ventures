# ADR-001: Prototype Boundaries and Content Adapter

**Date:** 2026-08-31  
**Status:** Accepted  
**Deciders:** Project maintainers

## Context

The product is a digital catalogue and enquiry storefront, not an e-commerce system. The frontend should remain compatible with a future Spring Boot/PostgreSQL content service.

## Decision

Use a modern React/Next.js frontend with a replaceable content adapter backed by a lightweight headless CMS. Keep content types provider-neutral. Do not add a custom backend, auth, payments, orders, or inventory database in the prototype.

## Invariants

- Public queries return published content only.
- UI components do not depend directly on CMS-specific APIs.
- E-commerce and operational inventory scope remains excluded.

## Consequences

The prototype can change CMS providers or adopt a future backend with limited UI impact. Some adapter mapping and seeded-content work is required before page implementation.

## Rejected alternatives

- Custom backend now: rejected because it expands prototype scope and conflicts with the PRD.
- CMS calls in every component: rejected because it couples presentation to a replaceable provider.

