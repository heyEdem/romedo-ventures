# Changelog

## 2026-08-31 — Initial index
- First scan of the documentation-first repository.
- Generated `architecture.md`, `implementation.md`, `patterns.md`, `decisions.md`, and `changelog.md`.

## 2026-08-31 — Initialize frontend application
- Added the Next.js App Router, TypeScript, lint, Vitest, and environment foundation.
- Added the root route smoke test and updated the Phase 1 task tracker.

## 2026-08-31 — Define content models and adapter
- Added typed content models: Product, Category, Branch, ContactConfig.
- Implemented `createContentAdapter` with published-only filtering.
- Added adapter tests verifying draft/published content isolation.

## 2026-08-31 — Add route skeleton and scope guard
- Created route placeholders for all PRD routes: `/products`, `/products/[slug]`, `/categories`, `/categories/[slug]`, `/about`, `/contact`.
- Added scope boundary test that rejects prohibited e-commerce labels and dependencies.
- Completed Phase 1 foundation and content boundary.

## 2026-08-31 — Configure CMS schemas
- Added `validateProduct`, `validateCategory`, `validateBranch` schema validators with required-field, slug-format, and visibility checks.
- Added `validateUniqueSlugs` for cross-record slug uniqueness enforcement.
- Exported schemas from `src/lib/content/` for CMS and seed-data use.

## 2026-08-31 — Add validation and published queries
- Added `validateProductCategoryRelationships` to ensure products reference valid categories.
- Fixed lint error in scope-boundary.test.ts by replacing `require('fs')` with proper imports.
- Added tests for relationship validation covering valid references, unknown categories, and multiple invalid references.
- Verified public queries exclude drafts and don't expose stock quantities.

## 2026-08-31 — Seed marked demo content
- Added `VerificationStatus` type (`verified` | `demo` | `placeholder`) to Product, Category, and Branch.
- Created `src/lib/content/seed.ts` with 10 demo products, 5 categories, 2 branches, and contact config — all marked as unverified.
- Added `TruthfulnessRenderingTest` verifying all seed data carries verification markers and no record is falsely marked verified.
- Added `SeedDataValidationTest` confirming all seed data passes schema validation, slug uniqueness, and category relationship checks.
- Placeholder branch phone numbers use `+233XXXXXXXXX` format pending real verification.
- Phase 2 (CMS content and seed data) is now complete.

## 2026-08-31 — Create design tokens and shell
- Defined CSS custom properties for colors, typography, spacing, breakpoints, radius, shadows, and focus rings in globals.css.
- Created `Header` component with desktop nav, mobile slide-out menu, WhatsApp and phone CTAs.
- Created `Footer` component with navigation links and copyright.
- Updated root layout with semantic landmarks: sticky header, `page-content` main, footer.
- Wired seed data into layout for contact config and into all route pages for live content.
- Updated all route pages (products, categories, about, contact) to consume seed data through the adapter.
- Added vitest path alias config for `@/` imports.
- Added `shell.test.ts` with NavigationTest, HomepageTest, ResponsiveSmokeTest, and ShellStructureTest (19 tests).
- All 63 tests pass, lint clean, production build succeeds.

## 2026-09-01 — Build homepage sections
- Added `SearchBar` client component with search input and form submission to `/products?q=...`.
- Integrated search bar into homepage between hero and categories sections.
- Added search bar styles to globals.css with focus ring and responsive design.
- Updated task index and implementation docs to reflect task 3.2 completion.

## 2026-09-01 — Build category index and cards
- Created `CategoryCard` component with image fallback (onError swap to SVG placeholder) and optional product count.
- Created `ProductCard` component with image fallback, brand label, and price display.
- Added card CSS system: `.card`, `.card-image`, `.card-body`, `.card-title`, `.card-description`, `.card-price`, `.card-meta`, hover shadow transition.
- Refactored `/categories`, `/categories/[slug]`, `/products`, and homepage to use shared card components, eliminating duplicated inline card markup.
- Phase 3 (frontend shell and navigation) is now complete.

## 2026-09-01 — Implement product catalogue query
- Added `searchProducts(query)` method to `ContentAdapter` — searches published products by name, brand, shortDescription, and description.
- Updated `/products` page to accept `searchParams.q` and display filtered results with result count.
- Added `CatalogueSearchTest` covering name, brand, description, empty query, and draft exclusion.
- All 68 tests pass, lint clean.

