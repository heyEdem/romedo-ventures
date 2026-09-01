# Implementation

## Entry Points
- `src/app/layout.tsx` — Root HTML layout with shell (Header, main, Footer).
- `src/app/page.tsx` — `/` route homepage with categories, featured products, locations, and CTAs.
- `src/components/header.tsx` — Responsive header with desktop nav and mobile slide-out menu.
- `src/components/footer.tsx` — Footer with navigation links and copyright.
- `src/components/search-bar.tsx` — Client search input that navigates to `/products?q=...` on submit.
- `src/app/globals.css` — Design tokens and layout primitives.
- `package.json` — Development, test, lint, and production scripts.

## Per-Module Breakdown

### Product documentation
- **Entry point:** `prototype/docs/prototype-prd.md`
- **Key classes/functions:** None; this is the source product requirements document.
- **Initialization:** Read by the task and implementation plans under `docs/`.
- **Non-obvious logic:** The PRD explicitly excludes commerce, authentication, inventory, and order workflows.

### Frontend foundation
- **Entry point:** `src/app/page.tsx`
- **Key classes/functions:** `prototypeName`, `Home()` — stable prototype identity and root route render with categories, featured products, branches, and contact CTAs.
- **Initialization:** Next.js loads the App Router layout and page through `next dev`, `next build`, or `next start`.
- **Non-obvious logic:** The homepage consumes seed data through the adapter and renders live content from the in-memory store.

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

### Seed data
- **Entry point:** `src/lib/content/seed.ts`
- **Key classes/functions:** `seedStore`, `seedProducts`, `seedCategories`, `seedBranches`, `seedContact` — representative demo content with `VerificationStatus` markers.
- **Initialization:** Import `seedStore` and pass to `createContentAdapter` for development and testing.
- **Non-obvious logic:** All seed records are marked `'demo'` or `'placeholder'`; none are `'verified'`. Placeholder phone numbers use `+233XXXXXXXXX`. Every record carries a `verificationNote` identifying it as needing verification before public release.

### Shell components
- **Entry point:** `src/components/header.tsx`, `src/components/footer.tsx`
- **Key classes/functions:** `Header` (responsive nav with mobile menu), `Footer` (navigation links and copyright).
- **Initialization:** Imported by `src/app/layout.tsx` and rendered on every page.
- **Non-obvious logic:** Header uses `usePathname` to set `aria-current="page"` on active links. Mobile menu uses `data-open` attribute with CSS transitions for slide-out behavior.

### Search bar
- **Entry point:** `src/components/search-bar.tsx`
- **Key classes/functions:** `SearchBar` — client component with form submission that navigates to `/products?q=...`.
- **Initialization:** Imported by `src/app/page.tsx` and rendered between the hero and categories sections.
- **Non-obvious logic:** Empty queries redirect to `/products` without a query parameter. Uses `useRouter` from `next/navigation` for client-side navigation.

### Product catalogue search
- **Entry point:** `src/app/products/page.tsx`, `src/lib/content/adapter.ts`
- **Key classes/functions:** `ContentAdapter.searchProducts(query)` — returns published products matching name, brand, shortDescription, or description. Products page consumes `searchParams.q` to display filtered or full results.
- **Initialization:** Server component reads `searchParams`, passes query to adapter's `searchProducts`.
- **Non-obvious logic:** Empty or whitespace-only queries return all published products. Case-insensitive matching across four text fields. Draft products are excluded from results.

### Design tokens
- **Entry point:** `src/app/globals.css`
- **Key classes/functions:** CSS custom properties for colors, typography, spacing, breakpoints, radius, shadows, and focus rings.
- **Non-obvious logic:** Tokens use a 4px base spacing scale. Breakpoints are defined as `--bp-sm/md/lg` custom properties for reference; actual media queries use `@media (min-width: 40rem)` etc. Focus ring uses double box-shadow for visibility on both light and dark backgrounds.

## Configuration
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Public site origin for later canonical URL generation |
