<script setup lang="ts">
import AppPageHeader from '@/components/AppPageHeader.vue';
import AppFooter from '@/components/shell/AppFooter.vue';
import AppHeader from '@/components/shell/AppHeader.vue';
import TextEditorDemo from '@/demo/texteditor/TextEditorDemo.vue';
</script>

<template>
    <div class="min-h-screen bg-[var(--app-ground)] text-[var(--app-text)]">
        <a href="#main-content" class="fixed left-3 top-3 z-50 -translate-y-20 rounded-md bg-surface-950 px-3 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0 dark:bg-surface-50 dark:text-surface-950">Skip to content</a>

        <AppHeader />

        <div class="mx-auto flex min-h-[calc(100svh-var(--app-topbar-height))] w-full max-w-[1600px] min-w-0 flex-col px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
            <main id="main-content" class="min-w-0 flex-1" tabindex="-1">
                <section class="min-w-0">
                    <AppPageHeader title="Text Editor" context="Product brief" meta="Autosaved locally" />
                    <div class="mt-5 h-[calc(100svh-13.5rem)] min-h-[34rem] max-h-[48rem] overflow-visible rounded-lg border border-[var(--app-border)] bg-[var(--app-panel)]">
                        <TextEditorDemo />
                    </div>
                </section>
            </main>
            <AppFooter />
        </div>
    </div>
</template>
