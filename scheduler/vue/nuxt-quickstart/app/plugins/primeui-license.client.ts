import { registerLicense } from '@primeui/license-manager';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const licenseKey = config.public.PRIMEUI_LICENSE;

    if (licenseKey) {
        registerLicense({ primeui: licenseKey });
    }
});
