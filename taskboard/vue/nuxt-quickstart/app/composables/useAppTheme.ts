import { updatePreset, updateSurfacePalette } from '@primeuix/themes';
import { primaryColors, surfaceColors, type ThemePaletteOption } from '~/config/theme';

type AppTheme = 'light' | 'dark';

function primaryPreset(option: ThemePaletteOption) {
    if (option.name === 'noir') {
        return {
            semantic: {
                primary: {
                    50: '{surface.50}',
                    100: '{surface.100}',
                    200: '{surface.200}',
                    300: '{surface.300}',
                    400: '{surface.400}',
                    500: '{surface.500}',
                    600: '{surface.600}',
                    700: '{surface.700}',
                    800: '{surface.800}',
                    900: '{surface.900}',
                    950: '{surface.950}'
                },
                colorScheme: {
                    light: {
                        primary: { color: '{primary.950}', contrastColor: '#ffffff', hoverColor: '{primary.800}', activeColor: '{primary.700}' },
                        highlight: { background: '{primary.950}', focusBackground: '{primary.700}', color: '#ffffff', focusColor: '#ffffff' }
                    },
                    dark: {
                        primary: { color: '{primary.50}', contrastColor: '{primary.950}', hoverColor: '{primary.200}', activeColor: '{primary.300}' },
                        highlight: { background: '{primary.50}', focusBackground: '{primary.300}', color: '{primary.950}', focusColor: '{primary.950}' }
                    }
                }
            }
        };
    }

    return {
        semantic: {
            primary: option.palette,
            colorScheme: {
                light: {
                    primary: { color: '{primary.500}', contrastColor: '#ffffff', hoverColor: '{primary.600}', activeColor: '{primary.700}' },
                    highlight: { background: '{primary.50}', focusBackground: '{primary.100}', color: '{primary.700}', focusColor: '{primary.800}' }
                },
                dark: {
                    primary: { color: '{primary.400}', contrastColor: '{surface.900}', hoverColor: '{primary.300}', activeColor: '{primary.200}' },
                    highlight: {
                        background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                        focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                        color: 'rgba(255,255,255,.87)',
                        focusColor: 'rgba(255,255,255,.87)'
                    }
                }
            }
        }
    };
}

export function useAppTheme() {
    const theme = useState<AppTheme>('app-theme', () => 'light');
    const primaryColor = useState('app-primary-color', () => 'emerald');
    const surfaceColor = useState('app-surface-color', () => 'zinc');
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

    function setPrimaryColor(name: string) {
        const option = primaryColors.find((color) => color.name === name);

        if (!option) return;

        primaryColor.value = option.name;
        updatePreset(primaryPreset(option));

        if (import.meta.client) {
            localStorage.setItem('primeui-quickstart-primary', option.name);
        }
    }

    function setSurfaceColor(name: string) {
        const option = surfaceColors.find((color) => color.name === name);

        if (!option) return;

        surfaceColor.value = option.name;
        updateSurfacePalette(option.palette);

        if (import.meta.client) {
            localStorage.setItem('primeui-quickstart-surface', option.name);
        }
    }

    function initializeColors() {
        if (!import.meta.client) return;

        setPrimaryColor(localStorage.getItem('primeui-quickstart-primary') || primaryColor.value);
        setSurfaceColor(localStorage.getItem('primeui-quickstart-surface') || surfaceColor.value);
    }

    return { isDark, primaryColor, surfaceColor, initializeTheme, initializeColors, setPrimaryColor, setSurfaceColor, toggleTheme };
}
