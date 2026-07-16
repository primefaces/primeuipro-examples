import Aura from '@primeuix/themes/aura';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2026-07-09',
    devtools: { enabled: false },
    modules: ['@primevue/nuxt-module'],
    primevue: {
        autoImport: false,
        components: {
            include: ['Select', 'Tag']
        },
        directives: {
            include: ['Tooltip']
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
        '@primeui/texteditor-style/themes/primeone.css',
        '@primeui/texteditor-style/style.css',
        '~/components/primeui/texteditor/assets/style/components.css',
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
            title: 'Text Editor | PrimeUI Pro Nuxt Quickstart',
            meta: [
                { name: 'description', content: 'PrimeUI Pro Text Editor Nuxt quickstart.' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            link: [{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }]
        }
    },
    vite: {
        optimizeDeps: {
            include: ['@primeui/license-manager', '@primeui/vue-texteditor']
        },
        plugins: [tailwindcss()]
    }
});
