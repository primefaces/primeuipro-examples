<script setup lang="ts">
import { useSchedulerEventPopoverContext, type SchedulerEvent, type SchedulerResource, type SchedulerViewType } from '@primeui/vue-scheduler';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

type SchedulerEventPopoverUIProps = {
    event?: SchedulerEvent | null;
    view?: SchedulerViewType | string;
    resource?: SchedulerResource | null;
    formattedTime?: string;
    formattedDate?: string;
    formattedDuration?: string;
    close?: () => void;
};

const context = useSchedulerEventPopoverContext();
const popover = computed<SchedulerEventPopoverUIProps>(() => context.value);
const accent = computed(() => popover.value.event?.color ?? popover.value.event?.borderColor ?? 'var(--p-primary-color)');
const description = computed(() => (popover.value.event?.metadata?.description == null ? '' : String(popover.value.event?.metadata?.description)));
const location = computed(() => (popover.value.event?.metadata?.location == null ? '' : String(popover.value.event?.metadata?.location)));
const hasMeta = computed(() => Boolean(popover.value.formattedTime || popover.value.formattedDate || popover.value.formattedDuration || popover.value.resource || description.value || location.value));
</script>

<template>
    <article class="min-w-70 overflow-hidden rounded-lg border border-surface-200 bg-white text-surface-950 shadow-xl dark:border-surface-700 dark:bg-surface-900 dark:text-surface-0" v-bind="$attrs">
        <header class="flex items-start gap-3 px-4 py-3">
            <span class="h-9 w-1 shrink-0 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
            <div class="min-w-0 flex-1">
                <span class="block truncate text-sm font-bold">{{ popover.event?.title }}</span>
                <span v-if="popover.view" class="block truncate text-xs text-surface-500 dark:text-surface-400">{{ popover.view }}</span>
            </div>
            <button
                v-if="popover.close"
                class="inline-flex size-8 items-center justify-center rounded-md text-surface-500 hover:bg-surface-100 hover:text-surface-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary dark:hover:bg-surface-800 dark:hover:text-surface-0"
                type="button"
                aria-label="Close"
                @click="popover.close"
            >
                <i class="pi pi-times text-sm" aria-hidden="true" />
            </button>
        </header>
        <div v-if="hasMeta" class="flex max-h-64 flex-col gap-2 overflow-y-auto px-4 pb-4 text-sm text-surface-600 dark:text-surface-300">
            <div v-if="popover.formattedTime" class="flex gap-2">
                <i class="pi pi-clock mt-0.5 text-xs text-primary" aria-hidden="true" /><span>{{ popover.formattedTime }}</span>
            </div>
            <div v-if="popover.formattedDate" class="flex gap-2">
                <i class="pi pi-calendar mt-0.5 text-xs text-primary" aria-hidden="true" /><span>{{ popover.formattedDate }}</span>
            </div>
            <div v-if="popover.formattedDuration" class="flex gap-2">
                <i class="pi pi-stopwatch mt-0.5 text-xs text-primary" aria-hidden="true" /><span>{{ popover.formattedDuration }}</span>
            </div>
            <div v-if="popover.resource" class="flex gap-2">
                <i class="pi pi-map mt-0.5 text-xs text-primary" aria-hidden="true" /><span>{{ popover.resource.title }}</span>
            </div>
            <p v-if="description" class="m-0 leading-relaxed">{{ description }}</p>
            <div v-if="location" class="flex gap-2">
                <i class="pi pi-map-marker mt-0.5 text-xs text-primary" aria-hidden="true" /><span>{{ location }}</span>
            </div>
        </div>
    </article>
</template>
