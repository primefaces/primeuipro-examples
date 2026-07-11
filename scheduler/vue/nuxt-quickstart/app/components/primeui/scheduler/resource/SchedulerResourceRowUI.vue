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

const rowUi = computed<SchedulerResourceRowUIProps>(() => groupContext?.value ?? rowContext!.value);
const defaultRootClasses = computed(() => [
    'scheduler-resource-row-ui',
    rowUi.value.hasChildren && 'scheduler-resource-row-ui-parent',
    rowUi.value.isAggregated && 'scheduler-resource-row-ui-aggregate',
    rowUi.value.isConstrained && 'scheduler-resource-row-ui-constrained'
]);
const rootStyle = computed<Record<string, string>>(() => ({
    '--scheduler-resource-row-ui-color': rowUi.value.color ?? 'var(--p-primary-color)'
}));
</script>

<template>
    <span :class="defaultRootClasses" :style="rootStyle" v-bind="$attrs">
        <span class="scheduler-resource-row-ui-marker" aria-hidden="true" />
        <span class="scheduler-resource-row-ui-title">{{ rowUi.title ?? rowUi.resource?.title }}</span>
    </span>
</template>
