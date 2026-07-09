<script setup lang="ts">
import StandardTaskBoard from '~/demo/taskboard/StandardTaskBoard.vue';

useHead({ title: 'Standard Board | PrimeUI Pro TaskBoard' });

const taskCount = ref(12);
</script>

<template>
    <section class="min-w-0">
        <AppPageHeader title="Standard board" context="Product delivery" :meta="`${taskCount} sample tasks`" />
        <div class="mt-5 h-[calc(100svh-13.5rem)] min-h-[38rem] max-h-[48rem] overflow-hidden rounded-lg border border-[var(--app-border)] bg-[var(--app-panel)]">
            <StandardTaskBoard @update:task-count="taskCount = $event" />
        </div>
    </section>
</template>
