# Romedo Ventures Prototype Task Index

**Last Updated:** 2026-08-31  
**Completed:** 6/24 (25%)  
**Status:** In Progress

Checkbox states: `[x]` done · `[~]` in progress · `[ ]` pending. Task IDs are `<phase>.<sequence>`.

## Progress summary

| Phase | Title | Progress | Status |
|---|---|---:|---|
| 1 | Foundation and content boundary | 3/3 | Complete |
| 2 | CMS content and seed data | 3/3 | Complete |
| 3 | Frontend shell and navigation | 0/3 | Not Started |
| 4 | Catalogue search and filters | 0/3 | Not Started |
| 5 | Product details and contact links | 0/3 | Not Started |
| 6 | About, locations, and contact | 0/3 | Not Started |
| 7 | Quality, SEO, and mobile QA | 0/3 | Not Started |
| 8 | Vercel deployment and owner demo | 0/3 | Not Started |
| **Total** | | **6/24** | **In Progress** |

## Source map

| Phase | ADRs | Implementation plan | Epic folder |
|---|---|---|---|
| 1 | [ADR-001](adrs/ADR-001-prototype-boundaries-and-content-adapter.md) | [PLAN-001](implementation-plans/PLAN-001-foundation-and-content-boundary.md) | [epic-001](epics/epic-001-foundation-and-content-boundary/README.md) |
| 2 | [ADR-002](adrs/ADR-002-content-model-and-truthfulness.md) | [PLAN-002](implementation-plans/PLAN-002-cms-content-and-seed-data.md) | [epic-002](epics/epic-002-cms-content-and-seed-data/README.md) |
| 3 | [ADR-003](adrs/ADR-003-catalogue-discovery-and-routing.md) | [PLAN-003](implementation-plans/PLAN-003-frontend-shell-and-navigation.md) | [epic-003](epics/epic-003-frontend-shell-and-navigation/README.md) |
| 4 | [ADR-003](adrs/ADR-003-catalogue-discovery-and-routing.md) | [PLAN-004](implementation-plans/PLAN-004-catalogue-search-and-filters.md) | [epic-004](epics/epic-004-catalogue-search-and-filters/README.md) |
| 5 | [ADR-003](adrs/ADR-003-catalogue-discovery-and-routing.md), [ADR-004](adrs/ADR-004-contact-conversion.md) | [PLAN-005](implementation-plans/PLAN-005-product-details-and-contact-links.md) | [epic-005](epics/epic-005-product-details-and-contact-links/README.md) |
| 6 | [ADR-002](adrs/ADR-002-content-model-and-truthfulness.md), [ADR-004](adrs/ADR-004-contact-conversion.md) | [PLAN-006](implementation-plans/PLAN-006-about-locations-and-contact.md) | [epic-006](epics/epic-006-about-locations-and-contact/README.md) |
| 7 | [ADR-005](adrs/ADR-005-public-quality-and-release-gates.md) | [PLAN-007](implementation-plans/PLAN-007-quality-seo-and-mobile-qa.md) | [epic-007](epics/epic-007-quality-seo-and-mobile-qa/README.md) |
| 8 | [ADR-001](adrs/ADR-001-prototype-boundaries-and-content-adapter.md), [ADR-002](adrs/ADR-002-content-model-and-truthfulness.md), [ADR-005](adrs/ADR-005-public-quality-and-release-gates.md) | [PLAN-008](implementation-plans/PLAN-008-vercel-deployment-and-owner-demo.md) | [epic-008](epics/epic-008-vercel-deployment-and-owner-demo/README.md) |

## Phase 1 — Foundation and Content Boundary

- [x] 1.1 [Initialize frontend application](epics/epic-001-foundation-and-content-boundary/tasks/task-001-initialize-frontend-application.md)
- [x] 1.2 [Define content models and adapter](epics/epic-001-foundation-and-content-boundary/tasks/task-002-define-content-models-and-adapter.md)
- [x] 1.3 [Add route skeleton and scope guard](epics/epic-001-foundation-and-content-boundary/tasks/task-003-add-route-skeleton-and-scope-guard.md)

## Phase 2 — CMS Content and Seed Data

