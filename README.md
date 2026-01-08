# Belton IT Nexus Website

Modern React website built with Vite, React, TypeScript, and TailwindCSS.

## Tech Stack

- **Framework**: Vite + React 18
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **i18n**: react-i18next
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Forms**: React Hook Form + Zod

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── app/              # App entry and routing
├── components/       # React components
│   ├── ui/          # Base UI components
│   ├── layout/      # Layout components
│   ├── sections/    # Page sections
│   └── shared/      # Shared components
├── pages/            # Page components
├── i18n/             # Internationalization
├── lib/              # Utilities and helpers
├── types/            # TypeScript types
└── styles/           # Global styles
```

## Regions

The site supports two regions:
- **New Zealand** (en-NZ) - Default route `/`
- **Australia** (en-AU) - Route `/au`
