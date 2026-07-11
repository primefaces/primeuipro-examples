import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { registerLicense } from '@primeui/license-manager';
import App from './App.vue';
import '@primeui/scheduler-style/style.css';
import '@primeui/scheduler-style/themes/primeone.css';
import '@/components/primeui/scheduler/assets/style/components.css';
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
    .mount('#app');
