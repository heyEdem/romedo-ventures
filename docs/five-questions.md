# Five Questions

**Date:** 2026-08-31  
**Source:** [`prototype/docs/prototype-prd.md`](../prototype/docs/prototype-prd.md)

## FQ-001: Frontend foundation and CMS boundary

**Q1 — What outcome are we protecting?**  
The prototype has a replaceable content source and a coherent mobile-first frontend boundary that can later adopt Spring Boot/PostgreSQL without rewriting the conceptual catalogue model.

**Q2 — What must never break?**
- The frontend consumes published catalogue content through a defined content adapter.
- CMS/content-provider details do not leak through every UI component.
- No custom backend, authentication, payments, or inventory system is added to the prototype.

**Q3 — Where should this logic live?**
- Shared types, content adapter, and configuration live in the application data/integration layer.
- Layout, navigation, and page composition live in the frontend UI layer.
- Future backend compatibility is documented at the adapter/model boundary.

**Q4 — What test proves the rule?**
- `ContentAdapterTest.returnsOnlyPublishedContent`: given draft and published records, when public content is requested, then only published records are returned.
- `ArchitectureBoundaryTest.frontendHasNoCustomBackendOrPaymentDependency`: given the prototype dependency graph, then no custom backend, auth, payment, or inventory dependency exists.

**Q5 — What should AI not touch?**
- Do not add cart, checkout, payment, order, account, delivery, or inventory features.
- Do not invent company facts or make CMS-specific calls directly from presentational components.

## FQ-002: Content model and truthfulness

**Q1 — What outcome are we protecting?**  
Owners can maintain accurate products, categories, and branches, while visitors never see unpublished or knowingly unverified content presented as fact.

**Q2 — What must never break?**
- Product/category slugs are stable and unique.
- Products and categories support draft/published visibility.
- Public pages do not claim exact stock availability.
- Unverified names, specifications, prices, phone numbers, branches, and hours are clearly marked or replaced before public sharing.

**Q3 — Where should this logic live?**
- Schemas, validation, and visibility rules live in the CMS/content layer.
- Truthfulness flags and disclaimers live in content data and are rendered by page components.

**Q4 — What test proves the rule?**
- `ContentSchemaTest.rejectsDuplicateOrInvalidSlugs`: given duplicate or malformed slugs, when content is validated, then validation fails.
- `PublishedContentQueryTest.excludesDraftProductsAndCategories`: given mixed visibility records, when queried publicly, then drafts are absent.
- `TruthfulnessRenderingTest.marksUnverifiedDemoContent`: given demo content marked unverified, when rendered, then the page shows the required demo/disclaimer treatment.

**Q5 — What should AI not touch?**
- Do not fabricate company history, branches, opening hours, prices, specifications, or inventory.
- Do not add branch-level stock or exact availability fields.

## FQ-003: Catalogue discovery

**Q1 — What outcome are we protecting?**  
Visitors can discover any published product from the homepage, category pages, or search, especially on a narrow mobile viewport.

**Q2 — What must never break?**
- Search covers name, brand, and relevant descriptive content.
- Filters are appropriate to available data, update results, and can be cleared.
- Empty, loading, and failure states remain understandable and usable.
- Results do not imply stock availability.

**Q3 — Where should this logic live?**
- Query/filter state and result derivation live in catalogue feature logic.
- Search/filter controls and result cards live in reusable UI components.
- Routing owns category and product slug resolution.

**Q4 — What test proves the rule?**
- `CatalogueSearchTest.findsByNameBrandAndDescription`: given a published catalogue, when each supported term is searched, then matching products are returned.
- `CatalogueFilterTest.appliesAndClearsFilters`: given products with different brands/categories/price labels, when filters are applied and cleared, then results match the active state.
- `CatalogueStateTest.rendersLoadingEmptyAndFailureStates`: given each query state, when the catalogue renders, then an accessible explanatory state is shown.

**Q5 — What should AI not touch?**
- Do not add product comparison, reviews, recommendations, loyalty, or complex analytics.
- Do not represent a filter as proof of live inventory.

## FQ-004: Enquiry conversion and business information

**Q1 — What outcome are we protecting?**  
Every relevant product and contact surface makes a correct WhatsApp enquiry or phone call easy without suggesting online purchase.

**Q2 — What must never break?**
- Business contact values have one configuration/content source.
- WhatsApp URLs are encoded and include the correct product name.
- Phone links use the configured `tel:+233...` number.
- Calls to action say enquiry/contact, never Buy Now, Add to Cart, or Checkout.
- Locations and contact details use verified supplied facts only.

**Q3 — Where should this logic live?**
- Contact configuration and URL/message generation live in a shared contact utility.
- Product context is supplied by product detail components.
- Branch/contact rendering lives in locations and contact features.

**Q4 — What test proves the rule?**
- `ContactLinkTest.generatesEncodedProductWhatsAppUrl`: given a product name, when an enquiry link is generated, then the URL encodes the expected product enquiry message.
- `ContactLinkTest.usesConfiguredPhoneNumber`: given configured contact data, when a call link is generated, then it uses the configured number.
- `ConversionCopyTest.containsNoPurchaseCtas`: given all public routes, then prohibited purchase CTA labels are absent.

**Q5 — What should AI not touch?**
- Do not duplicate contact numbers in individual components.
- Do not add checkout, payment, order capture, or online purchase flows.

## FQ-005: Accessibility, performance, SEO, and release quality

**Q1 — What outcome are we protecting?**  
The public prototype is credible, fast, accessible, SEO-friendly, and demonstrable end to end on mobile and desktop.

**Q2 — What must never break?**
- Semantic headings, useful alt text, keyboard access, visible focus, sufficient contrast, and comfortable touch targets.
- Responsive optimized images do not block first meaningful content.
- Product routes and metadata are SEO-friendly.
- The Vercel deployment and owner demo journey work with real/verified content.

**Q3 — Where should this logic live?**
- Accessibility and responsive behavior live in shared UI primitives and page layouts.
- Metadata lives with route/page composition.
- Deployment configuration and release checks live at the project root and CI/deployment layer.

**Q4 — What test proves the rule?**
- `AccessibilitySmokeTest.publicRoutesHaveLabelsFocusAndHeadings`: given each public route, when audited, then required labels, focus states, and heading structure exist.
- `ResponsiveSmokeTest.mobileRoutesFitAndKeepContactActionsUsable`: given a narrow viewport, when public routes render, then content is readable and contact actions remain usable.
- `MetadataTest.productRouteHasCanonicalAndProductMetadata`: given a published product, when its route metadata is generated, then canonical and product metadata are present.
- `DeploymentSmokeTest.ownerJourneyWorksInPreview`: given the deployed preview, when the owner demo journey is exercised, then it completes without content or contact failures.

**Q5 — What should AI not touch?**
- Do not optimize by removing required accessibility, loading, error, or truthfulness states.
- Do not publish unverified business data merely to make the demo look complete.

