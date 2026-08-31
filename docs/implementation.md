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

## Configuration
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Public site origin for later canonical URL generation |
