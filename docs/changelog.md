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
