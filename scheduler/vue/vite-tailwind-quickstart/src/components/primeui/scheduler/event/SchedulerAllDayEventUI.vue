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

    if (value.surface !== 'all-day') {
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
const textColor = computed(() => (isSchedulerAutoTextColor(eventUi.value.event) ? undefined : eventUi.value.event?.textColor));
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
    <div class="flex h-full min-w-0 items-center gap-1.5 overflow-hidden rounded-md border px-2 py-1 text-xs shadow-sm" :class="[eventUi.isSelected && 'ring-2 ring-primary/40']" :style="rootStyle" v-bind="$attrs">
        <span class="h-full min-h-3 w-0.5 shrink-0 rounded-full" :style="{ backgroundColor: accent }" aria-hidden="true" />
        <span class="truncate font-semibold">{{ eventUi.event?.title }}</span>
        <span v-if="eventUi.isMultiDrag && eventUi.selectedCount" class="ms-auto rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-contrast" aria-hidden="true">{{ eventUi.selectedCount }}</span>
    </div>
</template>
