<script setup lang="ts">
import SwimlaneTaskBoard from '~/demo/taskboard/SwimlaneTaskBoard.vue';

useHead({ title: 'Swimlanes | PrimeUI Pro TaskBoard' });

const taskCount = ref(12);
</script>

<template>
    <section class="min-w-0">
        <AppPageHeader title="Swimlanes" context="Product delivery" :meta="`3 teams · ${taskCount} sample tasks`" />
        <div class="mt-5 h-[calc(100svh-13.5rem)] min-h-[42rem] max-h-[52rem] overflow-hidden rounded-lg border border-[var(--app-border)] bg-[var(--app-panel)]">
            <SwimlaneTaskBoard @update:task-count="taskCount = $event" />
        </div>
    </section>
</template>
