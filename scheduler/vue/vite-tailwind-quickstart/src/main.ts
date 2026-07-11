import { createApp } from 'vue';
import { registerLicense } from '@primeui/license-manager';
import App from './App.vue';
import '@primeui/scheduler-style/style.css';
import 'primeicons/primeicons.css';
import '@/assets/css/main.css';
import '@/assets/css/scheduler-theme.css';

const licenseKey = import.meta.env.VITE_PRIMEUI_LICENSE;

if (licenseKey) registerLicense({ primeui: licenseKey });

createApp(App).mount('#app');
