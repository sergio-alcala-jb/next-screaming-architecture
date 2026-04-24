# Next Screaming Architecture

This repository uses a "screaming architecture" pattern: the folder structure is organized by feature and intent rather than by technical layer. The architecture is designed so that the codebase immediately screams what the application does.

## Core Concepts

- **Feature modules** live under `modules/`.
- **Reusable shared components** live under `shared/`.
- **Routing and layout** are defined in `app/` using the Next.js App Router.
- **Client-only UI logic** is isolated inside client components.
- **Tests** are configured with Vitest in `src/test/`.

## Project Layout

```text
app/
  layout.tsx
  flights/page.tsx
  cart/
  checkout/
  confirmation/
  seat-selection/
modules/
  flights/
    constants.ts
    hooks/
    service/
    store/
    types/
    ui/
      components/
      views/
    utils/
shared/
  components/
    header/
    cb-booker/
  constants/
  hooks/
  services/
  types/
src/
  test/
    setup.ts
    components.test.tsx
vitest.config.ts
package.json
```

## Screaming Architecture Explained

### `app/`
The `app/` directory contains the Next.js routing and layout structure.
- `app/layout.tsx` defines the root HTML structure and imports shared layout-level components like the header.
- `app/flights/page.tsx` is the flight search page.
- Other pages like `cart`, `checkout`, `confirmation`, and `seat-selection` are organized as route folders.

This keeps page entry points simple and server-rendered by default.

### `modules/`
Each feature module encapsulates a specific domain. For example, `modules/flights/` contains:
- `types/` for TypeScript interfaces and domain models.
- `service/` for API calls and business logic.
- `hooks/` for reusable state and behavior logic.
- `ui/` for components and views used by the feature.
- `utils/` for helper functions.

This structure makes each feature self-contained and easy to reason about.

### `shared/`
The `shared/` folder stores generic building blocks that can be reused across multiple features.
- `shared/components/header/` contains a header component used in the global layout.
- `shared/components/cb-booker/` stores cross-cutting UI elements.
- `shared/services/`, `shared/hooks/`, and `shared/types/` contain reusable utilities and types.

### Client vs Server Components
- Page-level files in `app/` are kept server components when possible.
- Interactive UI and stateful behavior are moved into client components inside feature modules.
- This keeps the overall page fast and the interactive parts isolated.

## Example Component Flow

A typical feature flow looks like this:
1. `app/flights/page.tsx` renders the flight search page.
2. It imports `FlightsView` from `modules/flights/ui/views/flights-view.tsx`.
3. `FlightsView` uses:
   - `modules/flights/service/search-flights.ts` to fetch flight data
   - `modules/flights/hooks/use-search-filter.ts` to manage filter state
   - `modules/flights/ui/components/flight-filter.tsx` and `flight-card.tsx` for display
4. `shared/components/header/header.tsx` is rendered in `app/layout.tsx` and appears on every page.

## Testing with Vitest

This project is configured for Vitest:
- `vitest.config.ts` contains the test runner setup.
- `src/test/setup.ts` configures the test environment and global matchers.
- `src/test/components.test.tsx` contains dummy example tests.

### Useful commands

```bash
npm test

npm run test:run
npm run test:ui
npm run test:coverage
```

## Why This Pattern Works

The screaming architecture encourages a structure that answers these questions quickly:
- What feature is this code part of?
- Where are the UI components for this feature?
- Where is the business logic and data fetching?
- Which parts are reusable across the app?

## Architecture rules

1.  **Strict Isolation:** A feature must never import from another feature's internal folders (`ui/components`, `hooks`, `server`). Use the `shared/` directory for common needs.
2.  **Clean Routing:** Files inside `src/app/` (pages and layouts) should stay thin. They should delegate all UI and logic responsibilities to a feature's **View**.
3.  **Promotion Rule:** If a component or hook is needed by more than two features, it should be "promoted" from the feature folder to the `src/shared/` directory.


### Naming Convention: `kebab-case`

We strictly use `kebab-case` for all files and directories (e.g. `user-profile-header.tsx`).

* **Case Sensitivity:** Avoids issues across different operating systems (Windows vs. Linux).
* **Web Standard:** Aligns with URL structures and CSS class naming conventions.
* **Readability:** Improves visual scanning in the file explorer.


