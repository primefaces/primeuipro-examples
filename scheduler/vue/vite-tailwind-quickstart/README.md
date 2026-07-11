# PrimeUI Pro Scheduler Vite + Tailwind Quickstart

A Vue and Vite Scheduler quickstart using the editable Tailwind UI parts with native HTML controls. It does not depend on PrimeVue or PrimeOne.

The toolbar switches between Month, Week, and Resource Timeline Week. Events can be added, edited, deleted, dragged, and resized.

## Run

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Set `VITE_PRIMEUI_LICENSE` in `.env` to your PrimeUI Pro license key.

## Project Map

- `src/demo/scheduler/SchedulerDemo.vue` contains the Scheduler integration.
- `src/demo/scheduler/EventEditorDialog.vue` uses native `<dialog>` and form controls.
- `src/demo/scheduler/data.ts` contains replaceable fixtures.
- `src/components/primeui/scheduler` contains the official editable Tailwind UI parts.

See the [Scheduler documentation](https://vue.primeuipro.dev/scheduler) and [setup guide](https://vue.primeuipro.dev/scheduler/getting-started/setup).
