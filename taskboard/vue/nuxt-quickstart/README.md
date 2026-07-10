# PrimeUI Pro TaskBoard Nuxt Quickstart

A standalone Nuxt 4 application for starting with [PrimeUI Pro TaskBoard for Vue](https://vue.primeuipro.dev/taskboard). It includes a standard board, a swimlane board, editable PrimeOne UI parts, and a PrimeVue task editor.

## Run the App

From this directory:

```bash
corepack pnpm install
cp .env.example .env
corepack pnpm dev
```

Set your PrimeUI Pro license key in `.env` before running the app:

```dotenv
NUXT_PUBLIC_PRIMEUI_LICENSE=your-license-key
```

Open `http://localhost:3000` after Nuxt starts.

## Included Examples

| Route | Example |
| --- | --- |
| `/` | Standard board with editable tasks and reorderable columns |
| `/swimlanes` | Tasks grouped into collapsible team swimlanes |

Both routes include add, edit, and delete flows. The dialog is application-owned PrimeVue UI; TaskBoard's `addTask`, `updateTask`, and `removeTask` methods update the controlled task array.

## Project Map

```text
app/
├── components/primeui/taskboard/  Keep: editable PrimeOne TaskBoard UI parts
├── components/shell/              Optional: quickstart header, navigation, and footer
├── config/theme.ts                Optional: primary and surface palette choices
├── composables/useAppTheme.ts     Optional: theme persistence and token updates
├── demo/taskboard/                Replace: example boards, task editor, and fixtures
├── layouts/default.vue            Optional: quickstart application shell
├── pages/                          Replace: thin route wrappers for the examples
└── plugins/primeui-license.client.ts
                                    Keep: PrimeUI Pro license registration
```

TaskBoard setup also lives in `package.json`, `nuxt.config.ts`, and `app/assets/css/main.css`. Do not remove those files when replacing only the sample data or routes.

## Adapt the Quickstart

### Replace the sample data

The fixture tasks, columns, swimlanes, and demo model types currently live in `app/demo/taskboard/data.ts`. Replace the exported values with data from your store or API. The example intentionally keeps persistence outside TaskBoard; update your backend or store when accepting board changes.

### Keep only one example

To keep the standard board only:

1. Delete `app/pages/swimlanes.vue`.
2. Delete `app/demo/taskboard/SwimlaneTaskBoard.vue`.
3. Remove the `/swimlanes` entry from `app/components/shell/AppSidebar.vue`.
4. Remove swimlane-specific fixture fields after connecting your own task model.

To keep the swimlane board only, replace the `/` page with the swimlane example, remove `app/pages/swimlanes.vue`, and reduce the sidebar to one route.

### Replace all examples

`app/demo/taskboard` is removable only after its route imports are replaced:

1. Replace or remove `app/pages/index.vue` and `app/pages/swimlanes.vue`.
2. Update the entries in `app/components/shell/AppSidebar.vue`.
3. Delete `app/demo/taskboard`.
4. Update `primevue.components.include` in `nuxt.config.ts` if your replacement uses a different set of PrimeVue controls.

The copied UI parts in `app/components/primeui/taskboard` are separate from the demo. Keep them when continuing with the PrimeOne TaskBoard appearance, or replace them with your own slot content.

### Remove the quickstart shell

The header, sidebar, footer, theme configurator, and logos are optional application scaffolding. To replace them with your own layout:

1. Replace `app/layouts/default.vue` with your application layout.
2. Delete `app/components/shell` and `app/components/AppPageHeader.vue` after removing their uses from your pages.
3. Delete `app/config/theme.ts` and `app/composables/useAppTheme.ts` if you do not need the palette configurator.
4. Delete the PrimeUI Pro logo files from `public/` if your layout does not use them.
5. Remove unused `--app-*` shell tokens from `app/assets/css/main.css` while keeping the Tailwind import and PrimeUI token mappings your pages still use.

## PrimeOne UI Parts

The editable TaskBoard UI parts in `app/components/primeui/taskboard` were copied with the PrimeUI CLI. Regenerate them with:

```bash
corepack pnpm dlx @primeui/cli add taskboard --library vue --ui primeone --output-dir ./app/components/primeui
```

TaskBoard's structural styles, the PrimeOne theme, and copied component styles are registered in `nuxt.config.ts`. The same file configures PrimeVue with Aura and registers the PrimeVue component styles used by this app. Keep `primevue.components.include` synchronized with any PrimeVue controls you add or remove.

## Theme Configuration

The quickstart supports light and dark modes plus configurable primary and surface palettes. Palette definitions are in `app/config/theme.ts`; `app/composables/useAppTheme.ts` applies them with `updatePreset` and `updateSurfacePalette` and stores the selection in local storage.

Tailwind utilities use PrimeUI theme tokens mapped in `app/assets/css/main.css`.

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
