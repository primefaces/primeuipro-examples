<script setup lang="ts">
import SchedulerDemo from '~/demo/scheduler/SchedulerDemo.vue';

useHead({ title: 'Scheduler Quickstart | PrimeUI Pro' });
</script>

<template>
    <section class="min-w-0">
        <AppPageHeader title="Scheduler" context="Team operations" meta="3 sample views" />
        <div class="mt-5 h-[calc(100svh-11rem)] min-h-[48rem] max-h-[60rem] overflow-hidden rounded-lg border border-[var(--app-border)] bg-[var(--app-panel)]">
            <SchedulerDemo />
        </div>
    </section>
</template>
