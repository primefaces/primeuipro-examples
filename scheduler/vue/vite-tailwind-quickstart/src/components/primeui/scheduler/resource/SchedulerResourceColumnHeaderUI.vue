<script setup lang="ts">
import { useSchedulerResourceColumnHeaderContext, type FlattenedResource, type ResourceCapacityInfo, type SchedulerResource, type SchedulerResourceCapacityStatus } from '@primeui/vue-scheduler';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

type SchedulerResourceColumnHeaderUIProps = {
    resource?: SchedulerResource | FlattenedResource;
    title?: string;
    color?: string;
    depth?: number;
    colspan?: number;
    isLeaf?: boolean;
    eventCount?: number;
    capacityInfo?: ResourceCapacityInfo | null;
    capacityLabel?: string | null;
    capacityStatus?: SchedulerResourceCapacityStatus;
    isConstrained?: boolean;
};

const context = useSchedulerResourceColumnHeaderContext();
const header = computed<SchedulerResourceColumnHeaderUIProps>(() => context.value);
const eventCountLabel = computed(() => {
    const count = header.value.eventCount;

    return count ? `${count} ${count === 1 ? 'event' : 'events'}` : null;
});
const showMeta = computed(() => Boolean(eventCountLabel.value || header.value.capacityLabel));
</script>

<template>
    <span
        class="inline-flex max-w-full items-center justify-center gap-1.5 px-2 text-center text-sm text-surface-800 dark:text-surface-100"
        :class="[header.isLeaf === false && 'font-bold', header.isConstrained && 'text-red-600 dark:text-red-300']"
        v-bind="$attrs"
    >
        <span v-if="header.isLeaf !== false" class="size-2 shrink-0 rounded-full ring-4 ring-primary/10" :style="{ backgroundColor: header.color ?? header.resource?.eventColor ?? 'var(--p-primary-color)' }" aria-hidden="true" />
        <span class="min-w-0 truncate font-semibold">{{ header.title ?? header.resource?.title }}</span>
        <span v-if="showMeta" class="hidden shrink-0 items-center gap-1 text-xs font-semibold text-surface-500 dark:text-surface-400 sm:inline-flex">
            <span v-if="eventCountLabel">{{ eventCountLabel }}</span>
            <span v-if="header.capacityLabel">{{ header.capacityLabel }}</span>
        </span>
    </span>
</template>
