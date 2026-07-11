<script setup lang="ts">
import { useSchedulerResourceGroupContext, useSchedulerResourceRowContext, type FlattenedResource, type ResourceCapacityInfo, type SchedulerResource, type SchedulerResourceCapacityStatus } from '@primeui/vue-scheduler';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

type SchedulerResourceRowUIProps = {
    resource?: SchedulerResource | FlattenedResource;
    title?: string;
    color?: string;
    depth?: number;
    expanded?: boolean;
    isExpanded?: boolean;
    collapsible?: boolean;
    hasChildren?: boolean;
    toggle?: () => void;
    isAggregated?: boolean;
    aggregateCount?: number;
    capacityInfo?: ResourceCapacityInfo | null;
    capacityLabel?: string | null;
    capacityStatus?: SchedulerResourceCapacityStatus;
    isConstrained?: boolean;
};

const rowContext = useSchedulerResourceRowContext({ optional: true });
const groupContext = useSchedulerResourceGroupContext({ optional: true });

if (!rowContext && !groupContext) {
    throw new Error('[PrimeUI Scheduler] SchedulerResourceRowUI must be used inside Scheduler.ResourceRow or Scheduler.ResourceGroup.');
}

const row = computed<SchedulerResourceRowUIProps>(() => groupContext?.value ?? rowContext!.value);
</script>

<template>
    <span
        class="inline-flex max-w-full items-center gap-1.5 text-sm text-surface-800 dark:text-surface-100"
        :class="[row.hasChildren && 'font-bold', row.isAggregated && 'text-primary', row.isConstrained && 'text-red-600 dark:text-red-300']"
        v-bind="$attrs"
    >
        <span class="size-2 shrink-0 rounded-full" :style="{ backgroundColor: row.color ?? 'var(--p-primary-color)' }" aria-hidden="true" />
        <span class="min-w-0 truncate">{{ row.title ?? row.resource?.title }}</span>
    </span>
</template>
