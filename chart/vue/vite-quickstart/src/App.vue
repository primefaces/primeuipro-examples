<script setup lang="ts">
import AppPageHeader from '@/components/AppPageHeader.vue';
import AppFooter from '@/components/shell/AppFooter.vue';
import AppHeader from '@/components/shell/AppHeader.vue';
import BarChart from '@/demo/chart/BarChart.vue';
import LineChart from '@/demo/chart/LineChart.vue';
import PieChart from '@/demo/chart/PieChart.vue';
</script>

<template>
    <div class="min-h-screen bg-[var(--app-ground)] text-[var(--app-text)]">
        <a href="#main-content" class="fixed left-3 top-3 z-50 -translate-y-20 rounded-md bg-surface-950 px-3 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0 dark:bg-surface-50 dark:text-surface-950">Skip to content</a>

        <AppHeader />

        <div class="mx-auto flex min-h-[calc(100svh-var(--app-topbar-height))] w-full max-w-[1600px] min-w-0 flex-col px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
            <main id="main-content" class="min-w-0 flex-1" tabindex="-1">
                <section class="min-w-0">
                    <AppPageHeader title="Charts" context="Analytics" meta="Bar, line, and pie" />
                    <div class="mt-5 grid gap-4 sm:gap-6">
                        <div class="rounded-lg border border-[var(--app-border)] bg-[var(--app-panel)] p-4 sm:p-6">
                            <BarChart />
                        </div>
                        <div class="rounded-lg border border-[var(--app-border)] bg-[var(--app-panel)] p-4 sm:p-6">
                            <LineChart />
                        </div>
                        <div class="rounded-lg border border-[var(--app-border)] bg-[var(--app-panel)] p-4 sm:p-6">
                            <PieChart />
                        </div>
                    </div>
                </section>
            </main>
            <AppFooter />
        </div>
    </div>
</template>
