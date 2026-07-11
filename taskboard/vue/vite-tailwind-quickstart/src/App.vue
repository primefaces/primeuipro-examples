<script setup lang="ts">
import { ref } from 'vue';
import AppPageHeader from '@/components/AppPageHeader.vue';
import AppFooter from '@/components/shell/AppFooter.vue';
import AppHeader from '@/components/shell/AppHeader.vue';
import StandardTaskBoard from '@/demo/taskboard/StandardTaskBoard.vue';

const taskCount = ref(12);
</script>

<template>
    <div class="min-h-screen bg-[var(--app-ground)] text-[var(--app-text)]">
        <a href="#main-content" class="fixed left-3 top-3 z-50 -translate-y-20 rounded-md bg-surface-950 px-3 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0 dark:bg-surface-50 dark:text-surface-950">Skip to content</a>

        <AppHeader />

        <div class="mx-auto flex min-h-[calc(100svh-var(--app-topbar-height))] w-full max-w-[1600px] min-w-0 flex-col px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
            <main id="main-content" class="min-w-0 flex-1" tabindex="-1">
                <section class="min-w-0">
                    <AppPageHeader title="TaskBoard" context="Product delivery" :meta="`${taskCount} sample tasks`" />
                    <div class="mt-5 h-[calc(100svh-13.5rem)] min-h-[38rem] max-h-[48rem] overflow-hidden rounded-lg border border-[var(--app-border)] bg-[var(--app-panel)]">
                        <StandardTaskBoard @update:task-count="taskCount = $event" />
                    </div>
                </section>
            </main>
            <AppFooter />
        </div>
    </div>
</template>
