# Architectural Decisions

The accepted architectural decisions are recorded in [`docs/adrs/`](adrs/).

## Documentation-first implementation
**Date:** 2026-08-31
**Why:** The repository begins with a PRD, ADRs, implementation plans, and task-level acceptance criteria, so implementation should proceed from those artifacts in dependency order.
**Tradeoffs:** Initial work includes documentation and scaffolding before visible product UI.
**Alternatives considered:** Starting directly with a homepage was rejected because it would bypass the approved content boundary and task sequence.
