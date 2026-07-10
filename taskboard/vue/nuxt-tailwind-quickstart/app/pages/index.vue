<script setup lang="ts">
import StandardTaskBoard from '~/demo/taskboard/StandardTaskBoard.vue';

useHead({ title: 'TaskBoard Tailwind Quickstart | PrimeUI Pro' });

const taskCount = ref(12);
</script>

<template>
    <section class="min-w-0">
        <AppPageHeader title="TaskBoard" context="Product delivery" :meta="`${taskCount} sample tasks`" />
        <div class="mt-5 h-[calc(100svh-13.5rem)] min-h-[38rem] max-h-[48rem] overflow-hidden rounded-lg border border-[var(--app-border)] bg-[var(--app-panel)]">
            <StandardTaskBoard @update:task-count="taskCount = $event" />
        </div>
    </section>
</template>
