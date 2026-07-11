# PrimeUI Pro Examples

Framework-specific quickstarts for [PrimeUI Pro](https://primeuipro.dev/).

Each quickstart is a standalone application with one focused component example and a minimal topbar and footer. It shows package installation, license setup, styles, UI parts, and the component integration without turning the starter into a full application template.

## Available Quickstarts

| Component | Vue | React | Angular |
| --- | --- | --- | --- |
| [Scheduler](./scheduler) | Planned | Planned | Planned |
| [TextEditor](./texteditor) | Planned | Planned | Planned |
| [TaskBoard](./taskboard) | [Vite](./taskboard/vue/vite-quickstart), [Nuxt](./taskboard/vue/nuxt-quickstart), [Vite + Tailwind](./taskboard/vue/vite-tailwind-quickstart), [Nuxt + Tailwind](./taskboard/vue/nuxt-tailwind-quickstart) | Planned | Planned |
| [Charts](./chart) | Planned | Planned | Planned |

The React and Angular directories are placeholders for upcoming framework examples. Future React quickstarts will use [PrimeReact](https://primereact.org/), and future Angular quickstarts will use [PrimeNG](https://primeng.org/) as their framework UI baselines. A folder is listed as available only when it contains a runnable application and its own README.

## Documentation

- [PrimeUI Pro](https://primeuipro.dev/) - product and framework overview
- [PrimeUI Pro for Vue](https://vue.primeuipro.dev/) - Vue component documentation and live examples
- [PrimeReact](https://primereact.org/) - React component documentation and live examples
- [PrimeNG](https://primeng.org/) - Angular component documentation and live examples
- [Scheduler for Vue](https://vue.primeuipro.dev/scheduler)
- [TextEditor for Vue](https://vue.primeuipro.dev/texteditor)
- [TaskBoard for Vue](https://vue.primeuipro.dev/taskboard)
- [Charts for Vue](https://vue.primeuipro.dev/charts)

## Repository Structure

Examples are grouped by component, framework, and quickstart application:

```text
{component}/{framework}/{quickstart}
```

The planned Vue quickstart matrix is:

```text
vite-quickstart
nuxt-quickstart
vite-tailwind-quickstart
nuxt-tailwind-quickstart
```

The default quickstarts use PrimeOne UI parts with the framework's Prime UI library, such as PrimeVue. The Tailwind quickstarts use the component's editable Tailwind UI parts without requiring PrimeVue, PrimeReact, or PrimeNG.

## Working With an Example

Every runnable quickstart has its own dependencies, lockfile, environment example, and setup instructions. Run package manager commands from that quickstart's directory rather than from the repository root.

The example page, fixture data, and lightweight shell are starter code. Each app README identifies what is required for the PrimeUI Pro integration and what can be replaced or removed.

## License

This public repository contains example application source. Running an example that imports PrimeUI Pro packages requires your own valid PrimeUI Pro license key. Follow the environment setup in the selected quickstart README.
