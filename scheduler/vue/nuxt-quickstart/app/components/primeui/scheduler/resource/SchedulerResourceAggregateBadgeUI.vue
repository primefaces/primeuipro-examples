<script setup lang="ts">
import { useSchedulerResourceAggregateBadgeContext, type FlattenedResource, type SchedulerEvent, type SchedulerResource, type SchedulerResourceCapacityStatus } from '@primeui/vue-scheduler';
import Badge from 'primevue/badge';
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
const badgeUi = computed<SchedulerResourceAggregateBadgeUIProps>(() => context.value);
const defaultRootClasses = computed(() => [
    'scheduler-resource-aggregate-badge-ui',
    badgeUi.value.hasConflict && 'scheduler-resource-aggregate-badge-ui-conflict',
    badgeUi.value.capacityFull && 'scheduler-resource-aggregate-badge-ui-capacity-full',
    badgeUi.value.capacityNear && 'scheduler-resource-aggregate-badge-ui-capacity-near'
]);
</script>

<template>
    <Badge :class="defaultRootClasses" v-bind="$attrs" :value="badgeUi.count" />
</template>
