# Patterns

## Naming Conventions
- Files: kebab-case for documentation filenames; Next.js route files follow App Router conventions.
- Classes/types: TypeScript types and React components use PascalCase when introduced.
- Functions/methods: camelCase for functions such as `prototypeName` exports and React route functions.
- Variables: camelCase.

## Folder Conventions
`docs/epics/` contains executable task definitions grouped by product phase. `docs/implementation-plans/` contains phase-level plans. `prototype/docs/` contains the source PRD. `src/app/` follows Next.js App Router file conventions.

## Recurring Code Patterns
- Error handling: Not determinable; no application source exists yet.
- Async: Next.js server components are the default; no async application logic exists yet.
- Dependency injection: Not determinable; no application source exists yet.
- Validation: Product and visibility constraints are currently documented in ADRs and the PRD.

## Testing Conventions
- Test file location: Co-located `*.test.ts` and `*.test.tsx` files for unit/smoke tests.
- Test naming: Acceptance test names are specified in the implementation plans, for example `ContentAdapterTest.returnsOnlyPublishedContent`.
- Test helpers: None established.

## Anti-Patterns Observed
None identified in the documentation-only repository.
