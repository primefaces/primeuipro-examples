# PrimeUI Pro Scheduler Nuxt Quickstart

A minimal Nuxt application showing PrimeUI Pro Scheduler with PrimeVue and editable PrimeOne UI parts.

The toolbar switches between Month, Week, and Resource Timeline Week. Events can be added, edited, deleted, dragged, and resized.

## Run

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Set `NUXT_PUBLIC_PRIMEUI_LICENSE` in `.env` to your PrimeUI Pro license key.

## Project Map

- `app/demo/scheduler/SchedulerDemo.vue` contains the Scheduler integration.
- `app/demo/scheduler/EventEditorDialog.vue` contains the disposable CRUD form.
- `app/demo/scheduler/data.ts` contains replaceable fixtures.
- `app/components/primeui/scheduler` contains editable PrimeOne UI parts and styles.
- `app/plugins/primeui-license.client.ts` registers the license.

See the [Scheduler documentation](https://vue.primeuipro.dev/scheduler) and [setup guide](https://vue.primeuipro.dev/scheduler/getting-started/setup).
