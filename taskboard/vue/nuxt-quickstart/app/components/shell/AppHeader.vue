<script setup lang="ts">
defineProps<{
    menuOpen: boolean;
}>();

defineEmits<{
    toggleMenu: [];
}>();

const { isDark, initializeTheme, toggleTheme } = useAppTheme();

onMounted(initializeTheme);
</script>

<template>
    <header class="sticky top-0 z-40 h-[var(--app-topbar-height)] border-b border-[var(--app-border)] bg-[color-mix(in_oklch,var(--app-ground)_92%,transparent)] backdrop-blur-md">
        <div class="mx-auto flex h-full max-w-[1800px] items-center justify-between px-4 lg:px-6">
            <div class="flex min-w-0 items-center gap-3">
                <button
                    type="button"
                    class="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-[var(--app-border)] bg-[var(--app-panel)] text-[var(--app-text-muted)] transition-colors duration-150 hover:text-[var(--app-text)] lg:hidden"
                    :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'"
                    :aria-expanded="menuOpen"
                    aria-controls="mobile-navigation"
                    @click="$emit('toggleMenu')"
                >
                    <i v-if="menuOpen" class="pi pi-times text-sm" aria-hidden="true" />
                    <i v-else class="pi pi-bars text-sm" aria-hidden="true" />
                </button>

                <NuxtLink to="/" class="flex min-w-0 items-center gap-2.5 text-[var(--app-text)] no-underline" aria-label="PrimeUI Pro TaskBoard quickstart home">
                    <img src="/primeuipro-logo-black.svg" width="105" height="20" alt="PrimeUI Pro" class="h-5 w-auto dark:hidden" />
                    <img src="/primeuipro-logo-white.svg" width="105" height="20" alt="" class="hidden h-5 w-auto dark:block" aria-hidden="true" />
                    <span class="hidden h-4 w-px bg-[var(--app-border)] sm:block" aria-hidden="true" />
                    <span class="hidden truncate text-sm font-medium text-[var(--app-text-muted)] sm:block">TaskBoard</span>
                </NuxtLink>
            </div>

            <div class="flex items-center gap-2">
                <ShellThemeConfigurator />
                <button
                    type="button"
                    class="inline-flex size-8 items-center justify-center rounded-md border border-[var(--app-border)] bg-[var(--app-panel)] text-[var(--app-text-muted)] transition-colors duration-150 hover:text-[var(--app-text)]"
                    :aria-label="isDark ? 'Use light theme' : 'Use dark theme'"
                    :title="isDark ? 'Use light theme' : 'Use dark theme'"
                    @click="toggleTheme"
                >
                    <i v-if="isDark" class="pi pi-sun text-sm" aria-hidden="true" />
                    <i v-else class="pi pi-moon text-sm" aria-hidden="true" />
                </button>
            </div>
        </div>
    </header>
</template>
