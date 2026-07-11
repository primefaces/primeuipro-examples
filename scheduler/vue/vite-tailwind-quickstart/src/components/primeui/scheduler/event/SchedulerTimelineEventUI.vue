<script setup lang="ts">
import { isSchedulerAutoTextColor, useSchedulerEventContext, type SchedulerEvent } from '@primeui/vue-scheduler';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

type SchedulerTimelineEventUIProps = {
    event?: SchedulerEvent;
    variant?: 'timeline' | 'timeline-year';
    density?: 'minimal' | 'compact' | 'default' | 'comfortable' | string;
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
const eventUi = computed<SchedulerTimelineEventUIProps>(() => {
    const value = context.value;

    if (value.surface !== 'timeline' && value.surface !== 'timeline-year') {
        return {};
    }

    return {
        event: value.event,
        variant: value.surface,
        density: value.density,
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
const textColor = computed(() => (isSchedulerAutoTextColor(eventUi.value.event) ? undefined : eventUi.value.event?.textColor));
const isYear = computed(() => eventUi.value.variant === 'timeline-year');
const showTime = computed(() => Boolean(eventUi.value.timeText && eventUi.value.density !== 'minimal'));
const rootStyle = computed(() => ({
    background: eventSurfaceBackground(accent.value),
    borderColor: eventSurfaceBorder(accent.value),
    color: textColor.value
}));

function eventSurfaceBackground(color: string) {
    return `light-dark(color-mix(in srgb, ${color} 10%, var(--p-content-background)), color-mix(in srgb, ${color} 24%, var(--p-content-background)))`;
}

function eventSurfaceBorder(color: string) {
    return `light-dark(color-mix(in srgb, ${color} 28%, var(--p-content-border-color)), color-mix(in srgb, ${color} 42%, var(--p-content-border-color)))`;
}
</script>

<template>
    <div
        class="grid h-full min-h-0 min-w-0 grid-cols-[2px_minmax(0,1fr)] items-start gap-1 overflow-hidden rounded-md border px-1.5 py-1 text-xs shadow-sm"
        :class="[eventUi.density === 'minimal' && 'grid-cols-1 px-1 py-0.5', isYear && 'rounded-sm py-0.5', eventUi.isSelected && 'ring-2 ring-primary/40', eventUi.isDropValid === false && 'opacity-60']"
        :style="rootStyle"
        v-bind="$attrs"
    >
        <span v-if="eventUi.density !== 'minimal'" class="h-full min-h-3 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
        <span class="min-w-0 overflow-hidden">
            <span class="block truncate font-semibold leading-tight">{{ eventUi.event?.title }}</span>
            <span v-if="showTime" class="block truncate text-[0.68rem] leading-tight text-surface-500 dark:text-surface-400">{{ eventUi.timeText }}</span>
        </span>
        <span v-if="eventUi.isMultiDrag && eventUi.selectedCount" class="absolute end-1 top-1 rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-contrast" aria-hidden="true">{{ eventUi.selectedCount }}</span>
    </div>
</template>
