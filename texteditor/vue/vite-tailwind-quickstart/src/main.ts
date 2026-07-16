import { createApp } from 'vue';
import { registerLicense } from '@primeui/license-manager';
import App from './App.vue';
import '@primeui/texteditor-style/themes/default.css';
import '@primeui/texteditor-style/style.css';
import 'primeicons/primeicons.css';
import '@/assets/css/main.css';

const licenseKey = import.meta.env.VITE_PRIMEUI_LICENSE;

if (licenseKey) {
    registerLicense({ primeui: licenseKey });
}

createApp(App).mount('#app');
