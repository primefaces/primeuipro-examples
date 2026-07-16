# PrimeUI Pro Text Editor Vite Quickstart

A minimal Vue 3 and Vite application for starting with [PrimeUI Pro Text Editor for Vue](https://vue.primeuipro.dev/texteditor). It contains one editable document, application-owned PrimeOne toolbar parts, and a lightweight topbar and footer with light and dark modes.

## Run the App

```bash
corepack pnpm install
cp .env.example .env
corepack pnpm dev
```

Set your PrimeUI Pro license key in `.env`:

```dotenv
VITE_PRIMEUI_LICENSE=your-license-key
```

## What the Example Shows

- Text Editor, PrimeVue, Aura, styles, icons, and license setup in `src/main.ts`
- A controlled HTML document using `v-model`
- Formatting, headings, lists, checklists, and history controls
- Editable PrimeOne toolbar parts using PrimeVue Select and Tooltip
- A persistent light and dark mode switch

## Project Map

```text
src/
├── main.ts                           Keep: component, theme, styles, and license setup
├── components/primeui/texteditor/   Keep or edit: application-owned PrimeOne UI parts
├── components/shell/                Optional: quickstart topbar and footer
├── composables/useAppTheme.ts       Optional: light and dark mode state
├── demo/texteditor/                 Replace: sample document and editor composition
└── App.vue                           Replace: one-page quickstart composition
```

Replace `src/demo/texteditor/TextEditorDemo.vue` with your document and persistence logic. Delete `src/demo/texteditor` after it is no longer imported. The Text Editor value is application state; save it to your store or API when it changes.

## PrimeOne UI Parts

The toolbar parts are copied into and owned by this application. Regenerate the complete PrimeOne set with:

```bash
corepack pnpm dlx @primeui/cli add texteditor --framework vue --ui primeone --output-dir ./src/components/primeui
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
