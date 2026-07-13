# PrimeUI Pro Charts Nuxt Quickstart

A minimal Nuxt application showing PrimeUI Pro Charts with the SVG renderer and the PrimeOne theme.

Bar, line, and pie charts built from the compositional Charts API, with light and dark modes.

## Run

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Set `NUXT_PUBLIC_PRIMEUI_LICENSE` in `.env` to your PrimeUI Pro license key.

## Project Map

- `app/demo/chart/BarChart.vue`, `LineChart.vue`, and `PieChart.vue` contain the chart integrations.
- `app/demo/chart/data.ts` contains replaceable fixtures.
- `app/plugins/primeui-license.client.ts` registers the license.

See the [Charts documentation](https://vue.primeuipro.dev/charts) and [setup guide](https://vue.primeuipro.dev/charts/getting-started/setup).
