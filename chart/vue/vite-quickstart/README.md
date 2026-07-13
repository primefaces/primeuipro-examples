# PrimeUI Pro Charts Vite Quickstart

A minimal Vue and Vite application showing PrimeUI Pro Charts with the SVG renderer and the PrimeOne theme.

Bar, line, and pie charts built from the compositional Charts API. The app shell, demo fixtures, and chart demos are kept separate so users can quickly identify what to replace in their own application.

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

- `src/main.ts` registers the license, PrimeVue, theme, and Charts styles from `@primeui/chart-style`.
- `src/demo/chart/BarChart.vue`, `LineChart.vue`, and `PieChart.vue` contain the chart integrations.
- `src/demo/chart/data.ts` contains disposable example datasets.
- `src/components/shell` contains the minimal quickstart header and footer.

Remove or replace `src/demo/chart` when connecting your own data.

## Documentation

- [Charts documentation](https://vue.primeuipro.dev/charts)
- [Charts setup](https://vue.primeuipro.dev/charts/getting-started/setup)
- [PrimeVue](https://primevue.org/)
