import { createApp } from 'vue';
import { registerLicense } from '@primeui/license-manager';
import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import App from './App.vue';
import '@primeui/texteditor-style/themes/primeone.css';
import '@primeui/texteditor-style/style.css';
import '@/components/primeui/texteditor/assets/style/components.css';
import 'primeicons/primeicons.css';
import '@/assets/css/main.css';

const licenseKey = import.meta.env.VITE_PRIMEUI_LICENSE;

if (licenseKey) {
    registerLicense({ primeui: licenseKey });
}

createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.p-dark'
            }
        }
    })
    .directive('tooltip', Tooltip)
    .mount('#app');
