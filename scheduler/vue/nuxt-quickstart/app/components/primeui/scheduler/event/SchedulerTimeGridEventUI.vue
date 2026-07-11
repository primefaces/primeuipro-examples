<script setup lang="ts">
import { isSchedulerAutoTextColor, useSchedulerEventContext, type SchedulerEvent } from '@primeui/vue-scheduler';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

type SchedulerTimeGridEventUIProps = {
    event?: SchedulerEvent;
    density?: 'minimal' | 'compact' | 'default' | 'comfortable' | string;
    availableHeight?: number;
    availableWidth?: number;
    view?: string;
    isSelected?: boolean;
    isDragging?: boolean;
    isResizing?: boolean;
    isDropValid?: boolean;
    isMultiDrag?: boolean;
    selectedCount?: number;
    timeText?: string;
    accentColor?: string;
};

const context = useSchedulerEventContext();
const eventUi = computed<SchedulerTimeGridEventUIProps>(() => {
    const value = context.value;

    if (!value || value.surface !== 'time-grid') {
        return {};
    }

    return {
        event: value.event,
        density: value.density,
        availableHeight: value.availableHeight,
        availableWidth: value.availableWidth,
        view: value.view,
        isSelected: value.isSelected,
        isDragging: value.isDragging,
        isResizing: value.isResizing,
        isDropValid: value.isDropValid,
        isMultiDrag: value.isMultiDrag,
        selectedCount: value.selectedCount,
        timeText: value.timeText ?? value.formattedTime,
        accentColor: value.accentColor
    };
});
const accent = computed(() => eventUi.value.accentColor ?? eventUi.value.event?.color ?? eventUi.value.event?.borderColor ?? 'var(--p-primary-color)');
const explicitTextColor = computed(() => (isSchedulerAutoTextColor(eventUi.value.event) ? undefined : eventUi.value.event?.textColor));
const showTime = computed(() => Boolean(eventUi.value.timeText && !eventUi.value.event?.allDay && eventUi.value.density !== 'minimal'));
const defaultRootClasses = computed(() => [
    'scheduler-time-grid-event-ui',
    eventUi.value.density && `scheduler-time-grid-event-ui--density-${eventUi.value.density}`,
    eventUi.value.isSelected && 'scheduler-time-grid-event-ui-selected',
    eventUi.value.isDragging && 'scheduler-time-grid-event-ui-dragging',
    eventUi.value.isResizing && 'scheduler-time-grid-event-ui-resizing',
    eventUi.value.isDropValid === false && 'scheduler-time-grid-event-ui-invalid-drop',
    eventUi.value.isMultiDrag && 'scheduler-time-grid-event-ui-multi-drag'
]);
const rootStyle = computed<Record<string, string>>(() => ({
    '--scheduler-time-grid-event-ui-accent': accent.value,
    '--scheduler-time-grid-event-ui-color': explicitTextColor.value ?? 'var(--p-text-color)',
    '--scheduler-time-grid-event-ui-time-color': explicitTextColor.value ?? 'var(--p-text-muted-color)'
}));
</script>

<template>
    <div :class="defaultRootClasses" :style="rootStyle" v-bind="$attrs">
        <span class="scheduler-time-grid-event-ui-marker" aria-hidden="true" />
        <span class="scheduler-time-grid-event-ui-content">
            <span class="scheduler-time-grid-event-ui-title">{{ eventUi.event?.title }}</span>
            <span v-if="showTime" class="scheduler-time-grid-event-ui-time">{{ eventUi.timeText }}</span>
        </span>
        <span v-if="eventUi.isMultiDrag && eventUi.selectedCount" class="scheduler-time-grid-event-ui-badge" aria-hidden="true">{{ eventUi.selectedCount }}</span>
    </div>
</template>
