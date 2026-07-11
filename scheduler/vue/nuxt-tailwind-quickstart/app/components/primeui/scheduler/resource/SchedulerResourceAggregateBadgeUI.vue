<script setup lang="ts">
import { useSchedulerResourceAggregateBadgeContext, type FlattenedResource, type SchedulerEvent, type SchedulerResource, type SchedulerResourceCapacityStatus } from '@primeui/vue-scheduler';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

type SchedulerResourceAggregateBadgeUIProps = {
    count?: number;
    hasConflict?: boolean;
    capacityFull?: boolean;
    capacityNear?: boolean;
    capacityStatus?: SchedulerResourceCapacityStatus;
    resource?: SchedulerResource | FlattenedResource;
    events?: SchedulerEvent[];
};

const context = useSchedulerResourceAggregateBadgeContext();
const badge = computed<SchedulerResourceAggregateBadgeUIProps>(() => context.value);
</script>

<template>
    <span
        class="inline-flex min-w-5 items-center justify-center rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-bold text-primary"
        :class="[
            badge.hasConflict && 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
            badge.capacityNear && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
            badge.capacityFull && 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
        ]"
        v-bind="$attrs"
        >{{ badge.count }}</span
    >
</template>
