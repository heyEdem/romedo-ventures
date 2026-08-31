# PLAN-008: Vercel Deployment and Owner Demo

**Date:** 2026-08-31  
**Status:** Todo  
**Implements:** ADR-005, ADR-001, ADR-002  
**Estimated complexity:** Small

## Goal

Deploy a safe preview/public prototype and prove the owner’s end-to-end catalogue maintenance and visitor enquiry journeys.

## What to build

- Configure Vercel build, environment variables, CMS integration, and image domains.
- Add a release checklist for content verification and prohibited scope checks.
- Run the owner demo: publish/update a product, discover it, open details, and start WhatsApp/call enquiry.
- Record preview URL, known limitations, and any unverified data that must be replaced.

## Acceptance criteria

- [ ] `DeploymentSmokeTest.ownerJourneyWorksInPreview`: deployed preview completes discover-to-enquiry without failures.
- [ ] `ContentReleaseCheck.unverifiedDataIsBlockedOrMarked`: unverified public data is blocked or visibly marked before sharing.
- [ ] `ScopeAuditTest.noEcommerceUiExists`: deployed routes contain no cart, checkout, payment, order, or stock-quantity UI.

## Out of scope

- Production commerce operations, payments, user accounts, delivery, and live inventory.

## Definition of done

- [ ] Vercel preview is reproducible, content is verified/marked, and owner demo steps are documented.

