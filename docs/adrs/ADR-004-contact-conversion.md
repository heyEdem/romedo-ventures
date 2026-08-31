# ADR-004: Contact Conversion

**Date:** 2026-08-31  
**Status:** Accepted  
**Deciders:** Project maintainers

## Context

The business conversion is an offline phone call or WhatsApp enquiry. Contact values must remain consistent across the application.

## Decision

Keep business contact values in one configuration/content location. Generate encoded `https://wa.me/...` product-enquiry links and `tel:+233...` call links through shared utilities. Label actions as enquiry/contact actions.

## Invariants

- Product names appear correctly in WhatsApp messages.
- Phone links use configured business numbers.
- No purchase CTA or checkout behavior is introduced.

