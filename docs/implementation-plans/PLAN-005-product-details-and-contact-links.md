# PLAN-005: Product Details and Contact Links

**Date:** 2026-08-31  
**Status:** Todo  
**Implements:** ADR-004, ADR-003  
**Estimated complexity:** Medium

## Goal

Turn product interest into a correctly addressed WhatsApp or phone enquiry from a useful detail page.

## What to build

- Build `/products/[slug]` with gallery, description, specifications, category, and disclaimer.
- Add explicit related products only when content defines the relationship.
- Implement shared contact configuration and encoded WhatsApp/telephone URL utilities.
- Add enquiry labels and product-context message generation.

## Acceptance criteria

- [ ] `ProductDetailTest.rendersUsefulPublishedProductData`: product page shows real content, specs, and availability disclaimer.
- [ ] `ContactLinkTest.generatesEncodedProductWhatsAppUrl`: message contains the correct product name and is URL encoded.
- [ ] `ContactLinkTest.usesConfiguredPhoneNumber`: `tel:+233...` uses the configured business number.

## Out of scope

- Cart, checkout, payment, order capture, stock quantities, or duplicated contact values.

## Definition of done

- [ ] Direct product URLs work and both enquiry actions are usable on mobile and desktop.

