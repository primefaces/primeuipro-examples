# PrimeUI Pro TaskBoard Nuxt Quickstart

A minimal Nuxt 4 application for starting with [PrimeUI Pro TaskBoard for Vue](https://vue.primeuipro.dev/taskboard). It contains one standard board, editable PrimeOne UI parts, a PrimeVue task editor, and a lightweight topbar and footer with light and dark modes.

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
- An application-owned PrimeVue dialog for task editing
- Editable PrimeOne card and column-header UI parts
- A persistent light and dark mode switch

## Project Map

```text
app/
├── components/primeui/taskboard/  Keep: editable PrimeOne TaskBoard UI parts
├── components/shell/              Optional: quickstart topbar and footer
├── composables/useAppTheme.ts     Optional: light and dark mode state
├── demo/taskboard/                Replace: board, task editor, and fixture data
├── layouts/default.vue            Optional: lightweight quickstart shell
├── pages/index.vue                Replace: thin route for the example
└── plugins/primeui-license.client.ts
                                    Keep: PrimeUI Pro license registration
```

TaskBoard setup also lives in `package.json`, `nuxt.config.ts`, and `app/assets/css/main.css`. Keep those files when replacing only the example page or data.

## Adapt the Quickstart

### Replace the fixture data

The task model, columns, and fixture tasks are in `app/demo/taskboard/data.ts`. Replace the exported values with data from your store or API. Persistence stays in your application; update your store or backend when accepting board changes.

### Replace the example

1. Replace the import and template in `app/pages/index.vue`.
2. Delete `app/demo/taskboard` when your replacement no longer imports it.
3. Update `primevue.components.include` in `nuxt.config.ts` if your page uses a different set of PrimeVue controls.
4. Keep `app/components/primeui/taskboard` for the PrimeOne appearance, or replace those components with your own TaskBoard slot content.

### Remove the quickstart shell

Replace `app/layouts/default.vue` with your application layout, then delete `app/components/shell`. You can also remove `app/composables/useAppTheme.ts`, `app/components/AppPageHeader.vue`, and the logo files in `public/` after removing their remaining imports and uses.

## PrimeOne UI Parts

The TaskBoard UI parts in `app/components/primeui/taskboard` were copied with the PrimeUI CLI and are owned by this application. Regenerate them with:

```bash
corepack pnpm dlx @primeui/cli add taskboard --library vue --ui primeone --output-dir ./app/components/primeui
```

TaskBoard's structural styles, the PrimeOne theme, and copied component styles are registered in `nuxt.config.ts`. The same file configures PrimeVue with Aura and registers the PrimeVue component styles used by the example.

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
