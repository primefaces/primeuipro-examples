import Aura from '@primeuix/themes/aura';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2026-07-09',
    devtools: { enabled: false },
    modules: ['@primevue/nuxt-module'],
    primevue: {
        autoImport: false,
        components: {
            include: ['Avatar', 'Button', 'Dialog', 'InputText', 'Select', 'Tag', 'Textarea']
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
        '@primeui/taskboard-style/style.css',
        '@primeui/taskboard-style/themes/primeone.css',
        '~/components/primeui/taskboard/assets/style/components.css',
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
            title: 'TaskBoard | PrimeUI Pro Nuxt Quickstart',
            meta: [
                { name: 'description', content: 'PrimeUI Pro TaskBoard Nuxt quickstart.' },
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
