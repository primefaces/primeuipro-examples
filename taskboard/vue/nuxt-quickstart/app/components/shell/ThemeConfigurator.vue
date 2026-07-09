<script setup lang="ts">
import { primaryColors, surfaceColors } from '~/config/theme';

const { primaryColor, surfaceColor, initializeColors, setPrimaryColor, setSurfaceColor } = useAppTheme();
const root = ref<HTMLElement | null>(null);
const open = ref(false);

function onDocumentPointerDown(event: PointerEvent) {
    if (open.value && root.value && !root.value.contains(event.target as Node)) {
        open.value = false;
    }
}

function onDocumentKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        open.value = false;
    }
}

onMounted(() => {
    initializeColors();
    document.addEventListener('pointerdown', onDocumentPointerDown);
    document.addEventListener('keydown', onDocumentKeyDown);
});

onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onDocumentPointerDown);
    document.removeEventListener('keydown', onDocumentKeyDown);
});
</script>

<template>
    <div ref="root" class="relative">
        <button
            type="button"
            class="inline-flex size-8 items-center justify-center rounded-md border border-[var(--app-border)] bg-[var(--app-panel)] text-[var(--app-text-muted)] transition-colors duration-150 hover:text-[var(--app-text)]"
            aria-label="Configure theme colors"
            title="Configure theme colors"
            :aria-expanded="open"
            aria-haspopup="dialog"
            @click.stop="open = !open"
        >
            <i class="pi pi-palette text-sm" aria-hidden="true" />
        </button>

        <Transition name="configurator">
            <div
                v-if="open"
                class="absolute right-0 top-[calc(100%+0.375rem)] z-50 w-72 max-w-[calc(100vw-2rem)] rounded-lg border border-[var(--app-border)] bg-[var(--app-panel)] p-4 shadow-[0_4px_8px_oklch(0_0_0/0.12)]"
                role="dialog"
                aria-label="Theme configurator"
                @click.stop
            >
                <div>
                    <div class="mb-2 text-sm font-semibold text-[var(--app-text)]">Primary</div>
                    <div class="flex flex-wrap gap-2">
                        <button
                            v-for="color in primaryColors"
                            :key="color.name"
                            type="button"
                            class="size-6 rounded-full border border-black/10 outline-2 outline-offset-2 transition-transform duration-150 hover:scale-110 dark:border-white/10"
                            :class="primaryColor === color.name ? 'outline-primary-500' : 'outline-transparent'"
                            :style="{ backgroundColor: color.swatch }"
                            :aria-label="`${color.label} primary color`"
                            :aria-pressed="primaryColor === color.name"
                            :title="color.label"
                            @click="setPrimaryColor(color.name)"
                        />
                    </div>
                </div>

                <div class="mt-5 border-t border-[var(--app-border)] pt-4">
                    <div class="mb-2 text-sm font-semibold text-[var(--app-text)]">Surface</div>
                    <div class="flex flex-wrap gap-2">
                        <button
                            v-for="color in surfaceColors"
                            :key="color.name"
                            type="button"
                            class="size-6 rounded-full border border-black/15 outline-2 outline-offset-2 transition-transform duration-150 hover:scale-110 dark:border-white/15"
                            :class="surfaceColor === color.name ? 'outline-primary-500' : 'outline-transparent'"
                            :style="{ backgroundColor: color.swatch }"
                            :aria-label="`${color.label} surface color`"
                            :aria-pressed="surfaceColor === color.name"
                            :title="color.label"
                            @click="setSurfaceColor(color.name)"
                        />
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.configurator-enter-active,
.configurator-leave-active {
    transition:
        opacity 150ms cubic-bezier(0.16, 1, 0.3, 1),
        transform 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.configurator-enter-from,
.configurator-leave-to {
    opacity: 0;
    transform: translateY(-0.25rem) scale(0.98);
}
</style>
