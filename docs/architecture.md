# Architecture

## Project Type
Next.js 16 App Router application with React 19 and TypeScript 6. The frontend is a documentation-first digital catalogue prototype.

## Directory Map
```text
docs/           Product requirements, ADRs, plans, epics, and task backlog
prototype/      Prototype PRD source documents
src/app/        Next.js root layout, route, and global foundation styles
src/lib/content/ Typed content models, provider-neutral adapter, validation, and seed data
```

## Module Overview
| Module/Package | Purpose |
|---|---|
| `docs/` | Defines product scope, decisions, implementation sequence, and acceptance criteria |
| `prototype/docs/` | Holds the source prototype PRD |
| `src/app/` | Provides the initial App Router page, layout, metadata, and global CSS |
| `src/lib/content/` | Defines typed content models, provider-neutral adapter, schema validation, and demo seed data with verification markers |

## Data Flow
The root request enters the Next.js App Router, renders `src/app/layout.tsx`, and resolves `/` through `src/app/page.tsx`. Components consume published content through `src/lib/content/` adapter, which keeps CMS calls behind a provider-neutral boundary.

## External Dependencies
| `next` | App Router runtime and production build |
| `react`, `react-dom` | UI runtime |
| `vitest`, `jsdom` | Node-based smoke testing |
| `eslint`, `eslint-config-next` | Static analysis and Next.js conventions |
