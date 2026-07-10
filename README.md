# PrimeUI Pro Examples

Framework-specific quickstarts for [PrimeUI Pro](https://primeuipro.dev/).

Each quickstart is a standalone application that shows the package installation, license setup, styles, UI parts, and a small set of practical component examples. Start with the app closest to your stack, run it locally, then replace the sample routes and data with your own application code.

## Available Quickstarts

| Component | Vue | React | Angular |
| --- | --- | --- | --- |
| [Scheduler](./scheduler) | Planned | Planned | Planned |
| [TextEditor](./texteditor) | Planned | Planned | Planned |
| [TaskBoard](./taskboard) | [Nuxt](./taskboard/vue/nuxt-quickstart) | Planned | Planned |
| [Charts](./chart) | Planned | Planned | Planned |

The React and Angular directories are placeholders for upcoming framework examples. Future React quickstarts will use [PrimeReact NextChapter](https://github.com/primefaces/primereact-nextchapter), and future Angular quickstarts will use [PrimeNG NextChapter](https://github.com/primefaces/primeng-nextchapter) as their framework UI baselines. A folder is listed as available only when it contains a runnable application and its own README.

## Documentation

- [PrimeUI Pro](https://primeuipro.dev/) - product and framework overview
- [PrimeUI Pro for Vue](https://vue.primeuipro.dev/) - Vue component documentation and live examples
- [PrimeReact NextChapter](https://github.com/primefaces/primereact-nextchapter) - React framework source for upcoming quickstarts
- [PrimeNG NextChapter](https://github.com/primefaces/primeng-nextchapter) - Angular framework source for upcoming quickstarts
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

The example routes, fixtures, and application shell are starter code. Each app README identifies what is required for the PrimeUI Pro integration, what can be replaced, and which related files must be removed together.

## License

This public repository contains example application source. Running an example that imports PrimeUI Pro packages requires your own valid PrimeUI Pro license key. Follow the environment setup in the selected quickstart README.
