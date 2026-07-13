import Aura from '@primeuix/themes/aura';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2026-07-09',
    devtools: { enabled: false },
    modules: ['@primevue/nuxt-module'],
    primevue: {
        autoImport: false,
        components: {
            include: ['Tag']
        },
        options: {
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.p-dark'
                }
            }
        }
    },
    css: [
        '@primeui/chart-style/style.css',
        '@primeui/chart-style/themes/primeone.css',
        'primeicons/primeicons.css',
        '~/assets/css/main.css'
    ],
    runtimeConfig: {
        public: {
            PRIMEUI_LICENSE: ''
        }
    },
    app: {
        head: {
            title: 'Charts | PrimeUI Pro Nuxt Quickstart',
            meta: [
                { name: 'description', content: 'PrimeUI Pro Charts Nuxt quickstart.' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            link: [{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }]
        }
    },
    vite: {
        optimizeDeps: {
            include: ['@primeui/license-manager', '@primeui/vue-chart']
        },
        plugins: [tailwindcss()]
    }
});
