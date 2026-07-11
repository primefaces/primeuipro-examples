# PrimeUI Pro TaskBoard Vite Quickstart

A minimal Vue 3 and Vite application for starting with [PrimeUI Pro TaskBoard for Vue](https://vue.primeuipro.dev/taskboard). It contains one standard board, editable PrimeOne UI parts, a PrimeVue task editor, and a lightweight topbar and footer with light and dark modes.

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

- Explicit TaskBoard, PrimeVue, Aura, style, and license setup in `src/main.ts`
- A controlled TaskBoard with reorderable columns and tasks
- Add, edit, and delete actions through TaskBoard's exposed methods
- An application-owned PrimeVue dialog for task editing
- Editable PrimeOne card and column-header UI parts
- A persistent light and dark mode switch

## Project Map

```text
src/
├── main.ts                         Keep: TaskBoard, PrimeVue, styles, and license setup
├── components/primeui/taskboard/  Keep: editable PrimeOne TaskBoard UI parts
├── components/shell/              Optional: quickstart topbar and footer
├── composables/useAppTheme.ts     Optional: light and dark mode state
├── demo/taskboard/                Replace: board, task editor, and fixture data
└── App.vue                         Replace: one-page quickstart composition
```

## Adapt the Quickstart

The task model, columns, and fixture tasks are in `src/demo/taskboard/data.ts`. Replace those values with data from your store or API. Persistence stays in your application; update your store or backend when accepting board changes.

To replace the example, update `src/App.vue`, then delete `src/demo/taskboard` when it is no longer imported. Keep `src/components/primeui/taskboard` for the PrimeOne appearance, or replace those components with your own TaskBoard slot content.

## PrimeOne UI Parts

The TaskBoard UI parts in `src/components/primeui/taskboard` are copied into and owned by this application. Regenerate the complete PrimeOne set with:

```bash
corepack pnpm dlx @primeui/cli add taskboard --library vue --ui primeone --output-dir ./src/components/primeui
```

TaskBoard structural styles, the PrimeOne theme, copied component styles, PrimeVue, and Aura are registered explicitly in `src/main.ts`.

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
