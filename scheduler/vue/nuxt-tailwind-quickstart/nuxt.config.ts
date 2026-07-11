import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2026-07-09',
    devtools: { enabled: false },
    css: ['@primeui/scheduler-style/style.css', 'primeicons/primeicons.css', '~/assets/css/main.css', '~/assets/css/scheduler-theme.css'],
    runtimeConfig: { public: { PRIMEUI_LICENSE: '' } },
    app: {
        head: {
            title: 'Scheduler | PrimeUI Pro Nuxt Tailwind Quickstart',
            meta: [
                { name: 'description', content: 'PrimeUI Pro Scheduler Nuxt Tailwind quickstart.' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            link: [{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }]
        }
    },
    vite: {
        optimizeDeps: { include: ['@primeui/license-manager', '@primeui/vue-scheduler'] },
        plugins: [tailwindcss()]
    }
});
