# SARATHI – Landing Page

Welcome to the SARATHI landing page project. This site introduces the "Digital Krishna for Students"—a suite of AI-powered tools designed to guide students through exam preparation with clarity and confidence.

This README is human-friendly and practical. It helps you run, develop, and deploy the app without changing any of the existing logic or UI.

## ✨ What’s inside
- **Modern Next.js app** using the App Router (`app/`)
- **Tailwind CSS v4** with PostCSS
- **Beautiful, comic-inspired UI** built with reusable components in `components/`
- **Feature grid** linking to external SARATHI tools (Mind Map, Flash Notes, AI Bot)
- **Student success stories** with real avatars from `public/`

## 🗂️ Key directories
- `app/` – Next.js routes, layout, and global styles
- `components/` – UI building blocks like `hero-section`, `features-grid`, `why-sarathi`, `navigation`, `footer`
- `public/` – Static assets (e.g., `stress.jpg`, `boy1.jpg`, `boy2.jpg`, `girl.jpg`)
- `styles/` – Project-level CSS helpers

## 🚀 Quick start
Prerequisites:
- Node.js 18+ (Node 22 works great)
- pnpm (recommended) – installed automatically via Corepack or install manually: `npm i -g pnpm`

Install and run locally:
```bash
# from the project root
pnpm install
pnpm dev
# App will start on http://localhost:3000 (or 3001 if 3000 is busy)
```

Build and start production server:
```bash
pnpm build
pnpm start
```

## 🧭 Useful scripts (package.json)
- `pnpm dev` – start the local dev server
- `pnpm build` – production build
- `pnpm start` – run the built app
- `pnpm lint` – run Next.js ESLint

Note: Tailwind’s Oxide is disabled at runtime via `TAILWIND_DISABLE_OXIDE=1` for compatibility.

## 🔗 Feature links used in the site
Clicking the relevant feature cards opens these tools in a new tab:
- Mind Map Generator → https://mindmap-generator-two.vercel.app/
- Flashcards Generator → https://flash-notes-omega.vercel.app/
- AI Chatbot (Saarathi Bot) → https://saarathi-bot.vercel.app/

You can adjust or add links in `components/features-grid.tsx` via the `linkByTitle` map.

## 🖼️ Hero image & avatars
- The hero illustration uses `public/stress.jpg`.
- Student success stories use `public/girl.jpg`, `public/boy1.jpg`, and `public/boy2.jpg`.
- To replace images, simply swap files in `public/` with the same filenames.

## ⚙️ Configuration
- `next.config.mjs` sets `images.unoptimized = true` for straightforward static usage.
- `postcss.config.mjs` loads Tailwind via `@tailwindcss/postcss`.

## 🧩 Tech stack
- Next.js 14 (App Router)
- React 18
- Tailwind CSS 4 + PostCSS
- Radix UI / Lucide icons

## 🧪 Troubleshooting
- If `pnpm dev` fails from the wrong folder, run it from the project root (the directory with `package.json`).
- If port 3000 is busy, Next will auto-switch to 3001 and print the URL.
- If styles don’t load correctly, try a hard refresh and make sure `pnpm install` completed successfully.

## 📦 Deployment
This app can be deployed to Vercel easily:
1. Push the repository to GitHub.
2. Import the repo into Vercel.
3. Build command: `pnpm build` – Output directory: `.next`

## 🙌 Contributing
- Keep the **logic and UI intact** unless a change has been explicitly requested.
- Use consistent Tailwind classes and follow the component structure in `components/`.
- Run `pnpm dev` locally to preview changes before committing.

## 📄 License
This project is provided as-is for SARATHI’s landing experience.
