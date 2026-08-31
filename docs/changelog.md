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
