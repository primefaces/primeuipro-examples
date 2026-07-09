import Aura from '@primeuix/themes/aura';

export type ThemePalette = Record<string, string>;

export interface ThemePaletteOption {
    name: string;
    label: string;
    palette: ThemePalette;
    swatch: string;
}

const primitive = Aura.primitive as unknown as Record<string, ThemePalette>;

function fromAura(name: string, label: string): ThemePaletteOption {
    const palette = primitive[name];

    if (!palette) {
        throw new Error(`Aura does not define the ${name} palette.`);
    }

    return { name, label, palette, swatch: palette['500']! };
}

export const primaryColors: ThemePaletteOption[] = [
    { name: 'noir', label: 'Noir', palette: {}, swatch: '#18181b' },
    fromAura('emerald', 'Emerald'),
    fromAura('green', 'Green'),
    fromAura('lime', 'Lime'),
    fromAura('orange', 'Orange'),
    fromAura('amber', 'Amber'),
    fromAura('yellow', 'Yellow'),
    fromAura('teal', 'Teal'),
    fromAura('cyan', 'Cyan'),
    fromAura('sky', 'Sky'),
    fromAura('blue', 'Blue'),
    fromAura('indigo', 'Indigo'),
    fromAura('violet', 'Violet'),
    fromAura('purple', 'Purple'),
    fromAura('fuchsia', 'Fuchsia'),
    fromAura('pink', 'Pink'),
    fromAura('rose', 'Rose')
];

export const surfaceColors: ThemePaletteOption[] = [
    fromAura('slate', 'Slate'),
    fromAura('gray', 'Gray'),
    fromAura('zinc', 'Zinc'),
    fromAura('neutral', 'Neutral'),
    fromAura('stone', 'Stone'),
    {
        name: 'soho',
        label: 'Soho',
        swatch: '#7f8084',
        palette: { 0: '#ffffff', 50: '#ececec', 100: '#dedfdf', 200: '#c4c4c6', 300: '#adaeb0', 400: '#97979b', 500: '#7f8084', 600: '#6a6b70', 700: '#55565b', 800: '#3f4046', 900: '#2c2c34', 950: '#16161d' }
    },
    {
        name: 'viva',
        label: 'Viva',
        swatch: '#87898a',
        palette: { 0: '#ffffff', 50: '#f3f3f3', 100: '#e7e7e8', 200: '#cfd0d0', 300: '#b7b8b9', 400: '#9fa1a1', 500: '#87898a', 600: '#6e7173', 700: '#565a5b', 800: '#3e4244', 900: '#262b2c', 950: '#0e1315' }
    },
    {
        name: 'ocean',
        label: 'Ocean',
        swatch: '#828787',
        palette: { 0: '#ffffff', 50: '#fbfcfc', 100: '#f7f9f8', 200: '#eff3f2', 300: '#dadedd', 400: '#b1b7b6', 500: '#828787', 600: '#5f7274', 700: '#415b61', 800: '#29444e', 900: '#183240', 950: '#0c1920' }
    },
    {
        name: 'taupe',
        label: 'Taupe',
        swatch: '#7d7468',
        palette: { 0: '#ffffff', 50: '#faf8f6', 100: '#f2eeea', 200: '#e4ddd6', 300: '#d0c6bc', 400: '#a89e94', 500: '#7d7468', 600: '#5e564c', 700: '#4a433b', 800: '#322d28', 900: '#211d19', 950: '#110f0c' }
    },
    {
        name: 'mauve',
        label: 'Mauve',
        swatch: '#7e7082',
        palette: { 0: '#ffffff', 50: '#faf8fa', 100: '#f4f0f5', 200: '#e8dfe9', 300: '#d5c9d7', 400: '#ad9db0', 500: '#7e7082', 600: '#5d5261', 700: '#483f4c', 800: '#312a34', 900: '#201c22', 950: '#100e11' }
    },
    {
        name: 'mist',
        label: 'Mist',
        swatch: '#6b7a94',
        palette: { 0: '#ffffff', 50: '#f8fafe', 100: '#eef2fa', 200: '#dde4f0', 300: '#c5cfe0', 400: '#97a4bb', 500: '#6b7a94', 600: '#4e5b72', 700: '#3c475a', 800: '#283142', 900: '#1a2130', 950: '#0c1018' }
    },
    {
        name: 'olive',
        label: 'Olive',
        swatch: '#767e6c',
        palette: { 0: '#ffffff', 50: '#fafbf8', 100: '#f2f4ee', 200: '#e3e7dc', 300: '#cfd5c4', 400: '#a3ab96', 500: '#767e6c', 600: '#575e4f', 700: '#43493c', 800: '#2e3228', 900: '#1e211a', 950: '#0f100c' }
    }
];
