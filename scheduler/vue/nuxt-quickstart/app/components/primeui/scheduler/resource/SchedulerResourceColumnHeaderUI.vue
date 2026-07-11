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
const headerUi = computed<SchedulerResourceColumnHeaderUIProps>(() => context.value);
const defaultRootClasses = computed(() => ['scheduler-resource-column-header-ui', headerUi.value.isLeaf === false && 'scheduler-resource-column-header-ui-parent', headerUi.value.isConstrained && 'scheduler-resource-column-header-ui-constrained']);
const rootStyle = computed<Record<string, string>>(() => ({
    '--scheduler-resource-column-header-ui-color': headerUi.value.color ?? headerUi.value.resource?.eventColor ?? 'var(--p-primary-color)'
}));
const eventCountLabel = computed(() => {
    const count = headerUi.value.eventCount;

    if (!count) {
        return null;
    }

    return `${count} ${count === 1 ? 'event' : 'events'}`;
});
const showMeta = computed(() => Boolean(eventCountLabel.value || headerUi.value.capacityLabel));
</script>

<template>
    <span :class="defaultRootClasses" :style="rootStyle" v-bind="$attrs">
        <span class="scheduler-resource-column-header-ui-marker" aria-hidden="true" />
        <span class="scheduler-resource-column-header-ui-body">
            <span class="scheduler-resource-column-header-ui-title">{{ headerUi.title ?? headerUi.resource?.title }}</span>
            <span v-if="showMeta" class="scheduler-resource-column-header-ui-meta">
                <span v-if="eventCountLabel" class="scheduler-resource-column-header-ui-meta-item">{{ eventCountLabel }}</span>
                <span v-if="headerUi.capacityLabel" class="scheduler-resource-column-header-ui-meta-item">{{ headerUi.capacityLabel }}</span>
            </span>
        </span>
    </span>
</template>
