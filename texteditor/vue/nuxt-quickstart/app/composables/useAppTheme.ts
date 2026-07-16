type AppTheme = 'light' | 'dark';

export function useAppTheme() {
    const theme = useState<AppTheme>('app-theme', () => 'light');
    const isDark = computed(() => theme.value === 'dark');

    function applyTheme(value: AppTheme) {
        if (!import.meta.client) return;

        document.documentElement.classList.toggle('p-dark', value === 'dark');
        document.documentElement.style.colorScheme = value;
    }

    function setTheme(value: AppTheme) {
        theme.value = value;
        applyTheme(value);

        if (import.meta.client) {
            localStorage.setItem('primeui-quickstart-theme', value);
        }
    }

    function initializeTheme() {
        if (!import.meta.client) return;

        const stored = localStorage.getItem('primeui-quickstart-theme');
        const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        theme.value = stored === 'dark' || stored === 'light' ? stored : preferred;
        applyTheme(theme.value);
    }

    function toggleTheme() {
        setTheme(isDark.value ? 'light' : 'dark');
    }

    return { isDark, initializeTheme, toggleTheme };
}
