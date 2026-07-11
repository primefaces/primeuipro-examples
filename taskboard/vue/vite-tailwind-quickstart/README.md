# PrimeUI Pro TaskBoard Vite Tailwind Quickstart

A minimal Vue 3 and Vite application for starting with [PrimeUI Pro TaskBoard for Vue](https://vue.primeuipro.dev/taskboard) using copied Tailwind UI parts and native HTML controls. It does not install PrimeVue or load the PrimeOne theme.

## Run the App

From this directory:

```bash
corepack pnpm install
cp .env.example .env
corepack pnpm dev
```

Set your PrimeUI Pro license key in `.env`:

```dotenv
VITE_PRIMEUI_LICENSE=your-license-key
```

Open the local URL printed by Vite.

## What the Example Shows

- Explicit TaskBoard, Tailwind, style, and license setup
- A controlled TaskBoard with reorderable columns and tasks
- Add, edit, and delete actions through TaskBoard's exposed methods
- A native HTML dialog and form controls styled with Tailwind utilities
- Editable Tailwind card and column-header UI parts
- Application-defined TaskBoard tokens with light and dark modes

## Project Map

```text
src/
├── main.ts                         Keep: TaskBoard styles and license setup
├── assets/css/main.css            Tailwind import, fixed theme tokens, and TaskBoard variables
├── components/primeui/taskboard/  Keep: editable Tailwind TaskBoard UI parts
├── components/shell/              Optional: quickstart topbar and footer
├── composables/useAppTheme.ts     Optional: light and dark mode state
├── demo/taskboard/                Replace: board, native editor, and fixture data
└── App.vue                         Replace: one-page quickstart composition
```

## No PrimeVue Dependency

The application uses native `button`, `input`, `select`, `textarea`, and `dialog` elements. `package.json` does not include `primevue`, `@primevue/nuxt-module`, or `@primeuix/themes`.

Only `@primeui/taskboard-style/style.css` is loaded from the TaskBoard style package. The PrimeOne stylesheet is not used; fixed color, surface, focus, radius, and TaskBoard variables are defined in `src/assets/css/main.css`.

## Adapt the Quickstart

The task model, columns, and fixture tasks are in `src/demo/taskboard/data.ts`. Replace those values with data from your store or API. Persistence stays in your application; update your store or backend when accepting board changes.

To replace the example, update `src/App.vue`, then delete `src/demo/taskboard` when it is no longer imported. Keep `src/components/primeui/taskboard` for the Tailwind card and header surfaces, or replace them with your own TaskBoard slot content.

## Tailwind UI Parts

The TaskBoard UI parts in `src/components/primeui/taskboard` are copied into and owned by this application. Regenerate the complete Tailwind set with:

```bash
corepack pnpm dlx @primeui/cli add taskboard --library vue --ui tailwind --output-dir ./src/components/primeui
```

This quickstart keeps only the advanced card and standard column header used by its page.

## Commands

```bash
corepack pnpm dev
corepack pnpm typecheck
corepack pnpm build
corepack pnpm preview
```

## Documentation

- [TaskBoard overview](https://vue.primeuipro.dev/taskboard)
- [TaskBoard setup](https://vue.primeuipro.dev/taskboard/getting-started/setup)
- [PrimeUI Pro](https://primeuipro.dev/)
