# Romedo Ventures — Production Product Requirements Document

**Document:** Production PRD  
**Version:** 1.0  
**Status:** Strategic / Implementation Planning  
**Product:** Romedo Ventures Digital Commerce Platform

## 1. Purpose

The production platform is the long-term evolution of the digital catalogue. It preserves customer discovery and contact while adding only the operational capabilities Romedo can realistically maintain.

```text
Customers → Products → Availability → Branches → Enquiries → Visits
Staff     → Catalogue → Pricing → Inventory → Enquiries → Analytics
```

It is not a commitment to build every commerce feature at once. Each operational capability requires a real Romedo workflow and owner feedback.

## 2. Product principles

- Catalogue-first: discovery and contact remain the primary customer journey.
- Operations follow reality: do not create fake stock or pricing workflows.
- Staff own content without developer intervention.
- Branches are first-class business entities.
- Expose customer-safe data, not internal operational details.
- Prefer a modular monolith until scale proves otherwise.
- Preserve prototype URLs, content concepts, and contact flows where possible.

## 3. Production scope

### Customer experience

Retain homepage, categories, search, filters, product details, responsive mobile UX, WhatsApp/call contact, SEO pages, and branch discovery. Add branch pages, branch-aware enquiries, optional customer-safe availability, and eventually comparison only when validated.

### Staff experience

Provide authenticated administration for products, categories, images, branches, prices, promotions, availability, enquiries, and role-based access. Include audit history for consequential changes and validation suitable for non-developers.

### Domains

```text
catalogue | branches | inventory | pricing | enquiries
identity/access | analytics | media
```

Inventory must not be implemented merely because a product has a branch. First confirm who updates stock, how often, and what “available” means.

## 4. Architecture

```text
Web frontend (Next.js/React)
          ↓ HTTPS JSON API
Spring Boot modular monolith
          ↓
PostgreSQL + object media storage
          ↓
Background jobs / analytics as needed
```

The frontend owns presentation, navigation, SEO rendering, and interaction state. The backend owns authorization, validation, domain rules, persistence, availability policy, enquiries, and integrations. PostgreSQL is the source of truth for operational data; object storage is the source of truth for media binaries.

Keep modules separated by domain boundaries and expose application services rather than letting controllers manipulate repositories directly. Use migrations, typed API contracts, structured logs, correlation IDs, and environment-based configuration.

## 5. Data model

```text
Product(id, slug, name, brand, description, status, createdAt, updatedAt)
Category(id, slug, name, description, status, displayOrder)
ProductCategory(productId, categoryId)
ProductImage(id, productId, mediaKey, altText, displayOrder)
ProductSpecification(id, productId, name, value, displayOrder)
Branch(id, slug, name, address, phone, whatsapp, hours, mapUrl, status)
Price(id, productId, amount/currency, label, effectiveFrom, effectiveTo, status)
InventoryRecord(id, productId, branchId, quantity/status, updatedAt)
Enquiry(id, productId, branchId?, channel, message, createdAt, status)
User(id, identityId, role, status)
AuditEvent(id, actorId, entity, entityId, action, occurredAt, metadata)
```

Use stable internal IDs and immutable unique slugs externally. Keep product facts, pricing, and stock separate so a catalogue record never implies availability.

## 6. Availability and pricing

Availability is a customer-facing projection, not necessarily raw quantity. Define explicit states such as `AVAILABLE`, `LIMITED`, `OUT_OF_STOCK`, `CONTACT_TO_CONFIRM`, and `UNKNOWN`, with clear ownership of each state.

The API must never claim availability from stale or missing data. If freshness thresholds are exceeded, return “Contact to confirm”. Branch-specific availability must be scoped to a branch and may include a last-updated indicator.

Prices may be optional and time-bounded. The UI must distinguish “price shown” from “price confirmed” and preserve the offline-contact model until online purchasing is separately approved.

## 7. Identity and security

- Use an established identity provider or secure Spring Security integration.
- Separate roles such as owner, manager, catalogue editor, branch staff, and analyst.
- Enforce authorization server-side for every mutation and branch-scoped action.
- Validate and sanitize all user-controlled content.
- Restrict media uploads by type, size, dimensions, and malware scanning where available.
- Rate-limit public search, enquiries, and contact endpoints.
- Keep secrets out of source control and logs.
- Audit product, price, inventory, user, and branch changes.
- Define retention and deletion policies for personal enquiry data.

## 8. API contracts

Public read APIs expose only published, customer-safe data. Admin APIs are authenticated and versioned.

```text
GET  /api/v1/products
GET  /api/v1/products/{slug}
GET  /api/v1/categories/{slug}/products
GET  /api/v1/branches
GET  /api/v1/branches/{slug}
POST /api/v1/enquiries
```

Admin endpoints require validation errors, pagination, filtering, optimistic concurrency where needed, and predictable error envelopes. WhatsApp and telephone links may remain client-side; server-recorded enquiries are optional and must respect privacy requirements.

## 9. Search, SEO, and analytics

Start with PostgreSQL search or a measured search abstraction across names, brands, categories, descriptions, and specifications. Add a dedicated search engine only when relevance or query volume justifies it.

Generate canonical URLs, sitemap entries for published pages, structured metadata, Open Graph previews, and useful not-found pages. Do not expose drafts to search engines.

Collect privacy-conscious events such as product views, searches, category views, WhatsApp clicks, call clicks, branch views, and enquiry completion. Analytics must answer business questions and must not become surveillance by default.

## 10. Delivery phases

1. **Foundation:** domain modules, identity, migrations, API conventions, deployment, observability.
2. **Content operations:** admin catalogue, media, categories, publishing, audit events.
3. **Branch operations:** branch management, branch pages, contact routing, local SEO.
4. **Enquiries:** enquiry capture, staff workflow, consent, notifications, reporting.
5. **Availability:** inventory only after a confirmed operating process; customer-safe projection and freshness rules.
6. **Commercial extensions:** promotions, comparison, recommendations, payments, or ordering only as separately approved products.

Every phase must be independently deployable and must not regress the public catalogue.

## 11. Acceptance criteria

- Draft products and categories never appear in public responses.
- Duplicate slugs are rejected.
- Unauthorized staff cannot mutate protected resources.
- Branch-scoped users cannot edit another branch’s records.
- Stale inventory cannot produce `AVAILABLE` outside the freshness policy.
- Price validity windows select the correct customer-safe price.
- Invalid media and malformed enquiry payloads are rejected.
- Consequential mutations create audit events.
- A customer can search, filter, open a product, select a branch, and initiate a contextual enquiry.
- Staff can create, publish, edit, and unpublish catalogue content.
- Mobile navigation and contact actions remain usable.
- Non-critical analytics failure does not break browsing or contact.
- Backups, restore, monitoring, security review, and access review are documented and tested.

## 12. Migration from prototype

Keep prototype slugs and content concepts wherever possible. Import verified products, categories, images, branches, and contact configuration through a repeatable migration. Map CMS publishing state to production publishing state. Run both systems in read-only comparison, then switch traffic only after SEO, contact, and mobile smoke tests pass.

## 13. Deferred until separately approved

Do not assume production means immediate checkout, payment processing, customer accounts, delivery logistics, loyalty, reviews, AI recommendations, multi-warehouse planning, or microservices. Each requires its own business decision, threat model, operational owner, and acceptance criteria.
