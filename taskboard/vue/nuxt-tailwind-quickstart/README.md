# PrimeUI Pro TaskBoard Nuxt Tailwind Quickstart

A minimal Nuxt 4 application for starting with [PrimeUI Pro TaskBoard for Vue](https://vue.primeuipro.dev/taskboard) using copied Tailwind UI parts and native HTML controls. It does not install PrimeVue or load the PrimeOne theme.

## Run the App

From this directory:

```bash
corepack pnpm install
cp .env.example .env
corepack pnpm dev
```

Set your PrimeUI Pro license key in `.env`:

```dotenv
NUXT_PUBLIC_PRIMEUI_LICENSE=your-license-key
```

Open `http://localhost:3000` after Nuxt starts.

## What the Example Shows

- A controlled TaskBoard with reorderable columns and tasks
- Add, edit, and delete actions through TaskBoard's exposed methods
- A native HTML editor dialog styled with Tailwind utilities
- Editable Tailwind card and column-header UI parts
- Application-defined TaskBoard and Tailwind theme tokens
- A persistent light and dark mode switch

## Project Map

```text
app/
├── assets/css/main.css            Tailwind import, fixed theme tokens, and TaskBoard variables
├── components/primeui/taskboard/  Keep: editable Tailwind TaskBoard UI parts
├── components/shell/              Optional: quickstart topbar and footer
├── composables/useAppTheme.ts     Optional: light and dark mode state
├── demo/taskboard/                Replace: board, native editor, and fixture data
├── layouts/default.vue            Optional: lightweight quickstart shell
├── pages/index.vue                Replace: thin route for the example
└── plugins/primeui-license.client.ts
                                    Keep: PrimeUI Pro license registration
```

TaskBoard setup also lives in `package.json` and `nuxt.config.ts`. Keep those files when replacing only the example page or data.

## No PrimeVue Dependency

The application uses native `button`, `input`, `select`, and `textarea` elements. The modal editor is application code in `app/demo/taskboard/TaskEditorDialog.vue`. `package.json` does not include `primevue`, `@primevue/nuxt-module`, or `@primeuix/themes`.

Only `@primeui/taskboard-style/style.css` is loaded from the TaskBoard style package. The PrimeOne theme stylesheet is not used; equivalent fixed color, surface, focus, radius, and TaskBoard variables are defined in `app/assets/css/main.css`.

## Adapt the Quickstart

### Replace the fixture data

The task model, columns, and fixture tasks are in `app/demo/taskboard/data.ts`. Replace the exported values with data from your store or API. Persistence stays in your application; update your store or backend when accepting board changes.

### Replace the example

1. Replace the import and template in `app/pages/index.vue`.
2. Delete `app/demo/taskboard` when your replacement no longer imports it.
3. Keep `app/components/primeui/taskboard` for the Tailwind card and header surfaces, or replace them with your own TaskBoard slot content.

### Remove the quickstart shell

Replace `app/layouts/default.vue` with your application layout, then delete `app/components/shell`. You can also remove `app/composables/useAppTheme.ts`, `app/components/AppPageHeader.vue`, and the logo files in `public/` after removing their remaining imports and uses.

## Tailwind UI Parts

The TaskBoard UI parts in `app/components/primeui/taskboard` are copied into and owned by this application. Regenerate the complete Tailwind set with:

```bash
corepack pnpm dlx @primeui/cli add taskboard --library vue --ui tailwind --output-dir ./app/components/primeui
```

This quickstart keeps only the advanced card and standard column header used by its page. Tailwind scans their utility classes through the Nuxt Vite integration.

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
