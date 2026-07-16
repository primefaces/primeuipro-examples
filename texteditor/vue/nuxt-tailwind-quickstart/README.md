# PrimeUI Pro Text Editor Nuxt Tailwind Quickstart

A minimal Nuxt 4 application for starting with [PrimeUI Pro Text Editor for Vue](https://vue.primeuipro.dev/texteditor) using application-owned Tailwind UI parts. It does not install PrimeVue or load the PrimeOne theme.

## Run the App

```bash
corepack pnpm install
cp .env.example .env
corepack pnpm dev
```

Set your PrimeUI Pro license key in `.env`:

```dotenv
NUXT_PUBLIC_PRIMEUI_LICENSE=your-license-key
```

## What the Example Shows

- Text Editor, default theme, Tailwind, icons, and license setup
- A controlled HTML document using `v-model`
- Formatting, headings, lists, checklists, and history controls
- Editable Tailwind toolbar parts built with Vue and native HTML
- A persistent light and dark mode switch

## Project Map

```text
app/
├── assets/css/main.css              Keep or replace: Tailwind and application tokens
├── components/primeui/texteditor/   Keep or edit: application-owned Tailwind UI parts
├── components/shell/                Optional: quickstart topbar and footer
├── composables/useAppTheme.ts       Optional: light and dark mode state
├── demo/texteditor/                 Replace: sample document and editor composition
├── layouts/default.vue              Optional: lightweight quickstart shell
├── pages/index.vue                  Replace: thin route for the example
└── plugins/primeui-license.client.ts
                                       Keep: PrimeUI Pro license registration
```

Text Editor setup also lives in `package.json` and `nuxt.config.ts`. Replace `app/demo/texteditor/TextEditorDemo.vue` with your document and persistence logic, then delete `app/demo/texteditor` after it is no longer imported.

## Tailwind UI Parts

The toolbar parts are copied into and owned by this application. Regenerate the complete Tailwind set with:

```bash
corepack pnpm dlx @primeui/cli add texteditor --framework vue --ui tailwind --output-dir ./app/components/primeui
```

## Commands

```bash
corepack pnpm dev
corepack pnpm typecheck
corepack pnpm build
corepack pnpm preview
```

## Documentation

- [Text Editor overview](https://vue.primeuipro.dev/texteditor)
- [Text Editor setup](https://vue.primeuipro.dev/texteditor/getting-started/setup)
- [PrimeUI Pro](https://primeuipro.dev/)
