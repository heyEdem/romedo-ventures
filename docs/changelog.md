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
