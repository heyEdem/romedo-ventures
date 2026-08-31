# PLAN-003: Frontend Shell and Navigation

**Date:** 2026-08-31  
**Status:** Todo  
**Implements:** ADR-003  
**Estimated complexity:** Medium

## Goal

Build the branded, responsive shell that makes the catalogue easy to understand and navigate.

## What to build

- Establish typography, colors, spacing, header, footer, and navigation.
- Build homepage sections: identity/value proposition, CTAs, search, categories, selected products, locations, final contact CTA.
- Build `/categories` and shared product/category cards.
- Add responsive navigation and mobile contact affordances.

## Acceptance criteria

- [ ] `NavigationTest.allPrdRoutesAreReachable`: every required route has a working navigation path or direct link.
- [ ] `HomepageTest.exposesExploreAndWhatsAppActions`: homepage contains the required primary and secondary actions.
- [ ] `ResponsiveSmokeTest.shellWorksOnNarrowViewport`: navigation and contact actions remain usable on mobile.

## Out of scope

- Product search/filter implementation and online purchasing.

## Definition of done

- [ ] Shell is responsive and consumes content through the adapter.

