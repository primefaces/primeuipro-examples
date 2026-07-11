import { computed, ref } from 'vue';

type AppTheme = 'light' | 'dark';

const theme = ref<AppTheme>('light');
const isDark = computed(() => theme.value === 'dark');

function applyTheme(value: AppTheme) {
    document.documentElement.classList.toggle('p-dark', value === 'dark');
    document.documentElement.style.colorScheme = value;
}

function setTheme(value: AppTheme) {
    theme.value = value;
    applyTheme(value);
    localStorage.setItem('primeui-quickstart-theme', value);
}

function initializeTheme() {
    const stored = localStorage.getItem('primeui-quickstart-theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    theme.value = stored === 'dark' || stored === 'light' ? stored : preferred;
    applyTheme(theme.value);
}

function toggleTheme() {
    setTheme(isDark.value ? 'light' : 'dark');
}

export function useAppTheme() {
    return { isDark, initializeTheme, toggleTheme };
}
