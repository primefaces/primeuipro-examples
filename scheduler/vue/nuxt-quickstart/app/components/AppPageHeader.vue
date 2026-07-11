<script setup lang="ts">
defineProps<{
    title: string;
    context: string;
    meta: string;
}>();
</script>

<template>
    <header class="flex flex-wrap items-end justify-between gap-3">
        <div class="min-w-0">
            <p class="m-0 text-sm font-medium text-primary-700 dark:text-primary-300">{{ context }}</p>
            <h1 class="mt-1 text-2xl font-semibold leading-tight text-[var(--app-text)] text-balance">{{ title }}</h1>
        </div>
        <p class="m-0 pb-0.5 text-sm text-[var(--app-text-muted)]">{{ meta }}</p>
    </header>
</template>
