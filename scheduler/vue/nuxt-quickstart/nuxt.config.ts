import Aura from '@primeuix/themes/aura';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2026-07-09',
    devtools: { enabled: false },
    modules: ['@primevue/nuxt-module'],
    primevue: {
        autoImport: false,
        options: {
            theme: {
                preset: Aura,
                options: { darkModeSelector: '.p-dark' }
            }
        }
    },
    css: [
        '@primeui/scheduler-style/style.css',
        '@primeui/scheduler-style/themes/primeone.css',
        '~/components/primeui/scheduler/assets/style/components.css',
        'primeicons/primeicons.css',
        '~/assets/css/main.css'
    ],
    runtimeConfig: {
        public: { PRIMEUI_LICENSE: '' }
    },
    app: {
        head: {
            title: 'Scheduler | PrimeUI Pro Nuxt Quickstart',
            meta: [
                { name: 'description', content: 'PrimeUI Pro Scheduler Nuxt quickstart.' },
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