- [x] 2.1 [Configure CMS schemas](epics/epic-002-cms-content-and-seed-data/tasks/task-001-configure-cms-schemas.md)
- [x] 2.2 [Add validation and published queries](epics/epic-002-cms-content-and-seed-data/tasks/task-002-add-validation-and-published-queries.md)
- [x] 2.3 [Seed marked demo content](epics/epic-002-cms-content-and-seed-data/tasks/task-003-seed-marked-demo-content.md)

## Phase 3 — Frontend Shell and Navigation

- [ ] 3.1 [Create design tokens and shell](epics/epic-003-frontend-shell-and-navigation/tasks/task-001-create-design-tokens-and-shell.md)
- [ ] 3.2 [Build homepage sections](epics/epic-003-frontend-shell-and-navigation/tasks/task-002-build-homepage-sections.md)
- [ ] 3.3 [Build category index and cards](epics/epic-003-frontend-shell-and-navigation/tasks/task-003-build-category-index-and-cards.md)

## Phase 4 — Catalogue Search and Filters

- [ ] 4.1 [Implement product catalogue query](epics/epic-004-catalogue-search-and-filters/tasks/task-001-implement-product-catalogue-query.md)
- [ ] 4.2 [Add filters and clear state](epics/epic-004-catalogue-search-and-filters/tasks/task-002-add-filters-and-clear-state.md)
- [ ] 4.3 [Add catalogue states](epics/epic-004-catalogue-search-and-filters/tasks/task-003-add-catalogue-states.md)

## Phase 5 — Product Details and Contact Links

- [ ] 5.1 [Build product detail route](epics/epic-005-product-details-and-contact-links/tasks/task-001-build-product-detail-route.md)
- [ ] 5.2 [Implement contact link utilities](epics/epic-005-product-details-and-contact-links/tasks/task-002-implement-contact-link-utilities.md)
- [ ] 5.3 [Add product enquiry actions](epics/epic-005-product-details-and-contact-links/tasks/task-003-add-product-enquiry-actions.md)

## Phase 6 — About, Locations, and Contact

- [ ] 6.1 [Build about page](epics/epic-006-about-locations-and-contact/tasks/task-001-build-about-page.md)
- [ ] 6.2 [Build locations and branch cards](epics/epic-006-about-locations-and-contact/tasks/task-002-build-locations-and-branch-cards.md)
- [ ] 6.3 [Build contact page](epics/epic-006-about-locations-and-contact/tasks/task-003-build-contact-page.md)

## Phase 7 — Quality, SEO, and Mobile QA

- [ ] 7.1 [Complete accessibility and responsive polish](epics/epic-007-quality-seo-and-mobile-qa/tasks/task-001-complete-accessibility-and-responsive-polish.md)
- [ ] 7.2 [Optimize images and loading](epics/epic-007-quality-seo-and-mobile-qa/tasks/task-002-optimize-images-and-loading.md)
- [ ] 7.3 [Add SEO metadata and mobile QA](epics/epic-007-quality-seo-and-mobile-qa/tasks/task-003-add-seo-metadata-and-mobile-qa.md)

## Phase 8 — Vercel Deployment and Owner Demo

- [ ] 8.1 [Configure Vercel preview](epics/epic-008-vercel-deployment-and-owner-demo/tasks/task-001-configure-vercel-preview.md)
- [ ] 8.2 [Run content and scope release audit](epics/epic-008-vercel-deployment-and-owner-demo/tasks/task-002-run-content-and-scope-release-audit.md)
- [ ] 8.3 [Execute owner end-to-end demo](epics/epic-008-vercel-deployment-and-owner-demo/tasks/task-003-execute-owner-end-to-end-demo.md)

## Verification checklist

- [ ] `npm test` (or the project test command) passes.
- [ ] Production build succeeds.
- [ ] Public content queries exclude drafts.
- [ ] WhatsApp and telephone links use configured values.
- [ ] Mobile QA covers homepage, catalogue, category, product, about, locations, and contact routes.
- [ ] Preview deployment completes the owner demo journey.
- [ ] No cart, checkout, payment, order, stock quantity, or account UI exists.

## Notes

| Date | Note |
|---|---|
| 2026-08-31 | Initial task index generated from `prototype/docs/prototype-prd.md` using the five-questions workflow. |
