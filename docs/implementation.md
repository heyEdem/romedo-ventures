# Implementation

## Entry Points
- `src/app/layout.tsx` — Root HTML layout and metadata for the App Router.
- `src/app/page.tsx` — `/` route and temporary foundation page.
- `package.json` — Development, test, lint, and production scripts.

## Per-Module Breakdown

### Product documentation
- **Entry point:** `prototype/docs/prototype-prd.md`
- **Key classes/functions:** None; this is the source product requirements document.
- **Initialization:** Read by the task and implementation plans under `docs/`.
- **Non-obvious logic:** The PRD explicitly excludes commerce, authentication, inventory, and order workflows.

### Frontend foundation
- **Entry point:** `src/app/page.tsx`
- **Key classes/functions:** `prototypeName`, `Home()` — stable prototype identity and root route render.
- **Initialization:** Next.js loads the App Router layout and page through `next dev`, `next build`, or `next start`.
- **Non-obvious logic:** The route is intentionally a factual placeholder; visual shell and catalogue behavior belong to later tasks.

### Content adapter
- **Entry point:** `src/lib/content/index.ts`
- **Key classes/functions:** `createContentAdapter`, `ContentAdapter`, `ContentStore` — typed content models and a provider-neutral adapter that exposes only published records.
- **Initialization:** Import `createContentAdapter` and pass a `ContentStore` to obtain the public adapter interface.
- **Non-obvious logic:** The adapter filters out draft records so presentational components never see unpublished content. Branches and contact config are returned without filtering since they have no visibility field.

### CMS schema validation
- **Entry point:** `src/lib/content/schemas.ts`
- **Key classes/functions:** `validateProduct`, `validateCategory`, `validateBranch`, `validateUniqueSlugs` — enforce required fields, slug format/unicity, and visibility values.
- **Initialization:** Import validators to check content before publication or seed-data insertion.
- **Non-obvious logic:** Slug format is `/^[a-z0-9]+(-[a-z0-9]+)*$/`; images must have at least one entry; `displayOrder` must be non-negative.

## Configuration
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Public site origin for later canonical URL generation |
