<script setup lang="ts">
import BarChart from '~/demo/chart/BarChart.vue';
import LineChart from '~/demo/chart/LineChart.vue';
import PieChart from '~/demo/chart/PieChart.vue';

useHead({ title: 'Charts Quickstart | PrimeUI Pro' });
</script>

<template>
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
</template>
