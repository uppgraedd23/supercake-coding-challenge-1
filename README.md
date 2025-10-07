# Supercake Coding Challenge

A customer and pet management interface built with Next.js 15, TypeScript, and Tailwind CSS.

## Overview

This application allows users to search and filter customers based on their information and pets. The interface supports text search across multiple fields and filtering by pet species, with both grid and list view layouts.

## Features

### Search Functionality

The search bar filters customers by:

- Customer ID
- Name
- Email address
- Phone number
- Pet name
- Pet ID

Search is case-insensitive and debounced (300ms) to optimize performance.

### Pet Filtering

A dropdown menu allows filtering customers by pet species (Dogs, Cats, Birds, Hamsters, Rats). Multiple species can be selected simultaneously. Selected filters appear as removable badges next to the dropdown for quick access.

The filter state is temporary until "Apply Filters" is clicked, allowing users to preview selections before committing. The "Reset" button clears all selections.

### View Modes

Two display modes are available:

- **Grid View**: Cards arranged in a 2-column grid (1 column on mobile)
- **List View**: Table-like layout with responsive columns

## Technical Implementation

### Architecture

The project follows Next.js 15 App Router conventions with a clear separation between UI components, feature components, and business logic:

```
src/
├── app/
│   ├── api/customers/
│   │   ├── route.ts              # API endpoint
│   │   └── customers.json        # Mock data
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── features/
│   │   ├── CustomerCard.tsx
│   │   ├── PetsPopover.tsx
│   │   └── SearchBar.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── ViewToggle.tsx
│       └── icons.tsx
├── hooks/
│   └── useCustomers.ts
├── lib/
│   └── colors.ts
└── types/
    ├── api.ts
    └── customer.ts
```

### Key Design Decisions

**Component Organization**
Components are split into two categories: `ui` contains reusable UI primitives (buttons, inputs), while `features` contains business-logic components specific to this application.

**State Management**
The application uses local React state. The `useCustomers` hook manages server state, handling API calls and debouncing. Filter state is split into temporary (preview) and applied (active) states to support the "Apply Filters" workflow.

**Type Safety**
TypeScript is used throughout with shared types between frontend and API. This ensures consistency and catches errors at compile time.

**Styling**
Tailwind CSS provides utility classes. Design tokens (colors) are centralized in `/src/lib/colors.ts` to maintain consistency and make updates easier.

**Performance**

- Search input is debounced to reduce API calls
- `useMemo` and `useCallback` prevent unnecessary re-renders
- Next.js handles code splitting automatically

### Search Implementation

The API endpoint (`/src/app/api/customers/route.ts`) filters customers server-side. It performs case-insensitive matching across all customer and pet fields, supporting both exact ID matches and partial text searches.

### Filter State Flow

1. User selects species in the popover (updates `tempSelectedSpecies`)
2. User clicks "Apply Filters" (copies `tempSelectedSpecies` to `selectedSpecies`)
3. `useCustomers` hook triggers new API call with updated filters
4. Results update on the page

Clicking a filter badge removes it immediately without going through the temporary state.

### Responsive Behavior

- Mobile (< 640px): Single column, stacked elements
- Tablet (640px - 1024px): Flexible layout with wrapping
- Desktop (> 1024px): Full grid with fixed column widths

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the application.

### Available Commands

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Run production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run typecheck    # Check TypeScript types
npm run checks       # Run all checks
```

## Technology Stack

**Core**

- Next.js 15.1.5 (App Router)
- React 19.0.0
- TypeScript 5.x
- Tailwind CSS 3.4.1

**Development**

- ESLint (Next.js config)
- Prettier 3.4.2
- PostCSS

### Search

1. Type in the search bar to filter customers
2. Try searching by name ("Emma"), email ("@example.com"), phone ("555"), or pet name ("Max")

### Filters

1. Click the "Pets" button
2. Select one or more pet types
3. Click "Apply Filters" to see results
4. Hover over a filter badge and click to remove it
5. Click "Reset" to clear all filters

### Views

Click the grid or list icon to switch between layouts.

## Performance

- Bundle size: 120 kB (First Load JS)
- Build time: ~10 seconds
- TypeScript coverage: 100%
- Zero ESLint warnings or errors

## Configuration

**tailwind.config.ts** - Custom colors, spacing, border radius, and shadows
**tsconfig.json** - TypeScript settings with path aliases (@/)
**eslint.config.mjs** - Linting rules
**.prettierrc.json** - Code formatting

## Production Build

The application is production-ready. Run the following to verify:

```bash
npm run build
npm run checks
```

Build output includes optimized JavaScript bundles, minified CSS, and static HTML where possible.
