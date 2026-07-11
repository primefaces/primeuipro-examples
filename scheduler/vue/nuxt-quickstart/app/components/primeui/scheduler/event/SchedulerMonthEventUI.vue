<script setup lang="ts">
import { isSchedulerAutoTextColor, useSchedulerEventContext, type SchedulerEvent } from '@primeui/vue-scheduler';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

interface SchedulerMonthEventUIPosition {
    isContinuationStart?: boolean;
    isContinuationEnd?: boolean;
}

type SchedulerMonthEventUIProps = {
    event?: SchedulerEvent;
    density?: 'minimal' | 'compact' | 'default' | 'comfortable' | string;
    availableHeight?: number;
    position?: SchedulerMonthEventUIPosition;
    view?: string;
    isSelected?: boolean;
    isDragging?: boolean;
    isDropValid?: boolean;
    isMultiDrag?: boolean;
    selectedCount?: number;
    timeText?: string;
    accentColor?: string;
};

const context = useSchedulerEventContext();
const eventUi = computed<SchedulerMonthEventUIProps>(() => {
    const value = context.value;

    if (!value || value.surface !== 'month') {
        return {};
    }

    return {
        event: value.event,
        density: value.density,
        availableHeight: value.availableHeight,
        position: value.position as SchedulerMonthEventUIPosition | undefined,
        view: value.view,
        isSelected: value.isSelected,
        isDragging: value.isDragging,
        isDropValid: value.isDropValid,
        isMultiDrag: value.isMultiDrag,
        selectedCount: value.selectedCount,
        timeText: value.timeText ?? value.formattedTime,
        accentColor: value.accentColor
    };
});
const accent = computed(() => eventUi.value.accentColor ?? eventUi.value.event?.color ?? eventUi.value.event?.borderColor ?? 'var(--p-primary-color)');
const isInline = computed(() => !eventUi.value.position && !eventUi.value.event?.allDay);
const isAllDay = computed(() => eventUi.value.event?.allDay === true);
const isContinuationOnly = computed(() => !isInline.value && eventUi.value.position?.isContinuationStart === true);
const explicitTextColor = computed(() => (isSchedulerAutoTextColor(eventUi.value.event) ? undefined : eventUi.value.event?.textColor));
const showTime = computed(() => Boolean(isInline.value && eventUi.value.timeText && eventUi.value.density !== 'minimal'));
const defaultRootClasses = computed(() => [
    'scheduler-month-event-ui',
    isInline.value && 'scheduler-month-event-ui--inline',
    !isInline.value && 'scheduler-month-event-ui--spanning',
    !isInline.value && isAllDay.value && 'scheduler-month-event-ui--all-day',
    isContinuationOnly.value && 'scheduler-month-event-ui--continuation-only',
    eventUi.value.density && `scheduler-month-event-ui--density-${eventUi.value.density}`,
    eventUi.value.isSelected && 'scheduler-month-event-ui-selected',
    eventUi.value.isDragging && 'scheduler-month-event-ui-dragging',
    eventUi.value.isDropValid === false && 'scheduler-month-event-ui-invalid-drop',
    eventUi.value.isMultiDrag && 'scheduler-month-event-ui-multi-drag'
]);
const rootStyle = computed<Record<string, string>>(() => ({
    '--scheduler-month-event-ui-accent': accent.value,
    '--scheduler-month-event-ui-color': explicitTextColor.value ?? 'var(--p-text-color)',
    '--scheduler-month-event-ui-time-color': explicitTextColor.value ?? 'var(--p-text-muted-color)'
}));
</script>

<template>
    <div :class="defaultRootClasses" :style="rootStyle" v-bind="$attrs">
        <span v-if="eventUi.position?.isContinuationStart && !isContinuationOnly" class="scheduler-month-event-ui-continuation" aria-hidden="true">&lt;</span>
        <span v-if="isInline" class="scheduler-month-event-ui-dot" aria-hidden="true" />
        <span v-else class="scheduler-month-event-ui-marker" aria-hidden="true" />
        <span v-if="isContinuationOnly" class="scheduler-month-event-ui-content scheduler-month-event-ui-content--continuation">
            <span class="scheduler-month-event-ui-continuation" aria-hidden="true">...</span>
            <span class="scheduler-month-event-ui-title">{{ eventUi.event?.title }}</span>
        </span>
        <span v-else class="scheduler-month-event-ui-content">
            <span class="scheduler-month-event-ui-title">{{ eventUi.event?.title }}</span>
            <span v-if="showTime" class="scheduler-month-event-ui-time">{{ eventUi.timeText }}</span>
        </span>
        <span v-if="eventUi.position?.isContinuationEnd && !isContinuationOnly" class="scheduler-month-event-ui-continuation" aria-hidden="true">&gt;</span>
        <span v-if="eventUi.isMultiDrag && eventUi.selectedCount" class="scheduler-month-event-ui-badge" aria-hidden="true">{{ eventUi.selectedCount }}</span>
    </div>
</template>
