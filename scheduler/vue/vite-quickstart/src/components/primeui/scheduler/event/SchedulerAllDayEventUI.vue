<script setup lang="ts">
import { isSchedulerAutoTextColor, useSchedulerEventContext, type SchedulerEvent } from '@primeui/vue-scheduler';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

type SchedulerAllDayEventUIProps = {
    event?: SchedulerEvent;
    density?: 'minimal' | 'compact' | 'default' | 'comfortable' | string;
    view?: string;
    isSelected?: boolean;
    isDragging?: boolean;
    isMultiDrag?: boolean;
    selectedCount?: number;
    accentColor?: string;
};

const context = useSchedulerEventContext();
const eventUi = computed<SchedulerAllDayEventUIProps>(() => {
    const value = context.value;

    if (!value || value.surface !== 'all-day') {
        return {};
    }

    return {
        event: value.event,
        density: value.density,
        view: value.view,
        isSelected: value.isSelected,
        isDragging: value.isDragging,
        isMultiDrag: value.isMultiDrag,
        selectedCount: value.selectedCount,
        accentColor: value.accentColor
    };
});
const accent = computed(() => eventUi.value.accentColor ?? eventUi.value.event?.color ?? eventUi.value.event?.borderColor ?? 'var(--p-primary-color)');
const explicitTextColor = computed(() => (isSchedulerAutoTextColor(eventUi.value.event) ? undefined : eventUi.value.event?.textColor));
const defaultRootClasses = computed(() => [
    'scheduler-all-day-event-ui',
    eventUi.value.density && `scheduler-all-day-event-ui--density-${eventUi.value.density}`,
    eventUi.value.isSelected && 'scheduler-all-day-event-ui-selected',
    eventUi.value.isDragging && 'scheduler-all-day-event-ui-dragging',
    eventUi.value.isMultiDrag && 'scheduler-all-day-event-ui-multi-drag'
]);
const rootStyle = computed<Record<string, string>>(() => ({
    '--scheduler-all-day-event-ui-accent': accent.value,
    '--scheduler-all-day-event-ui-color': explicitTextColor.value ?? 'var(--p-text-color)'
}));
</script>

<template>
    <div :class="defaultRootClasses" :style="rootStyle" v-bind="$attrs">
        <span class="scheduler-all-day-event-ui-marker" aria-hidden="true" />
        <span class="scheduler-all-day-event-ui-title">{{ eventUi.event?.title }}</span>
        <span v-if="eventUi.isMultiDrag && eventUi.selectedCount" class="scheduler-all-day-event-ui-badge" aria-hidden="true">{{ eventUi.selectedCount }}</span>
    </div>
</template>
