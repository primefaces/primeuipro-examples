<script setup lang="ts">
const route = useRoute();
const menuOpen = ref(false);

function closeMenu() {
    menuOpen.value = false;
}

watch(
    () => route.path,
    () => closeMenu()
);

watch(menuOpen, (open) => {
    if (!import.meta.client) return;

    document.body.style.overflow = open ? 'hidden' : '';
});

onBeforeUnmount(() => {
    if (import.meta.client) {
        document.body.style.overflow = '';
    }
});
</script>

<template>
    <div class="min-h-screen bg-[var(--app-ground)] text-[var(--app-text)]">
        <a href="#main-content" class="fixed left-3 top-3 z-50 -translate-y-20 rounded-md bg-surface-950 px-3 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0 dark:bg-surface-50 dark:text-surface-950">Skip to content</a>

        <ShellAppHeader :menu-open="menuOpen" @toggle-menu="menuOpen = !menuOpen" />

        <Transition name="mobile-drawer">
            <div v-if="menuOpen" id="mobile-navigation" class="fixed inset-x-0 bottom-0 top-[var(--app-topbar-height)] z-30 bg-[var(--app-ground)] px-4 py-6 lg:hidden">
                <ShellAppSidebar @navigate="closeMenu" />
            </div>
        </Transition>

        <div class="mx-auto grid min-h-[calc(100svh-var(--app-topbar-height))] w-full max-w-[1800px] grid-cols-1 lg:grid-cols-[var(--app-sidebar-width)_minmax(0,1fr)]">
            <aside class="sticky top-[var(--app-topbar-height)] hidden h-[calc(100svh-var(--app-topbar-height))] border-r border-[var(--app-border)] px-4 pt-7 lg:block">
                <ShellAppSidebar />
            </aside>

            <div class="flex min-h-[calc(100svh-var(--app-topbar-height))] min-w-0 flex-col px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
                <main id="main-content" class="min-w-0 flex-1" tabindex="-1">
                    <slot />
                </main>
                <ShellAppFooter />
            </div>
        </div>
    </div>
</template>

<style scoped>
.mobile-drawer-enter-active,
.mobile-drawer-leave-active {
    transition:
        opacity 180ms cubic-bezier(0.16, 1, 0.3, 1),
        transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-drawer-enter-from,
.mobile-drawer-leave-to {
    opacity: 0;
    transform: translateY(-0.375rem);
}
</style>