## 2026-09-01 — Add filters and clear state
- Added `filterProducts(filters)` and `getBrands()` methods to `ContentAdapter` for category, brand, and combined filtering.
- Created `FilterBar` client component with category/brand dropdowns, active state from URL params, and "Clear filters" button.
- Updated `/products` page to accept `category` and `brand` search params, pass them to the adapter, and render FilterBar.
- Added filter bar CSS: `.filter-bar`, `.filter-group`, `.filter-select`, `.filter-clear` with responsive stacking on mobile.
- Added `ProductFiltersTest` covering category, brand, combined filters, no-filter passthrough, and brand extraction.
- All 73 tests pass, lint clean, production build succeeds.

## 2026-09-01 — Add catalogue states
- Created `loading.tsx` with animated skeleton cards, filter bar placeholder, and screen-reader loading announcement.
- Created `error.tsx` client error boundary with "Try again" reset action and homepage link.
- Enhanced empty state with icon, contextual messaging, and recovery actions (clear filters / homepage).
- Added `Pagination` client component with page buttons, ellipsis, prev/next, and URL param preservation.
- Products page now shows "Showing X–Y of Z results" and paginates at 12 per page.
- Added CSS for skeleton animation, empty-state, error-state, retry-button, and pagination-button.
- Phase 4 (catalogue search and filters) is now complete.

## 2026-09-01 — Build product detail route
- Rewrote `/products/[slug]` with image gallery, thumbnail selector, breadcrumbs with category context, specifications grid, price display, availability disclaimer, and WhatsApp/phone CTAs.
- Created `ProductGallery` client component with active image state, thumbnail navigation, and fallback on image error.
- Created `RelatedProducts` client component showing same-category products.
- Added `getProductBySlug`, `getRelatedProducts`, and `getCategoryBySlug` methods to `ContentAdapter`.
- Created `src/lib/contact.ts` with `buildWhatsAppUrl`, `buildTelUrl`, and `buildGeneralWhatsAppUrl` utilities.
- Added `not-found.tsx` for invalid product slugs with recovery link.
- Added `generateStaticParams` for SSG and `generateMetadata` for SEO on product detail pages.
- Added product detail CSS: gallery, breadcrumbs, specs grid, action buttons, related products grid.
- Added `ContactLinkTest` and adapter method tests. All 87 tests pass, production build succeeds.

## 2026-09-01 — Add product enquiry actions
- Improved product action button touch targets with `min-height: 2.75rem` for mobile accessibility.
- Added `aria-label` attributes to WhatsApp and call CTAs for screen reader context.
- Completed Phase 5 (product details and contact links).

## 2026-09-01 — Build contact page
- Contact page uses shared `buildGeneralWhatsAppUrl` and `buildTelUrl` utilities from `src/lib/contact.ts`.
- Renders WhatsApp and Call CTAs from adapter contact config without duplicating numbers.
- Displays branch locations via `BranchCard` component with graceful omission of absent data.
- Added `ContactPageTest` with 7 tests covering shared actions, config usage, and missing-data handling.
- Phase 6 (about, locations, and contact) is now complete.

## 2026-09-01 — Complete accessibility and responsive polish
- Added skip-to-content link with `skip-link` styles and `#main-content` target.
- Added `prefers-reduced-motion: reduce` media query to disable animations and transitions.
- Added Escape key handler to close mobile nav and return focus to toggle button.
- Added `aria-hidden="true"` to all decorative SVGs in header, pagination, and search bar.
- Added distinguishing `aria-label` to branch card WhatsApp/Call links (includes branch name).
- Wrapped category detail breadcrumb in `<nav aria-label="Breadcrumb">` with `aria-current="page"`.
- Added 18 accessibility smoke tests covering skip link, landmarks, labels, keyboard, SVGs, and reduced motion.
- All 133 tests pass, production build succeeds.

## 2026-09-02 — Add SEO metadata and mobile QA
- Added `metadata` exports (title, description, openGraph) to Home, Products, About, Contact, and Categories index pages.
- Added `generateMetadata` to product detail and category detail pages for dynamic per-route SEO.
- Enhanced product detail page metadata with OpenGraph fields.
- Added 10 metadata smoke tests verifying titles, descriptions, and openGraph presence across all routes.
- All 143 tests pass.
