<script setup lang="ts">
import { useSchedulerEventPopoverContext, type SchedulerEvent } from '@primeui/vue-scheduler';
import { computed } from 'vue';

const emit = defineEmits<{
    edit: [event: SchedulerEvent];
    delete: [event: SchedulerEvent];
}>();

const context = useSchedulerEventPopoverContext();
const popover = computed(() => context.value);
const event = computed(() => popover.value.event ?? null);
const accent = computed(() => event.value?.color ?? event.value?.borderColor ?? 'var(--p-primary-color)');

function editEvent() {
    if (!event.value) return;

    const value = event.value;
    popover.value.close?.();
    emit('edit', value);
}

function deleteEvent() {
    if (!event.value) return;

    const value = event.value;
    popover.value.close?.();
    emit('delete', value);
}
</script>

<template>
    <article class="min-w-70 overflow-hidden rounded-lg border border-surface-200 bg-white text-surface-950 shadow-xl dark:border-surface-700 dark:bg-surface-900 dark:text-surface-0">
        <header class="flex items-start gap-3 px-4 py-3">
            <span class="h-9 w-1 shrink-0 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
            <div class="min-w-0 flex-1">
                <span class="block truncate text-sm font-bold">{{ event?.title }}</span>
                <span v-if="popover.formattedDate" class="block truncate text-xs text-surface-500 dark:text-surface-400">{{ popover.formattedDate }}</span>
            </div>
            <button type="button" class="inline-flex size-8 items-center justify-center rounded-md text-surface-500 hover:bg-surface-100 hover:text-surface-950 dark:hover:bg-surface-800 dark:hover:text-surface-0" aria-label="Close" @click="popover.close?.()"><i class="pi pi-times text-sm" /></button>
        </header>

        <div class="flex flex-col gap-2 px-4 pb-4 text-sm text-surface-600 dark:text-surface-300">
            <div v-if="popover.formattedTime" class="flex gap-2">
                <i class="pi pi-clock mt-0.5 text-xs text-primary" aria-hidden="true" />
                <span>{{ popover.formattedTime }}</span>
            </div>
            <div v-if="popover.resource" class="flex gap-2">
                <i class="pi pi-map-marker mt-0.5 text-xs text-primary" aria-hidden="true" />
                <span>{{ popover.resource.title }}</span>
            </div>
        </div>

        <footer class="flex justify-end border-t border-surface-200 bg-surface-50 px-4 py-3 dark:border-surface-700 dark:bg-surface-950">
            <div class="flex gap-2">
                <button type="button" class="inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10" @click="deleteEvent"><i class="pi pi-trash text-xs" />Delete</button>
                <button type="button" class="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-semibold text-white dark:text-surface-950" @click="editEvent"><i class="pi pi-pencil text-xs" />Edit</button>
            </div>
        </footer>
    </article>
</template>
