# PrimeUI Pro TaskBoard Nuxt Quickstart

A standalone Nuxt 4 application with standard and swimlane TaskBoard examples.

## Start

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Set `NUXT_PUBLIC_PRIMEUI_LICENSE` in `.env` before running the app with a commercial PrimeUI Pro license.

## Project Structure

```text
app/
├── components/             Reusable shell and copied PrimeOne UI parts
├── config/theme.ts         Primary and surface palette options
├── composables/            PrimeUI theme state
├── demo/taskboard/         Removable TaskBoard composition and data
├── layouts/default.vue     Topbar, sidebar, content, and footer
├── pages/                  Standard and swimlane routes
└── plugins/                PrimeUI license registration
```

The essential integration is in `app/demo/taskboard/StandardTaskBoard.vue` and `app/demo/taskboard/SwimlaneTaskBoard.vue`. Replace or remove the entire `app/demo/taskboard` folder when adapting the quickstart to an application.

The editable PrimeOne UI parts in `app/components/primeui/taskboard` were copied with the PrimeUI CLI. They use PrimeVue components and can be changed independently of the TaskBoard runtime.

```bash
pnpm dlx @primeui/cli add taskboard --library vue --ui primeone --output-dir ./app/components/primeui
```

TaskBoard's structural styles, PrimeOne theme, and copied component styles are registered in `nuxt.config.ts`. The same file configures PrimeVue with the Aura preset. Tailwind utilities consume the generated PrimeUI tokens from `app/assets/css/main.css`.

Both boards keep their CRUD flow in `app/demo/taskboard`: PrimeVue renders the task toolbar and editor dialog, while TaskBoard's exposed `addTask`, `updateTask`, and `removeTask` methods update the controlled task array.

The topbar uses the PrimeUI Pro logo assets from `public/` and includes persistent primary, surface, and dark-mode controls. Palette options are isolated in `app/config/theme.ts` and applied with PrimeUI's `updatePreset` and `updateSurfacePalette` APIs.

## Commands

```bash
pnpm dev
pnpm typecheck
pnpm build
pnpm preview
```
