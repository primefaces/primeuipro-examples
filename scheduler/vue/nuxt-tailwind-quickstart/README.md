# PrimeUI Pro Scheduler Nuxt + Tailwind Quickstart

A Nuxt Scheduler quickstart using editable Tailwind UI parts and native HTML controls. It does not depend on PrimeVue or PrimeOne.

The toolbar switches between Month, Week, and Resource Timeline Week. Events can be added, edited, deleted, dragged, and resized.

## Run

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Set `NUXT_PUBLIC_PRIMEUI_LICENSE` in `.env` to your PrimeUI Pro license key.

The disposable example lives in `app/demo/scheduler`; official editable Tailwind UI parts live in `app/components/primeui/scheduler`.

See the [Scheduler documentation](https://vue.primeuipro.dev/scheduler) and [setup guide](https://vue.primeuipro.dev/scheduler/getting-started/setup).
