# Foundation Application Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a minimal, tested Next.js and TypeScript application foundation for the Romedo Ventures catalogue prototype.

**Architecture:** Use the Next.js App Router with a small root page and global stylesheet. Keep the application provider-neutral and avoid backend, commerce, auth, and inventory dependencies until their explicitly planned tasks. Add scripts and a single smoke test so the foundation has an executable verification path.

**Tech Stack:** Next.js, React, TypeScript, ESLint, Vitest.

**Spec:** `docs/plans/2026-08-31-foundation-design.md`, `docs/epics/epic-001-foundation-and-content-boundary/tasks/task-001-initialize-frontend-application.md`

## Global Constraints

- The product is a digital catalogue and enquiry storefront, not an e-commerce application.
- Do not add carts, checkout, payments, orders, accounts, delivery tracking, inventory quantities, or branch-level inventory.
- Keep the dependency set free of commerce, auth, and custom-backend packages.
- Preserve the provider-neutral content boundary planned for later tasks.

### Task 1: Initialize the Next.js application

**Files:**
- Create: `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `next-env.d.ts`, `eslint.config.mjs`, `vitest.config.ts`, `.env.example`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `src/app/page.test.tsx`
- Modify: `.gitignore`

**Interfaces:**
- Produces npm scripts for `dev`, `build`, `start`, `lint`, and `test`.
- Produces a root App Router page that later shell and homepage tasks can replace without changing the project runtime.

- [ ] **Step 1: Create the package manifest and project configuration**

  Define the minimal runtime and development dependencies and configure TypeScript, ESLint, Vitest, and Next.js. Include scripts:

  ```json
  {
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "eslint .",
      "test": "vitest run"
    }
  }
  ```

- [ ] **Step 2: Add the App Router root route**

  Create a semantic root layout and a deliberately minimal page confirming that the prototype foundation is running. Keep copy factual and avoid pretending catalogue features exist before their tasks are implemented.

- [ ] **Step 3: Add the first smoke test**

  Test a small exported page-facing value or renderable output so the test command proves the application source can be loaded. The test must pass without requiring a browser or network.

- [ ] **Step 4: Add environment and ignore rules**

  Add `.env.example` with documented placeholder keys only, and ignore local env files, Next build output, coverage output, and dependency directories.

- [ ] **Step 5: Verify the foundation**

  Run:

  ```bash
  npm test
  npm run lint
  npm run build
  ```

  Expected: all commands exit successfully.

- [ ] **Step 6: Commit the task**

  ```bash
  git add .env.example .gitignore eslint.config.mjs next-env.d.ts next.config.ts package-lock.json package.json src tsconfig.json vitest.config.ts
  git commit -m "feat: initialize frontend application"
  git push origin main
  ```
