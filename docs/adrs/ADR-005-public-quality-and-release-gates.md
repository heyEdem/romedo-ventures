# ADR-005: Public Quality and Release Gates

**Date:** 2026-08-31  
**Status:** Accepted  
**Deciders:** Project maintainers

## Context

The prototype represents a real retailer and must be credible on mobile, accessible, performant, SEO-friendly, and safe to share publicly.

## Decision

Treat accessibility, responsive behavior, image optimization, metadata, content verification, and deployed owner-journey smoke testing as release gates. Deploy the prototype to Vercel.

## Invariants

- Required accessible interaction and state feedback is preserved.
- Unverified business data is not presented as verified.
- The deployed demo supports the complete discover-to-enquiry path.

