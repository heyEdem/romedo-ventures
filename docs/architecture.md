# Architecture

## Project Type
Documentation-first prototype repository; the application stack will be established by Phase 1 Task 1.1 as a Next.js App Router application with TypeScript.

## Directory Map
```text
docs/       Product requirements, ADRs, plans, epics, and task backlog
prototype/  Prototype PRD source documents
```

## Module Overview
| Module/Package | Purpose |
|---|---|
| `docs/` | Defines product scope, decisions, implementation sequence, and acceptance criteria |
| `prototype/docs/` | Holds the source prototype PRD |

## Data Flow
No runtime application exists yet. The planned flow is: Next.js route/page → provider-neutral content adapter → published CMS content.

## External Dependencies
No application dependencies are present yet. The planned frontend dependency is Next.js with React and TypeScript; CMS dependencies are deferred to Phase 2.
