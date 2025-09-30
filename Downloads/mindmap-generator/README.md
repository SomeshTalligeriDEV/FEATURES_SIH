# Mindmap Generator

A Next.js 14 app with a modern, responsive UI for generating and exploring mindmaps. Built with React 18, Tailwind CSS v4, and a rich set of Radix UI components. This README is written to be straightforward and friendly so you can get up and running quickly.

## Highlights
- **Next.js 14 + React 18** for fast, app-router based development.
- **Tailwind CSS v4** with PostCSS for utility-first styling.
- **Radix UI + shadcn-style components** for accessible, polished UI building blocks.
- **TypeScript** for safer, more maintainable code.

## Tech Stack
- **Framework**: `next@14.2.16`
- **Runtime**: Node.js 18+ recommended (Next.js 14 requires Node 18.17+)
- **UI**: React 18, Radix UI, Tailwind CSS 4
- **Package Manager**: pnpm (lockfile present)

## Prerequisites
- **Node.js**: v18.17.0 or newer
- **pnpm**: If you don’t have it, enable via Corepack:
  ```bash
  corepack enable
  corepack prepare pnpm@latest --activate
  ```

## Getting Started
1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Run the dev server**
   ```bash
   pnpm dev
   ```
   Then open http://localhost:3000 in your browser.

3. **Production build**
   ```bash
   pnpm build
   pnpm start
   ```

## Available Scripts
These come from `package.json`:
- **`pnpm dev`**: Start the Next.js development server.
- **`pnpm build`**: Create an optimized production build.
- **`pnpm start`**: Start the production server after build.
- **`pnpm lint`**: Run Next.js lint.

## Environment Variables
- No required environment variables were detected via a quick scan (e.g., `process.env`). If you add any, document them here and create a `.env.local` file as needed.

## Project Structure
- `app/` — Next.js App Router pages, layouts, and routes
- `components/` — Reusable UI components
- `hooks/` — Reusable React hooks
- `lib/` — Utility functions and helpers
- `public/` — Static assets
- `styles/` — Global styles and Tailwind configuration

## Notes
- This README does not change any app logic or UI. It only documents how to run and work with the project.
- If you run into issues, ensure your Node version matches the requirement and reinstall dependencies.

## License
Add your license details here if applicable.
