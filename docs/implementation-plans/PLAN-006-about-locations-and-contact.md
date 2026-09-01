# PLAN-006: About, Locations, and Contact

**Date:** 2026-08-31  
**Status:** In Progress  
**Implements:** ADR-004, ADR-002  
**Estimated complexity:** Small

## Goal

Provide trustworthy business information and obvious contact paths without inventing facts.

## What to build

- Build `/about` using only supplied verified copy.
- Build location cards with branch name, general location, phone/WhatsApp, hours, and optional map link.
- Build `/contact` with shared business contact actions for mobile and desktop.
- Add missing-data fallbacks that do not fabricate values.

## Acceptance criteria

- [x] `BusinessInfoTest.rendersOnlySuppliedFacts`: absent facts are not replaced with invented content.
- [x] `ContactPageTest.exposesWhatsAppAndTelephoneActions`: both configured actions are visible and usable.
- [x] `ConversionCopyTest.containsNoPurchaseCtas`: all public routes omit prohibited purchase labels.

## Out of scope

- Fabricated history, branches, hours, maps, prices, or inventory.

## Definition of done

- [ ] About, contact, and locations pages are complete for verified content and graceful for missing content.

