# PLAN-007: Quality, SEO, and Mobile QA

**Date:** 2026-08-31  
**Status:** Todo  
**Implements:** ADR-005  
**Estimated complexity:** Medium

## Goal

Make the prototype credible and shareable through accessibility, performance, metadata, and cross-viewport verification.

## What to build

- Add semantic headings, labels, keyboard/focus behavior, contrast, and useful alt text.
- Optimize responsive images and page loading behavior.
- Add route-specific title, description, canonical, and product metadata.
- Verify loading, empty, error, mobile, desktop, and direct-link journeys.

## Acceptance criteria

- [ ] `AccessibilitySmokeTest.publicRoutesHaveLabelsFocusAndHeadings`: public routes meet the required interaction and heading checks.
- [ ] `ResponsiveSmokeTest.mobileRoutesFitAndKeepContactActionsUsable`: narrow viewport remains readable and actionable.
- [ ] `MetadataTest.productRouteHasCanonicalAndProductMetadata`: published product route emits required metadata.

## Out of scope

- Removing accessibility or state feedback to improve superficial visual simplicity.

## Definition of done

- [ ] Automated checks and manual mobile QA findings are resolved or documented.

