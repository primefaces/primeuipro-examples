import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2026-07-09',
    devtools: { enabled: false },
    css: ['@primeui/taskboard-style/style.css', 'primeicons/primeicons.css', '~/assets/css/main.css'],
    runtimeConfig: {
        public: {
            PRIMEUI_LICENSE: ''
        }
    },
    app: {
        head: {
            title: 'TaskBoard | PrimeUI Pro Nuxt Tailwind Quickstart',
            meta: [
                { name: 'description', content: 'PrimeUI Pro TaskBoard Nuxt Tailwind quickstart.' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            link: [{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }]
        }
    },
    vite: {
        optimizeDeps: {
            include: ['@primeui/license-manager', '@primeui/vue-taskboard']
        },
        plugins: [tailwindcss()]
    }
});
