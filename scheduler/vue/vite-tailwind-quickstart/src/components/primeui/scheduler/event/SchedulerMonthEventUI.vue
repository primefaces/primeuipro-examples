<script setup lang="ts">
import { isSchedulerAutoTextColor, useSchedulerEventContext, type SchedulerEvent } from '@primeui/vue-scheduler';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

type SchedulerMonthEventUIPosition = { isContinuationStart?: boolean; isContinuationEnd?: boolean };
type SchedulerMonthEventUIProps = {
    event?: SchedulerEvent;
    density?: 'minimal' | 'compact' | 'default' | 'comfortable' | string;
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

    if (value.surface !== 'month') {
        return {};
    }

    return {
        event: value.event,
        density: value.density,
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
const textColor = computed(() => (isSchedulerAutoTextColor(eventUi.value.event) ? undefined : eventUi.value.event?.textColor));
const isInline = computed(() => !eventUi.value.position && !eventUi.value.event?.allDay);
const isContinuationOnly = computed(() => !isInline.value && eventUi.value.position?.isContinuationStart === true);
const showTime = computed(() => Boolean(isInline.value && eventUi.value.timeText && eventUi.value.density !== 'minimal'));
const rootStyle = computed(() => {
    if (isInline.value) {
        return { color: textColor.value };
    }

    return {
        background: eventSurfaceBackground(accent.value),
        borderColor: eventSurfaceBorder(accent.value),
        color: textColor.value
    };
});

function eventSurfaceBackground(color: string) {
    return `light-dark(color-mix(in srgb, ${color} 10%, var(--p-content-background)), color-mix(in srgb, ${color} 24%, var(--p-content-background)))`;
}

function eventSurfaceBorder(color: string) {
    return `light-dark(color-mix(in srgb, ${color} 28%, var(--p-content-border-color)), color-mix(in srgb, ${color} 42%, var(--p-content-border-color)))`;
}
</script>

<template>
    <div
        class="flex h-full min-w-0 items-center gap-1 overflow-hidden rounded px-1.5 text-xs text-surface-700 dark:text-surface-200"
        :class="[!isInline && 'border shadow-sm', eventUi.isSelected && 'ring-2 ring-primary/40', eventUi.isDropValid === false && 'opacity-60']"
        :style="rootStyle"
        v-bind="$attrs"
    >
        <span v-if="eventUi.position?.isContinuationStart && !isContinuationOnly" class="shrink-0 text-surface-400" aria-hidden="true">&lt;</span>
        <span v-if="isInline" class="size-2 shrink-0 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
        <span v-else class="h-full min-h-3 w-0.5 shrink-0 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
        <span v-if="isContinuationOnly" class="truncate"><span aria-hidden="true">...</span> {{ eventUi.event?.title }}</span>
        <span v-else class="min-w-0 truncate font-semibold">{{ eventUi.event?.title }}</span>
        <span v-if="showTime" class="shrink-0 truncate text-[0.65rem] text-surface-500 dark:text-surface-400">{{ eventUi.timeText }}</span>
        <span v-if="eventUi.position?.isContinuationEnd && !isContinuationOnly" class="shrink-0 text-surface-400" aria-hidden="true">&gt;</span>
        <span v-if="eventUi.isMultiDrag && eventUi.selectedCount" class="ms-auto rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-contrast" aria-hidden="true">{{ eventUi.selectedCount }}</span>
    </div>
</template>
