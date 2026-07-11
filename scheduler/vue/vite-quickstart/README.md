# PrimeUI Pro Scheduler Vite Quickstart

A minimal Vue and Vite application showing PrimeUI Pro Scheduler with PrimeVue and editable PrimeOne UI parts.

The toolbar switches between Month, Week, and Resource Timeline Week views. Events can be added, edited, deleted, dragged, and resized. The app shell, demo fixtures, and Scheduler UI parts are kept separate so users can quickly identify what to replace in their own application.

## Run

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Add your PrimeUI Pro license key to `.env`:

```dotenv
VITE_PRIMEUI_LICENSE=your-license-key
```

## Project Map

- `src/main.ts` registers the license, PrimeVue, theme, and Scheduler styles from `@primeui/scheduler-style`.
- `src/demo/scheduler/SchedulerDemo.vue` contains the Scheduler integration and enabled views.
- `src/demo/scheduler/EventEditorDialog.vue` contains the disposable add/edit form.
- `src/demo/scheduler/data.ts` contains disposable example events and resources.
- `src/components/primeui/scheduler` contains the editable PrimeOne UI parts and their `assets/style` bundle.
- `src/components/shell` contains the minimal quickstart header and footer.

Remove or replace `src/demo/scheduler` when connecting your own data. Keep the Scheduler package imports and the UI parts your selected views render.

## Documentation

- [Scheduler documentation](https://vue.primeuipro.dev/scheduler)
- [Scheduler setup and UI parts](https://vue.primeuipro.dev/scheduler/getting-started/setup)
- [PrimeVue](https://primevue.org/)
